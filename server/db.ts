import { Pool, neonConfig } from '@neondatabase/serverless';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import ws from 'ws';
import * as schema from "@shared/schema";

import { config } from 'dotenv'
config() // Load environment variables from .env file

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Determine if we're in a serverless environment
const isServerless = process.env.DATABASE_URL.includes('neondb');

let db: any;

if (isServerless) {
  // Serverless environment (production)
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  // Local development
  const client = postgres(process.env.DATABASE_URL, {
    max: 1,
    prepare: false,
  });
  db = drizzlePostgres(client, { schema });
}

export { db };
