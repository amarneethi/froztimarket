"use client";

import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  HelpCircle,
  Image,
  Link,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";

export default function CreateProject() {
  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] =
    useState(false);

  // Form State
  const [projectCover, setProjectCover] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [clients, setClients] = useState([]);
  const [clientInput, setClientInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [completedWorkLink, setCompletedWorkLink] =
    useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [tools, setTools] = useState([]);
  const [toolInput, setToolInput] = useState("");
  const [industry, setIndustry] = useState([]);
  const [industryInput, setIndustryInput] = useState("");
  const [verifiedProject, setVerifiedProject] =
    useState("");

  // Dropdown States
  const [
    isVerifiedDropdownOpen,
    setIsVerifiedDropdownOpen,
  ] = useState(false);
  const [isSkillInputFocused, setIsSkillInputFocused] =
    useState(false);
  const [isToolInputFocused, setIsToolInputFocused] =
    useState(false);
  const [
    isIndustryInputFocused,
    setIsIndustryInputFocused,
  ] = useState(false);

  // Data
  const verifiedProjects = [
    "Mobile App Redesign - TechCorp",
    "Brand Identity - StartupXYZ",
    "E-commerce Platform - RetailCo",
    "Dashboard UI - DataViz Inc",
  ];

  const allSkills = [
    "3D Renderer",
    "Motion Designer",
    "UI Designer",
    "UX Designer",
    "Brand Designer",
    "Illustrator",
    "Art Director",
    "Graphic Designer",
    "Web Developer",
    "Product Designer",
    "Visual Designer",
    "Animation",
    "Typography",
  ];

  const allTools = [
    "Blender",
    "Cinema 4D",
    "After Effects",
    "Figma",
    "Sketch",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "Premiere Pro",
    "Maya",
    "Houdini",
    "Unity",
    "Unreal Engine",
  ];

  const allIndustries = [
    "Design",
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Entertainment",
    "E-commerce",
    "Marketing",
    "Real Estate",
    "Gaming",
    "Media",
    "Automotive",
  ];

  // Derived
  const descriptionLength = description.length;
  const filteredSkills = allSkills.filter(
    (skill) =>
      !skills.includes(skill) &&
      (skillInput === "" ||
        skill
          .toLowerCase()
          .includes(skillInput.toLowerCase())),
  );
  const filteredTools = allTools.filter(
    (tool) =>
      !tools.includes(tool) &&
      (toolInput === "" ||
        tool
          .toLowerCase()
          .includes(toolInput.toLowerCase())),
  );
  const filteredIndustries = allIndustries.filter(
    (ind) =>
      !industry.includes(ind) &&
      (industryInput === "" ||
        ind
          .toLowerCase()
          .includes(industryInput.toLowerCase())),
  );

  const isFormValid =
    title.length > 0 && description.length > 0;

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

  const addTool = (tool) => {
    if (tools.length < 3 && !tools.includes(tool)) {
      setTools([...tools, tool]);
      setToolInput("");
    }
  };

  const removeTool = (toolToRemove) => {
    setTools(tools.filter((t) => t !== toolToRemove));
  };

  const addIndustry = (ind) => {
    if (industry.length < 1 && !industry.includes(ind)) {
      setIndustry([...industry, ind]);
      setIndustryInput("");
    }
  };

  const removeIndustry = (indToRemove) => {
    setIndustry(industry.filter((i) => i !== indToRemove));
  };

  const addClient = () => {
    if (clients.length < 3 && clientInput.trim()) {
      setClients([...clients, clientInput.trim()]);
      setClientInput("");
    }
  };

  const removeClient = (clientToRemove) => {
    setClients(clients.filter((c) => c !== clientToRemove));
  };

  const handlePublish = () => {
    setShowSuccessModal(true);
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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .stagger-1 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        .stagger-2 {
          animation-delay: 0.15s;
          opacity: 0;
        }
        .stagger-3 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .stagger-4 {
          animation-delay: 0.25s;
          opacity: 0;
        }
        .stagger-5 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        .stagger-6 {
          animation-delay: 0.35s;
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

        .tag {
          transition: all 0.2s ease;
        }

        .tag:hover {
          transform: translateY(-1px);
        }

        .upload-zone {
          background: linear-gradient(
            135deg,
            #475569 0%,
            #334155 50%,
            #1e293b 100%
          );
          transition: all 0.3s ease;
        }

        .upload-zone:hover {
          transform: scale(1.01);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .collab-banner {
          background: linear-gradient(
            135deg,
            rgba(201, 224, 255, 0.5) 0%,
            rgba(236, 201, 255, 0.3) 100%
          );
        }

        .modal-backdrop {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
        }

        .success-card {
          background: linear-gradient(
            180deg,
            #475569 0%,
            #334155 60%,
            #1e293b 100%
          );
        }
      `}</style>

      {/* Animated Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full gradient-blob animate-float-1"
          style={{
            background:
              "linear-gradient(135deg, rgba(236, 201, 255, 0.5) 0%, rgba(201, 224, 255, 0.4) 50%, rgba(255, 201, 242, 0.3) 100%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full gradient-blob animate-float-2"
          style={{
            background:
              "linear-gradient(225deg, rgba(201, 255, 242, 0.4) 0%, rgba(201, 224, 255, 0.5) 50%, rgba(236, 201, 255, 0.3) 100%)",
          }}
        />
        <div
          className="absolute bottom-20 right-40 w-[350px] h-[350px] rounded-full gradient-blob animate-float-3"
          style={{
            background:
              "linear-gradient(45deg, rgba(255, 224, 201, 0.3) 0%, rgba(255, 201, 224, 0.4) 50%, rgba(224, 201, 255, 0.5) 100%)",
          }}
        />
        <div
          className="absolute top-1/2 -left-40 w-[300px] h-[300px] rounded-full gradient-blob animate-float-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(201, 242, 255, 0.3) 0%, rgba(224, 201, 255, 0.4) 100%)",
          }}
        />
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop animate-fade-in">
          <div className="glass-card rounded-2xl p-2 shadow-2xl max-w-md w-full mx-4 animate-scale-in">
            {/* Modal Header with X */}
            <div className="relative">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Success Card Preview */}
              <div className="success-card rounded-xl p-8 pb-6">
                <div className="bg-gradient-to-b from-slate-400/30 to-slate-500/30 rounded-xl p-4 max-w-[200px] mx-auto">
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-slate-400 to-slate-500 mb-3 flex items-center justify-center overflow-hidden">
                    {projectCover ? (
                      <img
                        src={projectCover}
                        alt="Project"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-300/50 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-slate-200" />
                      </div>
                    )}
                  </div>
                  <div className="bg-white rounded-lg px-3 py-2 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                    <span className="text-sm text-gray-700 font-medium">
                      Sam Lee
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-center">
              <h2
                className="text-2xl font-semibold text-gray-900 mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                Your project is live!
              </h2>
              <p className="text-gray-500">
                Show off what you've built—creativity
                deserves to be valued.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-10 animate-slide-up stagger-1">
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Cancel</span>
          </button>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all font-medium text-gray-700">
              Back
            </button>
            <div className="relative">
              <button
                onClick={handlePublish}
                className="px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all font-medium flex items-center gap-2">
                Publish
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Two Column Layout */}
        <div className="flex gap-12">
          {/* Left Column - Project Cover */}
          <div className="w-[340px] flex-shrink-0 animate-slide-up stagger-2">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Project Cover
            </label>

            <div className="upload-zone rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden cursor-pointer relative group">
              {projectCover ? (
                <>
                  <img
                    src={projectCover}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">
                      Change cover
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-400/30 mx-auto mb-4 flex items-center justify-center">
                    <Image className="w-10 h-10 text-slate-300" />
                  </div>
                </div>
              )}
            </div>

            <button className="w-full mt-4 py-3 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all font-medium text-gray-700 flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </button>

            <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
              Media at least 1600 x 1200 (4:3 aspect ratio)
              in png, jpg, gif, or mp4 formats work best
            </p>
          </div>

          {/* Right Column - Form */}
          <div className="flex-1 space-y-6">
            {/* Verified Projects */}
            <div className="animate-slide-up stagger-3 relative z-50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <label className="text-sm font-semibold text-gray-900">
                  Verified projects
                </label>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsVerifiedDropdownOpen(
                      !isVerifiedDropdownOpen,
                    )
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-left flex items-center justify-between">
                  <span
                    className={
                      verifiedProject
                        ? "text-gray-800"
                        : "text-gray-400"
                    }>
                    {verifiedProject ||
                      "Select a paid project..."}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isVerifiedDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isVerifiedDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 py-2 bg-white rounded-xl border border-gray-200 shadow-lg">
                    <button
                      onClick={() => {
                        setVerifiedProject("");
                        setIsVerifiedDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-400 transition-colors">
                      None
                    </button>
                    {verifiedProjects.map((project) => (
                      <button
                        key={project}
                        onClick={() => {
                          setVerifiedProject(project);
                          setIsVerifiedDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition-colors">
                        {project}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="animate-slide-up stagger-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dynamic Stone Motion"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
              />
            </div>

            {/* Description */}
            <div className="animate-slide-up stagger-5">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value.slice(0, 160),
                  )
                }
                placeholder="3D motion design of a stone gliding on a blue background, exploring fluid physics and textures."
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none text-gray-800"
                rows={4}
              />
              <div className="flex justify-end mt-1">
                <span
                  className={`text-xs font-medium ${descriptionLength > 140 ? "text-amber-500" : "text-gray-400"}`}>
                  {descriptionLength}/160
                </span>
              </div>
            </div>

            {/* Collaborators */}
            <div className="animate-slide-up stagger-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Collaborators
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={collaborators}
                  onChange={(e) =>
                    setCollaborators(e.target.value)
                  }
                  placeholder="Who else worked on this project?"
                  className="w-full px-4 py-3.5 pr-10 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                />
                <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Collaborators Banner */}
              <div className="collab-banner rounded-xl p-4 mt-3 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Projects with collaborators get more
                    views
                  </p>
                  <p className="text-sm text-gray-600">
                    Tag your team to give (and get) credit —
                    unlock visibility and social proof while
                    increasing your chances of being
                    featured.
                  </p>
                </div>
                <div className="flex -space-x-2 flex-shrink-0 ml-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-white" />
                </div>
              </div>
            </div>

            {/* Client(s) */}
            <div
              className="animate-slide-up"
              style={{
                animationDelay: "0.4s",
                opacity: 0,
              }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Client(s)
              </label>
              <div className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <div className="flex flex-wrap gap-2">
                  {clients.map((client) => (
                    <span
                      key={client}
                      className="tag inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
                      {client}
                      <button
                        onClick={() => removeClient(client)}
                        className="hover:text-gray-900 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  {clients.length < 3 && (
                    <input
                      type="text"
                      value={clientInput}
                      onChange={(e) =>
                        setClientInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          clientInput.trim()
                        ) {
                          e.preventDefault();
                          addClient();
                        }
                      }}
                      placeholder="Who hired you to complete this project?"
                      className="flex-1 min-w-[200px] outline-none text-gray-800 py-1"
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">
                  Optional
                </span>
                <span className="text-xs text-gray-400">
                  {clients.length}/3
                </span>
              </div>
            </div>

            {/* Date Range */}
            <div
              className="grid grid-cols-2 gap-4 animate-slide-up"
              style={{
                animationDelay: "0.45s",
                opacity: 0,
              }}>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Start date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(e.target.value)
                    }
                    className="w-full px-4 py-3.5 pr-10 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  End date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                      setEndDate(e.target.value)
                    }
                    className="w-full px-4 py-3.5 pr-10 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <span className="text-xs text-gray-400 col-span-2 -mt-2">
                Optional
              </span>
            </div>

            {/* Completed Work Link */}
            <div
              className="animate-slide-up"
              style={{
                animationDelay: "0.5s",
                opacity: 0,
              }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Completed work link
              </label>
              <div className="relative">
                <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  value={completedWorkLink}
                  onChange={(e) =>
                    setCompletedWorkLink(e.target.value)
                  }
                  placeholder="Enter a link to the live project or deliverable"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                />
              </div>
              <span className="text-xs text-gray-400 mt-1 block">
                Optional
              </span>
            </div>

            {/* Skills */}
            <div
              className="animate-slide-up relative z-30"
              style={{
                animationDelay: "0.55s",
                opacity: 0,
              }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Skills
              </label>
              <div className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="tag inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
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
                      onFocus={() =>
                        setIsSkillInputFocused(true)
                      }
                      onBlur={() =>
                        setTimeout(
                          () =>
                            setIsSkillInputFocused(false),
                          150,
                        )
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          skillInput.trim()
                        ) {
                          e.preventDefault();
                          addSkill(skillInput.trim());
                        }
                      }}
                      placeholder={
                        skills.length === 0
                          ? "Add skills"
                          : "Add more"
                      }
                      className="flex-1 min-w-[100px] outline-none text-gray-800 py-1"
                    />
                  )}
                </div>
              </div>

              {isSkillInputFocused &&
                skills.length < 3 &&
                filteredSkills.length > 0 && (
                  <div className="absolute z-20 w-full mt-2 py-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-48 overflow-y-auto">
                    {filteredSkills
                      .slice(0, 6)
                      .map((skill) => (
                        <button
                          key={skill}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            addSkill(skill);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition-colors">
                          {skill}
                        </button>
                      ))}
                  </div>
                )}
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400">
                  {skills.length}/3
                </span>
              </div>
            </div>

            {/* Tools */}
            <div
              className="animate-slide-up relative z-20"
              style={{
                animationDelay: "0.6s",
                opacity: 0,
              }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tools
              </label>
              <div className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="tag inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
                      <span className="w-4 h-4 rounded bg-orange-500 flex items-center justify-center text-white text-xs">
                        {tool.charAt(0)}
                      </span>
                      {tool}
                      <button
                        onClick={() => removeTool(tool)}
                        className="hover:text-gray-900 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  {tools.length < 3 && (
                    <input
                      type="text"
                      value={toolInput}
                      onChange={(e) =>
                        setToolInput(e.target.value)
                      }
                      onFocus={() =>
                        setIsToolInputFocused(true)
                      }
                      onBlur={() =>
                        setTimeout(
                          () =>
                            setIsToolInputFocused(false),
                          150,
                        )
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          toolInput.trim()
                        ) {
                          e.preventDefault();
                          addTool(toolInput.trim());
                        }
                      }}
                      placeholder={
                        tools.length === 0
                          ? "Add tools"
                          : "Add more"
                      }
                      className="flex-1 min-w-[100px] outline-none text-gray-800 py-1"
                    />
                  )}
                </div>
              </div>

              {isToolInputFocused &&
                tools.length < 3 &&
                filteredTools.length > 0 && (
                  <div className="absolute z-20 w-full mt-2 py-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-48 overflow-y-auto">
                    {filteredTools
                      .slice(0, 6)
                      .map((tool) => (
                        <button
                          key={tool}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            addTool(tool);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition-colors flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center text-white text-xs">
                            {tool.charAt(0)}
                          </span>
                          {tool}
                        </button>
                      ))}
                  </div>
                )}
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400">
                  {tools.length}/3
                </span>
              </div>
            </div>

            {/* Industry */}
            <div
              className="animate-slide-up relative z-10"
              style={{
                animationDelay: "0.65s",
                opacity: 0,
              }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Industry
              </label>
              <div className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <div className="flex flex-wrap gap-2">
                  {industry.map((ind) => (
                    <span
                      key={ind}
                      className="tag inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
                      {ind}
                      <button
                        onClick={() => removeIndustry(ind)}
                        className="hover:text-gray-900 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  {industry.length < 1 && (
                    <input
                      type="text"
                      value={industryInput}
                      onChange={(e) =>
                        setIndustryInput(e.target.value)
                      }
                      onFocus={() =>
                        setIsIndustryInputFocused(true)
                      }
                      onBlur={() =>
                        setTimeout(
                          () =>
                            setIsIndustryInputFocused(
                              false,
                            ),
                          150,
                        )
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          industryInput.trim()
                        ) {
                          e.preventDefault();
                          addIndustry(industryInput.trim());
                        }
                      }}
                      placeholder="Select industry"
                      className="flex-1 min-w-[100px] outline-none text-gray-800 py-1"
                    />
                  )}
                  {industry.length === 1 && (
                    <button className="w-6 h-6 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors">
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {isIndustryInputFocused &&
                industry.length < 1 &&
                filteredIndustries.length > 0 && (
                  <div className="absolute z-20 w-full mt-2 py-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-48 overflow-y-auto">
                    {filteredIndustries
                      .slice(0, 6)
                      .map((ind) => (
                        <button
                          key={ind}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            addIndustry(ind);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition-colors">
                          {ind}
                        </button>
                      ))}
                  </div>
                )}
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400">
                  {industry.length}/1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
