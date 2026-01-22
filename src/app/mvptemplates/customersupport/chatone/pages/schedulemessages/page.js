"use client";

import {
  AlertCircle,
  AtSign,
  Bot,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  ExternalLink,
  Facebook,
  GitBranch,
  Inbox,
  LayoutDashboard,
  Link2,
  List,
  LogOut,
  Maximize2,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
  Send,
  Settings,
  Sparkles,
  Star,
  Trash2,
  User,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function ChatOneSchedulingFlow() {
  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedConversation, setSelectedConversation] =
    useState("brook");
  const [showScheduleModal, setShowScheduleModal] =
    useState(false);
  const [showSnoozeModal, setShowSnoozeModal] =
    useState(false);
  const [showSendDropdown, setShowSendDropdown] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedMonth, setSelectedMonth] =
    useState("January");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedTime, setSelectedTime] =
    useState("6:30 pm");
  const [messageText, setMessageText] = useState("");
  const [scheduledMessages, setScheduledMessages] =
    useState([]);
  const [snoozedCount, setSnoozedCount] = useState(0);

  // Sidebar sections
  const [expandedSections, setExpandedSections] = useState({
    aiAgent: true,
    teamInboxes: true,
    teammates: false,
    views: true,
  });

  // Data
  const inboxItems = [
    {
      icon: Inbox,
      label: "Your inbox",
      count: 5,
      active: true,
    },
    { icon: AtSign, label: "Mentions", count: 0 },
    { icon: User, label: "Created by you", count: 0 },
    { icon: Users, label: "All", count: 5 },
    { icon: AlertCircle, label: "Unassigned", count: 0 },
    { icon: Trash2, label: "Spam", count: 0 },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      count: null,
    },
  ];

  const aiAgentItems = [
    { icon: Sparkles, label: "All conversations" },
    { icon: CheckCircle, label: "Resolved" },
    { icon: GitBranch, label: "Routed" },
    { icon: LogOut, label: "Abandoned" },
  ];

  const conversations = [
    {
      id: "brook",
      name: "Brook Taylor",
      avatar: "B",
      avatarBg: "bg-rose-400",
      preview:
        scheduledMessages.length > 0
          ? "Hey 👋 welcome! ChatOne is..."
          : "Hi there, i just came acc...",
      time: scheduledMessages.length > 0 ? "now" : "3m",
      starred: true,
      hasQuestion: true,
    },
    {
      id: "john",
      name: "john doe",
      avatar: "M",
      avatarBg: "bg-indigo-500",
      preview: "Install Messenger",
      time: "1h",
      starred: false,
    },
    {
      id: "email",
      name: "Email · [Demo]",
      avatar: "E",
      avatarBg: "bg-emerald-500",
      preview: "This is a demo email. It s...",
      time: "6d",
      starred: false,
    },
    {
      id: "whatsapp",
      name: "WhatsApp · [Demo]",
      avatar: "W",
      avatarBg: "bg-green-500",
      preview: "Set up WhatsApp or soci...",
      time: "6d",
      starred: false,
    },
    {
      id: "phone",
      name: "Phone · [Demo]",
      avatar: "P",
      avatarBg: "bg-purple-500",
      preview: "Set up phone or SMS",
      time: "6d",
      starred: false,
    },
  ];

  const times = [
    "6:30 pm",
    "7:00 pm",
    "7:30 pm",
    "8:00 pm",
    "8:30 pm",
    "9:00 pm",
  ];
  const snoozeTimes = [
    "8:00 am",
    "8:30 am",
    "9:00 am",
    "9:30 am",
    "10:00 am",
    "10:30 am",
  ];

  const snoozeOptions = [
    { label: "Later today", shortcut: null },
    { label: "Tomorrow", shortcut: "⌘ ⌥ Enter" },
    { label: "Monday", shortcut: null },
    { label: "One week", shortcut: null },
    { label: "One month", shortcut: null },
    { label: "Custom", shortcut: null, isCustom: true },
  ];

  const calendarDays = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, null],
  ];

  // Flow steps
  const steps = [
    {
      label: "Inbox View",
      description: "View conversations",
    },
    {
      label: "Schedule Modal",
      description: "Pick date & time",
    },
    {
      label: "Send Options",
      description: "Send & snooze menu",
    },
    {
      label: "Snooze Picker",
      description: "Set snooze time",
    },
    { label: "Message Sent", description: "Confirmation" },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
    setShowScheduleModal(step === 1);
    setShowSendDropdown(step === 2);
    setShowSnoozeModal(step === 3);
    if (step === 4) {
      setScheduledMessages([
        {
          text: "Hey 👋 welcome! ChatOne is a creative UI space — kind of like a playground for trying out design ideas and building quick mockups.",
          time: "4m",
        },
      ]);
      setSnoozedCount(1);
    }
  };

  // Handle chevron click to toggle dropdown
  const handleChevronClick = (e) => {
    e.stopPropagation();
    setShowSendDropdown(!showSendDropdown);
  };

  // Handle send button click (not the chevron)
  const handleSendClick = () => {
    // Just send the message without opening dropdown
    if (currentStep < 4) {
      handleStepChange(4);
    }
  };

  // Handle custom option click to open schedule modal
  const handleCustomClick = () => {
    setShowSendDropdown(false);
    setShowScheduleModal(true);
    setCurrentStep(1);
  };

  // Handle snooze option click
  const handleSnoozeOptionClick = (option) => {
    if (option.isCustom) {
      handleCustomClick();
    } else {
      // For non-custom options, you could implement quick snooze logic here
      setShowSendDropdown(false);
    }
  };

  const currentMessages = [
    {
      type: "incoming",
      text: "Hi there, i just came accross ChatOne. What do you guys do?",
      time: "8m",
      platform: "facebook",
    },
    {
      type: "outgoing",
      text: "ChatOne will be back tomorrow.",
      time: "8m",
      isBot: true,
    },
    {
      type: "system",
      text: "You'll get a notification when they reply.",
      time: "8m",
    },
    ...(currentStep === 4
      ? [
          {
            type: "outgoing",
            text: "Hey 👋 welcome! ChatOne is a creative UI space — kind of like a playground for trying out design ideas and building quick mockups.",
            time: "4m",
            isAgent: true,
          },
        ]
      : []),
  ];

  return (
    <div
      className="h-screen w-full flex flex-col overflow-hidden"
      style={{
        fontFamily:
          "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#fafafa",
      }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
        
        :root {
          --lavender-50: #f5f3ff;
          --lavender-100: #ede9fe;
          --lavender-200: #ddd6fe;
          --lavender-300: #c4b5fd;
          --lavender-400: #a78bfa;
          --lavender-500: #8b5cf6;
          --slate-50: #f8fafc;
          --slate-100: #f1f5f9;
          --slate-200: #e2e8f0;
          --slate-300: #cbd5e1;
          --slate-400: #94a3b8;
          --slate-500: #64748b;
          --slate-600: #475569;
          --slate-700: #334155;
          --slate-800: #1e293b;
          --slate-900: #0f172a;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: var(--slate-200);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: var(--slate-300);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.25s ease-out; }
      `}</style>

      {/* Top Banner */}
      <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between text-sm shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-slate-300">You have</span>
          <span className="font-semibold">8 days left</span>
          <span className="text-slate-300">in your</span>
          <span className="text-violet-400 underline underline-offset-2 cursor-pointer hover:text-violet-300 transition-colors">
            Advanced trial
          </span>
          <span className="text-slate-300">
            . Includes unlimited AI usage.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-slate-300 hover:text-white transition-colors">
            Talk to a product specialist
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 px-4 py-1.5 rounded-md font-medium transition-colors">
            Buy ChatOne
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Icon Sidebar */}
        <div className="w-14 bg-gradient-to-b from-violet-50 to-violet-100/50 border-r border-violet-100 flex flex-col items-center py-4 gap-1 shrink-0">
          <button className="w-9 h-9 rounded-lg bg-violet-500 text-white flex items-center justify-center mb-4 shadow-md shadow-violet-200">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-lg text-violet-600 hover:bg-violet-200/50 flex items-center justify-center relative transition-colors">
            <Inbox className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
              5
            </span>
          </button>
          <button className="w-9 h-9 rounded-lg text-slate-400 hover:bg-violet-200/50 flex items-center justify-center transition-colors">
            <Sparkles className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-lg text-slate-400 hover:bg-violet-200/50 flex items-center justify-center transition-colors">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-lg text-slate-400 hover:bg-violet-200/50 flex items-center justify-center transition-colors">
            <Users className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <button className="w-9 h-9 rounded-lg text-slate-400 hover:bg-violet-200/50 flex items-center justify-center transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-lg text-slate-400 hover:bg-violet-200/50 flex items-center justify-center transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Left Sidebar */}
        <div className="w-60 bg-gradient-to-b from-violet-50/80 to-violet-100/30 border-r border-violet-100 flex flex-col shrink-0">
          {/* Inbox Header */}
          <div className="p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Inbox
            </h2>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-md hover:bg-violet-200/50 flex items-center justify-center text-slate-500 transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 rounded-md hover:bg-violet-200/50 flex items-center justify-center text-slate-500 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Inbox Items */}
          <div className="px-2 space-y-0.5">
            {inboxItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-white/70 text-slate-800 shadow-sm"
                    : "text-slate-600 hover:bg-white/50"
                }`}>
                <item.icon className="w-4 h-4 text-slate-400" />
                <span className="flex-1 text-left">
                  {item.label}
                </span>
                {item.count !== null && (
                  <span className="text-slate-400 text-xs">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* AI Agent Section */}
          <div className="mt-4">
            <button
              onClick={() => toggleSection("aiAgent")}
              className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-slate-600 hover:bg-white/30 transition-colors">
              <span className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-violet-500" />
                AI Agent
              </span>
              <div className="flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-slate-400" />
                {expandedSections.aiAgent ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
            </button>
            {expandedSections.aiAgent && (
              <div className="px-2 space-y-0.5 animate-fadeIn">
                {aiAgentItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-white/50 transition-colors">
                    <item.icon className="w-4 h-4 text-slate-400" />
                    <span className="flex-1 text-left">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Team Inboxes */}
          <div className="mt-2">
            <button
              onClick={() => toggleSection("teamInboxes")}
              className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-slate-600 hover:bg-white/30 transition-colors">
              <span>Team inboxes</span>
              {expandedSections.teamInboxes ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {expandedSections.teamInboxes && (
              <div className="px-2 animate-fadeIn">
                <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-white/50 transition-colors">
                  <span className="w-4 h-4 rounded bg-amber-400 flex items-center justify-center text-white text-[10px] font-bold">
                    A
                  </span>
                  <span className="flex-1 text-left">
                    Admin Support
                  </span>
                  <span className="text-slate-400 text-xs">
                    0
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Teammates */}
          <div className="mt-2">
            <button
              onClick={() => toggleSection("teammates")}
              className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-slate-600 hover:bg-white/30 transition-colors">
              <span>Teammates</span>
              <div className="flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-slate-400" />
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </button>
          </div>

          {/* Views */}
          <div className="mt-2">
            <button
              onClick={() => toggleSection("views")}
              className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-slate-600 hover:bg-white/30 transition-colors">
              <span>Views</span>
              {expandedSections.views ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {expandedSections.views && (
              <div className="px-2 space-y-0.5 animate-fadeIn">
                <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-white/50 transition-colors">
                  <MessageCircle className="w-4 h-4 text-slate-400" />
                  <span className="flex-1 text-left">
                    Messenger
                  </span>
                  <span className="text-slate-400 text-xs">
                    1
                  </span>
                </button>
                <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-white/50 transition-colors">
                  <AtSign className="w-4 h-4 text-slate-400" />
                  <span className="flex-1 text-left">
                    Email
                  </span>
                  <span className="text-slate-400 text-xs">
                    1
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="flex-1" />

          {/* Get Set Up Card */}
          <div className="m-3 p-3 bg-slate-800 rounded-xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-sm">
                Get set up
              </span>
              <ChevronUp className="w-4 h-4 ml-auto text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Add content to power your AI and Help Center
            </p>
          </div>

          {/* Manage */}
          <button className="mx-3 mb-3 flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-white/50 rounded-lg transition-colors">
            <Menu className="w-4 h-4" />
            Manage
          </button>
        </div>

        {/* Conversation List */}
        <div className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0">
          {/* List Header */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <User className="w-4 h-4 text-violet-600" />
            </div>
            <span className="font-semibold text-slate-800">
              Jack Potts
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="px-4 py-3 flex items-center gap-4 border-b border-slate-100">
            <button className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
              {snoozedCount > 0
                ? `${snoozedCount} Snoozed`
                : "5 Open"}
            </button>
            <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
              Last activity
            </button>
            <button className="ml-auto text-slate-400 hover:text-slate-600 transition-colors">
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() =>
                  setSelectedConversation(conv.id)
                }
                className={`w-full p-3 flex items-start gap-3 border-b border-slate-50 transition-colors ${
                  selectedConversation === conv.id
                    ? "bg-violet-50"
                    : "hover:bg-slate-50"
                }`}>
                {snoozedCount > 0 && conv.id === "brook" ? (
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full ${conv.avatarBg} flex items-center justify-center text-white text-sm font-medium shrink-0`}>
                    {conv.avatar}
                  </div>
                )}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800 truncate text-sm">
                      {conv.name}
                    </span>
                    {conv.starred && (
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {conv.hasQuestion && (
                      <span className="w-1 h-4 bg-amber-400 rounded-full shrink-0" />
                    )}
                    <span className="text-sm text-slate-500 truncate">
                      {conv.preview}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 shrink-0">
                  {conv.time}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-50/50 relative min-w-0">
          {/* Chat Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4 shrink-0">
            <h2 className="text-lg font-semibold text-slate-800">
              Brook Taylor
            </h2>
            <div className="flex items-center gap-2 ml-auto">
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <Star
                  className={`w-4 h-4 ${
                    conversations[0].starred
                      ? "text-amber-400 fill-amber-400"
                      : ""
                  }`}
                />
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <Video className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <Moon className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {currentMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "incoming"
                    ? "justify-start"
                    : "justify-end"
                } animate-slideUp`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}>
                {msg.type === "incoming" && (
                  <div className="flex items-end gap-2 max-w-lg">
                    <div className="w-8 h-8 rounded-full bg-rose-400 flex items-center justify-center text-white text-sm font-medium shrink-0">
                      B
                    </div>
                    <div>
                      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-slate-100">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 ml-1">
                        <Facebook className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs text-slate-400">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {msg.type === "outgoing" && (
                  <div className="flex items-end gap-2 max-w-lg">
                    <div>
                      <div className="bg-slate-800 rounded-2xl rounded-br-md px-4 py-3">
                        <p className="text-sm text-white leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-1 mr-1">
                        <span className="text-xs text-slate-400">
                          Sent • {msg.time}
                        </span>
                        {msg.isBot && (
                          <div className="w-5 h-5 rounded bg-violet-100 flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-violet-500" />
                          </div>
                        )}
                        {msg.isAgent && (
                          <div className="w-5 h-5 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {msg.type === "system" && (
                  <div className="flex items-end gap-2 max-w-lg">
                    <div>
                      <div className="bg-violet-100 rounded-2xl rounded-br-md px-4 py-3">
                        <p className="text-sm text-violet-700 leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-1 mr-1">
                        <span className="text-xs text-slate-400">
                          Sent • {msg.time}
                        </span>
                        <div className="w-5 h-5 rounded bg-violet-100 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-violet-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="bg-white border-t border-slate-200 p-4 shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Facebook className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-600">
                Facebook
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm text-slate-500">
                {currentStep === 4
                  ? "Use ⌘K for shortcuts"
                  : "Hey 👋 welcome! ChatOne is a creative UI space — kind of like a playground for trying out design ideas and building quick mockups."}
              </p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-colors">
                  <Zap className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <GitBranch className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <div className="flex items-center">
                  {/* Send Button */}
                  <button
                    onClick={handleSendClick}
                    className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-l-lg font-medium text-sm transition-colors">
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                  {/* Chevron Button - Separate clickable area */}
                  <button
                    onClick={handleChevronClick}
                    className="flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white px-2 py-2 rounded-r-lg border-l border-violet-400/50 transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${showSendDropdown ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* Send Dropdown */}
                {showSendDropdown && (
                  <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 animate-scaleIn z-50">
                    {/* Send and close */}
                    <button className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <GitBranch className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-800">
                          Send and close
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs text-slate-500 font-medium">
                          ⌘
                        </span>
                        <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs text-slate-500 font-medium">
                          Shift
                        </span>
                        <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs text-slate-500 font-medium">
                          Enter
                        </span>
                      </div>
                    </button>

                    <div className="h-px bg-slate-100 my-2" />

                    {/* Send and snooze header */}
                    <div className="px-4 py-2">
                      <span className="text-sm text-slate-500">
                        Send and snooze
                      </span>
                    </div>

                    {/* Snooze options */}
                    {snoozeOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleSnoozeOptionClick(option)
                        }
                        className={`w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          option.isCustom
                            ? "text-violet-600 font-medium"
                            : ""
                        }`}>
                        <span
                          className={`text-sm ${option.isCustom ? "text-violet-600" : "text-slate-700"}`}>
                          {option.label}
                        </span>
                        {option.shortcut && (
                          <div className="flex items-center gap-1">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs text-slate-500 font-medium">
                              ⌘
                            </span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs text-slate-500 font-medium">
                              ⌥
                            </span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs text-slate-500 font-medium">
                              Enter
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Click outside to close dropdown */}
          {showSendDropdown && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowSendDropdown(false)}
            />
          )}

          {/* Schedule Modal (Step 1) */}
          {showScheduleModal && (
            <div
              className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 animate-fadeIn"
              onClick={() => setShowScheduleModal(false)}>
              <div
                className="bg-white rounded-2xl shadow-2xl w-[520px] overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-500">
                    Try:
                  </span>
                  <span className="text-slate-700">
                    1 minute, 1 hour, 1 day, 1 week
                  </span>
                </div>

                {/* Calendar + Times */}
                <div className="flex">
                  {/* Calendar */}
                  <div className="flex-1 p-5 border-r border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-slate-700">
                        {selectedMonth} {selectedYear}
                      </span>
                      <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Days Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {[
                        "Su",
                        "Mo",
                        "Tu",
                        "We",
                        "Th",
                        "Fr",
                        "Sa",
                      ].map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-slate-400 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="space-y-1">
                      {calendarDays.map(
                        (week, weekIndex) => (
                          <div
                            key={weekIndex}
                            className="grid grid-cols-7 gap-1">
                            {week.map((day, dayIndex) => (
                              <button
                                key={dayIndex}
                                onClick={() =>
                                  day &&
                                  setSelectedDate(day)
                                }
                                disabled={!day}
                                className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                                  day === selectedDate
                                    ? "bg-slate-800 text-white font-medium"
                                    : day
                                      ? "text-slate-600 hover:bg-slate-100"
                                      : "text-transparent"
                                }`}>
                                {day || ""}
                              </button>
                            ))}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className="w-40 p-4">
                    <div className="space-y-1">
                      {times.map((time) => (
                        <button
                          key={time}
                          onClick={() =>
                            setSelectedTime(time)
                          }
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedTime === time
                              ? "bg-slate-100 text-slate-800 font-medium"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}>
                          <Clock className="w-4 h-4 text-slate-400" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-6 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        ↑
                      </span>
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        ↓
                      </span>
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        ←
                      </span>
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        →
                      </span>
                      <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>to select</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        Esc
                      </span>
                      <span>to close</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowScheduleModal(false);
                      handleStepChange(4);
                    }}
                    className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
                    <Clock className="w-4 h-4" />
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Snooze Modal (Step 3) */}
          {showSnoozeModal && (
            <div
              className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 animate-fadeIn"
              onClick={() => setShowSnoozeModal(false)}>
              <div
                className="bg-white rounded-2xl shadow-2xl w-[520px] overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-700 font-medium">
                    Snooze until Jan {selectedDate}{" "}
                    {selectedYear}
                  </span>
                </div>

                {/* Calendar + Times */}
                <div className="flex">
                  {/* Calendar */}
                  <div className="flex-1 p-5 border-r border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-slate-700">
                        {selectedMonth} {selectedYear}
                      </span>
                      <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Days Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {[
                        "Su",
                        "Mo",
                        "Tu",
                        "We",
                        "Th",
                        "Fr",
                        "Sa",
                      ].map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-slate-400 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="space-y-1">
                      {calendarDays.map(
                        (week, weekIndex) => (
                          <div
                            key={weekIndex}
                            className="grid grid-cols-7 gap-1">
                            {week.map((day, dayIndex) => (
                              <button
                                key={dayIndex}
                                onClick={() =>
                                  day &&
                                  setSelectedDate(day)
                                }
                                disabled={!day}
                                className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                                  day === selectedDate
                                    ? "bg-slate-800 text-white font-medium"
                                    : day
                                      ? "text-slate-600 hover:bg-slate-100"
                                      : "text-transparent"
                                }`}>
                                {day || ""}
                              </button>
                            ))}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className="w-40 p-4">
                    <div className="space-y-1">
                      {snoozeTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() =>
                            setSelectedTime(time)
                          }
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedTime === time
                              ? "bg-slate-100 text-slate-800 font-medium"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}>
                          <Clock className="w-4 h-4 text-slate-400" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-6 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        ↑
                      </span>
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        ↓
                      </span>
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        ←
                      </span>
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        →
                      </span>
                      <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>to select</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600">
                        Esc
                      </span>
                      <span>to close</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStepChange(4)}
                    className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
                    <Clock className="w-4 h-4" />
                    Snooze
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Details Panel */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col overflow-y-auto scrollbar-thin shrink-0">
          {/* Tabs */}
          <div className="flex items-center border-b border-slate-200 px-4">
            <button className="py-3 px-3 text-sm font-medium text-slate-800 border-b-2 border-violet-500">
              Details
            </button>
            <button className="py-3 px-3 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
              Copilot
            </button>
            <div className="ml-auto flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assignee */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-500">
                Assignee
              </span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-500" />
                <span className="text-sm font-medium text-slate-700">
                  Jack Potts
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Team Inbox
              </span>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-amber-400 flex items-center justify-center text-white text-[10px] font-bold">
                  A
                </span>
                <span className="text-sm text-slate-700">
                  Admin Support
                </span>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="border-b border-slate-100">
            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">
                  Links
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <div className="px-4 pb-4 space-y-2">
              <button className="w-full flex items-center justify-between py-2 hover:text-violet-600 transition-colors">
                <span className="text-sm text-slate-600">
                  Tracker ticket
                </span>
                <Plus className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between py-2 hover:text-violet-600 transition-colors">
                <span className="text-sm text-slate-600">
                  Back-office tickets
                </span>
                <Plus className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between py-2 hover:text-violet-600 transition-colors">
                <span className="text-sm text-slate-600">
                  Side conversations
                </span>
                <Plus className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Conversation Attributes */}
          <div className="border-b border-slate-100">
            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">
                  Conversation attributes
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <div className="px-4 pb-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  ID
                </span>
                <span
                  className="text-sm text-slate-700"
                  style={{
                    fontFamily:
                      "'JetBrains Mono', monospace",
                  }}>
                  215471062845035
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Company
                </span>
                <span className="text-sm text-slate-400">
                  —
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Brand
                </span>
                <span className="text-sm text-slate-700">
                  Frozti
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Subject
                </span>
                <button className="text-sm text-slate-400 hover:text-violet-600 transition-colors">
                  + Add
                </button>
              </div>
              <button className="text-sm text-violet-600 font-medium">
                See all
              </button>
              <div>
                <span className="text-sm text-slate-500">
                  Topics
                </span>
                <button className="mt-2 w-7 h-7 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-violet-400 hover:text-violet-500 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Lead Data */}
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">
                Lead data
              </span>
            </div>
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </button>

          {/* Recent Conversations */}
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">
                Recent conversations
              </span>
            </div>
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </button>

          {/* Lead Notes */}
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">
                Lead notes
              </span>
            </div>
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </button>

          {/* Lead Tags */}
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">
                Lead tags
              </span>
            </div>
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </button>

          {/* Lead Segments */}
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">
                Lead segments
              </span>
            </div>
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
