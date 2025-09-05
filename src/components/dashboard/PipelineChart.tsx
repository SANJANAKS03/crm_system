import { Card } from "@/components/ui/card";
import { NewDealModal } from "@/components/modals/NewDealModal";
import { FilterModal } from "@/components/modals/FilterModal";
import { PipelineModal } from "@/components/modals/PipelineModal";
import { Button } from "@/components/ui/button";
import { BarChart3, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pipelineStages = [
  { name: "Qualified", value: 180000, deals: 12, color: "bg-blue-500" },
  { name: "Proposal", value: 320000, deals: 8, color: "bg-primary" },
  { name: "Negotiation", value: 240000, deals: 5, color: "bg-purple-500" },
  { name: "Closed Won", value: 95000, deals: 3, color: "bg-success" }
];

export const PipelineChart = () => {
  const { toast } = useToast();
  const maxValue = Math.max(...pipelineStages.map(stage => stage.value));

  const handleDealCreated = (newDeal: any) => {
    console.log("New deal created:", newDeal);
  };

  const handleFiltersApplied = (filters: any) => {
    console.log("Filters applied:", filters);
  };

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Sales Pipeline</h3>
        </div>
        <div className="flex space-x-2">
          <FilterModal onFiltersApplied={handleFiltersApplied} />
          <PipelineModal>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Pipeline
            </Button>
          </PipelineModal>
          <NewDealModal onDealCreated={handleDealCreated} />
        </div>
      </div>

      <div className="space-y-6">
        {pipelineStages.map((stage, index) => {
          const percentage = (stage.value / maxValue) * 100;
          return (
            <div key={stage.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <span className="font-medium text-foreground">{stage.name}</span>
                  <span className="text-muted-foreground">({stage.deals} deals)</span>
                </div>
                <span className="font-semibold text-foreground">
                  ${(stage.value / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${stage.color} transition-all duration-700 ease-out`}
                  style={{ 
                    width: `${percentage}%`,
                    animationDelay: `${index * 200}ms`
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-glass-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
            <p className="text-2xl font-bold text-foreground">$835K</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Weighted Value</p>
            <p className="text-lg font-semibold text-success">$394K</p>
          </div>
        </div>
      </div>
    </Card>
  );
};