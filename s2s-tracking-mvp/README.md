S2S Tracking MVP

This project is a full-stack MVP for server-to-server (S2S) tracking using NeonDB PostgreSQL, an Express.js backend, and a Next.js frontend. It enables affiliate click tracking, conversion logging, and unique postback URL management.

How the System Works
Backend

Built with Express.js and Prisma ORM.

Connects to a PostgreSQL database (NeonDB or local).

Provides REST API endpoints for:

Affiliates

Clicks

Conversions

Summary stats

CORS enabled for frontend access.

Frontend

Built with Next.js (React + Tailwind).

Allows:

Simulated affiliate login (via dropdown).

Dashboard with summary, clicks, and conversions.

Postback URL template with copy-to-clipboard.

Flow

User selects an affiliate on the login page.

Dashboard fetches summary, clicks, and conversions from backend.

Postback URL page shows the template URL for that affiliate:

https://affiliate-system.com/postback?affiliate_id={id}&click_id={click_id}&amount={amount}&currency={currency}

Getting Started
Backend Setup

# S2S Tracking MVP

This project is a full-stack MVP for server-to-server (S2S) tracking using NeonDB PostgreSQL, an Express.js backend, and a Next.js frontend. It enables affiliate click tracking, conversion logging, and unique postback URL management.

---

## How the System Works

### Backend
- Built with Express.js and Prisma ORM
- Connects to a PostgreSQL database (NeonDB or local)
- Provides REST API endpoints for:
  - Affiliates
  - Clicks
  - Conversions
  - Summary stats
- CORS enabled for frontend access

### Frontend
- Built with Next.js (React + Tailwind)
- Simulated affiliate login (via dropdown)
- Dashboard with summary, clicks, and conversions
- Postback URL template with copy-to-clipboard

### Flow
1. User selects an affiliate on the login page
2. Dashboard fetches summary, clicks, and conversions from backend
3. Postback URL page shows the template URL for that affiliate:
	```
	https://affiliate-system.com/postback?affiliate_id={id}&click_id={click_id}&amount={amount}&currency={currency}
	```

---

## Getting Started

### Backend Setup
1. Go to `s2s-tracking-mvp/server`
2. Install dependencies:
	```bash
	npm install
	```
3. Generate Prisma client:
	```bash
	npx prisma generate
	```
4. Run migrations:
	```bash
	npx prisma migrate deploy
	```
5. Seed the database (creates sample affiliates & campaigns):
	```bash
	npm run seed
	```
6. Start the backend server:
	```bash
	npm start
	```
	By default runs at `http://localhost:3001`

> ⚠️ **Database Setup:**
> You need to create a `.env` file inside `/server` with your NeonDB connection string, e.g.:
> ```env
> DATABASE_URL="postgresql://<user>:<password>@<neon-host>/<database>?sslmode=require"
> ```
> Never commit real credentials or API keys to GitHub.

### Frontend Setup
1. Go to `s2s-tracking-mvp/web`
2. Install dependencies:
	```bash
	npm install --legacy-peer-deps
	```
3. Create `.env.local` with:
	```env
	NEXT_PUBLIC_API_URL=http://localhost:3001
	```
4. Start the frontend:
	```bash
	npm run dev
	```
	By default runs at `http://localhost:3000`

---

## Example API Requests

### Log a Click
```http
GET http://localhost:3001/click?affiliate_id=1&campaign_id=1&click_id=abc123
```

### Send Postback (Conversion)
```http
GET http://localhost:3001/postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD
```

### Get Affiliates
```http
GET http://localhost:3001/affiliates
```

### Get Summary
```http
GET http://localhost:3001/affiliates/1/summary
```

---

## Project Structure

- `server/`   → Express backend, Prisma ORM, PostgreSQL
- `web/`      → Next.js frontend, affiliate dashboard

---

## Understanding of the System

This MVP demonstrates a simplified affiliate tracking system:
- **Clicks:** Stored in DB when a user hits a tracking link
- **Conversions:** Logged only if a valid click exists
- **Dashboard:** Affiliates can see performance (clicks, conversions, revenue)
- **Postback URL:** Each affiliate has a unique template to share with advertisers

This architecture is similar to real-world affiliate networks. It avoids cookies by using S2S tracking, ensuring more accurate and secure attribution.