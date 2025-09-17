import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import SearchFilters from "@/components/search-filters";
import JobCard from "@/components/job-card";
import type { JobWithCompany } from "@shared/schema";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    company: "",
  });

  const { data: jobs, isLoading } = useQuery<JobWithCompany[]>({
    queryKey: ["/api/jobs", search, filters],
    queryFn: async () => {
      // Build query params
      const params = new URLSearchParams();
      if (search) params.set('q', search);
      if (filters.location) params.set('location', filters.location);
      if (filters.type) params.set('type', filters.type);
      if (filters.company) params.set('company', filters.company);

      // Simple fetch
      const response = await fetch(`/api/jobs?${params}`);
      return response.json();
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    setSearch(input.value);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">Job Search</h1>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <Input
              className="flex-1"
              placeholder="Search jobs..."
              defaultValue={search}
            />
            <Button type="submit">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          <SearchFilters filters={filters} onChange={setFilters} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-lg bg-muted animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs?.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
