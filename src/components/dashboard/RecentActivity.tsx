import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Phone, Mail, Calendar, FileText, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const activities = [
  {
    id: 1,
    type: "call",
    title: "Called John Doe",
    company: "Acme Corp",
    time: "2 hours ago",
    status: "completed",
    icon: Phone,
    value: "$45K"
  },
  {
    id: 2,
    type: "email",
    title: "Sent proposal to Sarah Wilson",
    company: "TechStart Inc",
    time: "4 hours ago",
    status: "sent",
    icon: Mail,
    value: "$120K"
  },
  {
    id: 3,
    type: "meeting",
    title: "Demo completed with Mike Chen",
    company: "Innovation Labs",
    time: "1 day ago",
    status: "completed",
    icon: Calendar,
    value: "$75K"
  },
  {
    id: 4,
    type: "contact",
    title: "Added new contact: Lisa Park",
    company: "Global Systems",
    time: "1 day ago",
    status: "new",
    icon: UserPlus,
    value: "Qualified Lead"
  },
  {
    id: 5,
    type: "proposal",
    title: "Updated contract terms",
    company: "Enterprise Solutions",
    time: "2 days ago",
    status: "updated",
    icon: FileText,
    value: "$200K"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-success/20 text-success";
    case "sent": return "bg-primary/20 text-primary";
    case "new": return "bg-warning/20 text-warning";
    case "updated": return "bg-muted/50 text-muted-foreground";
    default: return "bg-muted/50 text-muted-foreground";
  }
};

export const RecentActivity = () => {
  const { toast } = useToast();

  const handleViewAllActivity = () => {
    toast({
      title: "Activity Feed",
      description: "Opening complete activity timeline...",
    });
  };

  const handleActivityClick = (activity: typeof activities[0]) => {
    toast({
      title: "Activity Details",
      description: `Viewing details for: ${activity.title}`,
    });
  };
  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>
        <Badge variant="secondary" className="bg-muted/50">
          Last 48 hours
        </Badge>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div 
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-all duration-200 group cursor-pointer"
            >
              <div className="p-2 bg-muted/50 rounded-lg group-hover:bg-primary/20 transition-smooth">
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {activity.company}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(activity.status)}`}
                      >
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <p className="text-sm font-semibold text-foreground">
                      {activity.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-glass-border">
        <Button
          variant="ghost"
          onClick={handleViewAllActivity}
          className="w-full text-sm text-primary hover:text-primary-glow transition-smooth font-medium"
        >
          View All Activity →
        </Button>
      </div>
    </Card>
  );
};