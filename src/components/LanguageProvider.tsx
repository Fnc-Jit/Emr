import { createContext, useContext, useEffect, useState } from "react";
import { Language, translations, Translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage for saved language
    const savedLanguage = localStorage.getItem("language") as Language;
    const validLanguages: Language[] = ["en", "hi", "kn", "ml", "es"];
    if (savedLanguage && validLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }
    // Default to English
    return "en";
  });

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  // Get translations with fallback to English for missing translations
  const t = new Proxy(translations[language] || translations.en, {
    get: (target, prop: string) => {
      return target[prop as keyof Translations] || translations.en[prop as keyof Translations] || prop;
    }
  }) as Translations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
