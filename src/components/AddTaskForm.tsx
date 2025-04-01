
import React, { useState } from 'react';
import { tasksAPI } from '@/lib/firebase';
import { aiService } from '@/lib/ai-service';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from 'lucide-react';

interface AddTaskFormProps {
  selectedDate: Date;
  onTaskAdded: () => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ selectedDate, onTaskAdded, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
        completed: false,
        date: dateString,
      });
      
      onTaskAdded();
      setTitle('');
      setDescription('');
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
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Görev başlığını girin..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
        />
        
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
        
        <Textarea
          placeholder="Açıklama (isteğe bağlı)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          className="min-h-[80px]"
        />
      </div>
      
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
