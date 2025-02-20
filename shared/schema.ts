import { pgTable, text, serial, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  description: text("description").notNull(),
  website: text("website").notNull(),
  industry: text("industry").notNull(),
  size: text("size").notNull(), // e.g. "1-10", "11-50", "51-200", etc.
  headquarters: text("headquarters").notNull(),
  founded: integer("founded").notNull(), // year
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id),
  location: text("location").notNull(),
  type: text("type").notNull(), // Full-time, Part-time, Contract
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  responsibilities: text("responsibilities").notNull(),
  salary: text("salary").notNull(),
  benefits: text("benefits").notNull(),
  applicationUrl: text("application_url").notNull(),
  experience: text("experience").notNull(), // e.g. "Entry Level", "Mid Level", "Senior"
  department: text("department").notNull(), // e.g. "Engineering", "Design", "Sales"
  remote: text("remote").notNull(), // "Remote", "Hybrid", "On-site"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  jobs: many(jobs),
}));

export const jobsRelations = relations(jobs, ({ one }) => ({
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
}));

export const insertCompanySchema = createInsertSchema(companies).omit({ 
  id: true,
  createdAt: true 
});

export const insertJobSchema = createInsertSchema(jobs).omit({ 
  id: true,
  createdAt: true 
});

export type Company = typeof companies.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type JobWithCompany = Job & { company: Company };