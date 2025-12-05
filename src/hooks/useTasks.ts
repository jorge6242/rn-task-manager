import { useState, useCallback, useMemo } from 'react';

/**
 * Represents a single task in the list.
 */
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

/**
 * Custom hook responsible for managing task state and the input value.
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  /**
   * Adds a new task to the list when the input is not empty
   * and clears the input field afterwards.
   */
  const handleAddTask = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks(prev => [newTask, ...prev]);
    setInputValue('');
  }, [inputValue]);

  /**
   * Toggles the completed state of a task by id.
   */
  const toggleTask = useCallback((taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  /**
   * Removes a task from the list by id.
   */
  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  /**
   * Number of tasks currently marked as completed.
   */
  const completedCount = useMemo(() => tasks.filter(t => t.completed).length,[tasks]);

  return { tasks, inputValue, setInputValue, handleAddTask, toggleTask, deleteTask, completedCount };
};