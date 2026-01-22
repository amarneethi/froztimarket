"use client";

import {
  Check,
  DollarSign,
  FileText,
  Image,
  ImageOff,
  Layers,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function ImageForm() {
  // State
  const [activeTab, setActiveTab] = useState("custom");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const tabs = [
    { id: "custom", label: "Custom" },
    { id: "templates", label: "Templates" },
  ];

  const currentStepIndex = 4;

  // Handlers
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
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

        .tab-btn {
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          color: #374151;
        }

        .tab-btn.active {
          color: #111827;
          border-color: #111827;
        }

        .upload-zone {
          transition: all 0.2s ease;
        }

        .upload-zone.dragging {
          border-color: #6366f1;
          background: #eef2ff;
        }

        .select-btn {
          transition: all 0.2s ease;
        }

        .select-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
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
          <button className="px-5 py-2.5 rounded-full font-medium transition-all bg-gray-900 text-white hover:bg-gray-800">
            Publish
          </button>
          <button className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5" />
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
            {/* Header Section */}
            <div className="animate-slide-up stagger-2">
              <h2
                className="text-lg font-semibold text-gray-900 mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                Add an image to highlight your service
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Attract clients with a custom image or use
                one from our resources.
              </p>

              {/* Tabs */}
              <div className="flex gap-6 border-b border-gray-200 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-btn pb-3 text-sm font-medium border-b-2 -mb-px ${
                      activeTab === tab.id
                        ? "active border-gray-900 text-gray-900"
                        : "border-transparent text-gray-400"
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Tab Content */}
            {activeTab === "custom" && (
              <div className="animate-slide-up stagger-3">
                {/* Info Banner */}
                <div className="bg-sky-50 rounded-xl px-4 py-3 mb-5">
                  <p className="text-sky-700 text-sm">
                    Covers with custom images are ranked
                    higher for client discovery.
                  </p>
                </div>

                {/* Upload Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`upload-zone rounded-xl bg-slate-50 border-2 border-dashed border-transparent flex flex-col items-center justify-center min-h-[320px] mb-5 ${
                    isDragging
                      ? "dragging border-indigo-400"
                      : ""
                  }`}>
                  {selectedImage ? (
                    <div className="w-full h-full p-4">
                      <img
                        src={selectedImage}
                        alt="Selected preview"
                        className="w-full h-full object-contain rounded-lg max-h-[280px]"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                        <ImageOff className="w-7 h-7 text-slate-400" />
                      </div>
                      <p className="text-gray-500 text-sm">
                        No image selected
                      </p>
                    </div>
                  )}
                </div>

                {/* Select File Button */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <span className="select-btn w-full py-3.5 rounded-full border border-gray-200 text-gray-700 font-medium flex items-center justify-center cursor-pointer">
                    Select file
                  </span>
                </label>

                {/* File Requirements */}
                <p className="text-gray-500 text-sm mt-4">
                  Images at least 1600 x 1200 (4:3 aspect
                  ratio) in PNG, JPG, or GIF formats work
                  best. 10MB max file size.
                </p>
              </div>
            )}

            {/* Templates Tab Content */}
            {activeTab === "templates" && (
              <div className="animate-slide-up stagger-3">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((template) => (
                    <button
                      key={template}
                      className="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 transition-all flex items-center justify-center">
                      <span className="text-slate-400 text-sm font-medium">
                        Template {template}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
