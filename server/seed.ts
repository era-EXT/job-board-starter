import { db } from "./db.js";
import { companies, jobs } from "../shared/schema.js";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from 'postgres';
import { config } from 'dotenv'
config() // Load environment variables from .env file

// Separate postgres client for migrations
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

const seedCompanies = [
  {
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    description: "Leading streaming entertainment service company.",
    website: "https://netflix.com",
    industry: "Entertainment Technology",
    size: "10000+",
    headquarters: "Los Gatos, CA",
    founded: 1997,
  },
  {
    name: "Salesforce",
    logo: "https://logo.clearbit.com/salesforce.com",
    description: "Global leader in CRM and enterprise cloud computing solutions.",
    website: "https://salesforce.com",
    industry: "Enterprise Software",
    size: "50000+",
    headquarters: "San Francisco, CA",
    founded: 1999,
  },
  {
    name: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com",
    description: "Global leader in digital media and digital marketing solutions.",
    website: "https://adobe.com",
    industry: "Software",
    size: "25000+",
    headquarters: "San Jose, CA",
    founded: 1982,
  }
];

const seedJobs = [
  {
    title: "Senior Software Engineer",
    location: "Remote, US",
    type: "Full-time",
    description: "We are looking for a talented Senior Software Engineer to join our team...",
    requirements: "- 5+ years of experience\n- Strong JavaScript/TypeScript skills\n- Experience with React",
    responsibilities: "- Design and implement new features\n- Lead technical initiatives\n- Mentor junior developers",
    salary: "$150,000 - $200,000",
    benefits: "- Health insurance\n- 401(k) matching\n- Unlimited PTO",
    applicationUrl: "https://careers.company.com/senior-engineer",
    experience: "Senior",
    department: "Engineering",
    remote: "Remote",
  },
  {
    title: "Product Designer",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Join our design team to create world-class user experiences...",
    requirements: "- 3+ years of product design experience\n- Strong portfolio\n- Experience with Figma",
    responsibilities: "- Create user interfaces\n- Conduct user research\n- Collaborate with engineers",
    salary: "$120,000 - $160,000",
    benefits: "- Health insurance\n- 401(k) matching\n- Flexible hours",
    applicationUrl: "https://careers.company.com/product-designer",
    experience: "Mid Level",
    department: "Design",
    remote: "Hybrid",
  }
];

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
