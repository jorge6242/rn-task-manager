import React from "react";
import { View, Text } from "react-native";
import { useI18n, I18N } from "../../i18n";
import { styles } from "./styles";

const TASK_SUMMARY_KEYS = {
  TOTAL: "total",
  COMPLETED: "completed",
} as const;

type TaskSummaryKey = (typeof TASK_SUMMARY_KEYS)[keyof typeof TASK_SUMMARY_KEYS];

type TaskSummaryProps = Record<TaskSummaryKey, number>;

/**
 * Displays a concise summary of total and completed tasks.
 */
const TaskSummary: React.FC<TaskSummaryProps> = ({ total, completed }) => {
  const { t } = useI18n();

  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryText}>
        {t(I18N.KEYS.SUMMARY_TOTAL)}: {total} {t(I18N.KEYS.SUMMARY_COMPLETED)}: {completed}
      </Text>
    </View>
  );
};

export default TaskSummary;
