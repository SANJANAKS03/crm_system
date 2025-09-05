import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filter, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FilterModalProps {
  onFiltersApplied?: (filters: any) => void;
}

export const FilterModal = ({ onFiltersApplied }: FilterModalProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState({
    stages: {
      qualified: true,
      proposal: true,
      negotiation: true,
      closedWon: true
    },
    valueRange: [0, 500000],
    dateRange: "all",
    priority: "all",
    assignee: "all"
  });

  const handleApplyFilters = () => {
    onFiltersApplied?.(filters);
    toast({
      title: "Filters Applied",
      description: "Pipeline view has been updated with your filters.",
    });
    setOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      stages: {
        qualified: true,
        proposal: true,
        negotiation: true,
        closedWon: true
      },
      valueRange: [0, 500000],
      dateRange: "all",
      priority: "all",
      assignee: "all"
    };
    setFilters(resetFilters);
    onFiltersApplied?.(resetFilters);
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-glass-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Filter Pipeline</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Customize your pipeline view with filters.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Pipeline Stages */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Pipeline Stages</Label>
            <div className="space-y-2">
              {Object.entries(filters.stages).map(([stage, checked]) => (
                <div key={stage} className="flex items-center space-x-2">
                  <Checkbox
                    id={stage}
                    checked={checked}
                    onCheckedChange={(value) =>
                      setFilters({
                        ...filters,
                        stages: { ...filters.stages, [stage]: !!value }
                      })
                    }
                  />
                  <Label htmlFor={stage} className="text-sm capitalize">
                    {stage.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Deal Value Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Deal Value Range</Label>
            <div className="px-2">
              <Slider
                value={filters.valueRange}
                onValueChange={(value) => setFilters({ ...filters, valueRange: value })}
                max={500000}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>${(filters.valueRange[0] / 1000).toFixed(0)}K</span>
                <span>${(filters.valueRange[1] / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Date Range</Label>
            <Select value={filters.dateRange} onValueChange={(value) => setFilters({ ...filters, dateRange: value })}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Priority</Label>
            <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleResetFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};