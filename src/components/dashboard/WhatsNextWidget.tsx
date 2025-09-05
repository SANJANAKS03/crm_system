import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Users, MessageSquare, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const suggestions = [
  {
    id: 1,
    title: "Follow up with Acme Corp",
    description: "John hasn't responded to your proposal from 3 days ago",
    action: "Send Follow-up",
    urgency: "high",
    icon: MessageSquare
  },
  {
    id: 2,
    title: "Schedule demo for TechStart",
    description: "They requested a product demo last week",
    action: "Schedule Meeting",
    urgency: "medium",
    icon: Calendar
  },
  {
    id: 3,
    title: "Connect with warm leads",
    description: "5 new qualified leads from your recent campaign",
    action: "View Leads",
    urgency: "medium",
    icon: Users
  }
];

export const WhatsNextWidget = () => {
  const { toast } = useToast();

  const handleSuggestionAction = (suggestion: typeof suggestions[0]) => {
    switch (suggestion.action) {
      case "Send Follow-up":
        toast({
          title: "Follow-up Email",
          description: "Opening email composer for Acme Corp follow-up...",
        });
        break;
      case "Schedule Meeting":
        toast({
          title: "Meeting Scheduler",
          description: "Opening calendar to schedule demo with TechStart...",
        });
        break;
      case "View Leads":
        toast({
          title: "Lead Management",
          description: "Opening leads dashboard with 5 new qualified prospects...",
        });
        break;
      default:
        toast({
          title: "Action Taken",
          description: `Executing: ${suggestion.action}`,
        });
    }
  };
  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">What's Next</h3>
        <div className="px-2 py-1 bg-primary/20 rounded-full">
          <span className="text-xs font-medium text-primary">AI Powered</span>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <div 
              key={suggestion.id}
              className="p-4 rounded-lg border border-glass-border bg-muted/20 hover:bg-muted/40 transition-all duration-200 group"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  suggestion.urgency === 'high' ? 'bg-destructive/20' : 'bg-primary/20'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    suggestion.urgency === 'high' ? 'text-destructive' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {suggestion.description}
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSuggestionAction(suggestion)}
                    className="h-7 text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                  >
                    {suggestion.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Insight</span>
          </div>
        </div>
        <p className="text-sm text-foreground mt-2">
          Your follow-up rate increased by 40% this month. Keep up the great work!
        </p>
      </div>
    </Card>
  );
};