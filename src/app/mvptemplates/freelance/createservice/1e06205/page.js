"use client";

import { Calendar, Check, DollarSign, FileText, FolderOpen, HelpCircle, Image, Layers, Plus } from "lucide-react";
import { useState } from "react";

export default function DescriptionForm() {
  // State
  const [summary, setSummary] = useState("");
  const [expandedSections, setExpandedSections] = useState([]);

  // Data
  const steps = [
    { id: "overview", label: "Overview", icon: Layers },
    {
      id: "deliverables",
      label: "Deliverables",
      icon: FileText,
    },
    {
      id: "description",
      label: "Description",
      icon: FileText,
    },
    { id: "price", label: "Price", icon: DollarSign },
    { id: "image", label: "Image", icon: Image },
  ];

  const additionalDetails = [
    {
      id: "process",
      title: "Process",
      description: "The steps from start to finish.",
      icon: Layers,
    },
    {
      id: "faqs",
      title: "FAQs",
      description: "Answer common questions.",
      icon: HelpCircle,
    },
    {
      id: "examples",
      title: "Example projects",
      description: "Show relevant work.",
      icon: FolderOpen,
    },
    {
      id: "calendar",
      title: "Calendar link",
      description: "Allow clients to set up a call.",
      icon: Calendar,
    },
  ];

  const currentStepIndex = 2;

  // Derived
  const isValid = summary.trim().length > 0;

  // Handlers
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative">
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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }

        .stagger-1 {
          animation-delay: 0.05s;
          opacity: 0;
        }
        .stagger-2 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        .stagger-3 {
          animation-delay: 0.15s;
          opacity: 0;
        }
        .stagger-4 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .stagger-5 {
          animation-delay: 0.25s;
          opacity: 0;
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
          resize: none;
        }

        .detail-card {
          transition: all 0.2s ease;
        }

        .detail-card:hover {
          background: #f9fafb;
        }
      `}</style>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-end gap-3 px-6 py-4">
          <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Cancel</button>
          <button className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button className="px-5 py-2.5 rounded-full font-medium transition-all bg-gray-900 text-white hover:bg-gray-800">
            Next
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Progress Steps */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      index < currentStepIndex
                        ? "border-emerald-500 bg-emerald-500"
                        : index === currentStepIndex
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-gray-300 bg-white"
                    }`}>
                    {index < currentStepIndex ? (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    ) : index === currentStepIndex ? (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    ) : null}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      index === currentStepIndex
                        ? "text-gray-900"
                        : index < currentStepIndex
                          ? "text-gray-600"
                          : "text-gray-400"
                    }`}>
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-0.5 mx-2 -mt-6 ${index < currentStepIndex ? "bg-emerald-500" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up stagger-1">
          {/* Form Content */}
          <div className="p-8">
            {/* Summary Section */}
            <div className="animate-slide-up stagger-2">
              <h2
                className="text-lg font-semibold text-gray-900 mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                Summary
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Explain in 2-3 sentences what you're offering and highlight what makes you unique.
              </p>

              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Enter text or type '/' for commands"
                rows={6}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 input-focus outline-none transition-all text-gray-800 text-base"
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 my-8" />

            {/* Additional Details Section */}
            <div className="animate-slide-up stagger-3">
              <div className="mb-1">
                <h2
                  className="text-lg font-semibold text-gray-900 inline"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}>
                  Additional details
                </h2>
                <span className="text-gray-400 text-lg ml-1">(optional)</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                Providing more information increases your chance of getting booked.
              </p>

              {/* Detail Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {additionalDetails.map((detail) => (
                  <button
                    key={detail.id}
                    onClick={() => toggleSection(detail.id)}
                    className={`detail-card p-4 rounded-xl border text-left transition-all flex items-start justify-between ${
                      expandedSections.includes(detail.id)
                        ? "border-indigo-200 bg-indigo-50"
                        : "border-gray-200 bg-white"
                    }`}>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-0.5">{detail.title}</h3>
                      <p className="text-sm text-gray-500">{detail.description}</p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 transition-all ${
                        expandedSections.includes(detail.id) ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
                      }`}>
                      {expandedSections.includes(detail.id) ? (
                        <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                      ) : (
                        <Plus className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Next Button */}
            <div className="flex justify-end mt-10 animate-slide-up stagger-4">
              <button className="px-6 py-3 rounded-full font-medium transition-all bg-gray-900 text-white hover:bg-gray-800">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
