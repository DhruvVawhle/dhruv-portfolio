"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  Video,
  Phone,
  MoreVertical,
  Smile,
  Paperclip,
  Camera,
  Mic,
  Send,
  CheckCheck,
  Play,
  Pause,
  RotateCcw,
  Lock,
} from "lucide-react";

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
}

const SCRIPTED_FLOW: Array<{
  sender: "bot" | "user";
  text: string;
  time: string;
  typingDelay?: number;
  readDelay?: number;
}> = [
  {
    sender: "bot",
    text: "Namaste!\n\nI’m MediMitra, your healthcare assistant. I can help with general health information, symptom guidance and wellness tips.\n\nWhich language would you like to continue in?\n\n(Please reply with English, Hindi or Marathi)",
    time: "10:42 AM",
    typingDelay: 1200,
    readDelay: 2800,
  },
  {
    sender: "user",
    text: "English",
    time: "10:42 AM",
    typingDelay: 1000,
    readDelay: 1600,
  },
  {
    sender: "bot",
    text: "Sure! How can I help you today? You can describe your symptoms or ask a general health question.",
    time: "10:43 AM",
    typingDelay: 1400,
    readDelay: 2200,
  },
  {
    sender: "user",
    text: "I have a headache and mild fever since yesterday.",
    time: "10:43 AM",
    typingDelay: 1400,
    readDelay: 2000,
  },
  {
    sender: "bot",
    text: "I understand. A headache with mild fever can have several common causes.\n\nHere are some general suggestions:\n• Rest and stay hydrated.\n• Drink enough fluids.\n• Monitor your temperature.\n• Consult a healthcare professional if symptoms persist or worsen.\n\nThis is general information and not a medical diagnosis.",
    time: "10:44 AM",
    typingDelay: 2000,
    readDelay: 4500,
  },
];

export default function WhatsAppLiveChat() {
  const shouldReduceMotion = useReducedMotion();
  const [isDemoRunning, setIsDemoRunning] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const botResponseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (botResponseTimeoutRef.current) clearTimeout(botResponseTimeoutRef.current);
    };
  }, []);

  // Intersection observer: only run demo animations when visible on screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll when new messages arrive (only within the chat container, never yanking the window)
  const scrollToBottom = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 160;
    if (isNearBottom || messages.length <= 3) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  // Clean single-timer automated demonstration loop (only runs when in view)
  useEffect(() => {
    if (!isDemoRunning || shouldReduceMotion || isUserInteracting || !isInView) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // If reached end of script, wait and loop
    if (scriptIndex >= SCRIPTED_FLOW.length) {
      timerRef.current = setTimeout(() => {
        // Restart cycle cleanly
        setMessages([]);
        setScriptIndex(0);
        setIsBotTyping(false);
      }, 4500);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    const currentItem = SCRIPTED_FLOW[scriptIndex];

    if (currentItem.sender === "bot") {
      // First show bot typing
      setIsBotTyping(true);
      timerRef.current = setTimeout(() => {
        setIsBotTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-${scriptIndex}`,
            sender: "bot",
            text: currentItem.text,
            time: currentItem.time,
          },
        ]);
        // After reading, advance to next step
        timerRef.current = setTimeout(() => {
          setScriptIndex((i) => i + 1);
        }, currentItem.readDelay || 2000);
      }, currentItem.typingDelay || 1400);
    } else {
      // User message entrance
      timerRef.current = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-${scriptIndex}`,
            sender: "user",
            text: currentItem.text,
            time: currentItem.time,
            status: "read",
          },
        ]);
        timerRef.current = setTimeout(() => {
          setScriptIndex((i) => i + 1);
        }, currentItem.readDelay || 1500);
      }, currentItem.typingDelay || 1200);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDemoRunning, shouldReduceMotion, scriptIndex, isUserInteracting]);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);
    setIsTouchDevice(isTouch);
  }, []);

  const sendPromptMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    if (botResponseTimeoutRef.current) clearTimeout(botResponseTimeoutRef.current);
    setIsDemoRunning(false);
    setIsUserInteracting(true);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "read",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate realistic bot triage response with race-condition prevention
    setIsBotTyping(true);
    botResponseTimeoutRef.current = setTimeout(() => {
      setIsBotTyping(false);
      let replyText = "Thank you for sharing your symptoms. Please ensure you remain rested and drink plenty of fluids.";
      const lower = trimmed.toLowerCase();
      if (lower.includes("cough") || lower.includes("cold")) {
        replyText = "For cold and mild cough, warm fluids, steam inhalation, and throat lozenges are commonly recommended. Seek a doctor if high fever persists.";
      } else if (lower.includes("chest") || lower.includes("emergency") || lower.includes("breath")) {
        replyText = "⚠️ URGENT ADVISORY: Potential emergency warning signs detected. Please immediately contact emergency medical helpline (108/112) or visit the nearest hospital emergency care.";
      } else if (lower.includes("hindi") || lower.includes("हिंदी")) {
        replyText = "नमस्ते! मैं आपकी स्वास्थ्य जानकारी और प्राथमिक मार्गदर्शन में सहायता कर सकता हूँ। कृपया अपने लक्षण बताएं।";
      } else if (lower.includes("marathi") || lower.includes("मराठी")) {
        replyText = "नमस्कार! मी तुम्हाला आरोग्य विषयक माहिती आणि लक्षण मार्गदर्शन देऊ शकतो. कृपया तुमची लक्षणे सांगा.";
      } else if (lower.includes("headache") || lower.includes("fever")) {
        replyText = "I understand. A headache with mild fever can have several common causes.\n\nGeneral care:\n• Rest and monitor body temperature.\n• Stay hydrated with water or electrolyte fluids.\n• Consult a qualified doctor if fever exceeds 101°F or lasts >48h.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `${replyText}\n\n(Local simulated clinical triage response)`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1200);
  };

  // Handle user sending an interactive message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sendPromptMessage(inputValue);
  };

  const handleToggleDemo = () => {
    if (isDemoRunning) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (botResponseTimeoutRef.current) clearTimeout(botResponseTimeoutRef.current);
      setIsDemoRunning(false);
      setIsBotTyping(false);
    } else {
      setIsDemoRunning(true);
      setIsUserInteracting(false);
    }
  };

  const handleRestartDemo = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (botResponseTimeoutRef.current) clearTimeout(botResponseTimeoutRef.current);
    setMessages([]);
    setScriptIndex(0);
    setIsBotTyping(false);
    setIsUserInteracting(false);
    setIsDemoRunning(true);
  };

  return (
    <div ref={containerRef} className="w-full font-sans select-none flex flex-col items-center">
      
      {/* ── Top Bar Controls: Demo Mode Status & Buttons (Outside Message Area) ── */}
      <div className="w-full max-w-lg mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border ${
            isDemoRunning && !isUserInteracting
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isDemoRunning && !isUserInteracting ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
            }`} />
            <span>
              {isUserInteracting
                ? "Interactive Mode"
                : isDemoRunning
                ? "Auto-Demo Running"
                : "Demo Paused"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleDemo}
            aria-label={isDemoRunning ? "Stop Demo" : "Resume Demo"}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-bg-surface border border-border-custom hover:border-accent text-text-primary transition-all cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent touch-manipulation"
          >
            {isDemoRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 text-text-secondary" />
                <span>Stop Demo</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Resume Demo</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRestartDemo}
            aria-label="Restart Demo"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl bg-bg-surface border border-border-custom hover:border-accent text-text-secondary hover:text-text-primary transition-colors cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent touch-manipulation"
            title="Restart Demo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Standalone Authentic WhatsApp Chat Frame ── */}
      <div className="w-full max-w-lg rounded-3xl overflow-hidden border border-[#D1D7DB] dark:border-[#222E35] shadow-2xl bg-[#EFEAE2] dark:bg-[#0B141A] flex flex-col h-[560px] sm:h-[600px] relative">
        
        {/* ── WhatsApp Authentic Header ── */}
        <div className="bg-[#008069] dark:bg-[#202C33] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between shadow-sm z-20 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              className="p-1 -ml-1 text-white/90 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Profile Avatar */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-700 dark:bg-emerald-800 border border-white/20 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-xs overflow-hidden">
              <span className="font-display tracking-tight text-white">MM</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#008069] dark:border-[#202C33]" />
            </div>

            {/* Name & Online Status */}
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-sans font-bold text-sm sm:text-base text-white truncate">
                  MediMitra
                </span>
              </div>
              <span className="font-sans text-[11px] text-white/85 truncate leading-tight">
                {isBotTyping ? "typing..." : "online"}
              </span>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 text-white/90">
            <button
              type="button"
              className="p-1 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Video Call"
            >
              <Video className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>
            <button
              type="button"
              className="p-1 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Voice Call"
            >
              <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>
            <button
              type="button"
              className="p-1 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              <MoreVertical className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>

        {/* ── WhatsApp Wallpaper Chat Messages Viewport ── */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 relative scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.015) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        >
          {/* Encryption Notice Badge */}
          <div className="flex justify-center my-1">
            <div className="max-w-xs text-center px-3 py-1.5 rounded-lg bg-[#FFEECD] dark:bg-[#182229] border border-[#E9D9B7] dark:border-[#222E35] text-[#54656F] dark:text-[#8696A0] text-[10px] sm:text-[11px] leading-tight flex items-center gap-1.5 shadow-2xs">
              <Lock className="w-3 h-3 text-[#54656F] dark:text-[#8696A0] flex-shrink-0" />
              <span>Messages are end-to-end encrypted. No one outside of this chat can read them.</span>
            </div>
          </div>

          {/* Date Stamp */}
          <div className="flex justify-center my-2">
            <span className="px-3 py-1 rounded-md bg-white/80 dark:bg-[#182229]/80 text-[#54656F] dark:text-[#8696A0] text-[10px] font-semibold uppercase tracking-wider shadow-2xs">
              Today
            </span>
          </div>

          {/* Render Messages */}
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}
                >
                  <div
                    className={`relative max-w-[85%] sm:max-w-[78%] px-3.5 pt-2 pb-1.5 rounded-2xl shadow-xs text-xs sm:text-[13px] leading-relaxed break-words ${
                      isUser
                        ? "bg-[#D9FDD3] dark:bg-[#005C4B] text-[#111B21] dark:text-[#E9EDEF] rounded-tr-none"
                        : "bg-white dark:bg-[#202C33] text-[#111B21] dark:text-[#E9EDEF] rounded-tl-none border border-black/[0.04] dark:border-white/[0.04]"
                    }`}
                  >
                    {/* Message Body Text */}
                    <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed select-text">
                      {msg.text}
                    </div>

                    {/* Timestamp & Read Receipt */}
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#667781] dark:text-[#8696A0] select-none">
                      <span>{msg.time}</span>
                      {isUser && (
                        <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* WhatsApp Authentic Typing Bubble */}
          {isBotTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="flex justify-start w-full"
            >
              <div className="bg-white dark:bg-[#202C33] border border-black/[0.04] dark:border-white/[0.04] px-4 py-2.5 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.32s]" />
                <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.16s]" />
                <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce" />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Quick Simulated Interaction Chips ── */}
        <div className="bg-[#F0F2F5]/95 dark:bg-[#202C33]/95 px-3 py-1.5 border-t border-[#E9EDEF] dark:border-[#222E35] flex items-center gap-1.5 overflow-x-auto scrollbar-none z-20">
          <span className="text-[10px] font-mono text-[#8696A0] uppercase tracking-wider flex-shrink-0 mr-1">
            Tap to test:
          </span>
          {[
            "English",
            "Headache & mild fever",
            "Emergency advisory",
            "हिंदी",
            "मराठी",
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendPromptMessage(prompt)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white dark:bg-[#2A3942] text-[#111B21] dark:text-[#E9EDEF] border border-[#E9EDEF] dark:border-[#222E35] shadow-2xs hover:bg-[#E9EDEF] dark:hover:bg-[#32424b] transition-colors whitespace-nowrap cursor-pointer flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* ── WhatsApp Authentic Composer / Input Bar ── */}
        <form
          onSubmit={handleSendMessage}
          className="bg-[#F0F2F5] dark:bg-[#202C33] p-2 sm:p-2.5 flex items-center gap-2 border-t border-[#E9EDEF] dark:border-[#222E35] flex-shrink-0 z-20"
        >
          {/* Emoji button */}
          <button
            type="button"
            className="p-1.5 text-[#54656F] dark:text-[#8696A0] hover:text-[#111B21] dark:hover:text-[#E9EDEF] rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Emoji"
          >
            <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Attachment button */}
          <button
            type="button"
            className="p-1.5 text-[#54656F] dark:text-[#8696A0] hover:text-[#111B21] dark:hover:text-[#E9EDEF] rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Attachment"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Message Input Box */}
          <div className="flex-1 relative flex items-center bg-white dark:bg-[#2A3942] rounded-xl px-3 py-1.5 border border-transparent focus-within:border-[#008069] transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (!isUserInteracting) setIsUserInteracting(true);
              }}
              readOnly={isTouchDevice}
              inputMode={isTouchDevice ? "none" : "text"}
              placeholder={isTouchDevice ? "Tap quick options above..." : "Type a message..."}
              className="w-full bg-transparent text-xs sm:text-sm text-[#111B21] dark:text-[#E9EDEF] placeholder:text-[#8696A0] focus:outline-none"
            />
            {!inputValue.trim() && (
              <button
                type="button"
                className="p-1 text-[#54656F] dark:text-[#8696A0] hover:text-[#111B21] dark:hover:text-[#E9EDEF] rounded-full transition-colors cursor-pointer"
                aria-label="Camera"
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>

          {/* Mic or Send button */}
          {inputValue.trim() ? (
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-[#008069] dark:bg-[#00A884] text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-xs flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-[#008069] dark:bg-[#00A884] text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-xs flex-shrink-0"
              aria-label="Voice message"
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </form>

      </div>
    </div>
  );
}
