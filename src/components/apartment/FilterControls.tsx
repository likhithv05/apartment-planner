import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  ownerFilter: string;
  onOwnerFilterChange: (owner: string) => void;
}

export function FilterControls({
  searchTerm,
  onSearchChange,
  ownerFilter,
  onOwnerFilterChange,
}: FilterControlsProps) {
  return (
    <Card className="mb-6 border-border/50">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 space-y-2">
            <Label htmlFor="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Items
            </Label>
            <Input
              id="search"
              placeholder="Search by item name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Owner Filter */}
          <div className="w-full sm:w-48 space-y-2">
            <Label className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter by Owner
            </Label>
            <Select value={ownerFilter} onValueChange={onOwnerFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Show All</SelectItem>
                <SelectItem value="Likhith">Likhith</SelectItem>
                <SelectItem value="Ben">Ben</SelectItem>
                <SelectItem value="Shared">Shared</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}