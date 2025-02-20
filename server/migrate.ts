import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from 'dotenv';

config(); // Load environment variables

const runMigrations = async () => {
  const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(migrationClient);

  console.log("⏳ Running migrations...");
  
  await migrate(db, {
    migrationsFolder: "./server/migrations"
  });

  console.log("✅ Migrations completed!");
  await migrationClient.end();
};

runMigrations().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
}); 