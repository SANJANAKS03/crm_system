import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, Target, Users, Calendar, ArrowUp, ArrowDown } from "lucide-react";

const revenueData = [
  { month: 'Jan', revenue: 98000, deals: 8, target: 100000 },
  { month: 'Feb', revenue: 112000, deals: 12, target: 110000 },
  { month: 'Mar', revenue: 94000, deals: 7, target: 105000 },
  { month: 'Apr', revenue: 128000, deals: 15, target: 115000 },
  { month: 'May', revenue: 134000, deals: 18, target: 120000 },
  { month: 'Jun', revenue: 156000, deals: 22, target: 125000 }
];

const pipelineData = [
  { name: 'Qualified', value: 180000, count: 12, color: '#3B82F6' },
  { name: 'Proposal', value: 320000, count: 8, color: '#6A8CFF' },
  { name: 'Negotiation', value: 240000, count: 5, color: '#8B5CF6' },
  { name: 'Closed Won', value: 95000, count: 3, color: '#10B981' }
];

const performanceData = [
  { metric: 'Calls Made', current: 156, previous: 142, target: 160 },
  { metric: 'Emails Sent', current: 89, previous: 78, target: 90 },
  { metric: 'Meetings Held', current: 34, previous: 28, target: 35 },
  { metric: 'Deals Closed', current: 12, previous: 8, target: 15 }
];

interface AnalyticsModalProps {
  children: React.ReactNode;
  defaultTab?: string;
}

export const AnalyticsModal = ({ children, defaultTab = "revenue" }: AnalyticsModalProps) => {
  const [open, setOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("6months");

  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return { value: Math.abs(growth), isPositive: growth > 0 };
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-card border-glass-border overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Sales Analytics
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Detailed insights into your sales performance and growth metrics.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              Performance Dashboard
            </Badge>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue={defaultTab} className="h-[600px] overflow-y-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Month Revenue</p>
                    <p className="text-2xl font-bold text-foreground">$156K</p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-4 h-4 text-success mr-1" />
                      <span className="text-sm text-success">+16.2%</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </Card>
              <Card className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">YTD Revenue</p>
                    <p className="text-2xl font-bold text-foreground">$722K</p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-4 h-4 text-success mr-1" />
                      <span className="text-sm text-success">+24.1%</span>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
              </Card>
              <Card className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Target Achievement</p>
                    <p className="text-2xl font-bold text-foreground">124%</p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-4 h-4 text-success mr-1" />
                      <span className="text-sm text-success">Above target</span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-warning" />
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-glass backdrop-blur-glass border-glass-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Revenue vs Target</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} name="Revenue" />
                  <Line type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-glass backdrop-blur-glass border-glass-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Pipeline Value Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pipelineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${(value/1000).toFixed(0)}K`}
                    >
                      {pipelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`$${(value/1000).toFixed(0)}K`, 'Value']} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-gradient-glass backdrop-blur-glass border-glass-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Deals by Stage</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pipelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {performanceData.map((item, index) => {
                const growth = calculateGrowth(item.current, item.previous);
                const targetProgress = (item.current / item.target) * 100;
                
                return (
                  <Card key={index} className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{item.metric}</h4>
                        <Badge variant={targetProgress >= 100 ? "default" : "outline"}>
                          {targetProgress.toFixed(0)}% of target
                        </Badge>
                      </div>
                      
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-foreground">{item.current}</span>
                        <div className="flex items-center">
                          {growth.isPositive ? (
                            <ArrowUp className="w-4 h-4 text-success mr-1" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-destructive mr-1" />
                          )}
                          <span className={`text-sm ${growth.isPositive ? 'text-success' : 'text-destructive'}`}>
                            {growth.value.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(targetProgress, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Previous: {item.previous}</span>
                        <span>Target: {item.target}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4 mt-4">
            <Card className="p-6 bg-gradient-glass backdrop-blur-glass border-glass-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Deals Closed</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="deals" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};