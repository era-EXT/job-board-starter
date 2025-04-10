import { PGlite } from '@electric-sql/pglite';
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { config } from 'dotenv';

config(); // Load environment variables

// Create a data directory for persistent storage
const DATA_DIR = './data';

const runMigrations = async () => {
  const client = new PGlite({
    dataDir: DATA_DIR,
  });
  const db = drizzle({ client });

  console.log("⏳ Running migrations...");
  
  await migrate(db, {
    migrationsFolder: "./server/migrations"
  });

  console.log("✅ Migrations completed!");
};

runMigrations().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
}); 