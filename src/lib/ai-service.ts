
// This is a mock implementation of the ChatGPT API service
// In a real application, you would make API calls to the OpenAI API

export const aiService = {
  generateTaskSuggestion: async (prompt: string): Promise<string> => {
    // Mock API call to ChatGPT
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple responses based on keywords in the prompt
        if (prompt.toLowerCase().includes('meeting')) {
          resolve('Prepare agenda items for the meeting');
        } else if (prompt.toLowerCase().includes('exercise') || prompt.toLowerCase().includes('workout')) {
          resolve('30-minute cardio workout followed by stretching');
        } else if (prompt.toLowerCase().includes('shopping')) {
          resolve('Buy groceries: fruits, vegetables, and protein sources');
        } else if (prompt.toLowerCase().includes('study')) {
          resolve('Review notes and complete practice exercises');
        } else {
          resolve('Complete this task by the end of the day');
        }
      }, 500);
    });
  },
  
  parseNaturalLanguage: async (text: string): Promise<{ 
    title: string; 
    description?: string; 
    date?: string; 
  }> => {
    // Mock natural language parsing
    return new Promise((resolve) => {
      setTimeout(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const lowercaseText = text.toLowerCase();
        let title = text;
        let description = '';
        let date = today.toISOString().split('T')[0];
        
        // Extract potential date
        if (lowercaseText.includes('tomorrow')) {
          date = tomorrow.toISOString().split('T')[0];
          title = title.replace(/tomorrow/i, '').trim();
        } else if (lowercaseText.includes('today')) {
          title = title.replace(/today/i, '').trim();
        }
        
        // Extract potential description
        if (title.includes(':')) {
          const parts = title.split(':');
          title = parts[0].trim();
          description = parts.slice(1).join(':').trim();
        }
        
        resolve({ 
          title: title || 'New Task',
          description,
          date
        });
      }, 500);
    });
  }
};
