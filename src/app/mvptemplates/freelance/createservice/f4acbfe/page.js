"use client";

import {
  ArrowRight,
  Check,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

export default function CreateServiceForm() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("");
  const [isHoveredCategory, setIsHoveredCategory] =
    useState("");

  // Data
  const suggestedCategories = [
    { id: "graphic-design", label: "Graphic Design" },
    { id: "packaging", label: "Packaging/Label Design" },
    { id: "book-cover", label: "Book Cover" },
    { id: "menu-design", label: "Menu Design" },
    { id: "invitation", label: "Invitation Design" },
    { id: "other", label: "Other" },
  ];

  const searchSuggestions = [
    {
      id: "logo",
      label: "Logo Design",
      category: "Graphic Design",
    },
    {
      id: "copywriting",
      label: "Copywriting",
      category: "Writing",
    },
    {
      id: "framer",
      label: "Framer Website",
      category: "Web Development",
    },
    {
      id: "branding",
      label: "Brand Identity",
      category: "Graphic Design",
    },
    {
      id: "illustration",
      label: "Illustration",
      category: "Art",
    },
  ];

  // Derived
  const filteredSuggestions = searchQuery
    ? searchSuggestions.filter(
        (s) =>
          s.label
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          s.category
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    : [];

  const isValid =
    selectedCategory !== "" || searchQuery.trim() !== "";

  // Handlers
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(
      categoryId === selectedCategory ? "" : categoryId,
    );
    setSearchQuery("");
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.label);
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] relative overflow-hidden">
      {/* Fonts & Animations */}
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
        h3 {
          font-family: var(--font-display);
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
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
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
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
        .stagger-6 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        input::placeholder {
          color: #9ca3af;
        }

        .category-chip {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .category-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
        }

        .category-chip.selected {
          background: #1f2937;
          color: white;
          border-color: #1f2937;
        }

        .search-input:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .suggestion-item {
          transition: all 0.15s ease;
        }

        .suggestion-item:hover {
          background: #f9fafb;
        }
      `}</style>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm shadow-gray-200/50 p-8 animate-slide-up">
            {/* Header */}
            <div className="mb-6 animate-slide-up stagger-1">
              <h1
                className="text-xl font-semibold text-gray-900 mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                What service are you offering?
              </h1>
              <p className="text-gray-500 text-sm">
                Pick your service category to get started.
              </p>
            </div>

            {/* Search Input - Added relative and z-20 to establish stacking context */}
            <div className="relative z-20 mb-8 animate-slide-up stagger-2">
              <div className="flex items-center gap-3 px-5 py-4 rounded-full border border-gray-200 search-input transition-all bg-white">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCategory("");
                  }}
                  placeholder="Try logo design, copywriting or Framer website"
                  className="flex-1 outline-none text-gray-800 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              {filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden animate-scale-in">
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() =>
                        handleSuggestionClick(suggestion)
                      }
                      className="w-full px-5 py-3 text-left suggestion-item flex items-center justify-between">
                      <div>
                        <span className="text-gray-900 font-medium text-sm">
                          {suggestion.label}
                        </span>
                        <span className="text-gray-400 text-xs ml-2">
                          in {suggestion.category}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider with Label - Added relative and z-10 (lower than search) */}
            <div className="relative z-10 flex items-center gap-4 mb-6 animate-slide-up stagger-3">
              <span className="text-xs text-gray-400 font-medium tracking-wider whitespace-nowrap">
                OR, CHOOSE A SUGGESTION BELOW
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
            </div>

            {/* Category Chips - Added relative and z-10 (lower than search) */}
            <div className="relative z-10 flex flex-wrap gap-3 mb-10">
              {suggestedCategories.map(
                (category, index) => (
                  <button
                    key={category.id}
                    onClick={() =>
                      handleCategorySelect(category.id)
                    }
                    onMouseEnter={() =>
                      setIsHoveredCategory(category.id)
                    }
                    onMouseLeave={() =>
                      setIsHoveredCategory("")
                    }
                    className={`category-chip px-5 py-3 rounded-xl border text-sm font-medium animate-slide-up ${
                      selectedCategory === category.id
                        ? "selected"
                        : "border-gray-200 text-gray-700 bg-white hover:border-gray-300"
                    }`}
                    style={{
                      animationDelay: `${0.2 + index * 0.05}s`,
                      opacity: 0,
                    }}>
                    <span className="flex items-center gap-2">
                      {selectedCategory === category.id && (
                        <Check className="w-4 h-4" />
                      )}
                      {category.label}
                    </span>
                  </button>
                ),
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end animate-slide-up stagger-6">
              <button
                disabled={!isValid}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                  isValid
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}>
                Get started
                {isValid && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Helper Text */}
          <p
            className="text-center text-gray-400 text-sm mt-6 animate-slide-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}>
            Not sure which category fits?{" "}
            <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              Browse all services
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
