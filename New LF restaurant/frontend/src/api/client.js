// Use Render backend URL in production (set VITE_API_URL on Vercel)
// Ensure base ends with /api and has no trailing slash so requests hit /api/auth/login etc.
let BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
BASE_URL = BASE_URL.replace(/\/$/, '');
if (!BASE_URL.endsWith('/api')) BASE_URL += '/api';

const request = async (endpoint, method, body = null) => {
    const token = sessionStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // Attempt to parse JSON response
    let data;
    try {
        data = await response.json();
    } catch (error) {
        // If response is not JSON (like 404 text), handle gracefully
        data = null;
    }

    if (!response.ok) {
        // Mimic axios error structure so components don't break
        const error = new Error(data?.message || 'Something went wrong');
        error.response = {
            data,
            status: response.status,
        };
        throw error;
    }

    // Mimic axios response structure: { data: ... }
    return { data };
};

const api = {
    get: (endpoint) => request(endpoint, 'GET'),
    post: (endpoint, body) => request(endpoint, 'POST', body),
    put: (endpoint, body) => request(endpoint, 'PUT', body),
    delete: (endpoint) => request(endpoint, 'DELETE'),
};

export default api;
