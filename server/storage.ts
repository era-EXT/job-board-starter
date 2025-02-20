import { type Company, type Job, type InsertCompany, type InsertJob, type JobWithCompany, companies, jobs } from "@shared/schema";
import { db } from "./db";
import { eq, or, ilike, and } from "drizzle-orm";

export interface IStorage {
  getJobs(): Promise<JobWithCompany[]>;
  getJob(id: number): Promise<JobWithCompany | undefined>;
  searchJobs(query: string, filters: { location?: string; type?: string; company?: string }): Promise<JobWithCompany[]>;
}

export class DatabaseStorage implements IStorage {
  async getJobs(): Promise<JobWithCompany[]> {
    return await db.query.jobs.findMany({
      with: {
        company: true,
      },
      orderBy: (jobs, { desc }) => [desc(jobs.createdAt)],
    });
  }

  async getJob(id: number): Promise<JobWithCompany | undefined> {
    const result = await db.query.jobs.findFirst({
      where: eq(jobs.id, id),
      with: {
        company: true,
      },
    });
    return result || undefined;
  }

  async searchJobs(
    query: string,
    filters: { location?: string; type?: string; company?: string }
  ): Promise<JobWithCompany[]> {
    const conditions = [];

    if (query) {
      conditions.push(
        or(
          ilike(jobs.title, `%${query}%`),
          ilike(jobs.description, `%${query}%`)
        )
      );
    }

    if (filters.location) {
      conditions.push(ilike(jobs.location, `%${filters.location}%`));
    }

    if (filters.type) {
      conditions.push(ilike(jobs.type, `%${filters.type}%`));
    }

    const result = await db.query.jobs.findMany({
      with: {
        company: true,
      },
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: (jobs, { desc }) => [desc(jobs.createdAt)],
    });

    // Filter by company name in memory since it's a relation
    if (filters.company) {
      return result.filter(job => 
        job.company.name.toLowerCase().includes(filters.company!.toLowerCase())
      );
    }

    return result;
  }
}

export const storage = new DatabaseStorage();