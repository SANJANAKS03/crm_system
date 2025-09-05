import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { MyDayWidget } from "@/components/dashboard/MyDayWidget";
import { PipelineChart } from "@/components/dashboard/PipelineChart";
import { WhatsNextWidget } from "@/components/dashboard/WhatsNextWidget";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import dashboardBg from "@/assets/dashboard-bg.jpg";

export const Dashboard = () => {
  return (
    <div 
      className="min-h-screen bg-gradient-subtle relative overflow-hidden"
      style={{
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Good morning, <span className="text-primary">Sarah</span> ✨
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your sales today.
          </p>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <PipelineChart />
            <RecentActivity />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <MyDayWidget />
            <WhatsNextWidget />
          </div>
        </div>
      </div>
    </div>
  );
};