import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Target, Award, Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileModalProps {
  children: React.ReactNode;
}

export const ProfileModal = ({ children }: ProfileModalProps) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Mock user data
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Sales Manager",
    department: "Sales & Marketing",
    location: "San Francisco, CA",
    joinDate: "2022-03-15",
    bio: "Experienced sales professional with 8+ years in B2B software sales. Passionate about building lasting client relationships and driving revenue growth.",
    avatar: "AJ",
    stats: {
      dealsWon: 47,
      revenue: "$2.3M",
      quota: "142%",
      clients: 89
    }
  });

  const [editForm, setEditForm] = useState(profile);

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-glass-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <User className="w-5 h-5" />
            User Profile
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            View and manage your profile information and statistics.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold shadow-glow">
              {profile.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{profile.position}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <Card className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Performance Overview
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{profile.stats.dealsWon}</p>
                <p className="text-sm text-muted-foreground">Deals Won</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{profile.stats.revenue}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{profile.stats.quota}</p>
                <p className="text-sm text-muted-foreground">Quota Achievement</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{profile.stats.clients}</p>
                <p className="text-sm text-muted-foreground">Active Clients</p>
              </div>
            </div>
          </Card>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="bg-input border-border"
                  />
                ) : (
                  <p className="text-sm text-foreground bg-muted/30 p-2 rounded">{profile.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="text-sm font-medium text-foreground">Position</Label>
                {isEditing ? (
                  <Input
                    id="position"
                    value={editForm.position}
                    onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                    className="bg-input border-border"
                  />
                ) : (
                  <p className="text-sm text-foreground bg-muted/30 p-2 rounded">{profile.position}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="bg-input border-border"
                  />
                ) : (
                  <p className="text-sm text-foreground bg-muted/30 p-2 rounded">{profile.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="bg-input border-border"
                  />
                ) : (
                  <p className="text-sm text-foreground bg-muted/30 p-2 rounded">{profile.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">About</h3>
            {isEditing ? (
              <Textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                placeholder="Tell us about yourself..."
                className="bg-input border-border"
                rows={4}
              />
            ) : (
              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">{profile.bio}</p>
            )}
          </div>

          {/* Achievements */}
          <Card className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Achievements
            </h3>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-success/20 text-success">
                Top Performer Q4 2023
              </Badge>
              <Badge variant="secondary" className="bg-primary/20 text-primary ml-2">
                150% Quota Achievement
              </Badge>
              <Badge variant="secondary" className="bg-warning/20 text-warning ml-2">
                Customer Champion Award
              </Badge>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};