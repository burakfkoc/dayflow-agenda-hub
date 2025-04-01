
import React, { useState } from 'react';
import { tasksAPI } from '@/lib/firebase';
import { aiService } from '@/lib/ai-service';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Clock, MapPin, FileText, Users, Link, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AddTaskFormProps {
  selectedDate: Date;
  onTaskAdded: () => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ selectedDate, onTaskAdded, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [attendees, setAttendees] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  
  const dateString = selectedDate.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    try {
      await tasksAPI.addTask({
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        startTime: startTime,
        endTime: endTime,
        attendees: attendees.trim(),
        meetLink: meetLink.trim(),
        completed: false,
        date: dateString,
      });
      
      onTaskAdded();
      setTitle('');
      setDescription('');
      setLocation('');
      setStartTime('');
      setEndTime('');
      setAttendees('');
      setMeetLink('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAIAssist = async () => {
    if (!title.trim()) return;
    
    setIsProcessingAI(true);
    try {
      const suggestion = await aiService.generateTaskSuggestion(title);
      setDescription(suggestion);
    } catch (error) {
      console.error('Error getting AI suggestion:', error);
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleNaturalLanguageInput = async () => {
    if (!title.trim()) return;
    
    setIsProcessingAI(true);
    try {
      const parsed = await aiService.parseNaturalLanguage(title);
      
      if (parsed.title) setTitle(parsed.title);
      if (parsed.description) setDescription(parsed.description);
      
      // Only update the date if it's explicitly provided in the input
      // and it's different from the currently selected date
      if (parsed.date && parsed.date !== dateString) {
        // In a real app, you might want to notify the user that the date was changed
        console.log(`Date was changed from ${dateString} to ${parsed.date}`);
      }
    } catch (error) {
      console.error('Error parsing natural language:', error);
    } finally {
      setIsProcessingAI(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-4 p-3 border rounded-lg bg-background">
      {/* Title */}
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Başlık ekleyin"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
        />
        
        {/* AI Assistant Buttons */}
        <div className="flex space-x-2">
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            onClick={handleNaturalLanguageInput}
            disabled={isProcessingAI || !title.trim()}
          >
            {isProcessingAI ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1" />
            )}
            Analiz Et
          </Button>
          
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            onClick={handleAIAssist}
            disabled={isProcessingAI || !title.trim()}
          >
            {isProcessingAI ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1" />
            )}
            Öneri Al
          </Button>
        </div>
        
        {/* Date Display */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(selectedDate, 'dd MMMM yyyy, EEEE', { locale: tr })}</span>
        </div>

        {/* Time Selection */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Başlangıç</span>
            </div>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Bitiş</span>
            </div>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Konum</span>
          </div>
          <Input
            type="text"
            placeholder="Konum ekleyin"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {/* Attendees */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Katılımcılar</span>
          </div>
          <Input
            type="text"
            placeholder="E-posta adresleri ile katılımcı ekleyin"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {/* Meet Link */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Görüşme Bağlantısı</span>
          </div>
          <Input
            type="text"
            placeholder="Görüşme bağlantısı ekleyin"
            value={meetLink}
            onChange={(e) => setMeetLink(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Açıklama</span>
          </div>
          <Textarea
            placeholder="Açıklama ekleyin"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            className="min-h-[80px]"
          />
        </div>
      </div>
      
      {/* Form Buttons */}
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          İptal
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || !title.trim()}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
          Kaydet
        </Button>
      </div>
    </form>
  );
};

export default AddTaskForm;
