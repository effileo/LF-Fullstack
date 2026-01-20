import 'dotenv/config';
import http from 'http';
import url from 'url';

// Import Controllers
import * as authController from './controllers/authController.js';
import * as hotelController from './controllers/hotelController.js';
import * as productController from './controllers/productController.js';
import * as reservationController from './controllers/reservationController.js';
import * as reviewController from './controllers/reviewController.js';

// Import Middleware
import { protect, adminOnly, hotelAdminOnly } from './middleware/authMiddleware.js';

const PORT = process.env.PORT || 5000;

// Helper to handle CORS
const setCorsHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// Helper to run middleware
const runMiddleware = (req, res, middleware) => {
    return new Promise((resolve) => {
        const next = () => {
            resolve(true); // Proceed
        };
        // Mock res.status/json for middleware error responses
        if (!res.status) {
            res.status = (code) => {
                res.statusCode = code;
                return res;
            };
            res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                resolve(false); // Stop chain
            };
        }

        middleware(req, res, next).catch((err) => {
            console.error('Middleware Error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ message: 'Server Error in Middleware' }));
            resolve(false);
        });
    });
};

const server = http.createServer(async (req, res) => {
    // 1. Set CORS
    setCorsHeaders(res);

    // 2. Handle Preflight
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    // 3. Response Helpers (Shim)
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        return res;
    };

    // 4. Parse Body manually
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            if (body) {
                req.body = JSON.parse(body);
            } else {
                req.body = {};
            }
        } catch (error) {
            console.error('JSON Parse Error:', error);
            req.body = {}; // Allow empty body or failed parse?
        }

        // 5. URL Parsing
        const parsedUrl = url.parse(req.url, true);
        req.query = parsedUrl.query;
        const pathname = parsedUrl.pathname;
        const method = req.method;

        console.log(`${method} ${pathname}`);

        try {
            // =================================================================
            // MANUAL ROUTING LOGIC
            // =================================================================

            // --- AUTH ROUTES ---
            if (pathname === '/api/auth/login' && method === 'POST') {
                return authController.login(req, res);
            }
            if (pathname === '/api/auth/signup' && method === 'POST') {
                return authController.signup(req, res);
            }
            if (pathname === '/api/auth/profile' && method === 'PUT') {
                if (await runMiddleware(req, res, protect)) {
                    return authController.updateProfile(req, res);
                }
                return;
            }
            if (pathname === '/api/auth/me' && method === 'GET') {
                if (await runMiddleware(req, res, protect)) {
                    return authController.getMe(req, res);
                }
                return;
            }
            if (pathname === '/api/auth/forgot-password' && method === 'POST') {
                return authController.forgotPassword(req, res);
            }
            // /api/auth/reset-password/:token
            const resetPwdMatch = pathname.match(/^\/api\/auth\/reset-password\/([\w-]+)$/);
            if (resetPwdMatch && method === 'POST') {
                req.params = { token: resetPwdMatch[1] };
                return authController.resetPassword(req, res);
            }

            // --- HOTEL ROUTES ---
            if (pathname === '/api/hotels' && method === 'GET') {
                return hotelController.getHotels(req, res);
            }
            if (pathname === '/api/hotels' && method === 'POST') {
                if (await runMiddleware(req, res, protect)) {
                    if (await runMiddleware(req, res, adminOnly)) {
                        return hotelController.createHotel(req, res);
                    }
                }
                return;
            }
            // Specific Hotel Routes (ID based)
            const hotelIdMatch = pathname.match(/^\/api\/hotels\/([a-zA-Z0-9-]+)$/);
            // Check for sub-resources first to avoid greedy match on ID
            // e.g. /api/hotels/:id/suspend
            const hotelSuspendMatch = pathname.match(/^\/api\/hotels\/([a-zA-Z0-9-]+)\/suspend$/);

            if (hotelSuspendMatch && method === 'PUT') {
                if (await runMiddleware(req, res, protect)) {
                    if (await runMiddleware(req, res, adminOnly)) {
                        req.params = { id: hotelSuspendMatch[1] };
                        return hotelController.suspendHotel(req, res);
                    }
                }
                return;
            }

            if (hotelIdMatch) {
                req.params = { id: hotelIdMatch[1] };
                if (method === 'GET') {
                    return hotelController.getHotelById(req, res);
                }
                if (method === 'DELETE') {
                    if (await runMiddleware(req, res, protect)) {
                        if (await runMiddleware(req, res, adminOnly)) {
                            return hotelController.deleteHotel(req, res);
                        }
                    }
                    return;
                }
                if (method === 'PUT') {
                    if (await runMiddleware(req, res, protect)) {
                        return hotelController.updateHotel(req, res);
                    }
                    return;
                }
            }

            // --- PRODUCT ROUTES ---
            if (pathname === '/api/products' && method === 'POST') {
                if (await runMiddleware(req, res, protect)) {
                    // Assuming hotelAdminOnly checks user role
                    if (await runMiddleware(req, res, hotelAdminOnly)) {
                        return productController.createProduct(req, res);
                    }
                }
                return;
            }

            // /api/products/hotel/:hotelId
            const productsByHotelMatch = pathname.match(/^\/api\/products\/hotel\/([a-zA-Z0-9-]+)$/);
            if (productsByHotelMatch && method === 'GET') {
                req.params = { hotelId: productsByHotelMatch[1] };
                return productController.getProductsByHotel(req, res);
            }

            // /api/products/:id
            const productIdMatch = pathname.match(/^\/api\/products\/([a-zA-Z0-9-]+)$/);
            if (productIdMatch) {
                req.params = { id: productIdMatch[1] };
                if (method === 'PUT') {
                    if (await runMiddleware(req, res, protect)) {
                        if (await runMiddleware(req, res, hotelAdminOnly)) {
                            return productController.updateProduct(req, res);
                        }
                    }
                    return;
                }
                if (method === 'DELETE') {
                    if (await runMiddleware(req, res, protect)) {
                        if (await runMiddleware(req, res, hotelAdminOnly)) {
                            return productController.deleteProduct(req, res);
                        }
                    }
                    return;
                }
            }

            // --- RESERVATION ROUTES ---
            if (pathname === '/api/reservations' && method === 'POST') {
                // protect checks for token, but controller handles optional user?
                // Actually reservationRoutes.js had `protect` on POST.
                if (await runMiddleware(req, res, protect)) {
                    return reservationController.createReservation(req, res);
                }
                return;
            }
            if (pathname === '/api/reservations/my-reservations' && method === 'GET') {
                if (await runMiddleware(req, res, protect)) {
                    return reservationController.getUserReservations(req, res);
                }
                return;
            }
            // /api/reservations/hotel/:hotelId
            const reservationsHotelMatch = pathname.match(/^\/api\/reservations\/hotel\/([a-zA-Z0-9-]+)$/);
            if (reservationsHotelMatch && method === 'GET') {
                req.params = { hotelId: reservationsHotelMatch[1] };
                if (await runMiddleware(req, res, protect)) {
                    if (await runMiddleware(req, res, hotelAdminOnly)) {
                        return reservationController.getReservations(req, res);
                    }
                }
                return;
            }

            // /api/reservations/:id/status
            const reservationStatusMatch = pathname.match(/^\/api\/reservations\/([a-zA-Z0-9-]+)\/status$/);
            if (reservationStatusMatch && method === 'PUT') {
                req.params = { id: reservationStatusMatch[1] };
                if (await runMiddleware(req, res, protect)) {
                    // Controller handles authorization inside
                    return reservationController.updateReservationStatus(req, res);
                }
                return;
            }

            // --- REVIEW ROUTES ---
            if (pathname === '/api/reviews' && method === 'POST') {
                if (await runMiddleware(req, res, protect)) {
                    return reviewController.createReview(req, res);
                }
                return;
            }
            // /api/reviews/:hotelId
            const reviewsHotelMatch = pathname.match(/^\/api\/reviews\/([a-zA-Z0-9-]+)$/);
            if (reviewsHotelMatch && method === 'GET') {
                req.params = { hotelId: reviewsHotelMatch[1] };
                return reviewController.getReviewsByHotel(req, res);
            }

            // --- ROOT ---
            if (pathname === '/' && method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('LF Restaurant API is running (Raw Node Mode)');
                return;
            }

            // --- 404 NOT FOUND ---
            console.log(`404 Not Found: ${pathname}`);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Route not found' }));

        } catch (err) {
            console.error('Controller Error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
        }
    });
});

server.listen(PORT, () => {
    console.log(`Manual Node.js Server running on port ${PORT}`);
});
