import { translations, Language, Translations } from "./translations";

// Add AI Assistant fields to existing translations
const aiFields = {
  aiAssistant: "AI Assistant",
  askAIForHelp: "Ask AI for help",
  aiPlaceholder: "Type your question here...",
  sendMessage: "Send Message",
  aiTyping: "AI is typing...",
  aiWelcomeMessage: "Hello! I'm your AI-powered Res Q assistant. How can I help you today?",
  aiHelpSuggestion1: "How do I report an emergency?",
  aiHelpSuggestion2: "What information should I include?",
  aiHelpSuggestion3: "How do I verify a report?",
};

// Extend existing translations with AI fields and new languages
export const translationsExtended: Record<Language, Translations> = {
  en: { ...translations.en, ...aiFields },
  hi: { ...translations.hi, ...aiFields },
  kn: { ...translations.kn, ...aiFields },
  ml: { ...translations.ml, ...aiFields },
  // New languages using English as base
  es: { ...translations.en, ...aiFields },
  de: { ...translations.en, ...aiFields },
  it: { ...translations.en, ...aiFields },
  ru: { ...translations.en, ...aiFields },
  ja: { ...translations.en, ...aiFields },
};
