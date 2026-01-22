"use client";

import {
  Check,
  ChevronDown,
  DollarSign,
  FileText,
  Image,
  Layers,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

// Searchable Multi-Select Dropdown Component
function MultiSelectDropdown({
  label,
  placeholder,
  options,
  selectedItems,
  onSelect,
  onRemove,
  onClear,
  maxItems,
  isOptional = false,
  renderOption,
  renderTag,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = options.filter(
    (option) =>
      !selectedItems.some(
        (item) =>
          (typeof item === "string" ? item : item.name) ===
          (typeof option === "string"
            ? option
            : option.name),
      ) &&
      (typeof option === "string" ? option : option.name)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const handleSelect = (option) => {
    if (selectedItems.length < maxItems) {
      onSelect(option);
      setSearchQuery("");
    }
  };

  return (
    <div className="mb-6">
      <label className="text-sm text-gray-500 font-medium mb-3 block">
        {label}
      </label>
      <div className="relative">
        <div
          className={`border rounded-xl transition-all ${
            isOpen
              ? "border-indigo-400 ring-2 ring-indigo-100"
              : "border-gray-200"
          }`}>
          {/* Selected Tags */}
          {selectedItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 pb-0">
              {selectedItems.length > 0 &&
                selectedItems.map((item) => (
                  <span
                    key={
                      typeof item === "string"
                        ? item
                        : item.name
                    }
                    className="tag-chip inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                    {renderTag ? renderTag(item) : item}
                    <button
                      onClick={() => onRemove(item)}
                      className="hover:text-gray-900 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
            </div>
          )}

          {/* Search Input Row */}
          <div className="flex items-center gap-2 p-3">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              onFocus={() => setIsOpen(true)}
              placeholder={
                selectedItems.length >= maxItems
                  ? `Maximum ${maxItems} selected`
                  : placeholder
              }
              disabled={selectedItems.length >= maxItems}
              className="flex-1 outline-none text-sm text-gray-800 placeholder:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed"
            />
            <div className="flex items-center gap-1">
              {selectedItems.length > 0 && (
                <button
                  onClick={() => {
                    onClear();
                    setSearchQuery("");
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => {
                setIsOpen(false);
                setSearchQuery("");
              }}
            />

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden z-20 animate-scale-in">
              <div className="max-h-56 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={
                        typeof option === "string"
                          ? option
                          : option.name
                      }
                      onClick={() => handleSelect(option)}
                      disabled={
                        selectedItems.length >= maxItems
                      }
                      className="w-full px-4 py-3 text-left text-sm text-gray-700 dropdown-item transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed">
                      <span className="flex items-center gap-2">
                        {renderOption
                          ? renderOption(option)
                          : option}
                      </span>
                      {selectedItems.some(
                        (item) =>
                          (typeof item === "string"
                            ? item
                            : item.name) ===
                          (typeof option === "string"
                            ? option
                            : option.name),
                      ) && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-gray-400">
                    {searchQuery
                      ? "No results found"
                      : "All options selected"}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-between mt-2">
        {isOptional && (
          <span className="text-sm text-gray-400">
            Optional
          </span>
        )}
        {!isOptional && <span />}
        <span className="text-sm text-gray-400">
          {selectedItems.length}/{maxItems}
        </span>
      </div>
    </div>
  );
}

export default function ServiceOverviewForm() {
  // State
  const [serviceTitle, setServiceTitle] = useState(
    "Creative Motion Design to Power Your Brand",
  );
  const [selectedRoles, setSelectedRoles] = useState([
    "2D Animator",
    "3D Animator",
    "Animator",
  ]);
  const [selectedTools, setSelectedTools] = useState([
    { name: "Adobe Photoshop", color: "#31A8FF" },
    { name: "Avid Media Composer", color: "#7B68EE" },
    { name: "Audacity", color: "#F9A825" },
    { name: "Adobe After Effects", color: "#9999FF" },
    { name: "Procreate", color: "#1A1A2E" },
  ]);
  const [selectedIndustries, setSelectedIndustries] =
    useState(["Artificial Intelligence"]);
  const [currentCategory] = useState("Motion Design");

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

  const roleOptions = [
    "2D Animator",
    "3D Animator",
    "Animator",
    "Motion Designer",
    "Video Editor",
    "VFX Artist",
    "Compositing Artist",
    "Storyboard Artist",
    "Character Animator",
    "Technical Director",
  ];

  const toolOptions = [
    { name: "Adobe Photoshop", color: "#31A8FF" },
    { name: "Avid Media Composer", color: "#7B68EE" },
    { name: "Audacity", color: "#F9A825" },
    { name: "Adobe After Effects", color: "#9999FF" },
    { name: "Procreate", color: "#1A1A2E" },
    { name: "Adobe Premiere Pro", color: "#9999FF" },
    { name: "Cinema 4D", color: "#011A6A" },
    { name: "Blender", color: "#F5792A" },
    { name: "DaVinci Resolve", color: "#E5332A" },
    { name: "Final Cut Pro", color: "#9B8BF4" },
    { name: "Maya", color: "#0D9B8C" },
    { name: "Nuke", color: "#F7B500" },
  ];

  const industryOptions = [
    "Artificial Intelligence",
    "Healthcare",
    "Finance",
    "Education",
    "Entertainment",
    "E-commerce",
    "Real Estate",
    "Technology",
    "Marketing",
    "Gaming",
    "Automotive",
    "Fashion",
    "Food & Beverage",
    "Travel",
    "Sports",
  ];

  const currentStepIndex = 0;
  const maxTitleLength = 64;
  const maxRoles = 3;
  const maxTools = 5;
  const maxIndustries = 3;

  // Derived
  const titleCharCount = serviceTitle.length;
  const isValid = serviceTitle.trim().length > 0;

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

        input::placeholder {
          color: #9ca3af;
        }

        .tag-chip {
          transition: all 0.15s ease;
        }

        .tag-chip:hover {
          background: #f9fafb;
        }

        .input-focus:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
        }

        .dropdown-item:hover {
          background: #f9fafb;
        }

        /* Custom scrollbar */
        .max-h-56::-webkit-scrollbar {
          width: 6px;
        }
        .max-h-56::-webkit-scrollbar-track {
          background: transparent;
        }
        .max-h-56::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 3px;
        }
        .max-h-56::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
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
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      index === currentStepIndex
                        ? "border-gray-900 bg-gray-900"
                        : index < currentStepIndex
                          ? "border-gray-900 bg-gray-900"
                          : "border-gray-300 bg-white"
                    }`}>
                    {index <= currentStepIndex && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      index === currentStepIndex
                        ? "text-gray-900"
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
                        ? "bg-gray-900"
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
          {/* Category Banner */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-center gap-2 border-b border-gray-100">
            <span className="text-gray-600">
              You're listing a{" "}
              <span className="font-semibold text-gray-900">
                {currentCategory}
              </span>{" "}
              service.
            </span>
            <button className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
              Change category
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Title Section */}
            <div className="mb-8 animate-slide-up stagger-2">
              <h2
                className="text-lg font-semibold text-gray-900 mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                Title
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Pitch your service with an engaging,
                descriptive title.
              </p>

              <div className="relative">
                <input
                  type="text"
                  value={serviceTitle}
                  onChange={(e) => {
                    if (
                      e.target.value.length <=
                      maxTitleLength
                    ) {
                      setServiceTitle(e.target.value);
                    }
                  }}
                  placeholder="e.g., Creative Motion Design to Power Your Brand"
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 input-focus outline-none transition-all text-gray-800 text-base"
                />
              </div>
              <div className="flex justify-end mt-2">
                <span className="text-sm text-gray-400">
                  {titleCharCount}/{maxTitleLength}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-8" />

            {/* Search Tags Section */}
            <div className="animate-slide-up stagger-3">
              <h2
                className="text-lg font-semibold text-gray-900 mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                Search tags
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Add tags to help clients find your service.
              </p>

              {/* Roles Multi-Select */}
              <MultiSelectDropdown
                label="Roles"
                placeholder="Search roles..."
                options={roleOptions}
                selectedItems={selectedRoles}
                onSelect={(role) =>
                  setSelectedRoles([...selectedRoles, role])
                }
                onRemove={(role) =>
                  setSelectedRoles(
                    selectedRoles.filter((r) => r !== role),
                  )
                }
                onClear={() => setSelectedRoles([])}
                maxItems={maxRoles}
              />

              {/* Tools Multi-Select */}
              <MultiSelectDropdown
                label="Tools"
                placeholder="Search tools..."
                options={toolOptions}
                selectedItems={selectedTools}
                onSelect={(tool) =>
                  setSelectedTools([...selectedTools, tool])
                }
                onRemove={(tool) =>
                  setSelectedTools(
                    selectedTools.filter(
                      (t) => t.name !== tool.name,
                    ),
                  )
                }
                onClear={() => setSelectedTools([])}
                maxItems={maxTools}
                renderOption={(tool) => (
                  <>
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundColor: tool.color,
                      }}>
                      {tool.name.charAt(0)}
                    </div>
                    <span>{tool.name}</span>
                  </>
                )}
                renderTag={(tool) => (
                  <>
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        backgroundColor: tool.color,
                      }}>
                      {tool.name.charAt(0)}
                    </div>
                    {tool.name}
                  </>
                )}
              />

              {/* Industry Multi-Select */}
              <MultiSelectDropdown
                label="Industry"
                placeholder="Search industries..."
                options={industryOptions}
                selectedItems={selectedIndustries}
                onSelect={(industry) =>
                  setSelectedIndustries([
                    ...selectedIndustries,
                    industry,
                  ])
                }
                onRemove={(industry) =>
                  setSelectedIndustries(
                    selectedIndustries.filter(
                      (i) => i !== industry,
                    ),
                  )
                }
                onClear={() => setSelectedIndustries([])}
                maxItems={maxIndustries}
                isOptional
              />
            </div>

            {/* Bottom Next Button */}
            <div className="flex justify-end mt-8 animate-slide-up stagger-4">
              <button
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  isValid
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
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