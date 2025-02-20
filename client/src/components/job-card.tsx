import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Building2, MapPin, Clock } from "lucide-react";
import type { JobWithCompany } from "@shared/schema";

interface JobCardProps {
  job: JobWithCompany;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="h-full cursor-pointer hover:border-primary transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-semibold truncate">{job.title}</h2>
              <p className="text-sm text-muted-foreground">{job.company.name}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {job.type}
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {job.salary}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
