"use client";

import { ChevronDown, Eye, HelpCircle, Send, User, X } from "lucide-react";
import { useState } from "react";

export default function SendRequestPage() {
  // State
  const [currentStep, setCurrentStep] = useState("form"); // "form" | "review"
  const [message, setMessage] = useState(
    "We're looking to hire a UI/UX Designer. Would you be interested in applying?",
  );
  const [selectedJobId, setSelectedJobId] = useState("job-1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Data
  const freelancer = {
    name: "Sarineh",
    avatar: null,
  };

  const jobs = [
    {
      id: "job-1",
      title: "Experienced Full-Time UI/UX Designer Needed",
      salaryMin: 3000,
      salaryMax: 4000,
      salaryPeriod: "month",
      type: "Ongoing",
    },
    {
      id: "job-2",
      title: "Mobile App Redesign Project",
      salaryMin: 5000,
      salaryMax: 8000,
      salaryPeriod: "project",
      type: "Fixed",
    },
    {
      id: "job-3",
      title: "Brand Identity Design",
      salaryMin: 2500,
      salaryMax: 3500,
      salaryPeriod: "project",
      type: "Fixed",
    },
  ];

  const maxMessageLength = 1000;

  // Derived
  const selectedJob = jobs.find((job) => job.id === selectedJobId);
  const characterCount = message.length;
  const isValid = message.trim().length > 0 && selectedJobId;

  // Handlers
  const handleSelectJob = (jobId) => {
    setSelectedJobId(jobId);
    setIsDropdownOpen(false);
  };

  const clearSelectedJob = (e) => {
    e.stopPropagation();
    setSelectedJobId(null);
  };

  const handleSendRequest = () => {
    if (isValid) {
      setCurrentStep("review");
    }
  };

  const handlePostJob = () => {
    // Handle post job action
    console.log("Posting job...");
  };

  const handleNotRightNow = () => {
    // Handle dismiss action
    console.log("Dismissed...");
  };

  return (
    <div className="min-h-screen bg-gray-500/60 flex items-center justify-center p-6 relative">
      {/* Fonts & Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap");

        :root {
          --font-display: "Fraunces", serif;
          --font-body: "DM Sans", sans-serif;
        }

        * {
          font-family: var(--font-body);
        }

        h1,
        h2,
        h3,
        .display-font {
          font-family: var(--font-display);
        }

        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress-fill {
          from {
            width: 0;
          }
          to {
            width: 50%;
          }
        }

        @keyframes progress-complete {
          from {
            width: 50%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes pulse-soft {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .modal-enter {
          animation: modal-enter 0.3s ease-out forwards;
        }

        .dropdown-enter {
          animation: slide-down 0.2s ease-out forwards;
        }

        .progress-animate {
          animation: progress-fill 0.6s ease-out 0.3s forwards;
          width: 0;
        }

        .progress-complete {
          animation: progress-complete 0.4s ease-out forwards;
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        input::placeholder,
        textarea::placeholder {
          color: #9ca3af;
        }

        .input-focus:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .job-card {
          transition: all 0.15s ease;
        }

        .job-card:hover {
          background: #f3f4f6;
        }

        .step-transition {
          transition: all 0.3s ease-out;
        }
      `}</style>

      {/* Modal Container */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden modal-enter relative">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 relative">
          <div
            className={`h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-r-full ${
              currentStep === "form" ? "progress-animate" : "progress-complete"
            }`}
            style={currentStep === "review" ? { width: "100%" } : undefined}
          />
        </div>

        {/* Close Button */}
        <button className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors z-10">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Step 1: Send Request Form */}
        {currentStep === "form" && (
          <div className="p-8 step-transition">
            {/* Header with Avatar */}
            <div className="flex items-center gap-4 mb-8">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white shadow-md">
                <div className="w-full h-full bg-gradient-to-br from-rose-400 via-fuchsia-400 to-indigo-400 flex items-center justify-center">
                  <User className="w-7 h-7 text-white/80" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                What can {freelancer.name} help you with?
              </h1>
            </div>

            {/* Message Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Add a message</label>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, maxMessageLength))}
                  placeholder="Describe what you need help with..."
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 input-focus outline-none transition-all text-gray-800 text-base"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {characterCount} / {maxMessageLength}
                </div>
              </div>
            </div>

            {/* Job Selection Section */}
            <div className="mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Is this related to an existing job or something new?
                </label>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Dropdown */}
              <div className="relative">
                <div
                  role="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 input-focus outline-none transition-all text-left flex items-center justify-between hover:border-gray-300">
                  <span className={selectedJob ? "text-gray-900" : "text-gray-400"}>
                    {selectedJob ? selectedJob.title : "Select an existing job..."}
                  </span>
                  <div className="flex items-center gap-1">
                    {selectedJob && (
                      <button
                        onClick={clearSelectedJob}
                        className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg z-20 overflow-hidden dropdown-enter">
                    {jobs.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => handleSelectJob(job.id)}
                        className={`job-card w-full px-4 py-3 text-left ${
                          job.id === selectedJobId ? "bg-indigo-50" : ""
                        }`}>
                        <div className="font-medium text-gray-900 text-sm">{job.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}/{job.salaryPeriod}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Job Details Card */}
            {selectedJob && (
              <div className="mb-8 rounded-xl border-l-4 border-l-indigo-500 bg-gray-50 overflow-hidden">
                <div className="p-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Job Details</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{selectedJob.title}</h3>
                  <div className="text-sm text-gray-600">
                    ${selectedJob.salaryMin.toLocaleString()} - ${selectedJob.salaryMax.toLocaleString()}/
                    {selectedJob.salaryPeriod} <span className="text-gray-400 mx-1">•</span> {selectedJob.type}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button className="px-8 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSendRequest}
                disabled={!isValid}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  isValid ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}>
                Send request
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Request in Review */}
        {currentStep === "review" && (
          <div className="p-8 step-transition">
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-gray-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                Your request is in review
              </h1>
            </div>

            {/* Illustration Card */}
            <div className="flex justify-center mb-8">
              <div className="float-animation">
                {/* Outer container with shadow layers */}
                <div className="relative">
                  {/* Background shadow cards */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-44 h-3 bg-gray-200 rounded-t-lg" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-48 h-2 bg-gray-100 rounded-t-lg" />

                  {/* Main card */}
                  <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 p-5 w-56">
                    {/* Top bar placeholder */}
                    <div className="w-24 h-2 bg-gray-200 rounded-full mb-4" />

                    {/* Card content */}
                    <div className="text-sm text-gray-500 mb-3">Your job post</div>

                    {/* Avatar row with send icon */}
                    <div className="flex items-center justify-between">
                      {/* Stacked avatars */}
                      <div className="flex -space-x-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 via-fuchsia-400 to-indigo-400 ring-2 ring-white flex items-center justify-center">
                          <User className="w-4 h-4 text-white/80" />
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gray-200 ring-2 ring-white" />
                        <div className="w-9 h-9 rounded-full bg-gray-100 ring-2 ring-white" />
                      </div>

                      {/* Send icon */}
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                        <Send className="w-5 h-5 text-gray-400 pulse-soft" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Post your job to attract similar candidates
              </h2>
              <p className="text-gray-500">
                Your linked job is private. Make it public and we'll find the perfect independent.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handlePostJob}
                className="px-8 py-3 rounded-full font-medium bg-gray-900 text-white hover:bg-gray-800 transition-all">
                Post your job
              </button>
              <button
                onClick={handleNotRightNow}
                className="px-8 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Not right now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
