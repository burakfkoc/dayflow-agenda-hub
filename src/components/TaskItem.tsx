
import React, { useState } from 'react';
import { Check, Trash, Edit } from 'lucide-react';
import { Task, tasksAPI } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    try {
      await tasksAPI.updateTask(task.id, { completed: !task.completed });
      onTaskUpdated();
    } catch (error) {
      console.error('Error toggling task completion:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await tasksAPI.deleteTask(task.id);
      onTaskDeleted();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="task-item slide-in group">
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={handleToggleComplete}
          disabled={isCompleting}
        />
        <div>
          <p className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-muted-foreground">{task.description}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="icon" variant="ghost" onClick={handleDelete} disabled={isDeleting}>
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
