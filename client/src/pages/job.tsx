import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building2, MapPin, Clock } from "lucide-react";
import type { JobWithCompany } from "@shared/schema";

export default function Job() {
  const { id } = useParams();
  
  const { data: job, isLoading } = useQuery<JobWithCompany>({
    queryKey: ["/api/jobs", id],
    queryFn: async () => {
      const response = await fetch(`/api/jobs/${id}`);
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Job not found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to jobs
          </Button>
        </Link>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-1" />
                    {job.company.name}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.type}
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => window.open('https://joinhandshake.com', "_blank")}
              >
                Apply on Handshake
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">About {job.company.name}</h2>
                <p className="text-muted-foreground">{job.company.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Job Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                <p className="text-muted-foreground whitespace-pre-line">{job.requirements}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Salary</h2>
                <p className="text-muted-foreground">{job.salary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
