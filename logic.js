const axios = require('axios');
const API_BASE = 'https://clob.polymarket.com';

/**
 * Core execution hub for market data retrieval.
 * Designed for modular integration into task-runners.
 */
async function fetchActiveData() {
    try {
        const response = await axios.get(`${API_BASE}/markets`);
        return response.data;
    } catch (error) {
        console.error('Network Error:', error.message);
        throw error;
    }
}

async function handle(input) {
    const args = input.trim().split(/\s+/);
    const action = args[0].toLowerCase();

    switch (action) {
        case 'scan':
            const data = await fetchActiveData();
            return JSON.stringify(data.slice(0, 3), null, 2);
        default:
            return "Task not defined. Use 'scan'.";
    }
}

module.exports = { handle };
