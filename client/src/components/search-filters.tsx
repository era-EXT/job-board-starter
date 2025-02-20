import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  filters: {
    location: string;
    type: string;
    company: string;
  };
  onChange: (filters: SearchFiltersProps["filters"]) => void;
}

export default function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={filters.location}
          onChange={(e) =>
            onChange({ ...filters, location: e.target.value })
          }
          placeholder="Filter by location..."
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="type">Job Type</Label>
        <Select
          value={filters.type || "all"}
          onValueChange={(value) => onChange({ ...filters, type: value === "all" ? "" : value })}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={filters.company}
          onChange={(e) =>
            onChange({ ...filters, company: e.target.value })
          }
          placeholder="Filter by company..."
        />
      </div>
    </div>
  );
}