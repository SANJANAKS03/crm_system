import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditTaskModal } from "@/components/modals/EditTaskModal";
import { AddTaskModal } from "@/components/modals/AddTaskModal";
import { CheckCircle2, Clock, Phone, Mail, Calendar, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tasks = [
  {
    id: 1,
    title: "Call John Doe - Acme Corp",
    type: "call",
    time: "10:00 AM",
    priority: "high",
    completed: false,
    icon: Phone
  },
  {
    id: 2,
    title: "Follow up on Q4 proposal",
    type: "email",
    time: "11:30 AM",
    priority: "medium",
    completed: false,
    icon: Mail
  },
  {
    id: 3,
    title: "Demo for TechStart Inc",
    type: "meeting",
    time: "2:00 PM",
    priority: "high",
    completed: false,
    icon: Calendar
  },
  {
    id: 4,
    title: "Update CRM records",
    type: "task",
    time: "4:00 PM",
    priority: "low",
    completed: true,
    icon: CheckCircle2
  }
];

export const MyDayWidget = () => {
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [editingTask, setEditingTask] = useState<typeof tasks[0] | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCompleteTask = (taskId: number) => {
    setCurrentTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    
    const task = currentTasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Task Reopened" : "Task Completed",
        description: `"${task.title}" has been ${task.completed ? 'reopened' : 'marked as complete'}.`,
      });
    }
  };

  const handleEditTask = (task: typeof tasks[0]) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  const handleTaskUpdated = (updatedTask: any) => {
    setCurrentTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleTaskAdded = (newTask: any) => {
    setCurrentTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleViewAllTasks = () => {
    toast({
      title: "All Tasks",
      description: "Opening full task management view...",
    });
  };
  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">My Day</h3>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{currentTasks.length} tasks</span>
        </div>
      </div>

      <div className="space-y-4">
        {currentTasks.map((task, index) => {
          const Icon = task.icon;
          return (
            <div 
              key={task.id}
              className={`group flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
                task.completed ? 'opacity-60' : ''
              }`}
            >
              <div className={`p-1.5 rounded-lg ${
                task.priority === 'high' ? 'bg-destructive/20' :
                task.priority === 'medium' ? 'bg-warning/20' : 'bg-muted/50'
              }`}>
                <Icon className={`w-3 h-3 ${
                  task.completed ? 'text-success' : 
                  task.priority === 'high' ? 'text-destructive' :
                  task.priority === 'medium' ? 'text-warning' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}>
                  {task.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{task.time}</p>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleEditTask(task)}
                  className="h-6 w-6 p-0 hover:text-primary"
                >
                  <Edit3 className="w-3 h-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleCompleteTask(task.id)}
                  className={`h-6 w-6 p-0 ${task.completed ? 'hover:text-warning' : 'hover:text-success'}`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Button 
        className="w-full mt-4" 
        variant="outline"
        onClick={handleViewAllTasks}
      >
        View All Tasks
      </Button>

      <AddTaskModal onTaskAdded={handleTaskAdded} />

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </Card>
  );
};