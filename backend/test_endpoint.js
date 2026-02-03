const axios = require('axios');

async function testEndpoint() {
    try {
        console.log("Testing endpoint...");
        const response = await axios.get('http://localhost:3000/api/food-partner/697a3b093e94fc7d90d40a34');
        console.log("Status:", response.status);
        console.log("Data:", response.data);
    } catch (error) {
        if (error.response) {
            console.log("Error Status:", error.response.status);
            console.log("Error Data:", error.response.data); // This might be "Cannot GET ..." if route missing
        } else {
            console.log("Error:", error.message);
        }
    }
}

testEndpoint();
