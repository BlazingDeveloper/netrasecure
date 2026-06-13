# NetraSecure AI — Full Stack Landing Page

AI-powered cybersecurity platform built for AnantNetra Technologies hiring assignment.

**Stack:** React + Vite + Tailwind CSS + Framer Motion (frontend) / Node.js + Express (backend)

---

## Project Structure

```
netrasecure/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx            # Animated shield visualization
│   │   │   ├── Features.jsx        # Asymmetric feature cards
│   │   │   ├── WhyNetrasecure.jsx  # Bento grid with animated stats
│   │   │   ├── ProductShowcase.jsx # Realistic dashboard previews
│   │   │   ├── HowItWorks.jsx      # Horizontal timeline
│   │   │   ├── TrustSection.jsx    # Compliance badges
│   │   │   ├── ChatbotSection.jsx  # Live chat UI with API
│   │   │   ├── ScannerSection.jsx  # URL scanner with results
│   │   │   ├── Testimonials.jsx
│   │   │   ├── ContactForm.jsx     # Form with API submission
│   │   │   ├── FinalCTA.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                     # Express backend
    ├── routes/
    │   ├── contact.js
    │   ├── scan.js
    │   └── chat.js
    ├── controllers/
    │   ├── contactController.js
    │   ├── scanController.js
    │   └── chatController.js
    ├── app.js
    └── package.json
```

---

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Backend

```bash
cd server
npm install
npm run dev          # Starts on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env # Edit VITE_API_URL if backend URL differs
npm run dev          # Starts on http://localhost:5173
```

The Vite dev server proxies `/contact`, `/scan-url`, and `/chat` to `localhost:5000` automatically (configured in `vite.config.js`), so `.env` is only needed for production.

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
