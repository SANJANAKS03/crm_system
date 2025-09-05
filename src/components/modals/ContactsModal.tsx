import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Plus, Mail, Phone, Building, Calendar, Star, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  lastContact: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "customer";
  priority: "high" | "medium" | "low";
  notes: string;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Emma Thompson",
    email: "emma.thompson@techcorp.com",
    phone: "+1 (555) 987-6543",
    company: "TechCorp Solutions",
    position: "VP of Operations",
    lastContact: "2024-01-20",
    source: "Website Form",
    status: "new",
    priority: "high",
    notes: "Interested in enterprise solution for 500+ employees"
  },
  {
    id: "2", 
    name: "David Rodriguez",
    email: "d.rodriguez@innovate.co",
    phone: "+1 (555) 876-5432",
    company: "Innovate Co",
    position: "CTO",
    lastContact: "2024-01-19",
    source: "LinkedIn",
    status: "contacted",
    priority: "high",
    notes: "Scheduled demo for next week"
  },
  {
    id: "3",
    name: "Jessica Chen",
    email: "jessica@startuplab.io",
    phone: "+1 (555) 765-4321",
    company: "StartupLab",
    position: "Founder",
    lastContact: "2024-01-18",
    source: "Trade Show",
    status: "qualified",
    priority: "medium",
    notes: "Looking for cost-effective solution for growing team"
  },
  {
    id: "4",
    name: "Michael Foster",
    email: "mike.foster@enterprise.net",
    phone: "+1 (555) 654-3210",
    company: "Enterprise Networks",
    position: "IT Director",
    lastContact: "2024-01-17",
    source: "Referral",
    status: "new",
    priority: "medium",
    notes: "Needs integration with existing systems"
  },
  {
    id: "5",
    name: "Sarah Kim",
    email: "sarah.kim@globaltech.com",
    phone: "+1 (555) 543-2109",
    company: "GlobalTech Inc",
    position: "Product Manager",
    lastContact: "2024-01-16",
    source: "Cold Outreach",
    status: "contacted",
    priority: "low",
    notes: "Interested but no immediate timeline"
  }
];

const statusColors: Record<string, string> = {
  "new": "bg-blue-500/20 text-blue-400",
  "contacted": "bg-warning/20 text-warning",
  "qualified": "bg-primary/20 text-primary",
  "customer": "bg-success/20 text-success"
};

const priorityColors: Record<string, string> = {
  "high": "bg-destructive/20 text-destructive",
  "medium": "bg-warning/20 text-warning",
  "low": "bg-muted/20 text-muted-foreground"
};

interface ContactsModalProps {
  children: React.ReactNode;
}

export const ContactsModal = ({ children }: ContactsModalProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const { toast } = useToast();

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    const matchesSource = sourceFilter === "all" || contact.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleAddContact = () => {
    toast({
      title: "Add Contact",
      description: "Opening contact creation form...",
    });
  };

  const handleEditContact = (contactId: string) => {
    toast({
      title: "Edit Contact",
      description: "Opening contact editor...",
    });
  };

  const handleContactAction = (type: "call" | "email", contact: Contact) => {
    if (type === "call") {
      toast({
        title: "Initiating Call",
        description: `Calling ${contact.name}...`,
      });
    } else {
      toast({
        title: "Opening Email",
        description: `Composing email to ${contact.name}...`,
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
            <Users className="w-5 h-5" />
            Contacts ({filteredContacts.length})
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Manage your contact database and track engagement history.
          </DialogDescription>
        </DialogHeader>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center flex-1">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search contacts, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-input border-border">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-40 bg-input border-border">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Website Form">Website Form</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Trade Show">Trade Show</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddContact} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>

        {/* Contacts List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="p-4 bg-gradient-glass backdrop-blur-glass border-glass-border hover:shadow-glow transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{contact.name}</h3>
                      {contact.priority === "high" && (
                        <Star className="w-4 h-4 text-warning fill-current" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {contact.company}
                      </span>
                      <span>•</span>
                      <span>{contact.position}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[contact.status]}>
                      {contact.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {contact.source}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{contact.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Contact</p>
                    <p className="font-medium text-foreground">
                      {new Date(contact.lastContact).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {contact.notes && (
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                    <p className="text-sm text-foreground">{contact.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactAction("call", contact)}
                      className="h-7"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactAction("email", contact)}
                      className="h-7"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditContact(contact.id)}
                    className="h-7"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No contacts found matching your criteria.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};