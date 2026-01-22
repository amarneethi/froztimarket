"use client";

import {
  ArrowUpRight,
  Award,
  Bot,
  ChevronDown,
  Filter,
  Layers,
  Palette,
  Search,
  Sliders,
  Sparkles,
  Star,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function A1LanceSearch() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState("People");
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Data
  const trendingSkills = [
    { name: "Webflow", icon: Layers, color: "#4353FF" },
    { name: "Framer", icon: Sparkles, color: "#0055FF" },
    {
      name: "Brand Designer",
      icon: Palette,
      color: "#1a1a1a",
    },
    {
      name: "Product Designer",
      icon: Sliders,
      color: "#1a1a1a",
    },
    { name: "Rive", icon: Zap, color: "#1a1a1a" },
  ];

  const suggestedFilters = [
    {
      name: "Adobe After Effects",
      icon: "Ae",
      color: "#9999FF",
    },
    {
      name: "Adobe Illustrator",
      icon: "Ai",
      color: "#FF9A00",
    },
  ];

  const freelancers = [
    {
      id: 1,
      name: "Paul du Plessis",
      location: "Bloemfontein, South Africa",
      avatar: "https://i.pravatar.cc/80?img=33",
      isPro: true,
      isOnline: true,
      earned: "$10k+",
      hired: "20x",
      rating: 5.0,
      followers: 115,
      badges: [
        { name: "Top Independent", icon: Award },
        { name: "Rive expert", icon: Zap },
      ],
      extraBadges: 1,
      skills: ["Motion Designer", "Rive", "After Effects", "Lottie"],
      portfolio: [
        {
          color: "from-cyan-400 via-purple-400 to-pink-400",
          pattern: "radial",
        },
        {
          color: "from-emerald-400 to-green-600",
          pattern: "isometric",
        },
        {
          color: "from-gray-900 to-black",
          pattern: "minimal",
        },
        {
          color: "from-purple-600 via-pink-500 to-purple-900",
          pattern: "spiral",
        },
      ],
    },
    {
      id: 2,
      name: "Diego Rotmistrovsky",
      location: "Buenos Aires, Argentina",
      avatar: "https://i.pravatar.cc/80?img=59",
      isPro: true,
      isOnline: true,
      earned: "$100k+",
      hired: "43x",
      rating: 5.0,
      followers: 208,
      badges: [
        { name: "Top Independent", icon: Award },
        { name: "YC Hired", icon: TrendingUp },
      ],
      extraBadges: 0,
      skills: ["Motion Designer", "3D Artist", "Cinema 4D", "Blender", "After Effects"],
      portfolio: [
        {
          color: "from-indigo-600 to-blue-900",
          pattern: "gradient",
        },
        {
          color: "from-orange-400 to-red-600",
          pattern: "abstract",
        },
        {
          color: "from-slate-800 to-slate-900",
          pattern: "tech",
        },
        {
          color: "from-violet-500 to-purple-700",
          pattern: "neon",
        },
      ],
    },
    {
      id: 3,
      name: "Sarah Chen",
      location: "San Francisco, USA",
      avatar: "https://i.pravatar.cc/80?img=47",
      isPro: true,
      isOnline: false,
      earned: "$75k+",
      hired: "31x",
      rating: 4.9,
      followers: 342,
      badges: [{ name: "Top Independent", icon: Award }],
      extraBadges: 2,
      skills: ["UI Animation", "Figma", "Framer", "Prototyping"],
      portfolio: [
        {
          color: "from-rose-400 to-pink-600",
          pattern: "organic",
        },
        {
          color: "from-amber-300 to-orange-500",
          pattern: "warm",
        },
        {
          color: "from-teal-400 to-cyan-600",
          pattern: "cool",
        },
        {
          color: "from-gray-700 to-gray-900",
          pattern: "dark",
        },
      ],
    },
    {
      id: 4,
      name: "Marcus Webb",
      location: "London, United Kingdom",
      avatar: "https://i.pravatar.cc/80?img=60",
      isPro: false,
      isOnline: true,
      earned: "$25k+",
      hired: "12x",
      rating: 5.0,
      followers: 89,
      badges: [{ name: "Rive expert", icon: Zap }],
      extraBadges: 0,
      skills: ["Motion Graphics", "Rive", "After Effects", "Premiere Pro"],
      portfolio: [
        {
          color: "from-blue-500 to-indigo-700",
          pattern: "geometric",
        },
        {
          color: "from-green-400 to-emerald-600",
          pattern: "nature",
        },
        {
          color: "from-yellow-400 to-amber-600",
          pattern: "bright",
        },
        {
          color: "from-purple-500 to-violet-700",
          pattern: "creative",
        },
      ],
    },
    {
      id: 5,
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      avatar: "https://i.pravatar.cc/80?img=25",
      isPro: true,
      isOnline: true,
      earned: "$150k+",
      hired: "67x",
      rating: 5.0,
      followers: 521,
      badges: [
        { name: "Top Independent", icon: Award },
        { name: "YC Hired", icon: TrendingUp },
      ],
      extraBadges: 3,
      skills: ["Animation Director", "Storyboarding", "After Effects", "Toon Boom"],
      portfolio: [
        {
          color: "from-red-500 to-rose-700",
          pattern: "japanese",
        },
        {
          color: "from-slate-600 to-slate-800",
          pattern: "minimal",
        },
        {
          color: "from-sky-400 to-blue-600",
          pattern: "calm",
        },
        {
          color: "from-fuchsia-500 to-pink-700",
          pattern: "vibrant",
        },
      ],
    },
    {
      id: 6,
      name: "Elena Kowalski",
      location: "Warsaw, Poland",
      avatar: "https://i.pravatar.cc/80?img=44",
      isPro: true,
      isOnline: false,
      earned: "$45k+",
      hired: "19x",
      rating: 4.8,
      followers: 156,
      badges: [{ name: "Top Independent", icon: Award }],
      extraBadges: 1,
      skills: ["Lottie Animations", "Bodymovin", "After Effects", "Illustrator"],
      portfolio: [
        {
          color: "from-lime-400 to-green-600",
          pattern: "fresh",
        },
        {
          color: "from-cyan-500 to-teal-700",
          pattern: "water",
        },
        {
          color: "from-orange-500 to-red-700",
          pattern: "fire",
        },
        {
          color: "from-indigo-400 to-purple-600",
          pattern: "dream",
        },
      ],
    },
    {
      id: 7,
      name: "James Okonkwo",
      location: "Lagos, Nigeria",
      avatar: "https://i.pravatar.cc/80?img=52",
      isPro: false,
      isOnline: true,
      earned: "$15k+",
      hired: "8x",
      rating: 5.0,
      followers: 67,
      badges: [{ name: "Rising Star", icon: Star }],
      extraBadges: 0,
      skills: ["After Effects", "Motion Graphics", "Premiere Pro", "Photoshop"],
      portfolio: [
        {
          color: "from-yellow-500 to-orange-600",
          pattern: "afro",
        },
        {
          color: "from-emerald-500 to-teal-700",
          pattern: "earth",
        },
        {
          color: "from-rose-500 to-pink-700",
          pattern: "sunset",
        },
        {
          color: "from-blue-600 to-indigo-800",
          pattern: "night",
        },
      ],
    },
    {
      id: 8,
      name: "Anna Müller",
      location: "Berlin, Germany",
      avatar: "https://i.pravatar.cc/80?img=32",
      isPro: true,
      isOnline: true,
      earned: "$90k+",
      hired: "38x",
      rating: 4.9,
      followers: 289,
      badges: [
        { name: "Top Independent", icon: Award },
        { name: "Rive expert", icon: Zap },
      ],
      extraBadges: 2,
      skills: ["Interactive Design", "Rive", "Webflow", "Framer"],
      portfolio: [
        {
          color: "from-gray-800 to-black",
          pattern: "bauhaus",
        },
        {
          color: "from-red-600 to-rose-800",
          pattern: "bold",
        },
        {
          color: "from-yellow-400 to-amber-500",
          pattern: "accent",
        },
        {
          color: "from-blue-500 to-sky-700",
          pattern: "clean",
        },
      ],
    },
    {
      id: 9,
      name: "Carlos Mendoza",
      location: "Mexico City, Mexico",
      avatar: "https://i.pravatar.cc/80?img=57",
      isPro: true,
      isOnline: false,
      earned: "$60k+",
      hired: "25x",
      rating: 5.0,
      followers: 198,
      badges: [{ name: "Top Independent", icon: Award }],
      extraBadges: 1,
      skills: ["Motion Branding", "Logo Animation", "After Effects", "Illustrator"],
      portfolio: [
        {
          color: "from-pink-500 to-rose-700",
          pattern: "latin",
        },
        {
          color: "from-teal-400 to-cyan-600",
          pattern: "tropical",
        },
        {
          color: "from-violet-600 to-purple-800",
          pattern: "mystical",
        },
        {
          color: "from-amber-500 to-orange-700",
          pattern: "warm",
        },
      ],
    },
    {
      id: 10,
      name: "Priya Sharma",
      location: "Mumbai, India",
      avatar: "https://i.pravatar.cc/80?img=45",
      isPro: true,
      isOnline: true,
      earned: "$55k+",
      hired: "22x",
      rating: 4.9,
      followers: 176,
      badges: [
        { name: "Top Independent", icon: Award },
        { name: "YC Hired", icon: TrendingUp },
      ],
      extraBadges: 0,
      skills: ["UI Microinteractions", "Figma", "Principle", "Framer"],
      portfolio: [
        {
          color: "from-orange-400 to-red-600",
          pattern: "spice",
        },
        {
          color: "from-emerald-400 to-green-600",
          pattern: "lush",
        },
        {
          color: "from-purple-500 to-indigo-700",
          pattern: "royal",
        },
        {
          color: "from-sky-400 to-blue-600",
          pattern: "serene",
        },
      ],
    },
  ];

  // Filter freelancers based on search query (name and skills)
  const filteredFreelancers = useMemo(() => {
    if (!searchQuery.trim()) {
      return freelancers;
    }

    const query = searchQuery.toLowerCase();
    return freelancers.filter((freelancer) => {
      const nameMatch = freelancer.name.toLowerCase().includes(query);
      const skillMatch = freelancer.skills.some((skill) => skill.toLowerCase().includes(query));
      return nameMatch || skillMatch;
    });
  }, [searchQuery]);

  // Autocomplete results based on search query
  const autocompleteResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results = [];

    // Add matching skills
    const allSkills = [...new Set(freelancers.flatMap((f) => f.skills))];
    const matchingSkills = allSkills.filter((skill) => skill.toLowerCase().includes(query)).slice(0, 3);
    matchingSkills.forEach((skill) => {
      results.push({ type: "skill", name: skill });
    });

    // Add matching people
    const matchingPeople = freelancers.filter((f) => f.name.toLowerCase().includes(query)).slice(0, 6);
    matchingPeople.forEach((person) => {
      results.push({
        type: "person",
        name: person.name,
        avatar: person.avatar,
        hasArrow: true,
      });
    });

    return results;
  }, [searchQuery]);

  // Derived
  const showTrending = isSearchFocused && searchQuery.length === 0;
  const showAutocomplete = isSearchFocused && autocompleteResults.length > 0;

  // Handlers
  const handleFilterToggle = (filterName) => {
    setSelectedFilters((prev) =>
      prev.includes(filterName) ? prev.filter((f) => f !== filterName) : [...prev, filterName],
    );
  };

  const handleSearchSubmit = () => {
    setIsSearchFocused(false);
  };

  const handleSelectAutocomplete = (item) => {
    setSearchQuery(item.name);
    setIsSearchFocused(false);
  };

  // Helper to highlight matching text
  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 rounded px-0.5">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="min-h-screen bg-white">
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
        h3 {
          font-family: var(--font-display);
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .animate-fade-in {
          animation: fade-in 0.25s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.12);
        }

        .portfolio-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .portfolio-item:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.2);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .dropdown-item {
          transition: background-color 0.15s ease;
        }

        .dropdown-item:hover {
          background-color: #f9fafb;
        }

        .filter-chip {
          transition: all 0.2s ease;
        }

        .filter-chip:hover {
          background-color: #f3f4f6;
        }

        .filter-chip.active {
          background-color: #1f2937;
          color: white;
        }

        .ai-chat-bubble {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .skill-tag {
          transition: all 0.2s ease;
        }

        .skill-tag:hover {
          background-color: #e5e7eb;
        }
      `}</style>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Find your next collaborator
          </h1>
          <p className="text-gray-500">Search {freelancers.length} motion designers, animators, and creative talent</p>
        </div>

        {/* Search Bar Container */}
        <div className="relative mb-8">
          {/* Search Input */}
          <div
            className={`relative flex items-center bg-white border rounded-2xl transition-all duration-300 ${
              isSearchFocused ? "border-gray-300 shadow-lg shadow-gray-100/50" : "border-gray-200 hover:border-gray-300"
            }`}>
            <Search className="w-5 h-5 text-gray-400 ml-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              placeholder="Search by name or skill..."
              className="search-input flex-1 px-4 py-4 text-gray-800 text-base outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}

            {/* Tabs */}
            <div className="flex items-center gap-1 mr-4 border-l border-gray-100 pl-4">
              {["Projects", "People"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                  }`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Skills Dropdown */}
          {showTrending && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100/50 p-5 z-50 animate-fade-in">
              <p className="text-sm text-gray-500 mb-3">Trending skills and tools</p>
              <div className="flex flex-wrap gap-2">
                {trendingSkills.map((skill, index) => (
                  <button
                    key={skill.name}
                    onClick={() => setSearchQuery(skill.name)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}>
                    <skill.icon className="w-4 h-4" style={{ color: skill.color }} />
                    <span className="text-sm text-gray-700">{skill.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Autocomplete Dropdown */}
          {showAutocomplete && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100/50 overflow-hidden z-50 animate-fade-in">
              {autocompleteResults.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAutocomplete(item)}
                  className="dropdown-item w-full flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {item.type === "skill" ? (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">SKILL</span>
                    ) : (
                      <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                    )}
                    <span className="text-gray-800">{item.name}</span>
                  </div>
                  {item.hasArrow && <ArrowUpRight className="w-4 h-4 text-gray-300" />}
                </button>
              ))}
              <button
                onClick={() => handleSearchSubmit()}
                className="w-full px-5 py-3.5 text-left text-gray-500 hover:bg-gray-50 border-t border-gray-50">
                Search for '{searchQuery}'
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="animate-slide-up">
          {/* Filters Bar */}
          <div className="flex items-center gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </button>
            <span className="text-sm text-gray-400">Suggested:</span>
            {suggestedFilters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => handleFilterToggle(filter.name)}
                className={`filter-chip flex items-center gap-2 px-3 py-2 border rounded-lg ${
                  selectedFilters.includes(filter.name) ? "active border-gray-900" : "border-gray-200"
                }`}>
                <span
                  className="px-1.5 py-0.5 text-xs font-bold rounded"
                  style={{
                    backgroundColor: filter.color,
                    color: filter.color === "#FF9A00" ? "#000" : "#fff",
                  }}>
                  {filter.icon}
                </span>
                <span className="text-sm">{filter.name}</span>
              </button>
            ))}

            {/* Results count */}
            <span className="ml-auto text-sm text-gray-500">
              {filteredFreelancers.length} {filteredFreelancers.length === 1 ? "result" : "results"}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
          </div>

          {/* Freelancer Cards */}
          {filteredFreelancers.length > 0 ? (
            <div className="space-y-6">
              {filteredFreelancers.map((freelancer, index) => (
                <div
                  key={freelancer.id}
                  className="card-hover bg-white border border-gray-100 rounded-2xl p-6 animate-slide-up"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                  }}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={freelancer.avatar}
                          alt={freelancer.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        {freelancer.isOnline && (
                          <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="text-lg font-semibold text-gray-900"
                            style={{
                              fontFamily: "var(--font-display)",
                            }}>
                            {highlightMatch(freelancer.name, searchQuery)}
                          </h3>
                          {freelancer.isPro && (
                            <span className="px-2 py-0.5 bg-gray-900 text-white text-xs font-semibold rounded">
                              PRO
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{freelancer.location}</p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-900">{freelancer.earned}</span>
                            <span className="text-gray-400 ml-1">Earned</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">{freelancer.hired}</span>
                            <span className="text-gray-400 ml-1">Hired</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                            <span className="font-semibold text-gray-900">{freelancer.rating}</span>
                            <span className="text-gray-400 ml-1">Rating</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">{freelancer.followers}</span>
                            <span className="text-gray-400 ml-1">Followers</span>
                          </div>

                          {/* Badges */}
                          <div className="flex items-center gap-2 ml-2">
                            {freelancer.badges.map((badge, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full">
                                <badge.icon className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-700">{badge.name}</span>
                              </div>
                            ))}
                            {freelancer.extraBadges > 0 && (
                              <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded-full">
                                <span className="text-sm text-gray-500">+{freelancer.extraBadges}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Follow
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        <Zap className="w-4 h-4" />
                        Get in touch
                      </button>
                    </div>
                  </div>

                  {/* Portfolio Grid */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {freelancer.portfolio.map((item, idx) => (
                      <div
                        key={idx}
                        className={`portfolio-item aspect-[4/3] rounded-xl bg-gradient-to-br ${item.color} cursor-pointer relative overflow-hidden`}>
                        {/* Abstract patterns */}
                        {item.pattern === "radial" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-white/10 blur-xl" />
                          </div>
                        )}
                        {item.pattern === "spiral" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 border-4 border-white/20 rounded-full" />
                            <div className="absolute w-16 h-16 border-4 border-white/30 rounded-full" />
                          </div>
                        )}
                        {item.pattern === "isometric" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/20 rotate-45 rounded-lg" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {freelancer.skills.map((skill, idx) => {
                      const isMatch = searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase());
                      return (
                        <button
                          key={idx}
                          onClick={() => setSearchQuery(skill)}
                          className={`skill-tag px-3 py-1.5 rounded-lg text-sm ${
                            isMatch ? "bg-yellow-100 text-yellow-800 font-medium" : "bg-gray-50 text-gray-600"
                          }`}>
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Results State */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                No results found
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                We couldn't find any designers matching "{searchQuery}". Try adjusting your search or browse all
                designers.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* AI Chat Bubble - Fixed Position */}
        <div className="fixed bottom-6 right-6 ai-chat-bubble rounded-2xl p-4 shadow-lg animate-scale-in max-w-xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span
                className="font-semibold text-gray-900"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                Indy
              </span>
              <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded">AI</span>
            </div>
            <button className="ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <p className="text-sm text-gray-600">What are you looking for today?</p>
        </div>
      </div>
    </div>
  );
}
