import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./LanguageProvider";
import { toast } from "sonner@2.0.3";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatBoxProps {
  inline?: boolean;
  compact?: boolean;
  onInputChange?: (value: string) => void;
  isExpanded?: boolean;
  initialInput?: string;
  onClose?: () => void;
}

export function ChatBox({ inline = false, compact = false, onInputChange, isExpanded = false, initialInput = "", onClose }: ChatBoxProps = {}) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(inline); // Auto-open if inline
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState(initialInput);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set initial input if provided
  useEffect(() => {
    if (initialInput) {
      setInputValue(initialInput);
    }
  }, [initialInput]);

  // Notify parent when input changes
  useEffect(() => {
    if (onInputChange) {
      onInputChange(inputValue);
    }
  }, [inputValue, onInputChange]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Get time-sensitive greeting
  const getTimeSensitiveGreeting = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // More granular time-based greetings
    if (hour >= 5 && hour < 12) {
      if (hour < 7) {
        return "Good early morning! ";
      } else if (hour < 10) {
        return "Good morning! ";
      } else {
        return "Good late morning! ";
      }
    } else if (hour >= 12 && hour < 18) {
      if (hour < 14) {
        return "Good afternoon! ";
      } else {
        return "Good late afternoon! ";
      }
    } else if (hour >= 18 && hour < 22) {
      return "Good evening! ";
    } else if (hour >= 22 || hour < 2) {
      return "Good night! ";
    } else {
      return "Good early morning! ";
    }
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chat is first opened with time-sensitive greeting
      const greeting = getTimeSensitiveGreeting();
      
      const welcomeMessage: Message = {
        id: `ai-${Date.now()}`,
        text: `${greeting}${t.aiWelcomeMessage}`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, t.aiWelcomeMessage, getTimeSensitiveGreeting]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !inline) {
        setIsOpen(false);
        if (onClose) {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      // Prevent body scroll when chat is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, inline, onClose]);

  const generateAIResponse = useCallback(async (userInput: string, conversationHistory: Message[]): Promise<string> => {
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!API_KEY) {
      throw new Error("OpenRouter API key is not configured. Please set VITE_OPENROUTER_API_KEY in your .env file.");
    }
    
    // Build conversation history for context
    const messagesForAPI = [
      {
        role: "system",
        content: `You are a helpful AI assistant for Res Q, an emergency response application. Your role is to help users:
- Report emergencies quickly and effectively
- Understand how to use the app features
- Navigate privacy and location settings
- Track their reports and status
- Use offline functionality
- Add photos and details to reports

Be concise, friendly, and focused on emergency response assistance. Always prioritize user safety and provide clear, actionable guidance.`
      },
      // Include recent conversation history (last 10 messages for context)
      ...conversationHistory.slice(-10).map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      })),
      {
        role: "user",
        content: userInput
      }
    ];

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Res Q - Emergency Response App"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // Using GPT-3.5-turbo via OpenRouter
          messages: messagesForAPI,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content?.trim();
      
      if (!aiText) {
        throw new Error("No response from AI");
      }

      return aiText;
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      throw error;
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Get updated messages after adding user message
    setMessages((prev) => {
      const updatedMessages = [...prev, userMessage];
      
      // Get AI response with updated conversation history
      generateAIResponse(currentInput, updatedMessages)
        .then((aiResponse) => {
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            text: aiResponse,
            sender: "ai",
            timestamp: new Date(),
          };
          setMessages((prevMsgs) => [...prevMsgs, aiMessage]);
        })
        .catch((error) => {
          console.error("AI API Error:", error);
          toast.error("Failed to get AI response. Please try again.");
          
          // Fallback to a helpful error message
          const errorMessage: Message = {
            id: `ai-error-${Date.now()}`,
            text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or you can browse the quick suggestions below for help.",
            sender: "ai",
            timestamp: new Date(),
          };
          setMessages((prevMsgs) => [...prevMsgs, errorMessage]);
        })
        .finally(() => {
          setIsTyping(false);
        });

      return updatedMessages;
    });
  }, [inputValue, generateAIResponse]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue("");
    
    // Create user message and update state
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: suggestion,
      sender: "user",
      timestamp: new Date(),
    };

    // Update messages and get the updated array
    setMessages((prev) => {
      const updatedMessages = [...prev, userMessage];
      setIsTyping(true);

      // Call AI API with the updated conversation history
      generateAIResponse(suggestion, updatedMessages)
        .then((aiResponse) => {
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            text: aiResponse,
            sender: "ai",
            timestamp: new Date(),
          };
          setMessages((prevMsgs) => [...prevMsgs, aiMessage]);
        })
        .catch((error) => {
          console.error("AI API Error:", error);
          toast.error("Failed to get AI response. Please try again.");
          const errorMessage: Message = {
            id: `ai-error-${Date.now()}`,
            text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
            sender: "ai",
            timestamp: new Date(),
          };
          setMessages((prevMsgs) => [...prevMsgs, errorMessage]);
        })
        .finally(() => {
          setIsTyping(false);
        });

      return updatedMessages;
    });
  }, [generateAIResponse]);

  const suggestions = useMemo(() => [
    t.aiHelpSuggestion1,
    t.aiHelpSuggestion2,
    t.aiHelpSuggestion3,
  ], [t.aiHelpSuggestion1, t.aiHelpSuggestion2, t.aiHelpSuggestion3]);

  return (
    <>
      {/* Floating Chat Button - Only show if not inline */}
      {!inline && (
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Button
                size="lg"
                onClick={() => setIsOpen(true)}
                className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 border-0 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 group-hover:opacity-0 transition-opacity" />
                <MessageCircle className="h-6 w-6 text-white relative z-10" />
                {/* Pulse animation */}
                <span className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Chat Overlay - Box Drawing Shape */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Hazy Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                if (!inline) {
                  setIsOpen(false);
                  if (onClose) {
                    onClose();
                  }
                }
              }}
              className={`fixed inset-0 z-[9998] backdrop-blur-md bg-black/20 dark:bg-black/40 ${
                inline ? "hidden" : ""
              }`}
            />

            {/* Compact Chat Box - Exact Box Shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className={inline 
                ? compact 
                  ? "w-full h-[600px] flex flex-col" 
                  : isExpanded
                    ? "w-full h-full flex flex-col"
                    : "w-full h-[750px] flex flex-col"
                : `fixed bottom-6 right-6 z-[9999] w-[420px] ${
                    messages.length > 1 ? 'h-[600px]' : 'h-[160px]'
                  } transition-all duration-300`
              }
            >
              {/* Chat Container - Box Shape */}
              <div className={`relative w-full h-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col overflow-hidden ${
                inline ? 'rounded-xl' : ''
              }`}>
                {/* Header */}
                <div className="relative p-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{t.aiAssistant}</h3>
                        <p className="text-xs text-purple-100">{t.askAIForHelp}</p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        if (onClose) {
                          onClose();
                        }
                      }}
                      className="h-8 w-8 text-white hover:bg-white/20 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages Area - Show when messages exist */}
                {messages.length > 1 && (
                  <div className="relative flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent bg-gray-50/50 dark:bg-gray-900/50">
                    {messages.slice(1).map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-md"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "user"
                                ? "text-purple-100"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                          <div className="flex gap-1">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.6,
                                delay: 0,
                              }}
                              className="w-2 h-2 bg-purple-600 rounded-full"
                            />
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.6,
                                delay: 0.1,
                              }}
                              className="w-2 h-2 bg-purple-600 rounded-full"
                            />
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.6,
                                delay: 0.2,
                              }}
                              className="w-2 h-2 bg-purple-600 rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}

                {/* Two Suggestion Buttons - Show when only welcome message */}
                {messages.length === 1 && !isTyping && (
                  <div className="p-3 space-y-2 bg-white dark:bg-gray-900 flex-1">
                    {suggestions.slice(0, 2).map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-950/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-200 text-sm text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Input Area with Send Button */}
                <div className="relative p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                  <div className="flex gap-3">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder={t.aiPlaceholder}
                      className="flex-1 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus-visible:ring-purple-500 focus-visible:ring-2 h-11 text-sm"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white shadow-lg h-11 w-11 px-0"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    AI Assistant • Always here to help
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
