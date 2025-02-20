import type { Company, Job } from "@shared/schema";

const companyLogos = [
  "https://images.unsplash.com/photo-1496200186974-4293800e2c20",
  "https://images.unsplash.com/photo-1529612700005-e35377bf1415",
  "https://images.unsplash.com/photo-1554049697-02e809699995",
  "https://images.unsplash.com/photo-1533903179229-783a50d25dd7",
  "https://images.unsplash.com/photo-1610128980054-68d94619e243",
  "https://images.unsplash.com/photo-1532623034127-3d92b01fb3c5",
  "https://images.unsplash.com/photo-1553895501-af9e282e7fc1",
  "https://images.unsplash.com/photo-1709817959122-05b84ee68bf9",
  "https://images.unsplash.com/photo-1554048968-670223ca9141",
  "https://images.unsplash.com/photo-1554049701-29ca4d4ecd27",
  "https://images.unsplash.com/photo-1551263640-1c007852f616",
  "https://images.unsplash.com/photo-1618588429012-0559f1cbc5aa",
  "https://images.unsplash.com/photo-1632047096430-9ae3a7a80836",
  "https://images.unsplash.com/photo-1633074263223-1d63d65363f6",
  "https://images.unsplash.com/photo-1689773132527-bcabdc88a395",
];

const companies: Company[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo: companyLogos[0],
    description: "Leading provider of enterprise software solutions.",
  },
  // ... Add 14 more companies with different logos
];

const jobTypes = ["Full-time", "Part-time", "Contract"];
const locations = ["New York, NY", "San Francisco, CA", "Remote", "Boston, MA", "Seattle, WA"];
const salaryRanges = [
  "$80,000 - $100,000",
  "$100,000 - $130,000",
  "$130,000 - $160,000",
  "$160,000 - $200,000",
];

function generateJobs(): Job[] {
  const jobs: Job[] = [];
  
  for (let i = 0; i < 100; i++) {
    jobs.push({
      id: i + 1,
      title: `Sample Job Title ${i + 1}`,
      companyId: Math.floor(Math.random() * companies.length) + 1,
      location: locations[Math.floor(Math.random() * locations.length)],
      type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      description: "Detailed job description...",
      requirements: "Job requirements...",
      salary: salaryRanges[Math.floor(Math.random() * salaryRanges.length)],
      applicationUrl: "https://joinhandshake.com",
    });
  }

  return jobs;
}

export const sampleData = {
  companies,
  jobs: generateJobs(),
};
