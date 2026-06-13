# NetraSecure AI

[![Live Frontend](https://img.shields.io/badge/Live_Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://netrasecure-ai.vercel.app/)
[![Live Backend](https://img.shields.io/badge/Live_Backend-Render-blue?style=for-the-badge&logo=render)](https://netrasecure-api.onrender.com/)

![NetraSecure AI Hero Preview](./client/src/assets/logo.png)
*(Note: Replace the image above with a high-resolution screenshot of the Hero section)*

NetraSecure AI is a premium cybersecurity platform built for everyday users. We combine intuitive interfaces with advanced threat detection to bring enterprise-grade security to the individual level.

---

## 🏛 Architecture

NetraSecure AI is engineered using a modern MERN stack architecture tailored for speed, scalability, and premium user experience:

- **Frontend (Client):** 
  - Built with **React** and powered by **Vite** for blazing fast HMR and optimized builds.
  - Styled with **Tailwind CSS** for a highly responsive, glassmorphic UI.
  - Animations are orchestrated via **Framer Motion**, featuring cinematic scroll reveals to deliver a polished, investor-ready user experience.
  - Form interactions utilize `react-hot-toast` with simulated network latency to demonstrate real-world UX responsiveness and loading states.
  
- **Backend (Server):** 
  - A lightweight **Node.js/Express** API architecture serving as the foundational layer for complex threat analysis algorithms and chatbot interactions.
  - Implements modular routing and controllers for maintainability.

---

## 🚀 Local Development Setup

To run NetraSecure AI locally, you need [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/BlazingDeveloper/netrasecure.git
cd netrasecure
```

### 2. Setup the Server (Backend)
Open a new terminal window and run the following commands:
```bash
cd server
npm install

# Start the development server (runs on port 3001)
npm run dev
```

### 3. Setup the Client (Frontend)
Open another terminal window and run the following commands:
```bash
cd client
npm install

# Create environment file from the example
cp .env.example .env

# Start the Vite development server
npm run dev
```

### 4. Experience the Platform
Visit `http://localhost:5173` in your browser. Ensure the backend is running to experience full interactivity with the URL scanner and AI assistant modules.

---

## API Endpoints

| Method | Endpoint    | Description         |
|--------|-------------|---------------------|
| POST   | /contact    | Contact form submit |
| POST   | /scan-url   | URL risk analysis   |
| POST   | /chat       | AI chatbot reply    |

### POST /contact
```json
{
  "name": "Arjun Mehta",
  "email": "arjun@example.com",
  "subject": "Question about scanning",
  "message": "How does the URL scanner work?"
}
```

### POST /scan-url
```json
{ "url": "https://github.com" }
```
Returns: `{ status, risk, score, message, checks, domain, scannedAt }`

### POST /chat
```json
{ "message": "How do I create a strong password?" }
```
Returns: `{ reply, timestamp }`

---

## Deployment

### Frontend → Vercel

```bash
# In /client
npm run build
```

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set Root Directory: `client`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
5. Deploy

### Backend → Render

1. Push to GitHub
2. New Web Service on [render.com](https://render.com)
3. Root Directory: `server`
4. Build Command: `npm install`
5. Start Command: `node app.js`
6. Deploy — copy the URL and paste into Vercel's `VITE_API_URL`

---

## Design System

| Token        | Value         | Usage                         |
|-------------|---------------|-------------------------------|
| Navy BG      | `#020817`     | Page background               |
| Navy Card    | `#040f2a`     | Card backgrounds              |
| Blue Primary | `#1d6fe8`     | CTA buttons, highlights       |
| Blue Light   | `#0ea5e9`     | Secondary accents             |
| Orange       | `#f97316`     | Warning / medium risk         |
| Green        | `#22c55e`     | Safe / success states         |
| Red          | `#ef4444`     | High risk / error states      |

Typography: Inter (body), JetBrains Mono (code/labels)

---

## What's Implemented

- ✅ Sticky navbar with glass blur on scroll
- ✅ Hero with custom animated shield visualization (SVG + Framer Motion)
- ✅ Animated trust counters (IntersectionObserver)
- ✅ Asymmetric feature card grid (spanning layout)
- ✅ Bento grid with live stat counters
- ✅ Realistic dashboard + chat previews (no placeholder boxes)
- ✅ Horizontal step timeline
- ✅ Trust/compliance section with badges
- ✅ Full interactive chatbot UI with typing indicator + API integration
- ✅ URL scanner with animated scan states and result breakdown
- ✅ Contact form with success/error states + API integration
- ✅ Realistic testimonials (not marketing copy)
- ✅ Final CTA with gradient overlay
- ✅ Professional footer
- ✅ Framer Motion throughout: fade-up, stagger, hover lift, counter animation
- ✅ Fully responsive (mobile, tablet, desktop)

---

## 🔒 License

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or execution is strictly prohibited.

## Security Architecture & Production Roadmap

NetraSecure was built as a 48-hour prototype to validate the core threat-detection concept. The authentication layer is intentionally stubbed out for this demo. Below is the precise production architecture that would be implemented before any public launch.

### Authentication
Production auth would issue JWTs with short expiry windows (15 minutes) stored exclusively in `httpOnly`, `Secure`, `SameSite=Strict` cookies — never in `localStorage` — to eliminate the XSS attack surface that browser-accessible tokens expose. This pairs with a **refresh token rotation** strategy: a long-lived refresh token (stored in a separate `httpOnly` cookie) is exchanged for a new access/refresh token pair on each use, and the old refresh token is immediately invalidated, preventing replay attacks.

### Password Hashing & Data Integrity
User credentials would be hashed server-side using **Argon2id** (preferred over bcrypt for its resistance to GPU and side-channel attacks), with per-user salts managed automatically by the library. Raw passwords never touch the database or application logs.

### API Rate Limiting & Abuse Prevention
`express-rate-limit` would be applied as middleware on all `/auth/*` endpoints (login, registration, password reset) and `/scan-url` to prevent brute-force credential attacks and volumetric DDoS abuse. Sensitive auth routes would use a stricter sliding-window policy (e.g., 10 requests / 15 min per IP) with exponential backoff headers returned to the client.

### Network Security & CORS
The deployment enforces a strict CORS whitelist — only the verified production front-end origin is permitted to make credentialed cross-origin requests. All other origins receive a `403` at the network layer before any application logic executes.

### Future Scope: RBAC for Enterprise Accounts
A future enterprise tier would introduce **Role-Based Access Control (RBAC)** with at minimum three roles — `owner`, `analyst`, and `viewer` — scoping access to scan history, threat reports, and team management. Roles would be encoded in the JWT payload and verified server-side on every protected route, never trusted from the client.

> **Note:** These features were descoped to keep the prototype focused on the core AI threat-detection pipeline. The architecture decisions above reflect production intent, not shortcuts.
