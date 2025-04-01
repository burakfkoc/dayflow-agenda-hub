
import React, { useState, useEffect } from 'react';
import { Task, tasksAPI } from '@/lib/firebase';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from 'lucide-react';

interface TaskListProps {
  selectedDate: Date;
}

const TaskList: React.FC<TaskListProps> = ({ selectedDate }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const dateString = selectedDate.toISOString().split('T')[0];
  const formattedDate = new Intl.DateTimeFormat('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(selectedDate);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const tasksData = await tasksAPI.getTasksForDate(dateString);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [selectedDate]);

  const handleTaskAdded = () => {
    loadTasks();
    setShowAddForm(false);
  };

  const handleAddTaskClick = () => {
    setShowAddForm(true);
  };

  return (
    <div className="tasks-container">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{formattedDate} Görevleri</h3>
        {!showAddForm && (
          <Button size="sm" onClick={handleAddTaskClick}>
            <Plus className="h-4 w-4 mr-1" /> Görev Ekle
          </Button>
        )}
      </div>
      
      {showAddForm && (
        <AddTaskForm 
          selectedDate={selectedDate} 
          onTaskAdded={handleTaskAdded} 
          onCancel={() => setShowAddForm(false)}
        />
      )}
      
      {isLoading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : tasks.length > 0 ? (
        <div className="space-y-1 mt-2">
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onTaskUpdated={loadTasks} 
              onTaskDeleted={loadTasks} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          {showAddForm ? 'Yeni görev ekleyin' : 'Bu güne ait görev bulunmuyor'}
        </div>
      )}
    </div>
  );
};

export default TaskList;
