import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useI18n, I18N } from "../../i18n";
import { styles } from "./styles";

const LanguageSwitch: React.FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setLocale(I18N.LOCALES.EN)}>
        <Text
          style={[
            styles.text,
            locale === I18N.LOCALES.EN && styles.textActive,
          ]}
        >
          EN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLocale(I18N.LOCALES.ES)}>
        <Text
          style={[
            styles.text,
            locale === I18N.LOCALES.ES && styles.textActive,
          ]}
        >
          ES
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSwitch;
