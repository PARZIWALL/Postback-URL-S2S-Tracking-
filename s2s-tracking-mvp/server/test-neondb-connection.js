// test-neondb-connection.js
// Script to test NeonDB PostgreSQL connection using Prisma

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Simple query to test connection
    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('NeonDB connection successful:', result);
  } catch (error) {
    console.error('NeonDB connection failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
