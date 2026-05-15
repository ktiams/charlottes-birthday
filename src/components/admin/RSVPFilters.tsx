import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { RSVPFilter } from "./types";

const filters: RSVPFilter[] = ["all", "attending", "not_attending"];

function getFilterLabel(filter: RSVPFilter) {
  if (filter === "all") return "All";
  return filter === "attending" ? "Attending" : "Not Attending";
}

export default function RSVPFilters({
  filter,
  query,
  onFilterChange,
  onQueryChange,
}: {
  filter: RSVPFilter;
  query: string;
  onFilterChange: (filter: RSVPFilter) => void;
  onQueryChange: (query: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa/50" />
        <Input
          className="pl-11"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by name, phone, or email"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <Button
            key={item}
            variant={filter === item ? "default" : "secondary"}
            size="sm"
            onClick={() => onFilterChange(item)}
          >
            {getFilterLabel(item)}
          </Button>
        ))}
      </div>
    </div>
  );
}
