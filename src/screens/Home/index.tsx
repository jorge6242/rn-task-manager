import React from "react";
import { Text, View, FlatList, ListRenderItem } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTasks, Task } from "../../hooks/useTasks";
import TaskForm from "../../components/TaskForm";
import TaskItem from "../../components/TaskItem";
import TaskSummary from "../../components/TaskSummary";
import LanguageSwitch from "../../components/LanguageSwitch";
import { useI18n, I18N } from "../../i18n";
import { styles } from "./styles";

/**
 * Main screen for the task manager.
 */
const HomeScreen: React.FC = () => {
  const {
    tasks,
    inputValue,
    setInputValue,
    handleAddTask,
    toggleTask,
    deleteTask,
    completedCount,
  } = useTasks();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{t(I18N.KEYS.TITLE)}</Text>
          <LanguageSwitch />
        </View>

        <TaskForm
          value={inputValue}
          onChangeText={setInputValue}
          onSubmit={handleAddTask}
          disabled={!inputValue.trim()}
        />

        <TaskSummary total={tasks.length} completed={completedCount} />

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={
            tasks.length === 0 ? styles.emptyContainer : styles.listContent
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>{t(I18N.KEYS.EMPTY_STATE)}</Text>
          }
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
