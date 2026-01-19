"use client";

import {
  ArrowDown,
  BarChart3,
  Bell,
  Bold,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Code,
  Crown,
  Handshake,
  HelpCircle,
  Italic,
  LayoutGrid,
  Mail,
  Plus,
  Search,
  Settings,
  Underline,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

export default function CRMOneMessageComposer() {
  // State
  const [sidebarSections, setSidebarSections] = useState({
    partnerships: true,
    shared: true,
    private: true,
  });
  const [selectedNav, setSelectedNav] =
    useState("partnerships");
  const [showMigrationBanner, setShowMigrationBanner] =
    useState(true);
  const [emailSubject, setEmailSubject] = useState(
    "Let's Connect: Frozti x [Recipient Company Name]",
  );
  const [showVariablePicker, setShowVariablePicker] =
    useState(false);
  const [
    variablePickerPosition,
    setVariablePickerPosition,
  ] = useState({
    top: 0,
    left: 0,
  });
  const [variableSearchQuery, setVariableSearchQuery] =
    useState("");
  const [savedStatus, setSavedStatus] = useState("Saved");
  const editorRef = useRef(null);

  // Data
  const [recipients, setRecipients] = useState([
    { id: 1, name: "JD", color: "#3b82f6" },
    { id: 2, name: "AK", color: "#22c55e" },
  ]);

  const [emailContent, setEmailContent] = useState([
    { type: "text", content: "Dear " },
    { type: "variable", content: "Name" },
    { type: "text", content: ",\n\n" },
    {
      type: "text",
      content:
        "I'm Sam, a product designer at Frozti, where we curate and analyze the best design patterns from leading apps to inspire and guide product teams. As someone passionate about empowering great design, I've noticed ",
    },
    { type: "variable", content: "Name" },
    {
      type: "text",
      content:
        "'s innovative approach to user engagement.\n\nI believe there's a lot of potential for collaboration between our teams, whether it's exchanging insights, exploring joint projects, or simply connecting to share perspectives on the future of design and user experience.\n\nWould you be open to a short call or meeting to explore opportunities? I'd be happy to accommodate your schedule and can share more about how Frozti helps teams like yours create exceptional digital experiences.\n\nLooking forward to connecting!\n\nBest regards,\n\nSam Lee\nProduct Designer, ",
    },
    { type: "underline", content: "Frozti" },
  ]);

  const [variables, setVariables] = useState([
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
    { id: "deal_description", label: "Deal description" },
    { id: "company", label: "Company" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
  ]);

  const navItems = [
    { id: "search", label: "Search", icon: Search },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      badge: 1,
    },
    { id: "messages", label: "Messages", icon: Mail },
    {
      id: "dashboards",
      label: "Dashboards",
      icon: BarChart3,
      beta: true,
    },
    {
      id: "settings",
      label: "Settings & members",
      icon: Settings,
    },
  ];

  const partnershipItems = [
    {
      id: "all-partners",
      label: "All partners",
      icon: Users,
    },
    {
      id: "partnership-process",
      label: "Partnership process",
      icon: LayoutGrid,
    },
    { id: "all-people", label: "All people", icon: Users },
    {
      id: "all-companies",
      label: "All companies",
      icon: Building2,
    },
    {
      id: "kanban",
      label: "Kanban view",
      icon: LayoutGrid,
    },
    {
      id: "new-view",
      label: "New view",
      icon: Plus,
      isAction: true,
    },
  ];

  // Derived
  const filteredVariables = variables.filter((v) =>
    v.label
      .toLowerCase()
      .includes(variableSearchQuery.toLowerCase()),
  );

  // Handlers
  const toggleSection = (section) => {
    setSidebarSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleVariableClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setVariablePickerPosition({
      top: rect.bottom + 8,
      left: rect.left,
    });
    setShowVariablePicker(true);
  };

  const insertVariable = (variable) => {
    setShowVariablePicker(false);
    setVariableSearchQuery("");
  };

  const closeVariablePicker = () => {
    setShowVariablePicker(false);
    setVariableSearchQuery("");
  };

  // UI
  return (
    <div
      className="min-h-screen flex bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .slide-in {
          animation: slideIn 0.25s ease-out forwards;
        }
        
        .sidebar-item {
          transition: all 0.15s ease;
        }
        
        .sidebar-item:hover {
          background: #f5f5f5;
        }
        
        .sidebar-item.active {
          background: #f5f5f5;
        }
        
        .variable-pill {
          display: inline-flex;
          align-items: center;
          background: #f5f5f5;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          padding: 1px 6px;
          font-size: 14px;
          color: #525252;
          margin: 0 2px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        
        .variable-pill:hover {
          background: #ebebeb;
          border-color: #d4d4d4;
        }
        
        .editor-content {
          outline: none;
          white-space: pre-wrap;
          line-height: 1.7;
        }
        
        .editor-content:focus {
          outline: none;
        }
        
        .btn-primary {
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          background: #262626;
        }
        
        .dropdown-item {
          transition: background 0.1s ease;
        }
        
        .dropdown-item:hover {
          background: #f5f5f5;
        }
        
        .format-btn {
          transition: all 0.15s ease;
        }
        
        .format-btn:hover {
          background: #f5f5f5;
        }
        
        .migration-banner {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* Sidebar */}
      <aside className="w-56 border-r border-neutral-200 flex flex-col h-screen sticky top-0">
        {/* Logo & Workspace */}
        <div className="p-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                SL
              </span>
            </div>
            <span className="text-sm font-medium text-neutral-900">
              Frozti
            </span>
            <ChevronDown className="w-4 h-4 text-neutral-400 ml-auto" />
          </div>
        </div>

        {/* Premium Trial */}
        <div className="px-4 py-3 border-b border-neutral-100">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
            <Crown className="w-4 h-4" />
            <span>Premium trial</span>
            <span className="text-neutral-400">
              (1 week left)
            </span>
          </div>
          <button className="btn-primary w-full py-1.5 bg-neutral-900 text-white text-sm font-medium rounded-md">
            Subscribe
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {/* Primary Nav */}
          <div className="px-2 space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedNav(item.id)}
                className={`sidebar-item w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm ${
                  selectedNav === item.id
                    ? "active text-neutral-900"
                    : "text-neutral-600"
                }`}>
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                {item.beta && (
                  <span className="ml-auto px-1.5 py-0.5 bg-neutral-900 text-white text-xs font-medium rounded">
                    Beta
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Shared to everyone */}
          <div className="mt-4 px-2">
            <p className="px-2 py-1 text-xs text-neutral-400 font-medium">
              Shared to everyone
            </p>

            {/* Partnerships Section */}
            <div className="mt-1">
              <button
                onClick={() =>
                  toggleSection("partnerships")
                }
                className="sidebar-item w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-neutral-900 font-medium">
                <Handshake className="w-4 h-4 text-amber-500" />
                <span>Partnerships</span>
                <ChevronRight
                  className={`w-4 h-4 text-neutral-400 ml-auto transition-transform ${
                    sidebarSections.partnerships
                      ? "rotate-90"
                      : ""
                  }`}
                />
              </button>

              {sidebarSections.partnerships && (
                <div className="ml-4 mt-0.5 space-y-0.5 fade-in">
                  {partnershipItems.map((item) => (
                    <button
                      key={item.id}
                      className={`sidebar-item w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${
                        item.isAction
                          ? "text-neutral-400"
                          : "text-neutral-600"
                      }`}>
                      {item.isAction ? (
                        <Plus className="w-4 h-4" />
                      ) : (
                        <item.icon className="w-4 h-4 text-neutral-400" />
                      )}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sales Pipeline */}
            <button className="sidebar-item w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-neutral-600 mt-1">
              <CircleDot className="w-4 h-4 text-yellow-500" />
              <span>Sales pipeline</span>
            </button>
          </div>

          {/* Shared Section */}
          <div className="mt-4 px-2">
            <p className="px-2 py-1 text-xs text-neutral-400 font-medium">
              Shared
            </p>
            <button className="sidebar-item w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-neutral-600">
              <span className="text-purple-500">•••</span>
              <span>Recruitment pipeline</span>
            </button>
          </div>

          {/* Private Section */}
          <div className="mt-4 px-2">
            <p className="px-2 py-1 text-xs text-neutral-400 font-medium">
              Private
            </p>
            <button className="sidebar-item w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-neutral-600">
              <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs">
                  F
                </span>
              </div>
              <span>Founders</span>
            </button>
            <button className="sidebar-item w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-neutral-400">
              <Plus className="w-4 h-4" />
              <span>New group</span>
            </button>
          </div>
        </nav>

        {/* Migration Banner */}
        {showMigrationBanner && (
          <div className="p-4 border-t border-neutral-100 migration-banner">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-neutral-900">
                Migrate from another CRM
              </p>
              <button
                onClick={() =>
                  setShowMigrationBanner(false)
                }
                className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-neutral-500 mb-3">
              We'll assist with importing your contacts and
              facilitate the migration process.
            </p>
            <button className="btn-primary w-full py-1.5 bg-neutral-900 text-white text-sm font-medium rounded-md">
              Start migration
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h1
              className="text-xl font-medium text-neutral-900"
              style={{ fontFamily: "'Newsreader', serif" }}>
              New message
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-400">
              {savedStatus}
            </span>
            <button className="btn-primary px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg flex items-center gap-2">
              Review (12)
            </button>
          </div>
        </header>

        {/* Email Composer */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
              {/* From Field */}
              <div className="flex items-center gap-4 px-6 py-4 border-b border-neutral-100">
                <span className="text-sm text-neutral-400 w-12">
                  From
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      S
                    </span>
                  </div>
                  <span className="text-sm font-medium text-neutral-900">
                    Sam Lee
                  </span>
                  <span className="text-sm text-neutral-400">
                    samlee@content-frozti.com
                  </span>
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </div>
              </div>

              {/* To Field */}
              <div className="flex items-center gap-4 px-6 py-4 border-b border-neutral-100">
                <span className="text-sm text-neutral-400 w-12">
                  To
                </span>
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex -space-x-1">
                    {recipients.map((r) => (
                      <div
                        key={r.id}
                        className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white"
                        style={{
                          backgroundColor: r.color,
                        }}>
                        {r.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-neutral-900 font-medium">
                    12 recipients
                  </span>
                  <span className="text-sm text-neutral-400">
                    (each message will be sent individually)
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
                    Cc
                  </button>
                  <button className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
                    Bcc
                  </button>
                </div>
              </div>

              {/* Subject Field */}
              <div className="px-6 py-4 border-b border-neutral-100">
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) =>
                    setEmailSubject(e.target.value)
                  }
                  className="w-full text-sm text-neutral-900 font-medium outline-none placeholder:text-neutral-400"
                  placeholder="Subject"
                />
              </div>

              {/* Email Body */}
              <div className="px-6 py-6 min-h-96 relative">
                <div
                  ref={editorRef}
                  className="editor-content text-sm text-neutral-700">
                  <p className="mb-4">
                    Dear{" "}
                    <span
                      className="variable-pill"
                      onClick={handleVariableClick}>
                      Name
                    </span>
                    ,
                  </p>
                  <p className="mb-4">
                    I'm Sam, a product designer at Frozti,
                    where we curate and analyze the best
                    design patterns from leading apps to
                    inspire and guide product teams. As
                    someone passionate about empowering
                    great design, I've noticed{" "}
                    <span
                      className="variable-pill"
                      onClick={handleVariableClick}>
                      Name
                    </span>
                    's innovative approach to user
                    engagement.
                  </p>
                  <p className="mb-4">
                    I believe there's a lot of potential for
                    collaboration between our teams, whether
                    it's exchanging insights, exploring
                    joint projects, or simply connecting to
                    share perspectives on the future of
                    design and user experience.
                  </p>
                  <p className="mb-4">
                    Would you be open to a short call or
                    meeting to explore opportunities? I'd be
                    happy to accommodate your schedule and
                    can share more about how Frozti helps
                    teams like yours create exceptional
                    digital experiences.
                  </p>
                  <p className="mb-4">
                    Looking forward to connecting!
                  </p>
                  <p className="mb-4">Best regards,</p>
                  <p className="mb-1">Sam Lee</p>
                  <p>
                    Product Designer,{" "}
                    <span className="underline">
                      Frozti
                    </span>
                  </p>
                </div>

                {/* Variable Picker Dropdown */}
                {showVariablePicker && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={closeVariablePicker}
                    />
                    <div
                      className="absolute z-50 w-64 bg-white rounded-lg border border-neutral-200 shadow-lg slide-in"
                      style={{
                        top:
                          variablePickerPosition.top - 200,
                        left: 100,
                      }}>
                      {/* Search */}
                      <div className="p-2 border-b border-neutral-100">
                        <div className="flex items-center gap-2 px-2 py-1.5 bg-neutral-50 rounded-md">
                          <Search className="w-4 h-4 text-neutral-400" />
                          <input
                            type="text"
                            value={variableSearchQuery}
                            onChange={(e) =>
                              setVariableSearchQuery(
                                e.target.value,
                              )
                            }
                            placeholder="Search"
                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Variable List */}
                      <div className="p-1">
                        <p className="px-2 py-1.5 text-xs text-neutral-400">
                          Select a variable
                        </p>
                        {filteredVariables.map(
                          (variable) => (
                            <button
                              key={variable.id}
                              onClick={() =>
                                insertVariable(variable)
                              }
                              className="dropdown-item w-full text-left px-2 py-2 text-sm text-neutral-700 rounded-md">
                              {variable.label}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Formatting Toolbar */}
              <div className="px-6 py-3 border-t border-neutral-100 flex items-center gap-1">
                <button className="format-btn p-2 rounded-md text-neutral-400 hover:text-neutral-600">
                  <Code className="w-4 h-4" />
                </button>
                <button className="format-btn p-2 rounded-md text-neutral-400 hover:text-neutral-600">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="format-btn p-2 rounded-md text-neutral-400 hover:text-neutral-600">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="format-btn p-2 rounded-md text-neutral-400 hover:text-neutral-600">
                  <Underline className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* New Step Button */}
            <div className="flex flex-col items-center mt-6">
              <div className="w-px h-8 bg-neutral-200" />
              <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
                <ArrowDown className="w-4 h-4" />
                <span>New step</span>
              </button>
            </div>
          </div>
        </div>

        {/* Help Button */}
        <button className="fixed bottom-6 right-6 w-10 h-10 bg-white border border-neutral-200 rounded-full shadow-sm flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:shadow-md transition-all">
          <HelpCircle className="w-5 h-5" />
        </button>
      </main>
    </div>
  );
}
