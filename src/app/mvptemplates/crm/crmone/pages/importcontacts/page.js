"use client";

import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  Columns,
  Download,
  EyeOff,
  FileSpreadsheet,
  Filter,
  Handshake,
  List,
  Mail,
  MoreHorizontal,
  PartyPopper,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Smile,
  Sparkles,
  Table,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export default function CRMOneImportFlow() {
  // State
  const [currentStep, setCurrentStep] = useState("empty"); // "empty" | "dropdown" | "mapping-loading" | "mapping" | "preview" | "importing" | "complete" | "list"
  const [importDropdownOpen, setImportDropdownOpen] =
    useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [selectedFieldIndex, setSelectedFieldIndex] =
    useState(6); // Phone Number selected by default
  const [sidebarExpanded, setSidebarExpanded] =
    useState(true);

  // Sample data
  const pipelineStages = [
    { name: "No status", count: 0 },
    { name: "Resume submitted", count: 0 },
    { name: "Team interview", count: 0 },
    { name: "Manager interview", count: 0 },
    { name: "Ref check", count: 0 },
  ];

  const fieldMappings = [
    { incoming: "Full Name", destination: "First name" },
    { incoming: "Record ID", destination: "Record ID" },
    { incoming: "Email Address", destination: "Email 1" },
    { incoming: "Company", destination: "Company" },
    { incoming: "Description", destination: "Description" },
    { incoming: "Job Title", destination: "Job title" },
    { incoming: "Phone Number", destination: "Phone 1" },
    {
      incoming: "Primary Location",
      destination: "Primary Location",
    },
    { incoming: "Status", destination: "Status" },
  ];

  const phonePreviewData = [
    "(555) 123-4567",
    "(555) 234-5678",
    "(555) 345-6789",
    "(555) 456-7890",
    "(555) 567-8901",
    "(555) 678-9012",
    "(555) 789-0123",
    "(555) 890-1234",
    "(555) 901-2345",
    "(555) 012-3456",
  ];

  const contactsPreview = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      description: "Lead interested in product A",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Potts",
      description: "Requested a demo for service B",
      email: "jane.potts@example.com",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      description: "Needs follow-up on proposal",
      email: "alice.johnson@example.com",
    },
    {
      id: 4,
      firstName: "Bob",
      lastName: "Brown",
      description: "Inquired about pricing",
      email: "bob.brown@example.com",
    },
    {
      id: 5,
      firstName: "Carol",
      lastName: "White",
      description: "Scheduled a meeting for next ...",
      email: "carol.white@example.com",
    },
    {
      id: 6,
      firstName: "David",
      lastName: "Green",
      description: "Completed initial consultation",
      email: "david.green@example.com",
    },
    {
      id: 7,
      firstName: "Eva",
      lastName: "Black",
      description: "Interested in bulk purchase",
      email: "eva.black@example.com",
    },
    {
      id: 8,
      firstName: "Frank",
      lastName: "Gray",
      description: "Reviewing contract terms",
      email: "frank.gray@example.com",
    },
    {
      id: 9,
      firstName: "Grace",
      lastName: "Lewis",
      description: "Requested additional informati...",
      email: "grace.lewis@example.com",
    },
    {
      id: 10,
      firstName: "Henry",
      lastName: "Scott",
      description: "In review for upcoming project",
      email: "henry.scott@example.com",
    },
    {
      id: 11,
      firstName: "Irene",
      lastName: "Adams",
      description: "New lead from referral",
      email: "irene.adams@example.com",
    },
    {
      id: 12,
      firstName: "Jack",
      lastName: "Wilson",
      description: "Requested a price quote",
      email: "jack.wilson@example.com",
    },
    {
      id: 13,
      firstName: "Kathy",
      lastName: "Brown",
      description: "Interested in a demo",
      email: "kathy.brown@example.com",
    },
    {
      id: 14,
      firstName: "Liam",
      lastName: "Harris",
      description: "Follow-up needed on service i...",
      email: "liam.harris@example.com",
    },
    {
      id: 15,
      firstName: "Mia",
      lastName: "Martinez",
      description: "Client needs contract review",
      email: "mia.martinez@example.com",
    },
    {
      id: 16,
      firstName: "Noah",
      lastName: "Lee",
      description: "Scheduled follow-up meeting",
      email: "noah.lee@example.com",
    },
    {
      id: 17,
      firstName: "Olivia",
      lastName: "Clark",
      description: "Inquiring about partnership",
      email: "olivia.clark@example.com",
    },
    {
      id: 18,
      firstName: "Paul",
      lastName: "Turner",
      description: "Decision-maker for tech purch...",
      email: "paul.turner@example.com",
    },
    {
      id: 19,
      firstName: "Quinn",
      lastName: "Davis",
      description: "Needs further negotiation on t...",
      email: "quinn.davis@example.com",
    },
    {
      id: 20,
      firstName: "Rachel",
      lastName: "Evans",
      description: "Referred by existing client",
      email: "rachel.evans@example.com",
    },
  ];

  const finalApplicants = [
    {
      initials: "S",
      name: "Steve Martin",
      email: "steve.martin@example.com",
      title: "Business Developmen...",
      interaction: "No interactions",
    },
    {
      initials: "M",
      name: "Mia Martinez",
      email: "mia.martinez@example.com",
      title: "Legal Advisor",
      interaction: "No interactions",
    },
    {
      initials: "I",
      name: "Irene Adams",
      email: "irene.adams@example.com",
      title: "Regional Director",
      interaction: "No interactions",
    },
    {
      initials: "T",
      name: "Tina Wilson",
      email: "tina.wilson@example.com",
      title: "Account Manager",
      interaction: "No interactions",
    },
    {
      initials: "D",
      name: "David Green",
      email: "david.green@example.com",
      title: "Sales Associate",
      interaction: "No interactions",
    },
    {
      initials: "P",
      name: "Paul Turner",
      email: "paul.turner@example.com",
      title: "CIO",
      interaction: "No interactions",
    },
    {
      initials: "N",
      name: "Noah Lee",
      email: "noah.lee@example.com",
      title: "Product Specialist",
      interaction: "No interactions",
    },
    {
      initials: "H",
      name: "Henry Scott",
      email: "henry.scott@example.com",
      title: "IT Manager",
      interaction: "No interactions",
    },
    {
      initials: "C",
      name: "Carol White",
      email: "carol.white@example.com",
      title: "Product Manager",
      interaction: "No interactions",
    },
    {
      initials: "J",
      name: "Jane Potts",
      email: "jane.potts@example.com",
      title: "Marketing Director",
      interaction: "No interactions",
    },
    {
      initials: "J",
      name: "Jack Wilson",
      email: "jack.wilson@example.com",
      title: "VP of Sales",
      interaction: "No interactions",
    },
    {
      initials: "E",
      name: "Eva Black",
      email: "eva.black@example.com",
      title: "Procurement Officer",
      interaction: "No interactions",
    },
    {
      initials: "Z",
      name: "Zachary King",
      email: "zachary.king@example.com",
      title: "Business Owner",
      interaction: "No interactions",
    },
    {
      initials: "U",
      name: "Uma Patel",
      email: "uma.patel@example.com",
      title: "Strategic Planner",
      interaction: "No interactions",
    },
    {
      initials: "B",
      name: "Bob Brown",
      email: "bob.brown@example.com",
      title: "Customer Support",
      interaction: "No interactions",
    },
    {
      initials: "G",
      name: "Grace Lewis",
      email: "grace.lewis@example.com",
      title: "Director of Operations",
      interaction: "No interactions",
    },
    {
      initials: "A",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      title: "Account Executive",
      interaction: "No interactions",
    },
    {
      initials: "Q",
      name: "Quinn Davis",
      email: "quinn.davis@example.com",
      title: "Financial Analyst",
      interaction: "No interactions",
    },
  ];

  const sidebarGroups = [
    {
      icon: "dots",
      name: "Recruitment pipeline",
      active: currentStep === "list" ? false : true,
    },
    {
      icon: "handshake",
      name: "Partnerships",
      active: false,
    },
    {
      icon: "smile",
      name: "Sales pipeline",
      active: false,
    },
  ];

  // Handlers
  const handleImportClick = () => {
    setImportDropdownOpen(!importDropdownOpen);
  };

  const handleImportOptionClick = () => {
    setImportDropdownOpen(false);
    setCurrentStep("mapping-loading");
    setTimeout(() => setCurrentStep("mapping"), 1500);
  };

  const handleContinueFromMapping = () => {
    setCurrentStep("preview");
  };

  const handleStartImport = () => {
    setCurrentStep("importing");
    setImportProgress(0);

    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep("complete"), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleCompleteOk = () => {
    setCurrentStep("list");
  };

  const handleReset = () => {
    setCurrentStep("empty");
    setImportDropdownOpen(false);
    setImportProgress(0);
  };

  // Render sidebar
  const renderSidebar = () => (
    <aside className="w-56 bg-white border-r border-neutral-100 flex flex-col h-screen shrink-0">
      {/* Logo */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-amber-400 rounded flex items-center justify-center text-[10px] font-bold text-neutral-900">
            S
          </div>
          <span className="text-sm font-medium text-neutral-900">
            Frozti
          </span>
          <ChevronDown className="w-3 h-3 text-neutral-400" />
        </div>
        <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Premium trial */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Premium trial</span>
          <span className="text-neutral-400">
            (2 weeks left)
          </span>
        </div>
        <button className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
          Subscribe
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <div className="space-y-0.5">
          <button className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors">
            <Mail className="w-4 h-4" />
            <span>Messages</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>Dashboards</span>
            <span className="ml-auto px-1.5 py-0.5 bg-neutral-100 text-[10px] font-medium rounded">
              Beta
            </span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings & members</span>
          </button>
        </div>

        {/* My groups */}
        <div className="mt-6">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-xs font-medium text-neutral-400">
              My groups
            </span>
            <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-0.5">
            {sidebarGroups.map((group, idx) => (
              <div key={idx}>
                <button
                  className={`w-full flex items-center gap-2.5 px-2 py-1.5 text-sm rounded-md transition-colors ${
                    group.active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}>
                  {group.icon === "dots" && (
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 bg-amber-500 rounded-full" />
                      <span className="w-1 h-1 bg-amber-500 rounded-full" />
                    </span>
                  )}
                  {group.icon === "handshake" && (
                    <Handshake className="w-4 h-4 text-orange-500" />
                  )}
                  {group.icon === "smile" && (
                    <Smile className="w-4 h-4 text-amber-500" />
                  )}
                  <span>{group.name}</span>
                </button>
                {group.name === "Recruitment pipeline" &&
                  currentStep === "list" && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      <button className="w-full flex items-center gap-2 px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-50 rounded transition-colors">
                        <Table className="w-3.5 h-3.5" />
                        <span>Recruitment pipeline</span>
                      </button>
                      <button className="w-full flex items-center gap-2 px-2 py-1 text-xs bg-neutral-100 text-neutral-900 rounded transition-colors">
                        <List className="w-3.5 h-3.5" />
                        <span>All applicants</span>
                      </button>
                      <button className="w-full flex items-center gap-2 px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-50 rounded transition-colors">
                        <Users className="w-3.5 h-3.5" />
                        <span>All people</span>
                      </button>
                      <button className="w-full flex items-center gap-2 px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-50 rounded transition-colors">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>All companies</span>
                      </button>
                      <button className="w-full flex items-center gap-2 px-2 py-1 text-xs text-neutral-400 hover:bg-neutral-50 rounded transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                        <span>New view</span>
                      </button>
                    </div>
                  )}
              </div>
            ))}
            <button className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-neutral-400 hover:bg-neutral-50 rounded-md transition-colors">
              <Plus className="w-4 h-4" />
              <span>New group</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Migration CTA */}
      <div className="p-4 border-t border-neutral-100">
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm font-medium text-neutral-900">
            Migrate from another CRM
          </span>
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-neutral-500 mb-3 leading-relaxed">
          We'll assist with importing your contacts and
          facilitate the migration process.
        </p>
        <button className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
          Start migration
        </button>
      </div>
    </aside>
  );

  // Render header
  const renderHeader = () => (
    <header className="h-12 border-b border-neutral-100 flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <span className="flex gap-0.5">
          <span className="w-1 h-1 bg-amber-500 rounded-full" />
          <span className="w-1 h-1 bg-amber-500 rounded-full" />
        </span>
        <span>Recruitment pipeline</span>
        <span className="text-neutral-300">/</span>
        <div className="flex items-center gap-1">
          <Table className="w-3.5 h-3.5" />
          <span>
            {currentStep === "list"
              ? "All applicants"
              : "Recruitment pipeline"}
          </span>
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 border border-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors">
          Share
        </button>
        <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
        <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );

  // Render pipeline stages
  const renderPipelineStages = () => (
    <div className="flex items-center gap-0 border-b border-neutral-100 bg-white overflow-x-auto">
      {pipelineStages.map((stage, idx) => (
        <div
          key={idx}
          className="flex items-center min-w-[180px]">
          <div className="flex items-center gap-2 px-4 py-3">
            <span className="px-2 py-0.5 bg-neutral-100 text-xs font-medium rounded">
              {stage.name}
            </span>
            <span className="text-xs text-neutral-400">
              {stage.count}
            </span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </div>
          <div className="text-neutral-200">
            <MoreHorizontal className="w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  );

  // Render empty state
  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h2
        className="text-2xl font-medium text-neutral-900 mb-2"
        style={{ fontFamily: "'Newsreader', serif" }}>
        This group is empty, add people
      </h2>
      <p className="text-sm text-neutral-500 mb-6">
        Need help to get started?{" "}
        <a
          href="#"
          className="underline hover:text-neutral-700 transition-colors">
          Watch tutorials
        </a>
      </p>
      <div className="flex flex-col gap-2">
        <button className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
          Add people (26)
        </button>
        <div className="relative">
          <button
            onClick={handleImportClick}
            className="px-5 py-2.5 border border-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2">
            Import people
            <ChevronDown className="w-4 h-4" />
          </button>
          {importDropdownOpen && (
            <div className="absolute top-full mt-1 left-0 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-10 animate-fadeIn">
              <button
                onClick={handleImportOptionClick}
                className="w-full px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors">
                <div className="text-sm font-medium text-neutral-900">
                  Import from file
                </div>
                <div className="text-xs text-neutral-500">
                  .csv, .tsv, .xls, .xlsx, .txt
                </div>
              </button>
              <button
                onClick={handleImportOptionClick}
                className="w-full px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors">
                <div className="text-sm font-medium text-neutral-900">
                  Import from integration
                </div>
                <div className="text-xs text-neutral-500">
                  Zapier, Make, Typeform, and more
                </div>
              </button>
              <button
                onClick={handleImportOptionClick}
                className="w-full px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors">
                <div className="text-sm font-medium text-neutral-900">
                  Import from another CRM
                </div>
                <div className="text-xs text-neutral-500">
                  Hubspot, Pipedrive, Airtable...
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render mapping loading
  const renderMappingLoading = () => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl px-8 space-y-3 mb-8">
          <div className="h-3 bg-neutral-100 rounded animate-pulse w-2/5" />
          <div className="h-3 bg-amber-100 rounded animate-pulse w-full" />
          <div className="h-3 bg-amber-100 rounded animate-pulse w-full" />
          <div className="h-3 bg-amber-100 rounded animate-pulse w-full" />
        </div>
        <h2
          className="text-3xl font-medium text-neutral-900"
          style={{ fontFamily: "'Newsreader', serif" }}>
          Preparing Mapping....
        </h2>
      </div>
    </div>
  );

  // Render field mapping
  const renderFieldMapping = () => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-neutral-100 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <Table className="w-5 h-5 text-amber-600" />
          </div>
          <h1 className="text-xl font-medium text-neutral-900">
            Map fields
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            Exit
          </button>
          <button className="px-4 py-2 border border-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors">
            Back
          </button>
          <button
            onClick={handleContinueFromMapping}
            className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
            Continue
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mapping columns */}
        <div className="flex-1 p-8 overflow-auto">
          <p className="text-sm text-neutral-600 mb-6">
            Review and confirm each mapping choice
          </p>

          <div className="flex gap-8">
            {/* Incoming fields */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                  Incoming Fields
                </span>
                <span className="px-2 py-0.5 bg-neutral-100 text-xs rounded">
                  9 of 9
                </span>
              </div>
              <div className="space-y-0">
                {fieldMappings.map((field, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setSelectedFieldIndex(idx)
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                      selectedFieldIndex === idx
                        ? "bg-amber-50"
                        : ""
                    }`}>
                    <span className="text-sm font-mono text-blue-600">
                      {field.incoming}
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Destination fields */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                  Destination Fields
                </span>
                <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                <span className="px-2 py-0.5 bg-neutral-100 text-xs rounded">
                  9 of 33
                </span>
              </div>
              <div className="space-y-0">
                {fieldMappings.map((field, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-4 py-3 border-b border-neutral-100 ${
                      selectedFieldIndex === idx
                        ? "bg-amber-50"
                        : ""
                    }`}>
                    <span className="text-sm text-neutral-900">
                      {field.destination}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                      <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data preview */}
        <div className="w-80 border-l border-neutral-100 p-6 bg-neutral-50">
          <h3 className="text-sm font-medium text-neutral-900 mb-4">
            Data preview for{" "}
            {fieldMappings[selectedFieldIndex]?.incoming}
          </h3>
          <div className="space-y-0">
            {phonePreviewData.map((phone, idx) => (
              <div
                key={idx}
                className="py-2.5 border-b border-neutral-200 text-sm text-neutral-600">
                {phone}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render preview table
  const renderPreviewTable = () => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-neutral-100 flex items-center justify-between px-8">
        <h1 className="text-xl font-medium text-neutral-900">
          Add contacts
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <button
            onClick={handleStartImport}
            className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
            Import contacts
          </button>
        </div>
      </div>

      {/* Tabs and toolbar */}
      <div className="border-b border-neutral-100 px-8">
        <div className="flex items-center gap-6">
          <button className="py-3 text-sm font-medium text-neutral-900 border-b-2 border-neutral-900">
            File
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 px-8 py-3 border-b border-neutral-100">
        <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
          <List className="w-4 h-4" />
          Views
        </button>
        <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <span className="px-2 py-1 bg-neutral-900 text-white text-xs rounded">
          All 28
        </span>
        <span className="text-sm text-neutral-600">
          Valid 28
        </span>
        <span className="text-sm text-red-400">
          Invalid 0
        </span>
        <span className="text-sm text-neutral-400">
          Save view
        </span>
        <button className="flex items-center gap-1 text-sm text-neutral-600">
          Actions <ChevronDown className="w-3 h-3" />
        </button>
        <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
        <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <Download className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 text-sm text-neutral-600">
          <Sparkles className="w-4 h-4" />
          Transform
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 sticky top-0">
            <tr className="text-left">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded border-neutral-300"
                />
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                First name
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                Last name
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                Description
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                Email 1
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                Email 2
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                URL 1
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                URL 2
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {contactsPreview.map((contact) => (
              <tr
                key={contact.id}
                className="hover:bg-neutral-50 transition-colors">
                <td className="px-4 py-3 text-xs text-neutral-400">
                  {contact.id}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-900">
                  {contact.firstName}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-900">
                  {contact.lastName}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-600 max-w-[200px] truncate">
                  {contact.description}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-600">
                  {contact.email}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-400"></td>
                <td className="px-4 py-3 text-sm text-neutral-400"></td>
                <td className="px-4 py-3 text-sm text-neutral-400"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Import progress modal */}
      {currentStep === "importing" && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
            </div>
            <div className="h-1.5 bg-neutral-100 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-neutral-900 rounded-full transition-all duration-100"
                style={{ width: `${importProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">
                {importProgress}% complete
              </span>
              <span className="text-neutral-400">
                {importProgress < 100
                  ? "Calculating time remaining..."
                  : "Almost done..."}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render complete modal
  const renderCompleteModal = () => (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl animate-fadeIn">
        <h2 className="text-lg font-medium text-neutral-900 mb-2">
          Import complete
        </h2>
        <p className="text-sm text-neutral-600 mb-6 flex items-center gap-2">
          <PartyPopper className="w-4 h-4 text-amber-500" />
          28 contacts have been successfully imported.
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleCompleteOk}
            className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
            Ok
          </button>
        </div>
      </div>
    </div>
  );

  // Render final list view
  const renderListView = () => (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Title */}
      <div className="px-8 py-6">
        <div className="flex items-center gap-2">
          <h1
            className="text-3xl font-medium text-neutral-900"
            style={{ fontFamily: "'Newsreader', serif" }}>
            All applicants
          </h1>
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Action bar */}
      <div className="px-8 pb-4 flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 transition-colors">
          <Plus className="w-4 h-4" />
          Add people
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 transition-colors">
          <Mail className="w-4 h-4" />
          Email all
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 transition-colors">
          <Sparkles className="w-4 h-4" />
          Enrich all
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <EyeOff className="w-4 h-4" />
          <span>11</span>
        </div>
        <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <Filter className="w-4 h-4" />
        </button>
        <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}>
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8">
        <table className="w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left border-b border-neutral-100">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded border-neutral-300"
                />
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500">
                28 people
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500">
                Emails
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500">
                Job title
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500 flex items-center gap-1">
                My last interaction
                <ChevronDown className="w-3 h-3" />
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500">
                Urls
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500">
                Source
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-500">
                Expertise
              </th>
              <th className="w-8 px-4 py-3">
                <Plus className="w-4 h-4 text-neutral-400" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {finalApplicants.map((person, idx) => (
              <tr
                key={idx}
                className="hover:bg-neutral-50 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-300"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600">
                      {person.initials}
                    </div>
                    <span className="text-sm font-medium text-neutral-900">
                      {person.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-neutral-600">
                  {person.email}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-600">
                  {person.title}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-400">
                  {person.interaction}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-400"></td>
                <td className="px-4 py-3 text-sm text-neutral-400"></td>
                <td className="px-4 py-3 text-sm text-neutral-400"></td>
                <td className="px-4 py-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-neutral-50 flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Sidebar */}
      {currentStep !== "mapping-loading" &&
        currentStep !== "mapping" &&
        currentStep !== "preview" &&
        currentStep !== "importing" &&
        renderSidebar()}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {currentStep !== "mapping-loading" &&
          currentStep !== "mapping" &&
          currentStep !== "preview" &&
          currentStep !== "importing" && (
            <>
              {renderHeader()}

              {/* Page title */}
              {currentStep !== "list" && (
                <div className="px-8 py-6 bg-white border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <h1
                      className="text-3xl font-medium text-neutral-900"
                      style={{
                        fontFamily: "'Newsreader', serif",
                      }}>
                      Recruitment pipeline
                    </h1>
                    <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action bar for pipeline view */}
              {currentStep !== "list" && (
                <div className="px-8 py-4 bg-white border-b border-neutral-100 flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add people
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm text-neutral-400">
                    <Mail className="w-4 h-4" />
                    Email all
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm text-neutral-400">
                    <Sparkles className="w-4 h-4" />
                    Enrich all
                  </button>
                  <div className="flex-1" />
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <EyeOff className="w-4 h-4" />
                    <span>21</span>
                  </div>
                  <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <Columns className="w-4 h-4" />
                  </button>
                  <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              )}

              {currentStep !== "list" &&
                renderPipelineStages()}
            </>
          )}

        {/* Content based on step */}
        {currentStep === "empty" && renderEmptyState()}
        {currentStep === "dropdown" && renderEmptyState()}
        {currentStep === "mapping-loading" &&
          renderMappingLoading()}
        {currentStep === "mapping" && renderFieldMapping()}
        {(currentStep === "preview" ||
          currentStep === "importing") &&
          renderPreviewTable()}
        {currentStep === "complete" && (
          <>
            {renderHeader()}
            <div className="px-8 py-6 bg-white border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <h1
                  className="text-3xl font-medium text-neutral-900"
                  style={{
                    fontFamily: "'Newsreader', serif",
                  }}>
                  Recruitment pipeline
                </h1>
                <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="px-8 py-4 bg-white border-b border-neutral-100 flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 transition-colors">
                <Plus className="w-4 h-4" />
                Add people
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm text-neutral-400">
                <Mail className="w-4 h-4" />
                Email all
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm text-neutral-400">
                <Sparkles className="w-4 h-4" />
                Enrich all
              </button>
              <div className="flex-1" />
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <EyeOff className="w-4 h-4" />
                <span>21</span>
              </div>
              <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Columns className="w-4 h-4" />
              </button>
              <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
            {renderPipelineStages()}
            {renderCompleteModal()}
          </>
        )}
        {currentStep === "list" && renderListView()}
      </main>

      {/* Help button */}
      <button className="fixed bottom-6 right-6 w-10 h-10 bg-white border border-neutral-200 rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors z-40">
        ?
      </button>
    </div>
  );
}
