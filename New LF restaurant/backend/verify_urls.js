
import https from 'https';

const urls = {
    'Swedish Massage': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dlZGlzaCUyMG1hc3NhZ2V8ZW58MHx8MHx8fDA%3D',
    'Live Jazz Night': 'https://images.unsplash.com/photo-1757439160077-dd5d62a4d851?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2ZSUyMGphenolMjBiYW5kfGVufDB8fDB8fHww',
    'Hot Stone': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdCUyMHN0b25lJTIwbWFzc2FnZXxlbnwwfHwwfHx8MA%3D%3D',
    'Reflexology': 'https://images.unsplash.com/photo-1542848284-8afa78a08ccb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVmbGV4b2xvZ3l8ZW58MHx8MHx8fDA%3D'
};

async function checkUrl(name, url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            console.log(`${name}: ${res.statusCode}`);
            resolve();
        }).on('error', (e) => {
            console.log(`${name}: ERROR - ${e.message}`);
            resolve();
        });
    });
}

async function main() {
    console.log("--- My Verifying URLs ---");
    for (const [name, url] of Object.entries(urls)) {
        await checkUrl(name, url);
    }
}

main();
