
import React, { useState } from 'react';
import { Check, Trash, Edit, Clock, MapPin, Users, Link } from 'lucide-react';
import { Task, tasksAPI } from '@/lib/firebase';
import { Button } from "@/components/core/Button";
import { Checkbox } from "@/components/core/Checkbox";
import { YStack, XStack, Text, View } from 'tamagui';

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
    <View 
      className="task-item slide-in group"
      borderBottomWidth={1}
      borderBottomColor="$border"
      padding="$3"
      marginBottom="$1"
      borderRadius={8}
      hoverStyle={{ backgroundColor: 'rgba(103, 133, 152, 0.1)' }}
    >
      <XStack alignItems="center" space="$3" flex={1}>
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={handleToggleComplete}
          disabled={isCompleting}
        />
        <YStack flex={1}>
          <Text 
            fontSize={16}
            fontWeight="500"
            textDecorationLine={task.completed ? 'line-through' : 'none'}
            opacity={task.completed ? 0.6 : 1}
          >
            {task.title}
          </Text>
          
          {/* Time Information */}
          {(task.startTime || task.endTime) && (
            <XStack alignItems="center" space="$1" marginTop="$1" opacity={0.7}>
              <Clock size={12} color="#2B3E4F" />
              <Text fontSize={12}>
                {task.startTime && task.endTime 
                  ? `${task.startTime} - ${task.endTime}`
                  : task.startTime || task.endTime
                }
              </Text>
            </XStack>
          )}
          
          {/* Location Information */}
          {task.location && (
            <XStack alignItems="center" space="$1" marginTop="$1" opacity={0.7}>
              <MapPin size={12} color="#FEA721" />
              <Text fontSize={12}>{task.location}</Text>
            </XStack>
          )}
          
          {/* Attendees Information */}
          {task.attendees && (
            <XStack alignItems="center" space="$1" marginTop="$1" opacity={0.7}>
              <Users size={12} color="#678598" />
              <Text fontSize={12}>{task.attendees}</Text>
            </XStack>
          )}
          
          {/* Meeting Link Information */}
          {task.meetLink && (
            <XStack alignItems="center" space="$1" marginTop="$1" opacity={0.7}>
              <Link size={12} color="#2B3E4F" />
              <Text 
                fontSize={12} 
                textDecorationLine="underline"
                hoverStyle={{ color: '#E04A0B' }}
                onPress={() => window.open(task.meetLink, '_blank')}
              >
                {task.meetLink}
              </Text>
            </XStack>
          )}
          
          {/* Description Information */}
          {task.description && (
            <Text fontSize={14} opacity={0.7} marginTop="$1">{task.description}</Text>
          )}
        </YStack>
      </XStack>
      <XStack space="$2" opacity={0} className="group-hover:opacity-100" transition="opacity 0.2s">
        <Button 
          size="sm" 
          variant="ghost" 
          onPress={handleDelete} 
          disabled={isDeleting}
        >
          <Trash size={16} color="#F44336" />
        </Button>
      </XStack>
    </View>
  );
};

export default TaskItem;
