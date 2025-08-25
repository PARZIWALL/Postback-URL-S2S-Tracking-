
# S2S Tracking MVP

This project uses NeonDB PostgreSQL for all database operations. Make sure your `.env` file contains the NeonDB connection string.

## Getting Started

1. Install dependencies:
	```bash
	npm install
	```
2. Generate Prisma client:
	```bash
	npx prisma generate
	```
3. Run migrations:
	```bash
	npx prisma migrate deploy
	```
4. Seed the database:
	```bash
	node src/prisma/seed.js
	```
5. Start the server:
	```bash
	npm start
	```

## NeonDB Connection

The connection string for NeonDB should be set in `server/.env` as `DATABASE_URL`.
