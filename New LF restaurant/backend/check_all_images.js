
import fs from 'fs';

// Read seed.js
const seedContent = fs.readFileSync('prisma/seed.js', 'utf8');

// Regex to find all 'image: '...'' patterns
// We use a non-greedy matching for the content inside quotes
const regex = /image:\s*['"](https?:\/\/[^'"]+?)['"]/g;
let match;
const urls = new Set();

while ((match = regex.exec(seedContent)) !== null) {
    urls.add(match[1]);
}

console.log(`Found ${urls.size} unique URLs to check.`);

async function checkUrl(url, index, total) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 sec timeout

        const response = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        console.log(`[${index + 1}/${total}] ${response.status} - ${url.substring(0, 50)}...`);
        return { url, status: response.status };
    } catch (error) {
        console.log(`[${index + 1}/${total}] ERROR - ${url.substring(0, 50)}... (${error.message})`);
        return { url, status: 'ERROR' };
    }
}

async function main() {
    const results = [];
    const urlArray = Array.from(urls);

    // Check in batches of 5 to be gentle
    const batchSize = 5;
    for (let i = 0; i < urlArray.length; i += batchSize) {
        const batch = urlArray.slice(i, i + batchSize);
        const batchPromises = batch.map((url, batchIndex) => checkUrl(url, i + batchIndex, urlArray.length));
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
    }

    console.log("\n--- BROKEN URLs ---");
    const broken = results.filter(r => r.status !== 200);

    if (broken.length === 0) {
        console.log("All URLs are good!");
        fs.writeFileSync('broken_urls.txt', 'NO BROKEN URLS');
    } else {
        const brokenList = broken.map(r => `${r.status}: ${r.url}`).join('\n');
        broken.forEach(r => console.log(`${r.status}: ${r.url}`));
        fs.writeFileSync('broken_urls.txt', brokenList);
    }
}

main();
