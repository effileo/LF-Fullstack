# LF Hotel & Restaurant Management System

A full-stack multi-tenant platform for managing luxury hotels, dining services, room reservations, and tenant administration.

Live Demo: [https://lf-fullstack.vercel.app](https://lf-fullstack.vercel.app)

---

## Screenshot

![LF Hotel & Restaurant Management System](docs/screenshots/landing-hero.png)

---

## Verified Features

- **Multi-Tenant Architecture**: Each hotel functions as an independent tenant with its own dedicated administrator, customizable details, and categorized offerings.
- **Super Admin Dashboard**: Centralized management portal to view platform-wide analytics, monitor hotels, toggle suspension status, and oversee user accounts.
- **Hotel Admin Portal**: Operational dashboard for hotel managers to manage listings, update room and meal inventories, track reservation requests, and publish announcements.
- **Customer Reservation Flow**: Interactive catalog allowing visitors to explore luxury properties, browse categorized services (rooms, dining, spa, entertainment), and submit reservations.
- **Customer Activity and Profile**: Authenticated user space to view active booking history, check reservation approval status, and update profile information.
- **Authentication and RBAC**: Secure authentication powered by JSON Web Tokens (JWT) and bcrypt password hashing, enforcing three distinct roles: SUPER_ADMIN, HOTEL_ADMIN, and USER.
- **Responsive Luxury Interface**: Client interface styled with Tailwind CSS 4, Framer Motion animations, Lucide icons, and responsive layouts across mobile and desktop.

---

## Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite 7 | Fast Single Page Application architecture with HMR |
| **Routing** | React Router 7 | Client-side routing with role-based ProtectedRoute guards |
| **Styling** | Tailwind CSS 4 | Utility-first styling with modern responsive design tokens |
| **Animations** | Framer Motion | Smooth scroll-linked animations and UI micro-interactions |
| **Icons** | Lucide React | Modern, clean vector iconography |
| **Backend** | Node.js (native HTTP) | Native Node.js HTTP server implementation |
| **ORM** | Prisma ORM 5 | Type-safe database queries, schema modeling, and migrations |
| **Database** | PostgreSQL (Neon) | Cloud relational database with connection pooling |
| **Auth & Security** | JWT, bcryptjs | Stateless token authentication and password hashing |
| **Validation** | Zod | Server-side request payload validation |
| **Hosting** | Vercel (Frontend), Render (Backend), Neon (Database) | Production deployment architecture |

---

## Demo Access

The application is deployed and available at [https://lf-fullstack.vercel.app](https://lf-fullstack.vercel.app).

Public catalog browsing and new user registration are available directly on the live platform. Demo test accounts for administrative roles will be provided in a future update.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database instance (local or hosted on Neon)

### 1. Backend Setup

`ash
cd  New LF restaurant/backend
npm install
cp .env.example .env
`

Configure your environment variables in .env:

`env
DATABASE_URL=
PORT=
JWT_SECRET=
FRONTEND_URL=
CORS_ORIGINS=
`

Run database migrations and seed default hotels:

`ash
npx prisma migrate deploy
node prisma/seed.js
npm run dev
`

The backend server will start on http://localhost:5000.

### 2. Frontend Setup

`ash
cd New LF restaurant/frontend
npm install
cp .env.example .env
`

Configure your environment variables in .env:

`env
VITE_API_URL=
`

Start the Vite development server:

`ash
npm run dev
`

The frontend application will start on http://localhost:5173.

---

## Environment Variables

### Backend (New LF restaurant/backend/.env)

- DATABASE_URL: PostgreSQL connection string (including sslmode and timeout settings)
- PORT: Port number for the HTTP server (default: 5000)
- JWT_SECRET: Secret key used for signing and verifying JWT tokens
- FRONTEND_URL: Single allowed frontend domain origin for CORS headers
- CORS_ORIGINS: Comma-separated list of allowed frontend domain origins for CORS

### Frontend (New LF restaurant/frontend/.env)

- VITE_API_URL: Backend API base URL (e.g. http://localhost:5000 or production backend endpoint)

---

## Repository Structure

- File/: Supporting presentation and demonstration guide materials (Tip for demo.pdf).
- New LF restaurant/: The primary active full-stack project workspace.
- New LF restaurant/backend/: Node.js REST API service, Prisma database models, migrations, and seed scripts.
- New LF restaurant/frontend/: React single-page client built with Vite, Tailwind CSS, and Framer Motion.
- docs/screenshots/: Interface screenshots and visual assets for documentation.

---

## Author

Created by [effileo](https://github.com/effileo)
