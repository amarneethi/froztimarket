"use client";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  Info,
  Plus,
  Search,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { useState } from "react";

export default function PayrollE5JobDescription() {
  // State
  const [currentStep, setCurrentStep] = useState(2);
  const [jobTitle, setJobTitle] = useState("");
  const [seniorityLevel, setSeniorityLevel] = useState("");
  const [selectedTemplate, setSelectedTemplate] =
    useState(null);
  const [jobScopeText, setJobScopeText] = useState("");
  const [showTemplateModal, setShowTemplateModal] =
    useState(false);
  const [templateSearch, setTemplateSearch] = useState("");
  const [helpExpanded, setHelpExpanded] = useState(false);
  const [showHiringGuide, setShowHiringGuide] =
    useState(true);
  const [showToast, setShowToast] = useState(false);
  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] =
    useState(false);
  const [seniorityDropdownOpen, setSeniorityDropdownOpen] =
    useState(false);

  // Data
  const steps = [
    {
      id: 1,
      title: "Personal details",
      status: "completed",
    },
    { id: 2, title: "Job details", status: "current" },
    {
      id: 3,
      title: "Compensation and dates",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Benefits and extras",
      status: "upcoming",
    },
  ];

  const jobTitles = [
    {
      id: "regional-web-admin",
      label: "Regional Web Administrator",
    },
    {
      id: "digital-marketing-manager",
      label: "Digital Marketing Manager",
    },
    {
      id: "senior-software-engineer",
      label: "Senior Software Engineer",
    },
    { id: "product-manager", label: "Product Manager" },
    { id: "ux-designer", label: "UX Designer" },
    { id: "data-analyst", label: "Data Analyst" },
  ];

  const seniorityLevels = [
    {
      id: "junior-ic1",
      label: "Junior (Individual Contributor Level 1)",
    },
    {
      id: "mid-ic2",
      label: "Mid (Individual Contributor Level 2)",
    },
    {
      id: "senior-ic3",
      label: "Senior (Individual Contributor Level 3)",
    },
    { id: "lead", label: "Lead" },
    { id: "manager", label: "Manager" },
    { id: "director", label: "Director" },
  ];

  const jobTemplates = [
    {
      id: "digital-marketing-manager",
      title: "Digital Marketing Manager",
      type: "PayrollE5 template",
      editable: false,
      description: {
        purpose:
          "A digital marketing manager is responsible for developing, executing and managing all digital marketing campaigns that a company wants to promote. They should understand and identify digital technologies and best practices that will optimize the impact of their digital campaigns.",
        duties: [
          "Develop the company's digital marketing strategy by studying economic indicators and tracking demand",
          "Evaluate important metrics that affect website traffic, service quotas and target audience",
          "Set up and optimize advertising campaigns",
          "Develop campaign budgets and strategies that drive customers to the website",
          "Find new potential customers and identify their current and future needs",
          "Create email campaigns to target key audiences",
          "Use advanced metrics to measure the success of a marketing campaign",
        ],
      },
    },
    {
      id: "seo-specialist",
      title: "SEO Specialist",
      type: "PayrollE5 template",
      editable: false,
      description: {
        purpose:
          "An SEO Specialist is responsible for improving the visibility and ranking of company websites in search engine results. They analyze, review, and implement changes to websites to optimize them for search engines.",
        duties: [
          "Perform ongoing keyword research and discovery",
          "Optimize website content and landing pages",
          "Monitor and analyze SEO performance metrics",
          "Build quality backlinks and manage link building campaigns",
          "Stay updated with latest SEO trends and algorithm changes",
        ],
      },
    },
    {
      id: "ppc-specialist",
      title: "PPC Specialist",
      type: "PayrollE5 template",
      editable: false,
      description: {
        purpose:
          "A PPC Specialist manages pay-per-click advertising campaigns to drive targeted traffic and conversions for the company.",
        duties: [
          "Create and manage PPC campaigns across multiple platforms",
          "Perform keyword research and analysis",
          "Write compelling ad copy and test variations",
          "Monitor campaign performance and optimize for ROI",
          "Manage advertising budgets effectively",
        ],
      },
    },
    {
      id: "media-buyer",
      title: "Media Buyer",
      type: "PayrollE5 template",
      editable: false,
      description: {
        purpose:
          "A Media Buyer is responsible for purchasing advertising space and time on various media platforms to reach target audiences effectively.",
        duties: [
          "Negotiate and purchase ad placements across media channels",
          "Research and identify target audience demographics",
          "Monitor campaign performance and adjust strategies",
          "Maintain relationships with media vendors",
          "Analyze market trends and competitor advertising",
        ],
      },
    },
    {
      id: "content-writer",
      title: "Content Writer",
      type: "PayrollE5 template",
      editable: false,
      description: {
        purpose:
          "A Content Writer creates engaging written content for various platforms to support marketing and communication objectives.",
        duties: [
          "Write clear, compelling, and grammatically correct content",
          "Research industry topics and trends",
          "Collaborate with marketing and design teams",
          "Edit and proofread content before publication",
          "Adapt writing style to different audiences and platforms",
        ],
      },
    },
    {
      id: "video-producer",
      title: "Video Producer",
      type: "PayrollE5 template",
      editable: false,
      description: {
        purpose:
          "A Video Producer oversees the creation of video content from concept to final delivery, ensuring high quality and alignment with brand objectives.",
        duties: [
          "Plan and coordinate video production projects",
          "Manage production budgets and schedules",
          "Direct filming and post-production activities",
          "Collaborate with creative teams on content strategy",
          "Ensure video content meets quality standards",
        ],
      },
    },
  ];

  // Derived
  const filteredTemplates = jobTemplates.filter(
    (template) =>
      template.title
        .toLowerCase()
        .includes(templateSearch.toLowerCase()),
  );

  const selectedJobTitle = jobTitles.find(
    (j) => j.id === jobTitle,
  );
  const selectedSeniority = seniorityLevels.find(
    (s) => s.id === seniorityLevel,
  );

  const canShowJobScope = jobTitle && seniorityLevel;

  // Handlers
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setJobScopeText(template.description.purpose);
    setShowTemplateModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleJobTitleSelect = (title) => {
    setJobTitle(title.id);
    setJobTitleDropdownOpen(false);
  };

  const handleSenioritySelect = (level) => {
    setSeniorityLevel(level.id);
    setSeniorityDropdownOpen(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-stone-50"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap');
        
        .heading-font {
          font-family: 'Fraunces', serif;
        }
        
        .body-font {
          font-family: 'DM Sans', sans-serif;
        }
        
        .card-section {
          background: white;
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }
        
        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .modal-enter {
          animation: modalEnter 0.25s ease-out forwards;
        }
        
        .toast-enter {
          animation: toastEnter 0.3s ease-out forwards;
        }
        
        .toast-exit {
          animation: toastExit 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes toastEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes toastExit {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        
        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; }
        .stagger-4 { animation-delay: 0.2s; }
        
        .dropdown-item:hover {
          background: #f5f5f4;
        }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="heading-font text-2xl font-semibold text-stone-900 tracking-tight">
                  Add person
                </h1>
                <p className="body-font text-stone-500 text-sm mt-0.5">
                  Create a new contract for your EOR
                  employee
                </p>
              </div>
            </div>
            <button className="p-2.5 hover:bg-stone-100 rounded-xl transition-colors">
              <X size={20} className="text-stone-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pre-filled Information Banner */}
            <div
              className="card-section p-5 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.05s",
              }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Sparkles
                    size={16}
                    className="text-amber-600"
                  />
                </div>
                <div>
                  <h3 className="body-font font-semibold text-amber-700 text-sm mb-1">
                    Review the pre-filled information
                  </h3>
                  <p className="body-font text-stone-600 text-sm leading-relaxed">
                    We've pre-filled this contract form with
                    some information from existing employee.
                    Please confirm all pre-filled
                    information correct.
                  </p>
                </div>
              </div>
            </div>

            {/* Hiring Guide Banner */}
            {showHiringGuide && (
              <div
                className="slide-up relative overflow-hidden rounded-2xl"
                style={{
                  opacity: 0,
                  animationDelay: "0.1s",
                  background:
                    "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #fef3c7 100%)",
                }}>
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="body-font text-stone-700 text-sm">
                      View PayrollE5's global hiring guide
                      for Taiwan .
                    </span>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 body-font font-medium text-stone-900 text-sm hover:underline">
                      View
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
                        <span className="text-white text-xs font-bold">
                          US
                        </span>
                      </div>
                      <span className="body-font font-bold text-stone-900 text-lg">
                        R.
                      </span>
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center overflow-hidden">
                        <span className="text-white text-xs font-bold">
                          TW
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setShowHiringGuide(false)
                      }
                      className="p-1.5 hover:bg-white/50 rounded-lg transition-colors">
                      <X
                        size={18}
                        className="text-stone-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Job Description Card */}
            <div
              className="card-section p-6 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.15s",
              }}>
              <h2 className="body-font font-semibold text-stone-900 mb-5">
                Job description
              </h2>

              {/* Job Title Dropdown */}
              <div className="mb-4 relative">
                <div
                  onClick={() => {
                    setJobTitleDropdownOpen(
                      !jobTitleDropdownOpen,
                    );
                    setSeniorityDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-4 border rounded-xl body-font cursor-pointer transition-all flex items-center justify-between ${
                    jobTitleDropdownOpen
                      ? "border-stone-900 ring-2 ring-stone-900"
                      : "border-stone-200 hover:border-stone-300"
                  }`}>
                  <div className="flex flex-col">
                    <span className="text-stone-400 text-xs mb-0.5">
                      Job title *
                    </span>
                    <span
                      className={`text-sm ${selectedJobTitle ? "text-stone-900" : "text-stone-400"}`}>
                      {selectedJobTitle?.label ||
                        "Select job title"}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-stone-400 transition-transform ${jobTitleDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {jobTitleDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
                    {jobTitles.map((title) => (
                      <div
                        key={title.id}
                        onClick={() =>
                          handleJobTitleSelect(title)
                        }
                        className="dropdown-item px-4 py-3 cursor-pointer body-font text-sm text-stone-800 transition-colors">
                        {title.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Seniority Level Dropdown */}
              <div className="mb-6 relative">
                <div
                  onClick={() => {
                    setSeniorityDropdownOpen(
                      !seniorityDropdownOpen,
                    );
                    setJobTitleDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-4 border rounded-xl body-font cursor-pointer transition-all flex items-center justify-between ${
                    seniorityDropdownOpen
                      ? "border-stone-900 ring-2 ring-stone-900"
                      : "border-stone-200 hover:border-stone-300"
                  }`}>
                  <div className="flex flex-col">
                    <span className="text-stone-400 text-xs mb-0.5">
                      Seniority level *
                    </span>
                    <span
                      className={`text-sm ${selectedSeniority ? "text-stone-900" : "text-stone-400"}`}>
                      {selectedSeniority?.label ||
                        "Select seniority level"}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-stone-400 transition-transform ${seniorityDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {seniorityDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
                    {seniorityLevels.map((level) => (
                      <div
                        key={level.id}
                        onClick={() =>
                          handleSenioritySelect(level)
                        }
                        className="dropdown-item px-4 py-3 cursor-pointer body-font text-sm text-stone-800 transition-colors">
                        {level.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Job Scope Section */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2 mt-4">
                  <h3 className="body-font font-semibold text-stone-900">
                    Job scope
                  </h3>
                  {canShowJobScope && (
                    <button
                      onClick={() =>
                        setShowTemplateModal(true)
                      }
                      className="px-4 py-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                      Select from Job scopes
                    </button>
                  )}
                </div>
                <p className="body-font text-stone-500 text-sm mb-4">
                  This information will form the basis of
                  the employment agreement.
                </p>

                {!canShowJobScope ? (
                  <div className="flex items-center gap-2 p-4 bg-stone-50 rounded-xl">
                    <Info
                      size={16}
                      className="text-stone-400"
                    />
                    <span className="body-font text-stone-500 text-sm">
                      Waiting for job title and seniority to
                      generate the job scope
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Job Scope Guidelines */}
                    <div className="p-4 bg-stone-50 rounded-xl mb-4 border border-stone-100">
                      <div className="flex items-start gap-3">
                        <Info
                          size={16}
                          className="text-stone-500 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <h4 className="body-font font-semibold text-stone-800 text-sm mb-1">
                            Job scope guidelines
                          </h4>
                          <p className="body-font text-stone-600 text-sm leading-relaxed">
                            Please always refer to your
                            company as "the company". Do not
                            include recruiting language and
                            other job ad details, such as
                            required education and
                            experience or references to
                            c-suite positions (eg.
                            "Reporting to the CEO").{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline">
                              Learn more
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Job Scope Template Selector */}
                    <div
                      onClick={() =>
                        setShowTemplateModal(true)
                      }
                      className="w-full px-4 py-4 border border-stone-200 rounded-xl body-font cursor-pointer transition-all hover:border-stone-300 flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-stone-400 text-xs mb-0.5">
                          Job scope template (optional)
                        </span>
                        <span
                          className={`text-sm ${selectedTemplate ? "text-stone-900" : "text-stone-400"}`}>
                          {selectedTemplate?.title ||
                            "Search or select one from the list above or create a new one under manage job scopes"}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        className="text-stone-400"
                      />
                    </div>

                    {/* Explanation of Job Scope */}
                    {selectedTemplate ? (
                      <div className="border border-stone-200 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                          <span className="body-font text-stone-500 text-sm">
                            Explanation of job scope *
                          </span>
                          <span className="body-font font-medium text-stone-700 text-sm">
                            {selectedTemplate.title}
                          </span>
                        </div>
                        <div className="p-5">
                          <h4 className="body-font font-semibold text-stone-800 mb-2">
                            General Purpose
                          </h4>
                          <p className="body-font text-stone-600 text-sm leading-relaxed mb-5">
                            {
                              selectedTemplate.description
                                .purpose
                            }
                          </p>

                          <h4 className="body-font font-semibold text-stone-800 mb-3">
                            Duties and Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {selectedTemplate.description.duties.map(
                              (duty, index) => (
                                <li
                                  key={index}
                                  className="body-font text-stone-600 text-sm leading-relaxed pl-4 relative before:content-['-'] before:absolute before:left-0 before:text-stone-400">
                                  {duty}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-stone-200 rounded-xl p-4">
                        <label className="body-font text-stone-500 text-sm">
                          Explanation of job scope *
                        </label>
                        <textarea
                          value={jobScopeText}
                          onChange={(e) =>
                            setJobScopeText(e.target.value)
                          }
                          placeholder="Describe the job scope and responsibilities..."
                          rows={6}
                          className="w-full mt-2 body-font text-stone-900 placeholder:text-stone-400 focus:outline-none resize-none text-sm leading-relaxed"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Steps */}
            <div
              className="card-section p-6 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.1s",
              }}>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-3">
                    {step.status === "completed" ? (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Check
                          size={16}
                          className="text-white"
                        />
                      </div>
                    ) : step.status === "current" ? (
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-stone-900 flex items-center justify-center">
                        <span className="body-font font-semibold text-stone-900 text-sm">
                          {step.id}
                        </span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                        <span className="body-font font-medium text-stone-400 text-sm">
                          {step.id}
                        </span>
                      </div>
                    )}
                    <div>
                      {step.status === "completed" && (
                        <p className="body-font text-green-600 text-xs font-semibold uppercase tracking-wide">
                          COMPLETED
                        </p>
                      )}
                      <p
                        className={`body-font font-medium text-sm ${
                          step.status === "upcoming"
                            ? "text-stone-400"
                            : "text-stone-800"
                        }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help and Support */}
            <div
              className="card-section slide-up overflow-hidden"
              style={{
                opacity: 0,
                animationDelay: "0.15s",
              }}>
              <button
                onClick={() =>
                  setHelpExpanded(!helpExpanded)
                }
                className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition-colors">
                <span className="body-font font-semibold text-stone-900">
                  Help and support
                </span>
                <ChevronDown
                  size={18}
                  className={`text-stone-500 transition-transform ${helpExpanded ? "rotate-180" : ""}`}
                />
              </button>
              {helpExpanded && (
                <div className="px-5 pb-5 border-t border-stone-100 pt-4">
                  <p className="body-font text-stone-500 text-sm">
                    Need assistance? Contact our support
                    team for help with job description
                    setup.
                  </p>
                </div>
              )}
            </div>

            {/* Autosaved Notice */}
            <div
              className="card-section p-5 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.2s",
              }}>
              <div className="flex items-center gap-2 mb-3">
                <Clock
                  size={16}
                  className="text-stone-500"
                />
                <span className="body-font font-semibold text-stone-900 text-sm">
                  Autosaved
                </span>
              </div>
              <p className="body-font text-stone-500 text-sm mb-4">
                This form automatically saves your progress
              </p>
              <button className="w-full px-4 py-2.5 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                Delete draft
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-200">
          <button className="flex items-center gap-2 body-font font-medium text-stone-800 hover:text-stone-600 transition-colors">
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <button className="px-6 py-3 bg-stone-900 text-white rounded-xl body-font font-medium hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20">
            Continue
          </button>
        </div>
      </div>

      {/* Floating AI Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-stone-900 hover:bg-stone-800 rounded-full flex items-center justify-center shadow-lg shadow-stone-900/30 transition-all hover:scale-105">
        <Wand2 size={22} className="text-white" />
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 toast-enter">
          <div className="flex items-center gap-2 px-5 py-3 bg-stone-900 text-white rounded-xl shadow-2xl">
            <Check size={18} className="text-green-400" />
            <span className="body-font font-medium text-sm">
              Scope of work template applied
            </span>
          </div>
        </div>
      )}

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 fade-in pt-16 overflow-y-auto"
          onClick={() => setShowTemplateModal(false)}>
          <div
            className="bg-white rounded-2xl w-full max-w-2xl mx-4 shadow-2xl modal-enter mb-16"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-stone-100">
              <div className="flex items-center justify-between mb-1">
                <h2 className="heading-font text-xl font-semibold text-stone-900">
                  Select, create and manage job scopes
                </h2>
                <button
                  onClick={() =>
                    setShowTemplateModal(false)
                  }
                  className="p-2 hover:bg-stone-100 rounded-xl transition-colors">
                  <X size={20} className="text-stone-500" />
                </button>
              </div>
              <p className="body-font text-stone-500 text-sm">
                Select, create, edit, or delete job scope
                templates for worker contracts.
              </p>
            </div>

            <div className="p-6">
              <h3 className="body-font font-semibold text-stone-900 mb-1">
                Custom job scope templates
              </h3>
              <p className="body-font text-stone-500 text-sm mb-4">
                Click on a job scope template to use it
              </p>

              {/* Search Input */}
              <div className="relative mb-4">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="text"
                  value={templateSearch}
                  onChange={(e) =>
                    setTemplateSearch(e.target.value)
                  }
                  placeholder="Find existing template"
                  className="w-full pl-11 pr-4 py-3.5 border border-stone-200 rounded-xl body-font text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                />
              </div>

              {/* Template List */}
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-stone-50 transition-colors group border border-transparent hover:border-stone-100">
                    <div>
                      <h4 className="body-font font-medium text-stone-900 text-sm mb-0.5">
                        {template.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="body-font text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md">
                          {template.type}
                        </span>
                        <span className="body-font text-xs text-stone-400">
                          Non-editable template
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleSelectTemplate(template)
                        }
                        className="px-4 py-2 border border-stone-200 rounded-lg bg-white hover:bg-stone-100 transition-all body-font font-medium text-stone-700 text-sm">
                        Use template
                      </button>
                      <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                        <ChevronDown
                          size={16}
                          className="text-stone-400"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-stone-100 flex justify-end">
              <button className="px-5 py-2.5 bg-stone-900 text-white rounded-xl body-font font-medium hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20 flex items-center gap-2">
                <Plus size={16} />
                Create new template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
