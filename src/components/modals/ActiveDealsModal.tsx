import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Search, Filter, DollarSign, Calendar, User, Phone, Mail, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDeals } from "@/contexts/DealsContext";

const stageColors: Record<string, string> = {
  "qualified": "bg-blue-500/20 text-blue-400",
  "proposal": "bg-primary/20 text-primary",
  "negotiation": "bg-purple-500/20 text-purple-400",
  "closedWon": "bg-success/20 text-success"
};

const priorityColors: Record<string, string> = {
  "high": "bg-destructive/20 text-destructive",
  "medium": "bg-warning/20 text-warning", 
  "low": "bg-muted/20 text-muted-foreground"
};

interface ActiveDealsModalProps {
  children: React.ReactNode;
}

export const ActiveDealsModal = ({ children }: ActiveDealsModalProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const { toast } = useToast();
  const { deals: activeDeals, deleteDeal } = useDeals();

  const filteredDeals = activeDeals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.contact.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = stageFilter === "all" || deal.stage === stageFilter;
    const matchesPriority = priorityFilter === "all" || deal.priority === priorityFilter;
    
    return matchesSearch && matchesStage && matchesPriority;
  });

  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const avgProbability = filteredDeals.reduce((sum, deal) => sum + deal.probability, 0) / filteredDeals.length;

  const handleEditDeal = (dealId: string) => {
    toast({
      title: "Edit Deal",
      description: "Opening deal editor...",
    });
  };

  const handleDeleteDeal = (dealId: string) => {
    deleteDeal(dealId);
    toast({
      title: "Deal Deleted",
      description: "Deal has been removed from pipeline.",
      variant: "destructive"
    });
  };

  const handleContactAction = (type: "call" | "email", contact: string) => {
    if (type === "call") {
      toast({
        title: "Initiating Call", 
        description: `Calling ${contact}...`,
      });
    } else {
      toast({
        title: "Opening Email",
        description: `Composing email to ${contact}...`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-card border-glass-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Target className="w-5 h-5" />
            Active Deals ({filteredDeals.length})
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Manage and track all your active sales opportunities.
          </DialogDescription>
        </DialogHeader>

        {/* Filters and Summary */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search deals, companies, contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-40 bg-input border-border">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40 bg-input border-border">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
                  <p className="text-xl font-bold text-foreground">${(totalValue / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </Card>
            <Card className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Deals</p>
                  <p className="text-xl font-bold text-foreground">{filteredDeals.length}</p>
                </div>
                <Target className="w-6 h-6 text-success" />
              </div>
            </Card>
            <Card className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Probability</p>
                  <p className="text-xl font-bold text-foreground">{avgProbability.toFixed(0)}%</p>
                </div>
                <Calendar className="w-6 h-6 text-warning" />
              </div>
            </Card>
          </div>
        </div>

        {/* Deals List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border hover:shadow-glow transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{deal.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {deal.company}
                      </span>
                      <span>•</span>
                      <span>{deal.contact}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={stageColors[deal.stage] || "bg-muted/20 text-muted-foreground"}>
                      {deal.stage}
                    </Badge>
                    <Badge className={priorityColors[deal.priority]}>
                      {deal.priority}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Deal Value</p>
                    <p className="font-semibold text-success">${(deal.value / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Probability</p>
                    <p className="font-semibold text-foreground">{deal.probability}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-semibold text-foreground">
                      {new Date(deal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Activity</p>
                    <p className="font-semibold text-foreground">
                      {new Date(deal.lastActivity).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {deal.notes && (
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                    <p className="text-sm text-foreground">{deal.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactAction("call", deal.contact)}
                      className="h-7"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactAction("email", deal.contact)}
                      className="h-7"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditDeal(deal.id)}
                      className="h-7 w-7 p-0"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDeal(deal.id)}
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No deals found matching your criteria.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};