"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Instagram,
  Lightbulb,
  Linkedin,
  MapPin,
  Plus,
  Share2,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

export default function RequestRecommendation() {
  // State
  const [currentView, setCurrentView] = useState("profile");
  const [activeTab, setActiveTab] = useState("Reviews");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [relationshipType, setRelationshipType] =
    useState("");
  const [message, setMessage] = useState(
    "Hi, I've joined A1Lance to build my freelance business! Would you mind writing a brief recommendation about my work on your project? It will help build my reputation on A1Lance and showcase my value to other potential clients.",
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeedbackBanner, setShowFeedbackBanner] =
    useState(true);

  // Data
  const tabs = [
    "Overview",
    "Work",
    "Jobs",
    "Reviews",
    "Services",
    "About",
  ];

  const pendingRecommendations = [
    {
      id: 1,
      name: "Alex, Frozti",
      avatar: "AM",
      dateSent: "Sep 7, 2025",
      status: "pending",
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "SC",
      dateSent: "Sep 3, 2025",
      status: "pending",
    },
  ];

  const steps = [
    {
      id: "contact",
      label: "Contact Details",
      completed: currentStep > 0,
    },
    {
      id: "message",
      label: "Message",
      completed: currentStep > 1,
    },
  ];

  // Derived
  const isEmailValid =
    email.includes("@") && email.includes(".");
  const isFormComplete =
    isEmailValid && relationshipType !== "";
  const isMessageValid = message.trim().length > 20;

  // Handlers
  const handleRequestNew = () => {
    setCurrentView("form");
    setCurrentStep(0);
    setEmail("");
    setCompany("");
    setRelationshipType("");
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentView("profile");
    }
  };

  const handleContinue = () => {
    if (currentStep === 0 && isFormComplete) {
      setCurrentStep(1);
    } else if (currentStep === 1 && isMessageValid) {
      setCurrentView("success");
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
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

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
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
          animation: slide-up 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
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

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.08);
        }

        .info-card {
          background: linear-gradient(
            135deg,
            rgba(236, 253, 245, 0.8) 0%,
            rgba(209, 250, 229, 0.6) 100%
          );
          border: 1px solid rgba(167, 243, 208, 0.5);
        }

        .hero-image {
          background: linear-gradient(
            135deg,
            #818cf8 0%,
            #6366f1 30%,
            #4f46e5 70%,
            #818cf8 100%
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Profile View - Reviews Tab */}
        {currentView === "profile" && (
          <div className="animate-fade-in">
            {/* Beta Banner */}
            {showFeedbackBanner && (
              <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-center gap-4 animate-slide-up">
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
                  BETA
                </span>
                <span className="text-gray-600 text-sm">
                  <Sparkles className="w-4 h-4 inline mr-1 text-amber-500" />
                  We built your profile based on the link
                  you provided. Did we do a good job of
                  importing your profile data?
                </span>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                    <ThumbsUp className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                    <ThumbsDown className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <button
                  onClick={() =>
                    setShowFeedbackBanner(false)
                  }
                  className="ml-4 text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Profile Header */}
            <div className="max-w-6xl mx-auto px-6 py-8">
              <div className="flex gap-12 animate-slide-up stagger-1">
                {/* Left Column */}
                <div className="flex-1">
                  <p className="text-gray-600 text-lg mb-6">
                    Motion Designer bringing ideas to life
                    through animation
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mb-8">
                    <button className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
                      Get in touch
                      <div className="w-6 h-4 bg-white/20 rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                      </div>
                    </button>

                    <button className="w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                      <Share2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Right Column - Hero Image */}
                <div
                  className="w-[420px] h-[250px] rounded-2xl hero-image relative overflow-hidden animate-slide-up stagger-2"
                  style={{
                    animationDelay: "0.15s",
                    opacity: 0,
                  }}>
                  {/* Abstract Wave Shapes */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute bottom-0 left-0 right-0 h-32"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 100%)",
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                      }}
                    />
                    <div
                      className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
                      }}
                    />
                    {/* Wave paths */}
                    <div
                      className="absolute bottom-8 left-0 right-0 h-24"
                      style={{
                        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q100 20 200 50 T400 50 V100 H0 Z' fill='rgba(255,255,255,0.15)'/%3E%3C/svg%3E")`,
                        backgroundSize: "cover",
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-20"
                      style={{
                        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 Q80 60 160 40 T320 40 T400 40 V80 H0 Z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E")`,
                        backgroundSize: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-end justify-between border-b border-gray-200 mt-8 animate-slide-up stagger-3">
                <div className="flex items-center gap-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-1 text-sm font-medium transition-colors relative ${
                        activeTab === tab
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      }`}>
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4 pb-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    Menlo Park, USA
                  </div>
                  <button className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                    <Linkedin className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                    <Instagram className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Reviews Content */}
              <div className="mt-8 grid grid-cols-2 gap-6 animate-slide-up stagger-4">
                {/* Request a Review Card */}
                <button
                  onClick={handleRequestNew}
                  className="p-6 rounded-2xl bg-white text-left group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-indigo-400 transition-colors">
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold text-gray-900 mb-1"
                        style={{
                          fontFamily: "var(--font-display)",
                        }}>
                        Request a review
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        Build your reputation from past
                        clients and collaborators.
                      </p>
                      <span className="text-indigo-600 text-sm font-medium group-hover:text-indigo-700 transition-colors">
                        Learn more about reviews
                      </span>
                    </div>
                  </div>
                </button>

                {/* Pending Recommendations */}
                <div className="p-6 rounded-2xl border border-gray-200 bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">
                      Pending
                    </span>
                  </div>

                  {pendingRecommendations.map(
                    (rec, index) => (
                      <div key={rec.id}>
                        <p className="text-gray-700 mb-4">
                          Your recommendation request is
                          awaiting {rec.name.split(",")[0]}
                          's response.
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                              <span className="text-sm font-semibold text-indigo-700">
                                {rec.avatar}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center">
                              <span className="text-white text-[8px] font-bold leading-none">
                                AS
                                <br />
                                MOB
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {rec.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Request sent on {rec.dateSent}
                            </p>
                          </div>
                        </div>
                        {index <
                          pendingRecommendations.length -
                            1 && (
                          <div className="border-t border-gray-100 my-4" />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form View - Request Recommendation */}
        {currentView === "form" && (
          <div className="min-h-screen flex animate-fade-in">
            {/* Left Sidebar */}
            <div className="w-64 p-6 border-r border-gray-100">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 animate-slide-up">
                <ArrowLeft className="w-4 h-4" />
                Back to Profile
              </button>

              {/* Steps */}
              <div className="space-y-4 animate-slide-up stagger-1">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        step.completed
                          ? "bg-emerald-500"
                          : currentStep === index
                            ? "bg-indigo-100 border-2 border-indigo-500"
                            : "bg-gray-100"
                      }`}>
                      {step.completed && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        currentStep === index
                          ? "text-gray-900"
                          : step.completed
                            ? "text-gray-600"
                            : "text-gray-400"
                      }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 max-w-2xl">
              {/* Step 0: Contact Details */}
              {currentStep === 0 && (
                <div className="animate-slide-up">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500 tracking-wider">
                      CONTACT DETAILS
                    </span>
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  <h2
                    className="text-2xl font-semibold text-gray-900 mb-2 animate-slide-up stagger-1"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}>
                    Request a recommendation
                  </h2>
                  <p className="text-gray-500 mb-8 animate-slide-up stagger-2">
                    This person will receive an email with
                    instructions on how to recommend you.
                  </p>

                  {/* Email Input */}
                  <div className="mb-4 animate-slide-up stagger-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="alexsmith.Frozti+1@gmail"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                    />

                    {email && isEmailValid && (
                      <div className="mt-2 p-3 rounded-xl border border-gray-200 bg-gray-50/50 flex items-center justify-between animate-scale-in">
                        <div className="flex items-center gap-3">
                          <Plus className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Invite '{email}'
                          </span>
                        </div>
                        <button className="w-8 h-8 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mb-6 animate-slide-up stagger-4">
                    For the best chance of approval, we
                    recommend adding their LinkedIn Profile
                    to verify identity.
                  </p>

                  {/* Company Input */}
                  <div className="mb-6 animate-slide-up stagger-4">
                    <input
                      type="text"
                      value={company}
                      onChange={(e) =>
                        setCompany(e.target.value)
                      }
                      placeholder="Company"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                    />
                  </div>

                  {/* Optional Label */}
                  <p className="text-sm text-gray-500 mb-4 animate-slide-up stagger-5">
                    Optional
                  </p>

                  {/* Relationship Type */}
                  <div className="mb-8 animate-slide-up stagger-5">
                    <p className="text-gray-700 mb-4">
                      What is their relationship to you?
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          setRelationshipType("client")
                        }
                        className={`px-6 py-3 rounded-xl border-2 font-medium flex items-center gap-3 transition-all ${
                          relationshipType === "client"
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            relationshipType === "client"
                              ? "border-gray-900"
                              : "border-gray-300"
                          }`}>
                          {relationshipType ===
                            "client" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                          )}
                        </div>
                        Client
                      </button>
                      <button
                        onClick={() =>
                          setRelationshipType(
                            "collaborator",
                          )
                        }
                        className={`px-6 py-3 rounded-xl border-2 font-medium flex items-center gap-3 transition-all ${
                          relationshipType ===
                          "collaborator"
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            relationshipType ===
                            "collaborator"
                              ? "border-gray-900"
                              : "border-gray-300"
                          }`}>
                          {relationshipType ===
                            "collaborator" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                          )}
                        </div>
                        Collaborator
                      </button>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleContinue}
                    disabled={!isFormComplete}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      isFormComplete
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}>
                    Continue
                  </button>
                </div>
              )}

              {/* Step 1: Write Message */}
              {currentStep === 1 && (
                <div className="animate-slide-up">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500 tracking-wider">
                      WRITE A MESSAGE
                    </span>
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <div className="mt-8 animate-slide-up stagger-1">
                    <textarea
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      rows={6}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800 resize-none"
                    />
                  </div>

                  <p className="flex items-center gap-2 text-sm text-gray-500 mt-4 animate-slide-up stagger-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    A link to write a recommendation will be
                    automatically included
                  </p>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-center animate-slide-up stagger-3">
                    <button
                      onClick={handleContinue}
                      disabled={!isMessageValid}
                      className={`px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-all ${
                        isMessageValid
                          ? "bg-gray-900 text-white hover:bg-gray-800"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}>
                      Request Recommendation
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Info Card */}
            <div className="w-80 p-6">
              <div
                className="info-card rounded-2xl p-6 animate-slide-up"
                style={{
                  animationDelay: "0.2s",
                  opacity: 0,
                }}>
                {/* Decorative Illustration */}
                <div className="h-32 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center -ml-4">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-2 px-3 py-1 bg-white rounded-lg shadow-sm">
                      <span className="text-2xl font-bold text-rose-500">
                        💯
                      </span>
                    </div>
                  </div>
                  {/* Floating emojis */}
                  <div className="absolute top-3 right-6 text-lg">
                    🎉
                  </div>
                  <div className="absolute bottom-4 left-8 text-lg">
                    ✨
                  </div>
                  <div className="absolute top-6 left-12 text-sm">
                    👍
                  </div>
                </div>

                <h3
                  className="text-lg font-semibold text-gray-900 mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}>
                  Build your reputation on A1Lance
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Showcase quotes from past clients to
                      boost your credibility
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Your client will receive an invitation
                      via email to submit their
                      recommendation
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      We'll verify the recommendation and
                      add it to your profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success View */}
        {currentView === "success" && (
          <div className="min-h-screen flex items-center justify-center animate-scale-in">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-emerald-600" />
              </div>
              <h2
                className="text-2xl font-semibold text-gray-900 mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                Request sent!
              </h2>
              <p className="text-gray-500 mb-8">
                We've sent your recommendation request to{" "}
                {email}. You'll be notified when they
                respond.
              </p>
              <button
                onClick={() => setCurrentView("profile")}
                className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                Back to Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
