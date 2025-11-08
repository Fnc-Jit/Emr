import { useState, useRef, useEffect } from "react";
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chat is first opened
      const greetingTime = new Date().getHours();
      let greeting = "";
      if (greetingTime < 12) {
        greeting = "Good morning! ";
      } else if (greetingTime < 18) {
        greeting = "Good afternoon! ";
      } else {
        greeting = "Good evening! ";
      }
      
      const welcomeMessage: Message = {
        id: `ai-${Date.now()}`,
        text: `${greeting}${t.aiWelcomeMessage}`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, t.aiWelcomeMessage]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // Get AI response from OpenRouter
      const aiResponse = await generateAIResponse(currentInput, messages);
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI API Error:", error);
      toast.error("Failed to get AI response. Please try again.");
      
      // Fallback to a helpful error message
      const errorMessage: Message = {
        id: `ai-error-${Date.now()}`,
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or you can browse the quick suggestions below for help.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateAIResponse = async (userInput: string, conversationHistory: Message[]): Promise<string> => {
    const API_KEY = "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";
    
    // Build conversation history for context
    const messagesForAPI = [
      {
        role: "system",
        content: `You are a helpful AI assistant for an emergency response application. Your role is to help users:
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
          "X-Title": "Emergency Response App"
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
  };

  const handleSuggestionClick = (suggestion: string) => {
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
  };

  const suggestions = [
    t.aiHelpSuggestion1,
    t.aiHelpSuggestion2,
    t.aiHelpSuggestion3,
  ];

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

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={inline 
              ? compact 
                ? "w-full h-[500px] flex flex-col" 
                : isExpanded
                  ? "w-full h-full flex flex-col"
                  : "w-full h-[600px] flex flex-col"
              : "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] flex flex-col"
            }
          >
            {/* Chat Container with Glassmorphism */}
            <div className={`relative h-full ${inline ? 'bg-white dark:bg-gray-900 rounded-xl' : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50'} flex flex-col`}>
              {/* Gradient Background Effect */}
              {!inline && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              )}
              
              {/* Header - Only show if not inline */}
              {!inline && (
                <div className="relative p-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{t.aiAssistant}</h3>
                        <p className="text-xs text-purple-100">{t.askAIForHelp}</p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 text-white hover:bg-white/20 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages Area */}
              <div className={`relative flex-1 overflow-y-auto ${compact ? 'p-3 space-y-2' : 'p-4 space-y-4'}`}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] ${compact ? 'rounded-xl px-3 py-1.5' : 'rounded-2xl px-4 py-2'} ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      <p className={`${compact ? 'text-xs' : 'text-sm'} whitespace-pre-wrap`}>{message.text}</p>
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

                {/* Suggestions (only show when no messages yet) */}
                {messages.length === 1 && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Quick suggestions:
                    </p>
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-950/30 transition-colors text-sm text-gray-700 dark:text-gray-300"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className={`relative ${compact ? 'p-2' : 'p-4'} ${inline ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm'} border-t border-gray-200 dark:border-gray-700 ${compact ? 'rounded-b-xl' : 'rounded-b-2xl'}`}>
                <div className="flex gap-2">
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
                    className="flex-1 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus-visible:ring-purple-500"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  AI Assistant • Always here to help
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
