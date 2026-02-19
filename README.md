# YOUNGBLOOD ⚡

> NYC-based social club for 18–24 year olds. The meaning of life is play.

## Tech Stack

- **Frontend:** Vite + React + Tailwind CSS v4 + Framer Motion
- **Backend:** Node.js + Express
- **Aesthetic:** Modern Brutalism / "Tech n' Bold"

## Project Structure

```
YoungBlood/
├── client/                  # Vite + React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Pillars.jsx
│   │   │   ├── EventsFeed.jsx
│   │   │   ├── MembershipCTA.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
├── server/                  # Express API backend
│   └── server.js
├── package.json             # Root scripts (concurrently)
└── README.md
```

## Quick Start

```bash
# Install all dependencies
npm install
npm install --prefix client
npm install --prefix server

# Run both client and server
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

## API Endpoints

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| GET    | /api/events       | List all upcoming events  |
| GET    | /api/events/:id   | Get single event          |
| POST   | /api/members      | Sign up a new member      |
| GET    | /api/members      | List all members (admin)  |
| GET    | /api/health       | Health check              |

## Design Tokens

- **Acid Green:** `#BFFF00`
- **Deep Black:** `#0A0A0A`
- **Off-White:** `#F5F5F0`
- **Heading Font:** Space Grotesk
- **Body Font:** Inter
