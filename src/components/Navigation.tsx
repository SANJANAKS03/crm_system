import { Button } from "@/components/ui/button";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { ProfileModal } from "@/components/modals/ProfileModal";
import { Search, Bell, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Navigation = () => {
  const { toast } = useToast();

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications to review.",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass backdrop-blur-glass border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg shadow-glow"></div>
            <h1 className="text-xl font-semibold text-foreground">Deal Spark</h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts, deals, companies..."
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleNotifications}
              className="text-muted-foreground hover:text-foreground"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <SettingsModal />
            <ProfileModal>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground"
              >
                <User className="w-4 h-4" />
              </Button>
            </ProfileModal>
          </div>
        </div>
      </div>
    </nav>
  );
};