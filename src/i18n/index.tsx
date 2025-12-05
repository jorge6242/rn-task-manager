import React, { createContext, useContext, useMemo, useState } from "react";

const LOCALES = {
  EN: "en",
  ES: "es",
} as const;

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];

const DEFAULT_LOCALE: Locale = LOCALES.EN;

const I18N_KEYS = {
  TITLE: "title",
  ADD_BUTTON: "addButton",
  ADD_PLACEHOLDER: "addPlaceholder",
  EMPTY_STATE: "emptyState",
  SUMMARY_TOTAL: "summaryTotal",
  SUMMARY_COMPLETED: "summaryCompleted",
} as const;

export type I18nKey = (typeof I18N_KEYS)[keyof typeof I18N_KEYS];

const STRINGS: Record<Locale, Record<I18nKey, string>> = {
  en: {
    title: "Task Manager",
    addButton: "Add",
    addPlaceholder: "Write a new task...",
    emptyState: "No tasks yet. Add your first task ✍️",
    summaryTotal: "Total",
    summaryCompleted: "Completed",
  },
  es: {
    title: "Gestor de Tareas",
    addButton: "Agregar",
    addPlaceholder: "Escribe una nueva tarea...",
    emptyState: "Aún no hay tareas. Agrega tu primera tarea ✍️",
    summaryTotal: "Total",
    summaryCompleted: "Completadas",
  },
};

type I18nContextValue = {
  locale: Locale;
  t: (key: I18nKey) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  const t = useMemo(
    () =>
      (key: I18nKey) => {
        return STRINGS[locale][key];
      },
    [locale]
  );

  const value: I18nContextValue = useMemo(
    () => ({ locale, t, setLocale }),
    [locale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
};

export const I18N = {
  LOCALES,
  KEYS: I18N_KEYS,
};
