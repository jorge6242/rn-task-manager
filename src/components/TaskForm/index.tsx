import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { colors } from "../../theme/colors";
import { useI18n, I18N } from "../../i18n";
import { styles } from "./styles";

type TaskFormProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

/**
 * Presentational component that encapsulates the input + Add button.
 * Responsible only for the form UI; business logic lives in the hook using it.
 */
const TaskForm: React.FC<TaskFormProps> = ({ value, onChangeText, onSubmit, disabled = false }) => {
  const { t } = useI18n();

  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder={t(I18N.KEYS.ADD_PLACEHOLDER)}
        placeholderTextColor={colors.primaryDisabled}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.addButton, disabled && styles.addButtonDisabled]}
        onPress={onSubmit}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>{t(I18N.KEYS.ADD_BUTTON)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskForm;
