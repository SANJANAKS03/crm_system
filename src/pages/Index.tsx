import { Dashboard } from "@/components/Dashboard";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Navigation />
      <main className="pt-20">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;