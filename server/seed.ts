import { db } from "./db.js";
import { companies, jobs } from "../shared/schema.js";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from 'postgres';
import { config } from 'dotenv'
import { sampleData } from "../client/src/lib/jobs.js";
config() // Load environment variables from .env file

// Separate postgres client for migrations
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

// Replace the existing seedCompanies and seedJobs with data from jobs.ts
const seedCompanies = sampleData.companies.map(({ id, createdAt, ...company }) => company);
const seedJobs = sampleData.jobs.map(({ id, createdAt, ...job }) => job);

async function seed() {
  try {
    console.log("🗑️ Dropping existing tables...");
    // Drop existing tables and migration state
    await db.execute(sql`
      DROP TABLE IF EXISTS jobs CASCADE;
      DROP TABLE IF EXISTS companies CASCADE;
      DROP SCHEMA IF EXISTS drizzle CASCADE;
    `);

    console.log("🏗️ Running migrations...");
    // Run migrations
    await migrate(db, {
      migrationsFolder: "./server/migrations",
    });
    
    console.log("Testing database connection...");
    await db.execute(sql`SELECT 1`);
    
    console.log("🌱 Seeding database...");
    
    // Clear existing data
    console.log("Clearing existing data...");
    try {
      await db.delete(jobs);
      await db.delete(companies);
    } catch (error) {
      console.log("Tables were empty or didn't exist yet, continuing...");
    }
    
    // Insert companies
    console.log("Inserting companies...");
    const insertedCompanies = await db.insert(companies).values(seedCompanies).returning();
    console.log(`✅ Inserted ${insertedCompanies.length} companies:`, insertedCompanies);
    
    // Insert jobs with company references
    console.log("Inserting jobs...");
    const jobsWithCompanyIds = seedJobs.map((job, index) => ({
      ...job,
      companyId: insertedCompanies[index % insertedCompanies.length].id
    }));
    
    const insertedJobs = await db.insert(jobs).values(jobsWithCompanyIds).returning();
    console.log(`✅ Inserted ${insertedJobs.length} jobs:`, insertedJobs);
    
    console.log("✨ Seeding complete!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Seeding failed with error:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    } else {
      console.error("❌ Seeding failed with unknown error:", error);
    }
    throw error;
  } finally {
    // Close the migration client
    await migrationClient.end();
  }
}

// Make sure we're in a Node.js environment
if (typeof window !== 'undefined') {
  throw new Error('This script must be run in Node.js');
}

seed().catch((error) => {
  console.error("Fatal seeding error:", error);
  process.exit(1);
});
