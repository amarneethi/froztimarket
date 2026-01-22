"use client";

import {
  Check,
  ChevronDown,
  Clock,
  DollarSign,
  FileText,
  Image,
  Layers,
  Mail,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";

export default function PriceForm() {
  // State
  const [pricingType, setPricingType] = useState("fixed");
  const [totalPrice, setTotalPrice] = useState(0);
  const [duration, setDuration] = useState(1);
  const [durationUnit, setDurationUnit] = useState("weeks");
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] =
    useState(false);

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

  const pricingOptions = [
    { id: "fixed", label: "Fixed rate", icon: DollarSign },
    { id: "ongoing", label: "Ongoing rate", icon: Clock },
    {
      id: "contact",
      label: "Contact for pricing",
      icon: Mail,
    },
  ];

  const durationUnits = [
    { id: "days", label: "Day(s)" },
    { id: "weeks", label: "Week(s)" },
    { id: "months", label: "Month(s)" },
  ];

  const currentStepIndex = 3;

  // Handlers
  const handlePriceChange = (value) => {
    const numValue = value.replace(/[^0-9]/g, "");
    setTotalPrice(
      numValue === "" ? 0 : parseInt(numValue, 10),
    );
  };

  const incrementDuration = () => {
    setDuration((prev) => prev + 1);
  };

  const decrementDuration = () => {
    setDuration((prev) => Math.max(1, prev - 1));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
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

        .pricing-option {
          transition: all 0.2s ease;
        }

        .pricing-option:hover {
          border-color: #d1d5db;
        }

        .pricing-option.selected {
          border-color: #1f2937;
          background: #f9fafb;
        }

        .price-input {
          font-size: 3.5rem;
          font-weight: 300;
          text-align: center;
          color: #9ca3af;
          caret-color: #6366f1;
        }

        .price-input:focus {
          outline: none;
          color: #1f2937;
        }

        .duration-btn {
          transition: all 0.15s ease;
        }

        .duration-btn:hover:not(:disabled) {
          background: #f3f4f6;
        }

        .duration-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .dropdown-item:hover {
          background: #f9fafb;
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
            {/* Pricing Type Section */}
            <div className="animate-slide-up stagger-2">
              <h2
                className="text-lg font-semibold text-gray-900 mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                How do you want to set up your pricing?
              </h2>

              {/* Pricing Options */}
              <div className="flex gap-3 mb-8">
                {pricingOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() =>
                        setPricingType(option.id)
                      }
                      className={`pricing-option flex-1 px-4 py-4 rounded-xl border-2 flex items-center justify-center gap-2.5 ${
                        pricingType === option.id
                          ? "selected border-gray-900"
                          : "border-gray-200"
                      }`}>
                      <IconComponent
                        className={`w-5 h-5 ${
                          pricingType === option.id
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          pricingType === option.id
                            ? "text-gray-900"
                            : "text-gray-600"
                        }`}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Price Section */}
            {pricingType !== "contact" && (
              <div className="animate-slide-up stagger-3">
                <h2
                  className="text-lg font-semibold text-gray-900 mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}>
                  Total price
                </h2>

                <div className="rounded-xl border border-gray-200 p-6 mb-8">
                  <div className="flex items-center justify-center">
                    <span className="price-input">$</span>
                    <input
                      type="text"
                      value={formatPrice(totalPrice)}
                      onChange={(e) =>
                        handlePriceChange(e.target.value)
                      }
                      className="price-input bg-transparent w-48"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Project Duration Section */}
            {pricingType === "fixed" && (
              <div className="animate-slide-up stagger-4">
                <h2
                  className="text-lg font-semibold text-gray-900 mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}>
                  Project duration
                </h2>

                <div className="flex gap-3">
                  {/* Duration Counter */}
                  <div className="flex-1 rounded-xl border border-gray-200 flex items-center">
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => {
                        const val = e.target.value.replace(
                          /[^0-9]/g,
                          "",
                        );
                        setDuration(
                          val === ""
                            ? 1
                            : Math.max(
                                1,
                                parseInt(val, 10),
                              ),
                        );
                      }}
                      className="flex-1 px-4 py-4 bg-transparent text-gray-900 text-base outline-none"
                    />
                    <div className="flex items-center border-l border-gray-200">
                      <button
                        onClick={decrementDuration}
                        disabled={duration <= 1}
                        className="duration-btn p-4 text-gray-500">
                        <Minus className="w-5 h-5" />
                      </button>
                      <button
                        onClick={incrementDuration}
                        className="duration-btn p-4 text-gray-500">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Duration Unit Dropdown */}
                  <div className="relative flex-1">
                    <button
                      onClick={() =>
                        setIsUnitDropdownOpen(
                          !isUnitDropdownOpen,
                        )
                      }
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 flex items-center justify-between text-gray-900 hover:border-gray-300 transition-colors">
                      <span>
                        {
                          durationUnits.find(
                            (u) => u.id === durationUnit,
                          )?.label
                        }
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          isUnitDropdownOpen
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isUnitDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() =>
                            setIsUnitDropdownOpen(false)
                          }
                        />
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden z-20 animate-scale-in">
                          {durationUnits.map((unit) => (
                            <button
                              key={unit.id}
                              onClick={() => {
                                setDurationUnit(unit.id);
                                setIsUnitDropdownOpen(
                                  false,
                                );
                              }}
                              className="w-full px-4 py-3 text-left text-sm text-gray-700 dropdown-item transition-colors flex items-center justify-between">
                              <span>{unit.label}</span>
                              {durationUnit === unit.id && (
                                <Check className="w-4 h-4 text-indigo-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Next Button */}
            <div className="flex justify-end mt-10 animate-slide-up stagger-5">
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
