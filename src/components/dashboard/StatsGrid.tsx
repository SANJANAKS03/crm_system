import { Card } from "@/components/ui/card";
import { PipelineModal } from "@/components/modals/PipelineModal";
import { AnalyticsModal } from "@/components/modals/AnalyticsModal";
import { ActiveDealsModal } from "@/components/modals/ActiveDealsModal";
import { ContactsModal } from "@/components/modals/ContactsModal";
import { TrendingUp, DollarSign, Target, Users } from "lucide-react";

const stats = [
  {
    title: "Revenue This Month",
    value: "$124,500",
    change: "+12.5%",
    isPositive: true,
    icon: DollarSign,
    subtitle: "vs last month",
    clickable: true,
    modalType: "analytics"
  },
  {
    title: "Active Deals",
    value: "47",
    change: "+3",
    isPositive: true,
    icon: Target,
    subtitle: "in pipeline",
    clickable: true,
    modalType: "activeDeals"
  },
  {
    title: "Conversion Rate",
    value: "23.8%",
    change: "+2.1%",
    isPositive: true,
    icon: TrendingUp,
    subtitle: "this quarter",
    clickable: true,
    modalType: "analytics"
  },
  {
    title: "New Contacts",
    value: "156",
    change: "+18",
    isPositive: true,
    icon: Users,
    subtitle: "this week",
    clickable: true,
    modalType: "contacts"
  }
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const CardContent = (
          <Card 
            className={`p-6 bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass hover:shadow-glow transition-all duration-300 animate-fade-in ${
              stat.clickable ? 'cursor-pointer hover:scale-105' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <div className="flex items-center space-x-1">
                  <span className={`text-sm font-medium ${
                    stat.isPositive ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </span>
                </div>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
        );

        if (stat.clickable && stat.modalType === "analytics") {
          return (
            <AnalyticsModal key={stat.title} defaultTab="revenue">
              {CardContent}
            </AnalyticsModal>
          );
        }

        if (stat.clickable && stat.modalType === "activeDeals") {
          return (
            <ActiveDealsModal key={stat.title}>
              {CardContent}
            </ActiveDealsModal>
          );
        }

        if (stat.clickable && stat.modalType === "contacts") {
          return (
            <ContactsModal key={stat.title}>
              {CardContent}
            </ContactsModal>
          );
        }

        return <div key={stat.title}>{CardContent}</div>;
      })}
    </div>
  );
};