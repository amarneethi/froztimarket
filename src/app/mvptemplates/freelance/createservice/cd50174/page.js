"use client";

import {
  Check,
  DollarSign,
  FileText,
  HelpCircle,
  Image,
  Layers,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export default function DeliverablesForm() {
  // State
  const [deliverables, setDeliverables] = useState([
    { id: 1, title: "", description: "" },
  ]);

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

  const currentStepIndex = 1;
  const maxDeliverables = 10;

  // Derived
  const isValid = deliverables.some(
    (d) =>
      d.title.trim().length > 0 &&
      d.description.trim().length > 0,
  );

  // Handlers
  const handleAddDeliverable = () => {
    if (deliverables.length < maxDeliverables) {
      setDeliverables([
        ...deliverables,
        { id: Date.now(), title: "", description: "" },
      ]);
    }
  };

  const handleRemoveDeliverable = (id) => {
    if (deliverables.length > 1) {
      setDeliverables(
        deliverables.filter((d) => d.id !== id),
      );
    }
  };

  const handleUpdateDeliverable = (id, field, value) => {
    setDeliverables(
      deliverables.map((d) =>
        d.id === id ? { ...d, [field]: value } : d,
      ),
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

        .deliverable-card {
          transition: all 0.2s ease;
        }

        .deliverable-card:hover .delete-btn {
          opacity: 1;
        }

        .delete-btn {
          opacity: 0;
          transition: opacity 0.15s ease;
        }
      `}</style>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-end gap-3 px-6 py-4">
          <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${
              isValid
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}>
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
              <div
                key={step.id}
                className="flex items-center">
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
                      <Check
                        className="w-3 h-3 text-white"
                        strokeWidth={3}
                      />
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
                    className={`w-24 h-0.5 mx-2 -mt-6 ${
                      index < currentStepIndex
                        ? "bg-emerald-500"
                        : "bg-gray-200"
                    }`}
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
            {/* Deliverables Section */}
            <div className="animate-slide-up stagger-2">
              <div className="flex items-start gap-2 mb-1">
                <h2
                  className="text-lg font-semibold text-gray-900"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}>
                  Deliverables
                </h2>
              </div>
              <div className="flex items-center gap-1.5 mb-6">
                <p className="text-gray-500 text-sm">
                  List the deliverables a client can expect
                  at the end of the project.
                </p>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Deliverable Items */}
              <div className="space-y-4">
                {deliverables.map((deliverable, index) => (
                  <div
                    key={deliverable.id}
                    className="deliverable-card relative">
                    {/* Title Input */}
                    <input
                      type="text"
                      value={deliverable.title}
                      onChange={(e) =>
                        handleUpdateDeliverable(
                          deliverable.id,
                          "title",
                          e.target.value,
                        )
                      }
                      placeholder="Deliverable title"
                      className="w-full px-4 py-3.5 rounded-t-xl border border-gray-200 border-b-0 input-focus outline-none transition-all text-gray-800 text-base"
                    />

                    {/* Description Textarea */}
                    <textarea
                      value={deliverable.description}
                      onChange={(e) =>
                        handleUpdateDeliverable(
                          deliverable.id,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="A clear, concise deliverable description"
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-b-xl border border-gray-200 input-focus outline-none transition-all text-gray-800 text-base"
                    />

                    {/* Delete Button */}
                    {deliverables.length > 1 && (
                      <button
                        onClick={() =>
                          handleRemoveDeliverable(
                            deliverable.id,
                          )
                        }
                        className="delete-btn absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Another Button */}
              {deliverables.length < maxDeliverables && (
                <button
                  onClick={handleAddDeliverable}
                  className="flex items-center gap-2 mt-4 text-gray-700 hover:text-gray-900 font-medium transition-colors group">
                  <span className="w-8 h-8 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center group-hover:border-gray-400 transition-colors">
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </span>
                  <span>Add another deliverable</span>
                </button>
              )}
            </div>

            {/* Bottom Next Button */}
            <div className="flex justify-end mt-10 animate-slide-up stagger-3">
              <button
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  isValid
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}>
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
