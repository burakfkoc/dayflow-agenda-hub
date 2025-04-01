
// This is a mock implementation of Firebase services
// In a real application, you would initialize Firebase here

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: string; // ISO format date string
  createdAt: string;
}

// Mock tasks data
const tasksData: Record<string, Task[]> = {};

// Generate some sample tasks for the current month
const generateSampleTasks = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  
  // Generate tasks for random days in the current month
  for (let i = 1; i <= 28; i++) {
    if (Math.random() > 0.7) {
      const date = new Date(year, month, i).toISOString().split('T')[0];
      
      const tasksCount = Math.floor(Math.random() * 3) + 1;
      const tasks: Task[] = [];
      
      for (let j = 0; j < tasksCount; j++) {
        tasks.push({
          id: `task-${date}-${j}`,
          title: `Task ${j + 1} for ${date}`,
          description: `This is a sample task ${j + 1} for ${date}`,
          completed: Math.random() > 0.5,
          date,
          createdAt: new Date().toISOString(),
        });
      }
      
      tasksData[date] = tasks;
    }
  }
};

generateSampleTasks();

// Firebase-like API
export const tasksAPI = {
  getTasksForDate: async (date: string): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tasksData[date] || []);
      }, 300);
    });
  },
  
  addTask: async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask: Task = {
          ...task,
          id: `task-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        
        if (!tasksData[task.date]) {
          tasksData[task.date] = [];
        }
        
        tasksData[task.date].push(newTask);
        resolve(newTask);
      }, 300);
    });
  },
  
  updateTask: async (taskId: string, updates: Partial<Task>): Promise<Task> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find the task
        for (const date in tasksData) {
          const taskIndex = tasksData[date].findIndex(task => task.id === taskId);
          
          if (taskIndex !== -1) {
            const updatedTask = { ...tasksData[date][taskIndex], ...updates };
            tasksData[date][taskIndex] = updatedTask;
            resolve(updatedTask);
            return;
          }
        }
        
        reject(new Error('Task not found'));
      }, 300);
    });
  },
  
  deleteTask: async (taskId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find and delete the task
        for (const date in tasksData) {
          const taskIndex = tasksData[date].findIndex(task => task.id === taskId);
          
          if (taskIndex !== -1) {
            tasksData[date].splice(taskIndex, 1);
            resolve();
            return;
          }
        }
        
        reject(new Error('Task not found'));
      }, 300);
    });
  },
  
  getDatesWithTasks: async (year: number, month: number): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const datesWithTasks = Object.keys(tasksData).filter(dateString => {
          const date = new Date(dateString);
          return date.getFullYear() === year && date.getMonth() === month;
        });
        
        resolve(datesWithTasks);
      }, 300);
    });
  }
};
