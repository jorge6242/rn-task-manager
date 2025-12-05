import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
    padding: 3,
    borderRadius: 6,
  },
  textActive: {
    color: colors.backgroundLight,
    backgroundColor: colors.primary,
    fontWeight: "bold",
  },
});
