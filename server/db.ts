import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import * as schema from "@shared/schema";

import { config } from 'dotenv'
config() // Load environment variables from .env file

// Create a data directory for persistent storage
const DATA_DIR = './data';

// Create a new PGlite instance
const client = new PGlite({
  dataDir: DATA_DIR, // Store data in a local directory
});

// Initialize Drizzle with the PGlite client
const db = drizzle({ client, schema });

export { db };
