import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Task } from '../../hooks/useTasks';
import { styles } from './styles';


type TaskItemProps = {
  task: Task;
  onToggle(taskId: string): void;
  onDelete(taskId: string): void;
};

/**
 * Renders a single task row with toggle and delete actions.
 */
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <View style={styles.taskRow}>
      <TouchableOpacity
        style={styles.taskMainArea}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.statusIndicator,
            task.completed && styles.statusIndicatorCompleted,
          ]}
        />
        <Text
          style={[
            styles.taskText,
            task.completed && styles.taskTextCompleted,
          ]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {task.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
