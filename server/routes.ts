import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  app.get("/api/jobs", async (req, res) => {
    const { q, location, type, company } = req.query;
    
    if (q || location || type || company) {
      const jobs = await storage.searchJobs(
        q as string,
        {
          location: location as string,
          type: type as string,
          company: company as string,
        }
      );
      return res.json(jobs);
    }

    const jobs = await storage.getJobs();
    res.json(jobs);
  });

  app.get("/api/jobs/:id", async (req, res) => {
    const job = await storage.getJob(parseInt(req.params.id));
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const newJob = req.body;
      const job = await storage.createJob(newJob);
      res.status(201).json(job);
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Failed to create job" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
