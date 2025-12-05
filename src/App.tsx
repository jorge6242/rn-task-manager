import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/Home";
import { I18nProvider } from "./i18n";

const App = () => (
  <SafeAreaProvider>
    <I18nProvider>
      <HomeScreen />
    </I18nProvider>
  </SafeAreaProvider>
);

export default App;
