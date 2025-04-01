
import React, { useState } from 'react';
import Calendar from '@/components/Calendar';
import TaskList from '@/components/TaskList';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">DayFlow Ajanda</h1>
          <p className="text-muted-foreground">Görevlerinizi organize edin ve takip edin</p>
        </header>

        <div className="grid gap-6">
          <Calendar 
            selectedDate={selectedDate} 
            onSelectDate={setSelectedDate} 
          />
          <TaskList selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default Index;
