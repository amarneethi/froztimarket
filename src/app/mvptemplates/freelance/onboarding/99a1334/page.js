"use client";

import {
  ArrowLeft,
  Bot,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleStop,
  HelpCircle,
  Linkedin,
  MapPin,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

export default function ProfileBuilder() {
  // State
  const [oneLiner, setOneLiner] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [location, setLocation] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isRateDropdownOpen, setIsRateDropdownOpen] =
    useState(false);
  const [
    isLocationDropdownOpen,
    setIsLocationDropdownOpen,
  ] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [currentStep, setCurrentStep] = useState(2);

  // Data
  const hourlyRateOptions = [
    "$10 - $25/hr",
    "$25 - $50/hr",
    "$50 - $100/hr",
    "$100 - $150/hr",
    "$150+/hr",
  ];

  const usCities = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA",
    "Austin, TX",
    "Jacksonville, FL",
    "Fort Worth, TX",
    "Columbus, OH",
    "Indianapolis, IN",
    "Charlotte, NC",
    "San Francisco, CA",
    "Seattle, WA",
    "Denver, CO",
    "Washington, DC",
    "Boston, MA",
    "Nashville, TN",
    "Detroit, MI",
    "Oklahoma City, OK",
    "Portland, OR",
    "Las Vegas, NV",
    "Memphis, TN",
    "Louisville, KY",
    "Baltimore, MD",
    "Milwaukee, WI",
    "Albuquerque, NM",
    "Tucson, AZ",
    "Fresno, CA",
    "Sacramento, CA",
    "Atlanta, GA",
    "Kansas City, MO",
    "Miami, FL",
    "Raleigh, NC",
    "Omaha, NE",
    "Minneapolis, MN",
    "Cleveland, OH",
    "Tampa, FL",
    "New Orleans, LA",
    "Honolulu, HI",
    "Salt Lake City, UT",
    "Pittsburgh, PA",
    "Cincinnati, OH",
    "Orlando, FL",
    "St. Louis, MO",
    "Menlo Park, CA",
  ];

  // Derived - filtered cities based on search
  const filteredCities = usCities.filter((city) =>
    city
      .toLowerCase()
      .includes(locationSearch.toLowerCase()),
  );

  const [isSkillInputFocused, setIsSkillInputFocused] =
    useState(false);

  const allSkills = [
    "Brand Designer",
    "Copywriter",
    "Project Manager",
    "UI Designer",
    "Motion Designer",
    "Graphic Designer",
    "Web Developer",
    "Illustrator",
    "Art Director",
    "UX Designer",
    "Product Designer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "Data Scientist",
    "Content Writer",
    "Social Media Manager",
    "SEO Specialist",
    "Video Editor",
    "Photographer",
    "3D Artist",
    "Game Designer",
    "Sound Designer",
    "Marketing Strategist",
  ];

  // Derived - filtered skills based on input
  const filteredSkills = allSkills.filter(
    (skill) =>
      !skills.includes(skill) &&
      (skillInput === "" ||
        skill
          .toLowerCase()
          .includes(skillInput.toLowerCase())),
  );

  const socialPlatforms = [
    { name: "Threads", icon: CircleStop },
    { name: "X", icon: X },
    { name: "LinkedIn", icon: Linkedin },
    { name: "More", icon: Sparkles },
  ];

  // Derived
  const oneLinerLength = oneLiner.length;
  const skillsCount = skills.length;
  const isFormValid =
    oneLiner.length > 0 &&
    skills.length > 0 &&
    hourlyRate &&
    location;

  // Handlers
  const addSkill = (skill) => {
    if (skills.length < 3 && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Google Font Import */}
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

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(10px, -10px) scale(1.02);
          }
          66% {
            transform: translate(-5px, 5px) scale(0.98);
          }
        }

        @keyframes pulse-soft {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
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

        .animate-float-1 {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float 25s ease-in-out infinite reverse;
        }
        .animate-float-3 {
          animation: float 18s ease-in-out infinite;
          animation-delay: -5s;
        }
        .animate-float-4 {
          animation: float 22s ease-in-out infinite reverse;
          animation-delay: -10s;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .stagger-1 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        .stagger-2 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .stagger-3 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        .stagger-4 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .stagger-5 {
          animation-delay: 0.5s;
          opacity: 0;
        }

        .gradient-blob {
          filter: blur(80px);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
        }

        input::placeholder,
        textarea::placeholder {
          color: #9ca3af;
        }

        .skill-tag {
          transition: all 0.2s ease;
        }

        .skill-tag:hover {
          transform: translateY(-1px);
        }
      `}</style>

      {/* Animated Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top right blob */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full gradient-blob animate-float-1"
          style={{
            background:
              "linear-gradient(135deg, rgba(236, 201, 255, 0.5) 0%, rgba(201, 224, 255, 0.4) 50%, rgba(255, 201, 242, 0.3) 100%)",
          }}
        />

        {/* Middle right blob */}
        <div
          className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full gradient-blob animate-float-2"
          style={{
            background:
              "linear-gradient(225deg, rgba(201, 255, 242, 0.4) 0%, rgba(201, 224, 255, 0.5) 50%, rgba(236, 201, 255, 0.3) 100%)",
          }}
        />

        {/* Bottom right blob */}
        <div
          className="absolute bottom-20 right-40 w-[350px] h-[350px] rounded-full gradient-blob animate-float-3"
          style={{
            background:
              "linear-gradient(45deg, rgba(255, 224, 201, 0.3) 0%, rgba(255, 201, 224, 0.4) 50%, rgba(224, 201, 255, 0.5) 100%)",
          }}
        />

        {/* Left accent blob */}
        <div
          className="absolute top-1/2 -left-40 w-[300px] h-[300px] rounded-full gradient-blob animate-float-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(201, 242, 255, 0.3) 0%, rgba(224, 201, 255, 0.4) 100%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center gap-4 mb-12 animate-slide-up stagger-1">
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">
              Change account type
            </span>
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <span className="text-gray-500">
            Independent account setup
          </span>
        </header>

        <div className="flex gap-16">
          {/* Left Column - Form */}
          <div className="flex-1 max-w-lg">
            {/* Step Indicator */}
            <div className="mb-3 animate-slide-up stagger-2">
              <span className="text-sm text-gray-500 font-medium tracking-wide">
                Step {currentStep}/3
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl font-semibold text-gray-900 mb-6 animate-slide-up stagger-2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
              }}>
              Build your profile
            </h1>

            {/* Import Button */}
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all mb-10 animate-slide-up stagger-3 group">
              <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded tracking-wide">
                BETA
              </span>
              <span className="text-gray-700">
                Import from Dribbble or Behance
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Form Fields */}
            <div className="space-y-8">
              {/* One-liner */}
              <div className="animate-slide-up stagger-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  One-liner
                </label>
                <div className="relative">
                  <textarea
                    value={oneLiner}
                    onChange={(e) =>
                      setOneLiner(
                        e.target.value.slice(0, 60),
                      )
                    }
                    placeholder="Motion Designer bringing ideas to life through animation"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none text-gray-800"
                    rows={3}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      Highlight your creative focus.
                    </span>
                    <span
                      className={`text-xs font-medium ${oneLinerLength > 50 ? "text-amber-500" : "text-gray-400"}`}>
                      {oneLinerLength}/60
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="animate-slide-up stagger-5 relative z-40">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Skills
                </label>
                <div className="relative">
                  <div className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="skill-tag inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
                          {skill}
                          <button
                            onClick={() =>
                              removeSkill(skill)
                            }
                            className="hover:text-gray-900 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                      {skills.length < 3 && (
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) =>
                            setSkillInput(e.target.value)
                          }
                          onKeyDown={handleSkillKeyDown}
                          onFocus={() =>
                            setIsSkillInputFocused(true)
                          }
                          onBlur={() =>
                            setTimeout(
                              () =>
                                setIsSkillInputFocused(
                                  false,
                                ),
                              150,
                            )
                          }
                          placeholder={
                            skills.length === 0
                              ? "Add up to three skills"
                              : "Add another skill"
                          }
                          className="flex-1 min-w-[150px] outline-none text-gray-800 py-1"
                        />
                      )}
                    </div>
                  </div>

                  {/* Skills Dropdown */}
                  {isSkillInputFocused &&
                    skills.length < 3 &&
                    filteredSkills.length > 0 && (
                      <div className="absolute z-20 w-full mt-2 py-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-64 overflow-y-auto">
                        {filteredSkills
                          .slice(0, 8)
                          .map((skill) => (
                            <button
                              key={skill}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                addSkill(skill);
                              }}
                              className="w-full px-4 py-2.5 text-left hover:bg-indigo-50 text-gray-700 transition-colors flex items-center gap-2 group">
                              <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                                <span className="text-xs text-gray-500 group-hover:text-indigo-600">
                                  +
                                </span>
                              </span>
                              <span className="group-hover:text-indigo-700 transition-colors">
                                {skill}
                              </span>
                            </button>
                          ))}
                        {filteredSkills.length > 8 && (
                          <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100 mt-1">
                            Type to see more results...
                          </div>
                        )}
                      </div>
                    )}

                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      Brand Designer, Copywriter, Project
                      Manager, etc.
                    </span>
                    <span
                      className={`text-xs font-medium ${skillsCount === 3 ? "text-emerald-500" : "text-gray-400"}`}>
                      {skillsCount}/3
                    </span>
                  </div>
                </div>
              </div>

              {/* Hourly Rate */}
              <div
                className="animate-slide-up relative z-30"
                style={{
                  animationDelay: "0.6s",
                  opacity: 0,
                }}>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Hourly rate
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsRateDropdownOpen(
                        !isRateDropdownOpen,
                      )
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-left flex items-center justify-between">
                    <span
                      className={
                        hourlyRate
                          ? "text-gray-800"
                          : "text-gray-400"
                      }>
                      {hourlyRate ||
                        "Select your hourly rate"}
                    </span>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${isRateDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {isRateDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 py-2 bg-white rounded-xl border border-gray-200 shadow-lg">
                      {hourlyRateOptions.map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            setHourlyRate(rate);
                            setIsRateDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 transition-colors">
                          {rate}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div
                className="animate-slide-up relative z-20"
                style={{
                  animationDelay: "0.7s",
                  opacity: 0,
                }}>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>

                  {location ? (
                    <button
                      onClick={() => {
                        setIsLocationDropdownOpen(true);
                        setLocationSearch("");
                      }}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-left flex items-center justify-between">
                      <span className="text-gray-800">
                        {location}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${isLocationDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) =>
                          setLocationSearch(e.target.value)
                        }
                        onFocus={() =>
                          setIsLocationDropdownOpen(true)
                        }
                        onBlur={() =>
                          setTimeout(
                            () =>
                              setIsLocationDropdownOpen(
                                false,
                              ),
                            150,
                          )
                        }
                        placeholder="Search for a city..."
                        className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${isLocationDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Location Dropdown */}
                  {isLocationDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-64 overflow-hidden">
                      {location && (
                        <div className="p-2 border-b border-gray-100">
                          <input
                            type="text"
                            value={locationSearch}
                            onChange={(e) =>
                              setLocationSearch(
                                e.target.value,
                              )
                            }
                            placeholder="Search for a city..."
                            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-800"
                            autoFocus
                          />
                        </div>
                      )}
                      <div className="overflow-y-auto max-h-48">
                        {filteredCities.length > 0 ? (
                          filteredCities
                            .slice(0, 10)
                            .map((city) => (
                              <button
                                key={city}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  setLocation(city);
                                  setLocationSearch("");
                                  setIsLocationDropdownOpen(
                                    false,
                                  );
                                }}
                                className={`w-full px-4 py-2.5 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 group ${
                                  location === city
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-gray-700"
                                }`}>
                                <MapPin
                                  className={`w-4 h-4 ${location === city ? "text-indigo-500" : "text-gray-400 group-hover:text-indigo-500"} transition-colors`}
                                />
                                <span className="group-hover:text-indigo-700 transition-colors">
                                  {city}
                                </span>
                              </button>
                            ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-400 text-sm">
                            No cities found matching "
                            {locationSearch}"
                          </div>
                        )}
                        {filteredCities.length > 10 && (
                          <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
                            Type to narrow down results...
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Photo */}
              <div
                className="animate-slide-up relative z-10"
                style={{
                  animationDelay: "0.8s",
                  opacity: 0,
                }}>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Profile photo
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Add a photo to help build connection and
                  trust.
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200" />
                    )}
                  </div>

                  <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                    {profilePhoto ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          Replace profile photo
                        </span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          Upload profile photo
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <button className="mt-4 inline-flex items-center gap-2 text-sm group">
                  <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded tracking-wide">
                    BETA
                  </span>
                  <span className="text-gray-600 group-hover:text-gray-800 transition-colors">
                    Import from Dribbble or Behance
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div
              className="flex items-center gap-3 mt-12 animate-slide-up"
              style={{
                animationDelay: "0.9s",
                opacity: 0,
              }}>
              <button className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
              <button
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  isFormValid
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-900 text-white opacity-90 hover:opacity-100"
                }`}>
                Continue
              </button>
            </div>
          </div>

          {/* Right Column - AI Assistant Card */}
          <div
            className="w-80 animate-slide-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}>
            <div className="glass-card rounded-2xl p-6 shadow-xl shadow-gray-100/50">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-lg font-semibold text-gray-900"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}>
                    Indy
                  </span>
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                    AI
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-200 animate-pulse" />
                  <span className="text-sm text-gray-600">
                    0 posts scanned today
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-1">
                  {socialPlatforms.map((platform, idx) => (
                    <div
                      key={platform.name}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer">
                      <platform.icon className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-700 leading-relaxed">
                Let's complete your profile so I can find
                the best opportunities for you.
              </p>

              {/* Divider with secondary message */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">
                    All caught up! No new posts to
                    <br />
                    review right now
                  </p>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                    <div className="flex items-center gap-1">
                      {socialPlatforms.map((platform) => (
                        <div
                          key={platform.name + "-2"}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-gray-300">
                          <platform.icon className="w-3 h-3" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Let's complete your profile so I can find
                  the best opportunities for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
