"use client";

import {
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  Chrome,
  Clock,
  Diamond,
  Download,
  GitBranch,
  HelpCircle,
  Layers,
  Lock,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Shield,
  Smile,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function CRMOneOnboarding() {
  // State
  const [currentStep, setCurrentStep] = useState(1); // 1-6
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [teammates, setTeammates] = useState("");
  const [companyTypeOpen, setCompanyTypeOpen] =
    useState(false);
  const [companySizeOpen, setCompanySizeOpen] =
    useState(false);
  const [teammatesOpen, setTeammatesOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [connectedAccounts, setConnectedAccounts] =
    useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  // Data
  const companyTypes = [
    "Non-profit",
    "Startup",
    "Investors",
    "Agency",
    "Administration",
    "Small or medium business",
    "Large organization",
    "School or University",
    "For myself",
    "Other",
  ];

  const companySizes = [
    "1-5",
    "6-9",
    "10-19",
    "20-49",
    "50-99",
    "100+",
  ];

  const teammatesOptions = [
    "Just me",
    "2-3",
    "4-6",
    "7-10",
    "10+",
  ];

  const goals = [
    { id: "sell", label: "Sell more" },
    { id: "recruit", label: "Recruit talent" },
    { id: "raise", label: "Raise money" },
    { id: "invest", label: "Invest money" },
    { id: "partners", label: "Connect with partners" },
    { id: "other", label: "Something else" },
  ];

  const premiumFeatures = [
    {
      icon: Layers,
      title: "Groups",
      description:
        "Customizable and sharable contacts database",
    },
    {
      icon: GitBranch,
      title: "Pipelines",
      description:
        "Manage your own custom workflow in CRMOne",
    },
    {
      icon: Chrome,
      title: "Chrome extension",
      description:
        "Download CRMOneX to add contacts from anywhere",
    },
    {
      icon: Sparkles,
      title: "Enrichment",
      description:
        "1-click enrichment to find missing information",
    },
    {
      icon: Zap,
      title: "Integrations",
      description: "+3000 tools to embed in your workflow",
    },
    {
      icon: Diamond,
      title: "And more Premium features",
      description:
        "Objects, sequences, migration service, and more",
    },
  ];

  const linkedInContacts = [
    {
      name: "Kristin Watson",
      role: "Marketing Specialist",
      company: "Qonto",
    },
    {
      name: "Jane Cooper",
      role: "Marketing Manager",
      company: "Pipedrive",
    },
    {
      name: "Floyd Miles",
      role: "Sales Director",
      company: "Dropbox",
    },
  ];

  // Handlers
  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConnectGmail = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setConnectedAccounts([
        ...connectedAccounts,
        "samlee.frozti@gmail.com",
      ]);
      setIsConnecting(false);
    }, 1500);
  };

  const handleConnectOutlook = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setConnectedAccounts([
        ...connectedAccounts,
        "sam@outlook.com",
      ]);
      setIsConnecting(false);
    }, 1500);
  };

  const canProceedStep1 =
    firstName &&
    lastName &&
    companyName &&
    companyType &&
    companySize &&
    teammates;

  // Get background color based on step
  const getRightPanelBg = () => {
    switch (currentStep) {
      case 1:
        return "bg-sky-50";
      case 2:
        return "bg-amber-100";
      case 3:
        return "bg-sky-50";
      case 4:
        return "bg-violet-100";
      case 5:
        return "bg-neutral-900";
      default:
        return "bg-sky-50";
    }
  };

  // Render dropdown
  const renderDropdown = (
    value,
    setValue,
    options,
    isOpen,
    setIsOpen,
    placeholder,
  ) => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-left text-sm flex items-center justify-between input-field">
        <span
          className={
            value ? "text-neutral-900" : "text-neutral-400"
          }>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 max-h-64 overflow-auto dropdown-appear">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setValue(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                value === option
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-700"
              }`}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Step 1: Customize CRM
  const renderStep1 = () => (
    <>
      <div className="flex-1 flex flex-col justify-center px-12 py-8">
        <h1
          className="text-3xl font-medium text-neutral-900 mb-3 slide-up"
          style={{ fontFamily: "'Newsreader', serif" }}>
          Let's customize your
          <br />
          CRM
        </h1>
        <p className="text-neutral-500 text-sm mb-8 slide-up-delay-1">
          We'd love to help you get setup for success
        </p>

        <button
          onClick={handleNext}
          disabled={!canProceedStep1}
          className="btn-primary w-full py-3 bg-neutral-900 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed slide-up-delay-2">
          Next
        </button>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8 slide-up-delay-3">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-colors ${
                dot === currentStep
                  ? "bg-neutral-900"
                  : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right panel - Form */}
      <div
        className={`w-1/2 ${getRightPanelBg()} p-8 flex flex-col justify-center`}>
        <div className="space-y-5 max-w-sm mx-auto w-full form-appear">
          {/* Name row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                First name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                placeholder="John"
                className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 outline-none input-field"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                placeholder="Doe"
                className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 outline-none input-field"
              />
            </div>
          </div>

          {/* Company name */}
          <div>
            <label className="block text-sm font-medium text-neutral-800 mb-1.5">
              What is your company name?
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              placeholder="Acme"
              className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 outline-none input-field"
            />
          </div>

          {/* Company type */}
          <div>
            <label className="block text-sm font-medium text-neutral-800 mb-1.5">
              What type of company do you work for?
            </label>
            {renderDropdown(
              companyType,
              setCompanyType,
              companyTypes,
              companyTypeOpen,
              setCompanyTypeOpen,
              "Select answer",
            )}
          </div>

          {/* Company size */}
          <div>
            <label className="block text-sm font-medium text-neutral-800 mb-1.5">
              What is your company size?
            </label>
            {renderDropdown(
              companySize,
              setCompanySize,
              companySizes,
              companySizeOpen,
              setCompanySizeOpen,
              "Select answer",
            )}
          </div>

          {/* Teammates */}
          <div>
            <label className="block text-sm font-medium text-neutral-800 mb-1.5">
              How many teammates will be using CRMOne?
            </label>
            {renderDropdown(
              teammates,
              setTeammates,
              teammatesOptions,
              teammatesOpen,
              setTeammatesOpen,
              "Select answer",
            )}
          </div>
        </div>
      </div>
    </>
  );

  // Step 2: Goals
  const renderStep2 = () => (
    <>
      <div className="flex-1 flex flex-col justify-center px-12 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-neutral-600 mb-6 hover:text-neutral-900 transition-colors slide-up">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1
          className="text-3xl font-medium text-neutral-900 mb-3 slide-up-delay-1"
          style={{ fontFamily: "'Newsreader', serif" }}>
          What brings you to
          <br />
          CRMOne?
        </h1>
        <p className="text-neutral-500 text-sm mb-8 slide-up-delay-2">
          We'll create personalized groups to get you
          <br />
          started. You can create your own later.
        </p>

        <button
          onClick={handleNext}
          disabled={!selectedGoal}
          className="btn-primary w-full py-3 bg-neutral-900 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed slide-up-delay-3">
          Next
        </button>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8 slide-up-delay-3">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-colors ${
                dot === currentStep
                  ? "bg-neutral-900"
                  : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right panel - Goals */}
      <div
        className={`w-1/2 ${getRightPanelBg()} p-8 flex flex-col justify-center`}>
        <div className="space-y-3 max-w-sm mx-auto w-full form-appear">
          {goals.map((goal, index) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`w-full px-5 py-4 bg-white rounded-full text-left text-sm font-medium flex items-center gap-3 transition-all goal-item ${
                selectedGoal === goal.id
                  ? "ring-2 ring-neutral-900 shadow-md"
                  : "hover:shadow-md"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedGoal === goal.id
                    ? "border-neutral-900 bg-neutral-900"
                    : "border-neutral-300"
                }`}>
                {selectedGoal === goal.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              {goal.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  // Step 3: Connect email
  const renderStep3 = () => (
    <>
      <div className="flex-1 flex flex-col justify-center px-12 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-neutral-600 mb-6 hover:text-neutral-900 transition-colors slide-up">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1
          className="text-3xl font-medium text-neutral-900 mb-6 slide-up-delay-1"
          style={{ fontFamily: "'Newsreader', serif" }}>
          Connect your email
          <br />
          to sync your
          <br />
          partners
        </h1>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 slide-up-delay-2">
            <Users className="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">
              CRMOne will import and auto-sync your
              <br />
              contacts, emails, and calendar
            </p>
          </div>
          <div className="flex items-start gap-3 slide-up-delay-2">
            <Shield className="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">
              GDPR compliant
            </p>
          </div>
          <div className="flex items-start gap-3 slide-up-delay-2">
            <Lock className="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">
              Google security audit
            </p>
          </div>
          <div className="flex items-start gap-3 slide-up-delay-2">
            <Clock className="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">
              CRMOne will never delete or email contacts
              <br />
              on your behalf
            </p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8 slide-up-delay-3">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-colors ${
                dot === currentStep
                  ? "bg-neutral-900"
                  : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right panel - Email connect */}
      <div
        className={`w-1/2 ${getRightPanelBg()} p-8 flex flex-col justify-center`}>
        <div className="space-y-4 max-w-sm mx-auto w-full form-appear">
          {connectedAccounts.length > 0 && (
            <div className="space-y-3 mb-4">
              {connectedAccounts.map((account) => (
                <div
                  key={account}
                  className="flex items-center gap-3 px-5 py-3.5 bg-white rounded-full shadow-sm">
                  <div className="w-5 h-5">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full">
                      <path
                        fill="#EA4335"
                        d="M5.26 9.61L2.16 7.01C3.3 4.57 5.52 2.83 8.2 2.36v3.02c-1.32.37-2.33 1.32-2.94 2.48z"
                      />
                      <path
                        fill="#34A853"
                        d="M8.2 18.62v3.02c-2.68-.47-4.9-2.21-6.04-4.65l3.1-2.6c.61 1.16 1.62 2.11 2.94 2.48z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M2.16 7.01C1.74 8.06 1.5 9.21 1.5 10.4s.24 2.34.66 3.39l3.1-2.6c-.14-.28-.26-.52-.26-.79s.12-.51.26-.79l-3.1-2.6z"
                      />
                      <path
                        fill="#4285F4"
                        d="M12 5.36c1.24 0 2.35.38 3.19 1.12l2.39-2.39C15.97 2.69 14.13 2 12 2c-2.7 0-4.93 1.24-6.04 3.01l3.1 2.6C9.67 6.45 10.68 5.5 12 5.36z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 18.64c-1.32-.14-2.33-1.09-2.94-2.25l-3.1 2.6c1.11 1.77 3.34 3.01 6.04 3.01v-3.36z"
                      />
                      <path
                        fill="#34A853"
                        d="M20.84 10.4c0-.69-.06-1.36-.17-2H12v3.78h4.98c-.22 1.13-.87 2.09-1.84 2.73l2.97 2.3c1.73-1.6 2.73-3.95 2.73-6.81z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-700 flex-1 truncate">
                    {account}
                  </span>
                  <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                    Connected
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleConnectGmail}
            disabled={
              isConnecting ||
              connectedAccounts.includes(
                "samlee.frozti@gmail.com",
              )
            }
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all disabled:opacity-50 btn-connect">
            <div className="w-5 h-5">
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full">
                <path
                  fill="#EA4335"
                  d="M5.26 9.61L2.16 7.01C3.3 4.57 5.52 2.83 8.2 2.36v3.02c-1.32.37-2.33 1.32-2.94 2.48z"
                />
                <path
                  fill="#34A853"
                  d="M8.2 18.62v3.02c-2.68-.47-4.9-2.21-6.04-4.65l3.1-2.6c.61 1.16 1.62 2.11 2.94 2.48z"
                />
                <path
                  fill="#FBBC05"
                  d="M2.16 7.01C1.74 8.06 1.5 9.21 1.5 10.4s.24 2.34.66 3.39l3.1-2.6c-.14-.28-.26-.52-.26-.79s.12-.51.26-.79l-3.1-2.6z"
                />
                <path
                  fill="#4285F4"
                  d="M12 5.36c1.24 0 2.35.38 3.19 1.12l2.39-2.39C15.97 2.69 14.13 2 12 2c-2.7 0-4.93 1.24-6.04 3.01l3.1 2.6C9.67 6.45 10.68 5.5 12 5.36z"
                />
                <path
                  fill="#EA4335"
                  d="M12 18.64c-1.32-.14-2.33-1.09-2.94-2.25l-3.1 2.6c1.11 1.77 3.34 3.01 6.04 3.01v-3.36z"
                />
                <path
                  fill="#34A853"
                  d="M20.84 10.4c0-.69-.06-1.36-.17-2H12v3.78h4.98c-.22 1.13-.87 2.09-1.84 2.73l2.97 2.3c1.73-1.6 2.73-3.95 2.73-6.81z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-neutral-700">
              Connect with Gmail
            </span>
          </button>

          <button
            onClick={handleConnectOutlook}
            disabled={
              isConnecting ||
              connectedAccounts.includes("sam@outlook.com")
            }
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all disabled:opacity-50 btn-connect">
            <div className="w-5 h-5">
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full">
                <path
                  fill="#0078D4"
                  d="M12 12L0 6v12l12 6V12z"
                />
                <path
                  fill="#28A8EA"
                  d="M24 6l-12 6v12l12-6V6z"
                />
                <path
                  fill="#50D9FF"
                  d="M12 0L0 6l12 6 12-6-12-6z"
                />
                <path
                  fill="#0078D4"
                  d="M12 12L0 6v12l12 6V12z"
                  opacity="0.8"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-neutral-700">
              Connect with Outlook
            </span>
          </button>

          <button
            onClick={handleNext}
            className="w-full text-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors mt-4">
            No, I like the endless copy+paste
          </button>

          {connectedAccounts.length > 0 && (
            <button
              onClick={handleNext}
              className="btn-primary w-full py-3 bg-neutral-900 text-white rounded-lg text-sm font-medium mt-4">
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );

  // Step 4: Chrome extension
  const renderStep4 = () => (
    <>
      <div className="flex-1 flex flex-col justify-center px-12 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-neutral-600 mb-6 hover:text-neutral-900 transition-colors slide-up">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1
          className="text-3xl font-medium text-neutral-900 mb-6 slide-up-delay-1"
          style={{ fontFamily: "'Newsreader', serif" }}>
          Meet partners with
          <br />
          our chrome
          <br />
          extension
        </h1>
        <p className="text-neutral-500 text-sm mb-8 slide-up-delay-2">
          Import contacts from LinkedIn and almost
          <br />
          anywhere on the web with our Chrome
          <br />
          extension.
        </p>

        <button
          onClick={handleNext}
          className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors mb-4 slide-up-delay-3">
          Download later
        </button>

        <button
          onClick={handleNext}
          className="btn-primary w-full py-3 bg-neutral-900 text-white rounded-lg text-sm font-medium slide-up-delay-3">
          Download CRMOneX
        </button>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8 slide-up-delay-3">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-colors ${
                dot === currentStep
                  ? "bg-neutral-900"
                  : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right panel - Chrome extension preview */}
      <div
        className={`w-1/2 ${getRightPanelBg()} p-8 flex flex-col items-center justify-center`}>
        <div className="form-appear">
          {/* Browser mockup */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-80">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-100 border-b border-neutral-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-xs text-neutral-500">
                  <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    in
                  </div>
                  Mentors
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center">
                <Smile className="w-4 h-4 text-neutral-600" />
              </div>
            </div>

            {/* LinkedIn list */}
            <div className="p-4">
              {linkedInContacts.map((contact, index) => (
                <div
                  key={contact.name}
                  className="flex items-center gap-3 py-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    style={{
                      backgroundColor:
                        index === 0
                          ? "#F59E0B"
                          : index === 1
                            ? "#EC4899"
                            : "#8B5CF6",
                    }}>
                    {contact.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {contact.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Extension popup */}
            <div className="absolute -right-4 top-1/2 transform translate-x-1/2 bg-white rounded-xl shadow-xl p-4 w-48">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-100">
                <div className="w-4 h-4 bg-violet-100 rounded text-xs flex items-center justify-center text-violet-600 font-bold">
                  A
                </div>
                <span className="text-xs text-neutral-600">
                  Acme
                </span>
              </div>
              <p className="text-xs text-neutral-500 mb-3">
                New contacts detected
              </p>
              {linkedInContacts.map((contact) => (
                <div
                  key={contact.name}
                  className="flex items-center gap-2 py-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{
                      backgroundColor:
                        contact.name === "Kristin Watson"
                          ? "#F59E0B"
                          : contact.name === "Jane Cooper"
                            ? "#EC4899"
                            : "#8B5CF6",
                    }}>
                    {contact.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-900 truncate">
                      {contact.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {contact.company}
                    </p>
                  </div>
                </div>
              ))}
              <button className="w-full mt-3 py-2 text-xs font-medium text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">
                Add all to CRMOne
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-neutral-600">
              <Download className="w-4 h-4" />
              <span className="text-sm">10k downloads</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-600">
              <span className="text-sm">4.8 out of 5</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Step 5: Premium trial
  const renderStep5 = () => (
    <>
      <div className="flex-1 flex flex-col justify-center px-12 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-neutral-600 mb-6 hover:text-neutral-900 transition-colors slide-up">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1
          className="text-3xl font-medium text-neutral-900 mb-6 slide-up-delay-1"
          style={{ fontFamily: "'Newsreader', serif" }}>
          Your 14-days free
          <br />
          trial on the Premium
          <br />
          plan
        </h1>
        <p className="text-neutral-500 text-sm mb-8 slide-up-delay-2">
          Enjoy the best of CRMOne with 14-days free
          <br />
          trial. During this time, you'll have access to
          <br />
          all CRMOne Premium features.
        </p>

        <button
          onClick={handleNext}
          className="btn-primary w-full py-3 bg-neutral-900 text-white rounded-lg text-sm font-medium slide-up-delay-3">
          Start free trial
        </button>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8 slide-up-delay-3">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-colors ${
                dot === currentStep
                  ? "bg-neutral-900"
                  : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right panel - Premium features */}
      <div
        className={`w-1/2 ${getRightPanelBg()} p-8 flex flex-col justify-center`}>
        <div className="space-y-6 max-w-sm mx-auto w-full form-appear">
          {premiumFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 feature-item"
              style={{ animationDelay: `${index * 80}ms` }}>
              <div className="w-6 h-6 flex-shrink-0">
                <feature.icon className="w-full h-full text-neutral-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // Step 6: Welcome dashboard
  const renderStep6 = () => (
    <div className="flex-1 flex flex-col bg-white">
      {/* Top nav */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-amber-400 rounded flex items-center justify-center text-white text-xs font-bold">
            S
          </div>
          <span className="text-sm font-medium text-neutral-900">
            {companyName || "Frozti"}
          </span>
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
            🤝 Partners management
          </span>
          <span className="text-sm text-neutral-600">
            /
          </span>
          <span className="text-sm text-neutral-600">
            All partners
          </span>
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-56 border-r border-neutral-100 p-4 flex flex-col">
          <div className="space-y-1 mb-6">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
              <div className="w-4 h-4 bg-neutral-200 rounded flex items-center justify-center">
                <Diamond className="w-3 h-3 text-neutral-500" />
              </div>
              <span>Premium trial</span>
              <span className="text-xs text-neutral-400 ml-auto">
                (2 weeks left)
              </span>
            </div>
            <button className="w-full px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg">
              Subscribe
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
              <Layers className="w-4 h-4" />
              <span>Dashboards</span>
              <span className="text-[10px] font-medium text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded ml-auto">
                Beta
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings & members</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-medium text-neutral-400 px-3 mb-2">
              My groups
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-900 bg-neutral-100 rounded-lg cursor-pointer">
                <span className="text-base">🤝</span>
                <span>Partners management</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                <span className="text-base">🤑</span>
                <span>Sales pipeline</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New group</span>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-xs font-medium text-neutral-900 mb-1">
                Import finished
              </p>
              <p className="text-[10px] text-neutral-500">
                16 contacts imported from your source{" "}
                {connectedAccounts[0] ||
                  "samlee.frozti@gmail.com"}
              </p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg relative">
              <button className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600">
                <X className="w-3 h-3" />
              </button>
              <p className="text-xs font-medium text-neutral-900 mb-1">
                Migrate from another CRM
              </p>
              <p className="text-[10px] text-neutral-500 mb-2">
                We'll assist with importing your contacts
                and facilitate the migration process.
              </p>
              <button className="w-full py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg">
                Start migration
              </button>
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <h1
            className="text-2xl font-medium text-neutral-900 mb-8 text-center slide-up"
            style={{ fontFamily: "'Newsreader', serif" }}>
            Welcome {firstName || "Sam"}, let's add your
            first partners
          </h1>

          <div className="grid grid-cols-3 gap-6 max-w-3xl slide-up-delay-1">
            {/* Sample contacts */}
            <div className="p-6 border border-neutral-200 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center gap-1 mb-4">
                <div className="w-10 h-10 rounded-full bg-violet-200 flex items-center justify-center -mr-2">
                  <Smile className="w-6 h-6 text-violet-600" />
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center -mr-2 z-10">
                  <Smile className="w-6 h-6 text-amber-600" />
                </div>
                <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center z-20">
                  <Smile className="w-6 h-6 text-sky-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-neutral-900 mb-4">
                Start with 10 sample
                <br />
                contacts
              </p>
              <button className="w-full py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
                Create sample
              </button>
            </div>

            {/* Synced contacts */}
            <div className="p-6 border border-neutral-200 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center gap-1 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center -mr-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6">
                    <path
                      fill="#FF6B35"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center -mr-2 z-10">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6">
                    <path
                      fill="#1DB954"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center z-20">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6">
                    <path
                      fill="#0052FF"
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-neutral-900 mb-4">
                Add from your synced
                <br />
                contacts
              </p>
              <button className="w-full py-2.5 border border-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
                Group your contacts
              </button>
            </div>

            {/* Import */}
            <div className="p-6 border border-neutral-200 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center gap-1 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center -mr-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6">
                    <rect
                      fill="#107C41"
                      width="24"
                      height="24"
                      rx="4"
                    />
                    <path
                      fill="white"
                      d="M6 6h4v4H6zM6 14h4v4H6zM14 6h4v4h-4z"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center -mr-2 z-10">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6">
                    <path
                      fill="#2563EB"
                      d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09l-6.9-3.46L12 4.18z"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center z-20">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6">
                    <path
                      fill="#FF6847"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-neutral-900 mb-4">
                Import from a file, an
                <br />
                integration, or a CRM
              </p>
              <button className="w-full py-2.5 border border-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
                Choose an import
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button className="mt-6 text-sm text-neutral-500 hover:text-neutral-700 transition-colors slide-up-delay-2">
            Or create contacts manually
          </button>
        </div>
      </div>

      {/* Help button */}
      <button className="fixed bottom-6 right-6 w-10 h-10 bg-white border border-neutral-200 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
        <HelpCircle className="w-5 h-5 text-neutral-600" />
      </button>
    </div>
  );

  // Main render
  return (
    <div
      className="min-h-screen flex bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(12px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes dropdownAppear {
          from { 
            opacity: 0; 
            transform: translateY(-8px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes formAppear {
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes goalItemAppear {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes featureAppear {
          from { 
            opacity: 0; 
            transform: translateX(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        .slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
        
        .slide-up-delay-1 {
          opacity: 0;
          animation: slideUp 0.4s ease-out 0.05s forwards;
        }
        
        .slide-up-delay-2 {
          opacity: 0;
          animation: slideUp 0.4s ease-out 0.1s forwards;
        }
        
        .slide-up-delay-3 {
          opacity: 0;
          animation: slideUp 0.4s ease-out 0.15s forwards;
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .dropdown-appear {
          animation: dropdownAppear 0.2s ease-out forwards;
        }
        
        .form-appear {
          animation: formAppear 0.5s ease-out forwards;
        }
        
        .goal-item {
          opacity: 0;
          animation: goalItemAppear 0.4s ease-out forwards;
        }
        
        .feature-item {
          opacity: 0;
          animation: featureAppear 0.4s ease-out forwards;
        }
        
        .btn-primary {
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }
        
        .btn-connect {
          transition: all 0.2s ease;
        }
        
        .btn-connect:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        .input-field {
          transition: all 0.2s ease;
        }
        
        .input-field:focus {
          border-color: #a3a3a3;
          box-shadow: 0 0 0 3px rgba(163, 163, 163, 0.1);
        }
      `}</style>

      {/* Sidebar (for steps 1-5) */}
      {currentStep < 6 && (
        <div className="w-56 bg-neutral-100 border-r border-neutral-200 p-4 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 bg-amber-400 rounded" />
            <span className="text-sm font-medium text-neutral-900">
              {companyName || ""}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 rounded-lg">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 rounded-lg">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 rounded-lg">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 rounded-lg">
              <Settings className="w-4 h-4" />
              <span>Settings & members</span>
            </div>
          </div>

          <div className="mt-auto">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors w-full">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Modal container for steps 1-5 */}
        {currentStep < 6 ? (
          <div className="flex-1 flex items-center justify-center bg-neutral-100/50">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl flex min-h-[500px] relative">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </div>
          </div>
        ) : (
          renderStep6()
        )}
      </div>
    </div>
  );
}
