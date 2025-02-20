import type { Company, Job } from "@shared/schema";

const companies: Company[] = [
  {
    id: 1,
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    description: "Leading global technology company specializing in software, cloud computing, and artificial intelligence.",
    website: "https://microsoft.com",
    industry: "Technology",
    size: "100000+",
    headquarters: "Redmond, WA",
    founded: 1975,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    description: "Global technology company known for innovative consumer electronics, software, and services.",
    website: "https://apple.com",
    industry: "Technology",
    size: "100000+",
    headquarters: "Cupertino, CA",
    founded: 1976,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    description: "World's leading search engine and technology company focusing on internet-related services and products.",
    website: "https://google.com",
    industry: "Technology",
    size: "100000+",
    headquarters: "Mountain View, CA",
    founded: 1998,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
    description: "Social technology company building connections through social media and virtual reality.",
    website: "https://meta.com",
    industry: "Technology",
    size: "50000+",
    headquarters: "Menlo Park, CA",
    founded: 2004,
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    description: "Leading streaming entertainment service company.",
    website: "https://netflix.com",
    industry: "Entertainment Technology",
    size: "10000+",
    headquarters: "Los Gatos, CA",
    founded: 1997,
    createdAt: new Date(),
  },
  {
    id: 6,
    name: "Salesforce",
    logo: "https://logo.clearbit.com/salesforce.com",
    description: "Global leader in CRM and enterprise cloud computing solutions.",
    website: "https://salesforce.com",
    industry: "Enterprise Software",
    size: "50000+",
    headquarters: "San Francisco, CA",
    founded: 1999,
    createdAt: new Date(),
  },
  {
    id: 7,
    name: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com",
    description: "Global leader in digital media and digital marketing solutions.",
    website: "https://adobe.com",
    industry: "Software",
    size: "25000+",
    headquarters: "San Jose, CA",
    founded: 1982,
    createdAt: new Date(),
  },
  {
    id: 8,
    name: "Twitter",
    logo: "https://logo.clearbit.com/twitter.com",
    description: "Social media platform for public conversation and real-time information sharing.",
    website: "https://twitter.com",
    industry: "Social Media",
    size: "5000+",
    headquarters: "San Francisco, CA",
    founded: 2006,
    createdAt: new Date(),
  },
  {
    id: 9,
    name: "Slack",
    logo: "https://logo.clearbit.com/slack.com",
    description: "Business communication platform for team collaboration.",
    website: "https://slack.com",
    industry: "Enterprise Software",
    size: "5000+",
    headquarters: "San Francisco, CA",
    founded: 2009,
    createdAt: new Date(),
  },
  {
    id: 10,
    name: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com",
    description: "Leading music and podcast streaming platform.",
    website: "https://spotify.com",
    industry: "Music Technology",
    size: "10000+",
    headquarters: "Stockholm, Sweden",
    founded: 2006,
    createdAt: new Date(),
  }
];

const jobTypes = ["Full-time", "Part-time", "Contract"];
const locations = ["New York, NY", "San Francisco, CA", "Remote", "Boston, MA", "Seattle, WA"];
const departments = ["Engineering", "Design", "Product", "Marketing", "Sales", "Operations"];
const experiences = ["Entry Level", "Mid Level", "Senior", "Lead", "Principal"];
const remoteTypes = ["Remote", "Hybrid", "On-site"];
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
      title: `Software Engineer ${Math.random() > 0.5 ? experiences[Math.floor(Math.random() * experiences.length)] : ''}`,
      companyId: Math.floor(Math.random() * companies.length) + 1,
      location: locations[Math.floor(Math.random() * locations.length)],
      type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      description: "We are looking for a talented Software Engineer to join our team...",
      requirements: "- Bachelor's degree in Computer Science or related field\n- 3+ years of experience in software development\n- Strong programming skills in one or more: Python, JavaScript, Java\n- Experience with web technologies and RESTful APIs",
      responsibilities: "- Design and implement new features\n- Write clean, maintainable code\n- Collaborate with cross-functional teams\n- Participate in code reviews\n- Debug and fix production issues",
      salary: salaryRanges[Math.floor(Math.random() * salaryRanges.length)],
      benefits: "- Competitive salary\n- Health, dental, and vision insurance\n- 401(k) matching\n- Flexible PTO\n- Remote work options",
      applicationUrl: "https://careers.company.com/apply",
      experience: experiences[Math.floor(Math.random() * experiences.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      remote: remoteTypes[Math.floor(Math.random() * remoteTypes.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    });
  }

  return jobs;
}

export const sampleData = {
  companies,
  jobs: generateJobs(),
};