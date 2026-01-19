


const BASE_URL = 'http://localhost:5000/api/auth';

const testUser = {
    name: "Test User",
    email: `testuser_${Date.now()}@example.com`,
    password: "password123",
    phone: "1234567890",
    address: "123 Test St",
    gender: "Male",
    age: 25,
    job: "Tester"
};

async function testAuth() {
    console.log("🚀 Starting Auth Flow Test...");

    // 1. Signup
    console.log(`\n1. Testing Signup (${testUser.email})...`);
    try {
        const signupRes = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });

        const signupData = await signupRes.json();

        if (signupRes.status !== 201) {
            console.error("❌ Signup Failed:", signupData);
            process.exit(1);
        }

        console.log("✅ Signup Successful! ID:", signupData.id);
        const token = signupData.token;

        if (!token) {
            console.error("❌ No token received in signup response");
            process.exit(1);
        }

        // 2. Access Protected Route (Me)
        console.log("\n2. Testing Protected Route (/me)...");
        const meRes = await fetch(`${BASE_URL}/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const meData = await meRes.json();

        if (meRes.status !== 200) {
            console.error("❌ Protected Route Access Failed:", meData);
            process.exit(1);
        }

        console.log("✅ Protected Route Accessed Successfully!");
        console.log("   User:", meData.email, "| Role:", meData.role);

        console.log("\n🎉 Auth Flow Verification Complete: SUCCESS");

    } catch (error) {
        console.error("❌ Network or Script Error:", error);
    }
}

testAuth();
