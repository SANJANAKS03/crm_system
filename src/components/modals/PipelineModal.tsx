import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewDealModal } from "@/components/modals/NewDealModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Target, Plus, DollarSign, Calendar, User, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDeals } from "@/contexts/DealsContext";

const stages = [
  { id: "qualified", title: "Qualified", color: "bg-blue-500" },
  { id: "proposal", title: "Proposal", color: "bg-primary" },
  { id: "negotiation", title: "Negotiation", color: "bg-purple-500" },
  { id: "closedWon", title: "Closed Won", color: "bg-success" }
];

interface PipelineModalProps {
  children: React.ReactNode;
}

export const PipelineModal = ({ children }: PipelineModalProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { deals, updateDeal, addDeal } = useDeals();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId !== destination.droppableId) {
      const sourceDeal = deals.find(deal => deal.id === result.draggableId);
      if (sourceDeal) {
        updateDeal(result.draggableId, { stage: destination.droppableId });
        
        toast({
          title: "Deal Moved",
          description: `${sourceDeal.title} moved to ${stages.find(s => s.id === destination.droppableId)?.title}`,
        });
      }
    }
  };

  const handleNewDeal = (newDeal: any) => {
    const deal = {
      title: newDeal.title,
      company: newDeal.company,
      contact: newDeal.contact,
      email: newDeal.email || `${newDeal.contact.toLowerCase().replace(' ', '.')}@${newDeal.company.toLowerCase().replace(' ', '')}.com`,
      phone: "+1 (555) 000-0000",
      value: parseFloat(newDeal.value) || 0,
      probability: parseInt(newDeal.probability) || 25,
      stage: newDeal.stage,
      priority: "medium" as const,
      notes: newDeal.notes || ""
    };
    addDeal(deal);
  };

  const getDealsByStage = (stageId: string) => {
    return deals.filter(deal => deal.stage === stageId);
  };

  const getTotalValue = (stageId: string) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + deal.value, 0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[90vh] bg-card border-glass-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Target className="w-5 h-5" />
            Sales Pipeline
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Manage your deals across different pipeline stages. Drag and drop to move deals between stages.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">
              {deals.length} Total Deals
            </Badge>
            <Badge variant="outline">
              ${(deals.reduce((sum, deal) => sum + deal.value, 0) / 1000).toFixed(0)}K Total Value
            </Badge>
          </div>
          <NewDealModal onDealCreated={handleNewDeal} />
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-4 gap-4 h-[500px] overflow-y-auto">
            {stages.map((stage) => (
              <div key={stage.id} className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <h3 className="font-medium text-foreground">{stage.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Open NewDealModal with pre-selected stage
                        toast({
                          title: "Add Deal",
                          description: `Adding deal to ${stage.title} stage...`,
                        });
                      }}
                      className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {getDealsByStage(stage.id).length} deals
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      ${(getTotalValue(stage.id) / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>

                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-2 min-h-[400px] p-2 rounded-lg transition-colors ${
                        snapshot.isDraggingOver ? 'bg-primary/10' : ''
                      }`}
                    >
                      {getDealsByStage(stage.id).map((deal, index) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 bg-gradient-glass backdrop-blur-glass border-glass-border cursor-grab active:cursor-grabbing transition-all duration-200 ${
                                snapshot.isDragging ? 'rotate-2 shadow-glow' : 'hover:shadow-card'
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-medium text-sm text-foreground leading-tight">
                                    {deal.title}
                                  </h4>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreVertical className="w-3 h-3" />
                                  </Button>
                                </div>
                                
                                <div className="space-y-1 text-xs">
                                  <div className="flex items-center text-muted-foreground">
                                    <User className="w-3 h-3 mr-1" />
                                    {deal.company}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center text-success font-semibold">
                                      <DollarSign className="w-3 h-3 mr-1" />
                                      ${(deal.value / 1000).toFixed(0)}K
                                    </div>
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${
                                        deal.priority === 'high' ? 'border-destructive text-destructive' :
                                        deal.priority === 'medium' ? 'border-warning text-warning' :
                                        'border-muted-foreground text-muted-foreground'
                                      }`}
                                    >
                                      {deal.probability}%
                                    </Badge>
                                  </div>
                                  <div className="flex items-center text-muted-foreground">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(deal.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </DialogContent>
    </Dialog>
  );
};