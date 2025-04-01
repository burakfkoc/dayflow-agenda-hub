
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { tasksAPI } from '@/lib/firebase';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(selectedDate));
  const [datesWithTasks, setDatesWithTasks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDatesWithTasks = async () => {
      setIsLoading(true);
      try {
        const dates = await tasksAPI.getDatesWithTasks(
          currentMonth.getFullYear(), 
          currentMonth.getMonth()
        );
        setDatesWithTasks(dates);
      } catch (error) {
        console.error('Error fetching dates with tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatesWithTasks();
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    onSelectDate(today);
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the current month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the current month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Day of the week of the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Total days in the current month
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;
    
    // Calculate total cells needed (previous month days + current month days + potential next month days)
    const totalCells = Math.ceil((daysFromPrevMonth + daysInMonth) / 7) * 7;
    
    // Generate days for the calendar grid
    const days = [];
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    
    // Previous month days
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
      const date = new Date(year, month - 1, i);
      const dateString = date.toISOString().split('T')[0];
      days.push({
        date,
        dateString,
        dayOfMonth: i,
        isCurrentMonth: false,
        isToday: dateString === todayString,
        isSelected: dateString === selectedDateString,
        hasTask: datesWithTasks.includes(dateString)
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      days.push({
        date,
        dateString,
        dayOfMonth: i,
        isCurrentMonth: true,
        isToday: dateString === todayString,
        isSelected: dateString === selectedDateString,
        hasTask: datesWithTasks.includes(dateString)
      });
    }
    
    // Next month days
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      const dateString = date.toISOString().split('T')[0];
      days.push({
        date,
        dateString,
        dayOfMonth: i,
        isCurrentMonth: false,
        isToday: dateString === todayString,
        isSelected: dateString === selectedDateString,
        hasTask: datesWithTasks.includes(dateString)
      });
    }
    
    return days.map((day, index) => (
      <div
        key={index}
        className={cn(
          "calendar-day",
          day.isCurrentMonth ? "calendar-day-current-month" : "calendar-day-other-month",
          day.isToday ? "calendar-day-today" : "",
          day.isSelected ? "calendar-day-selected" : "",
          day.hasTask ? "calendar-day-with-tasks" : ""
        )}
        onClick={() => onSelectDate(day.date)}
      >
        {day.dayOfMonth}
      </div>
    ));
  };

  const dayNames = ['Pzr', 'Pzt', 'Sal', 'Çrş', 'Per', 'Cum', 'Cts'];
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="calendar-title">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <Button size="icon" variant="outline" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={goToToday}>
            <CalendarIcon className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="calendar-grid">
        {dayNames.map((dayName, index) => (
          <div key={index} className="calendar-day-name">
            {dayName}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
