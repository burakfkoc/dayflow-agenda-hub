
import React, { useState } from 'react';
import { Check, Trash, Edit, Clock, MapPin, Users, Link } from 'lucide-react';
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
      <div className="flex items-center gap-3 flex-1">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={handleToggleComplete}
          disabled={isCompleting}
        />
        <div className="flex-1">
          <p className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
            {task.title}
          </p>
          
          {/* Time Information */}
          {(task.startTime || task.endTime) && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3" />
              <span>
                {task.startTime && task.endTime 
                  ? `${task.startTime} - ${task.endTime}`
                  : task.startTime || task.endTime
                }
              </span>
            </div>
          )}
          
          {/* Location Information */}
          {task.location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{task.location}</span>
            </div>
          )}
          
          {/* Attendees Information */}
          {task.attendees && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Users className="h-3 w-3" />
              <span>{task.attendees}</span>
            </div>
          )}
          
          {/* Meeting Link Information */}
          {task.meetLink && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Link className="h-3 w-3" />
              <a href={task.meetLink} target="_blank" rel="noopener noreferrer" 
                 className="underline hover:text-primary">{task.meetLink}</a>
            </div>
          )}
          
          {/* Description Information */}
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
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
