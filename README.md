# Task Manager (React Native + TypeScript)

A small task manager app built with **React Native**, **TypeScript**, and **Expo**, focused on demonstrating **clean architecture**, **separation of concerns**, **custom hooks**, and **minimal i18n** (EN/ES).

<img width="442" height="948" alt="Captura de pantalla 2025-12-05 a la(s) 6 45 32 p  m" src="https://github.com/user-attachments/assets/2f9bd811-ec40-43ce-9124-3d95948ff238" />
<img width="444" height="968" alt="Captura de pantalla 2025-12-05 a la(s) 6 44 59 p  m" src="https://github.com/user-attachments/assets/0a8d3c3c-785c-488b-9ac2-0d3d3a99c6cd" />

---

## Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **React Hooks** (`useState`, `useCallback`, `useMemo`)
- **Context API** for i18n
- **react-native-safe-area-context** for safe area handling

---

## Project Structure

```bash
src/
  App.tsx
  components/
    LanguageSwitch/
      index.tsx
      styles.ts
    TaskForm/
      index.tsx
      styles.ts
    TaskItem/
      index.tsx
      styles.ts
    TaskSummary/
      index.tsx
      styles.ts
  hooks/
    useTasks.ts
  i18n/
    index.tsx
  screens/
    Home/
      index.tsx
      styles.ts
  theme/
    colors.ts
index.ts          # Expo registerRootComponent
```

### Modules Overview

- `App.tsx`
  - Application root.
  - Wraps the app with `SafeAreaProvider` and `I18nProvider`.
  - Renders the main screen `HomeScreen`.

- `screens/Home`
  - `index.tsx` – **Main screen**:
    - Consumes the `useTasks` hook (task domain logic).
    - Uses `useI18n` only for translated strings.
    - Composes UI from `TaskForm`, `TaskSummary`, `TaskItem`, and `LanguageSwitch`.
    - Uses `SafeAreaView` + `useSafeAreaInsets` to respect notch / status bar.
  - `styles.ts` – Layout and typography styles for the screen (container, title, empty state, etc.).

- `hooks/useTasks.ts`
  - Custom hook that centralizes **task domain logic**:
    - State: `tasks`, `inputValue`.
    - Actions: `handleAddTask`, `toggleTask`, `deleteTask`.
    - Derived value: `completedCount` (via `useMemo`).
  - Exports a strongly-typed `Task` model.

- `components/TaskForm`
  - `index.tsx` – Presentational component for the **create task form**:
    - Controlled props: `value`, `onChangeText`, `onSubmit`, `disabled`.
    - Does not know any business rules; pure UI.
    - Uses i18n for placeholder and button label.
  - `styles.ts` – Input and button styling.

- `components/TaskItem`
  - `index.tsx` – Renders a **single task row**:
    - Shows completion state (pending/completed).
    - Exposes `onToggle` and `onDelete` callbacks.
    - Handles long text safely with:
      - `flex: 1` on the text style.
      - `numberOfLines={1}` and `ellipsizeMode="tail"` so it never overflows the card.
  - `styles.ts` – Card styles, status indicator, delete button.

- `components/TaskSummary`
  - `index.tsx` – Displays a **summary** of total and completed tasks:
    - Uses `TASK_SUMMARY_KEYS` with `as const` and derived types (`TaskSummaryKey`, `Record<...>`).
    - Uses i18n for `Total` and `Completed` labels.
  - `styles.ts` – Summary row styling.

- `components/LanguageSwitch`
  - `index.tsx` – Encapsulates the **language toggle** (EN/ES):
    - Consumes `useI18n` internally (`locale`, `setLocale`).
    - Highlights the active language with dedicated styles.
    - Keeps the screen code clean: `HomeScreen` just renders `<LanguageSwitch />`.
  - `styles.ts` – Layout and active-language styles.

- `i18n/index.tsx`
  - Implements a **lightweight i18n layer** without external libraries:
    - `LOCALES` (`en`, `es`) with `as const` → `Locale` type.
    - `I18N_KEYS` (`title`, `addButton`, `addPlaceholder`, etc.) → `I18nKey` type.
    - `STRINGS: Record<Locale, Record<I18nKey, string>>` with EN/ES translations.
    - `I18nProvider`: React context with `{ locale, t(key), setLocale }`.
    - `useI18n`: hook to consume the context if needed.
    - `I18N`: helper object exposing typed `LOCALES` and `KEYS`.

- `theme/colors.ts`
  - Centralized color palette with semantic names:
    - `backgroundDark`, `backgroundLight`, `surface`, `textPrimary`, `textSecondary`, `textMuted`, `border`, `primary`, `primaryDisabled`, `danger`, `success`, etc.
  - All components import from here to keep styling consistent and maintainable.

---

## Clean Code & Architecture Practices

- **Separation of Concerns (SOLID-minded):**
  - `useTasks` owns task domain logic.
  - UI components (`TaskForm`, `TaskItem`, `TaskSummary`, `LanguageSwitch`) are presentational and receive data/callbacks through props.
  - `HomeScreen` acts as a **container/composer**, wiring hooks and components together, with minimal business logic.

- **Custom Hooks:**
  - `useTasks` demonstrates:
    - Managing non-trivial state (list + input).
    - Pure operations over collections (add, toggle, delete).
    - Derived computations (`completedCount`) separated from rendering.

- **Context + Minimal i18n:**
  - `I18nProvider` + `useI18n` implement global i18n with:
    - Strong typings using `as const`, `typeof`, `keyof`, and `Record`.
    - Simple, explicit mapping for each string in EN and ES.
  - The pattern is easy to extend to new locales and keys without changing consumers.

- **UI/UX robustness:**
  - Safe area is handled correctly with `SafeAreaProvider` and `useSafeAreaInsets`.
  - `FlatList` is used for rendering tasks with a stable `keyExtractor`.
  - A friendly empty state message is shown when there are no tasks.
  - Long task titles never break the layout thanks to `flex: 1` and `numberOfLines` / `ellipsizeMode`.

- **Styling:**
  - Each component/screen has its own `styles.ts` colocated with the implementation.
  - Colors are centralized in `theme/colors.ts` to avoid magic hex codes and improve reusability.

---

## Running the Project

1. **Install dependencies**

```bash
npm install
# or
yarn install
```

2. **Ensure Expo CLI is available**

You can either use the local CLI via `npx`, or install Expo CLI globally:

```bash
# Recommended: use npx (no global install required)
npx expo --version

# Optional: install Expo CLI globally
npm install -g expo-cli
```

3. **Start the Metro bundler with Expo**

From the project root, run:

```bash
npx expo start
```

This will open the Expo Dev Tools in your browser and start the Metro bundler.

4. **Launch on a device or simulator**

- **Physical device**
  - Install the **Expo Go** app from the App Store / Google Play.
  - Scan the QR code shown in the terminal or Expo Dev Tools.
- **iOS Simulator (macOS only)**
  - Make sure Xcode and the iOS Simulator are installed.
  - With Metro running, press `i` in the terminal to open the app in the iOS Simulator.
- **Android Emulator**
  - Ensure Android Studio and at least one virtual device (AVD) are configured.
  - With Metro running, press `a` in the terminal to launch the app on the Android emulator.

---

## How to Use the App

- **Add a task**
  - Type into the “Write a new task…” input (or its ES version).
  - Press the `Add`/`Agregar` button or the keyboard `done` key.

- **Toggle task completion**
  - Tap on a task row to mark it as completed or pending.

- **Delete a task**
  - Tap the `✕` icon on the right side of a task.

- **Switch language**
  - Use the `EN / ES` switch in the header.
  - All i18n-enabled texts update: title, input placeholder, add button label, empty state, and summary labels.

---

## Possible Extensions

- Task filters (All / Completed / Pending).
- Local persistence using `AsyncStorage`.
- Unit tests for `useTasks` and i18n logic.
- Additional locales reusing the existing i18n structure.

---

## Project Goals

The main goal of this codebase is to showcase:

- **Clean, scalable architecture** even in a small app.
- Proper use of **custom hooks**, **Context API**, and **strong TypeScript typing**.
- A simple but solid **i18n implementation** without introducing unnecessary complexity or heavy dependencies.

---

## Author

**Jorge Gomez** – Project built as part of a technical assessment.
