"use client";

import {
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  Plus,
  Sparkles,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export default function A1LanceOnboarding() {
  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinError, setLinkedinError] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  // Data
  const steps = [
    { id: "signup", label: "Sign Up" },
    { id: "type", label: "Account Type" },
    { id: "verify", label: "Verify" },
    { id: "social", label: "Social Links" },
    { id: "connect", label: "Connect AI" },
  ];

  // Derived
  const isSignupValid =
    firstName.trim() &&
    lastName.trim() &&
    email.includes("@");
  const isTypeSelected = accountType !== "";
  const isCodeComplete = verificationCode.every(
    (digit) => digit !== "",
  );
  const isSocialValid =
    linkedinUrl.includes("linkedin.com/") &&
    instagramUrl.includes("instagram.com/");
  const totalSteps = steps.length;

  // Handlers
  const handleCodeInput = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `code-${index + 1}`,
      );
      nextInput?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !verificationCode[index] &&
      index > 0
    ) {
      const prevInput = document.getElementById(
        `code-${index - 1}`,
      );
      prevInput?.focus();
    }
  };

  const validateLinkedin = (url) => {
    setLinkedinUrl(url);
    if (url && !url.includes("linkedin.com/in/")) {
      setLinkedinError(
        "Please enter a valid LinkedIn profile URL",
      );
    } else {
      setLinkedinError("");
    }
  };

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => setIsConnecting(false), 2000);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.5;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
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
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
        }

        .code-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .social-orbit {
          position: absolute;
          border: 1px dashed rgba(99, 102, 241, 0.2);
          border-radius: 50%;
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-5xl">
          {/* Step 0: Sign Up */}
          {currentStep === 0 && (
            <div className="flex flex-col items-center animate-slide-up">
              <div className="w-full max-w-md">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Title */}
                <h1
                  className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-slide-up stagger-1"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}>
                  Sign up to A1Lance
                </h1>

                {/* Google Button */}
                <button className="w-full py-3.5 px-4 bg-gray-900 text-white rounded-full font-medium flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors mb-8 animate-slide-up stagger-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">
                      G
                    </span>
                  </div>
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8 animate-slide-up stagger-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium tracking-wider">
                    OR SIGN UP BELOW
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Form */}
                <div className="space-y-4 animate-slide-up stagger-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) =>
                        setFirstName(e.target.value)
                      }
                      placeholder="First name"
                      className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) =>
                        setLastName(e.target.value)
                      }
                      placeholder="Last name"
                      className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Email address"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800"
                  />
                </div>

                {/* Continue Button */}
                <button
                  onClick={nextStep}
                  disabled={!isSignupValid}
                  className={`w-full py-3.5 rounded-full font-medium mt-8 transition-all animate-slide-up stagger-5 ${
                    isSignupValid
                      ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}>
                  Continue
                </button>

                {/* Login Link */}
                <p
                  className="text-center mt-6 text-gray-500 animate-slide-up"
                  style={{
                    animationDelay: "0.3s",
                    opacity: 0,
                  }}>
                  Already using A1Lance?{" "}
                  <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                    Log in
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Account Type */}
          {currentStep === 1 && (
            <div className="flex flex-col items-center animate-slide-up">
              <p className="text-gray-600 mb-2 animate-slide-up stagger-1">
                A1Lance connects top creative talent to
                fast-moving startups and agencies.
              </p>
              <h1
                className="text-3xl font-semibold text-gray-900 text-center mb-12 animate-slide-up stagger-2"
                style={{
                  fontFamily: "var(--font-display)",
                }}>
                Which best describes you?
              </h1>

              <div className="flex gap-6 animate-slide-up stagger-3">
                {/* Independent Card */}
                <button
                  onClick={() =>
                    setAccountType("independent")
                  }
                  className={`w-80 p-6 rounded-2xl border-2 transition-all card-hover ${
                    accountType === "independent"
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}>
                  <div className="h-40 mb-6 rounded-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 to-purple-100/30" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span
                          className="text-xl font-bold text-gray-900 tracking-tight"
                          style={{
                            fontFamily:
                              "var(--font-display)",
                          }}>
                          JENNY LEE
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-6 rounded bg-cyan-200" />
                        <div className="w-10 h-8 rounded bg-indigo-200" />
                        <div className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm">
                          Work with me
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}>
                    I'm an independent
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Find work and manage your freelance
                    business
                  </p>
                </button>

                {/* Hiring Card */}
                <button
                  onClick={() => setAccountType("hiring")}
                  className={`w-80 p-6 rounded-2xl border-2 transition-all card-hover ${
                    accountType === "hiring"
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}>
                  <div className="h-40 mb-6 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-indigo-100/30" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex items-center gap-3 mb-4 bg-white/80 px-4 py-2 rounded-xl shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <Users className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="font-semibold text-gray-900">
                          New applicants
                        </span>
                      </div>
                      <div className="flex gap-1 mb-3">
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                      </div>
                      <div className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm">
                        Manage job post
                      </div>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}>
                    I'm hiring
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Post jobs and manage freelancers
                  </p>
                </button>
              </div>

              {/* Continue Button */}
              <button
                onClick={nextStep}
                disabled={!isTypeSelected}
                className={`mt-10 px-8 py-3 rounded-full font-medium transition-all ${
                  isTypeSelected
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}>
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Verification Code */}
          {currentStep === 2 && (
            <div className="flex flex-col items-center animate-slide-up">
              <div className="w-full max-w-md">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <h1
                  className="text-3xl font-semibold text-gray-900 text-center mb-4 animate-slide-up stagger-1"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}>
                  We emailed you a code
                </h1>
                <p className="text-gray-500 text-center mb-8 animate-slide-up stagger-2">
                  Enter the verification code sent to:
                  <br />
                  <span className="text-gray-900 font-medium">
                    {email || "you@example.com"}
                  </span>
                </p>

                {/* Code Inputs */}
                <div className="flex justify-center gap-3 mb-8 animate-slide-up stagger-3">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleCodeInput(
                          index,
                          e.target.value,
                        )
                      }
                      onKeyDown={(e) =>
                        handleCodeKeyDown(index, e)
                      }
                      className="w-12 h-14 text-center text-xl font-medium rounded-xl border border-gray-200 code-input outline-none transition-all text-gray-800"
                    />
                  ))}
                </div>

                {/* Resend Link */}
                <p className="text-center text-gray-500 animate-slide-up stagger-4">
                  Didn't get your code?{" "}
                  <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                    Send a new code
                  </button>
                </p>

                {/* Continue Button */}
                <button
                  onClick={nextStep}
                  disabled={!isCodeComplete}
                  className={`w-full py-3.5 rounded-full font-medium mt-8 transition-all ${
                    isCodeComplete
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}>
                  Verify
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Social Links */}
          {currentStep === 3 && (
            <div className="flex gap-16 items-start justify-center animate-slide-up">
              {/* Left - Form */}
              <div className="w-[480px]">
                <span className="text-sm text-gray-500 font-medium mb-2 block animate-slide-up stagger-1">
                  Step 3/3
                </span>
                <h1
                  className="text-3xl font-semibold text-gray-900 mb-3 animate-slide-up stagger-2"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}>
                  Add social links
                </h1>
                <p className="text-gray-500 mb-8 animate-slide-up stagger-3">
                  Add two social links to verify your
                  digital identity.
                </p>

                {/* LinkedIn Input */}
                <div className="mb-4 animate-slide-up stagger-4">
                  <div
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border ${linkedinError ? "border-red-400" : "border-gray-200"} focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all bg-white`}>
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) =>
                        validateLinkedin(e.target.value)
                      }
                      placeholder="https://www.linkedin.com/in/username"
                      className="flex-1 outline-none text-gray-800"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1">
                      Get your LinkedIn URL
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-gray-300">·</span>
                    <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      I don't have a LinkedIn account
                    </button>
                  </div>
                  {linkedinError && (
                    <p className="text-sm text-red-500 mt-1">
                      {linkedinError}
                    </p>
                  )}
                </div>

                {/* Instagram Input */}
                <div className="mb-4 animate-slide-up stagger-5">
                  <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all bg-white">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <input
                      type="url"
                      value={instagramUrl}
                      onChange={(e) =>
                        setInstagramUrl(e.target.value)
                      }
                      placeholder="https://www.instagram.com/username"
                      className="flex-1 outline-none text-gray-800"
                    />
                  </div>
                </div>

                {/* Add Another Link */}
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-10">
                  <Plus className="w-4 h-4" />
                  <span>Add another link</span>
                </button>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevStep}
                    className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center">
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-6 py-2.5 rounded-full font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                    Complete
                  </button>
                </div>
              </div>

              {/* Right - AI Card */}
              <div
                className="w-80 animate-slide-up"
                style={{
                  animationDelay: "0.3s",
                  opacity: 0,
                }}>
                <div className="glass-card rounded-2xl p-6 shadow-xl shadow-gray-100/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center overflow-hidden">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg font-semibold text-gray-900"
                        style={{
                          fontFamily: "var(--font-display)",
                        }}>
                        Ace
                      </span>
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                        AI
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-200 animate-pulse" />
                      <span className="text-sm text-gray-600">
                        No new posts to review
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    Let's confirm your social links. I've
                    already started searching your network
                    for new connections and opportunities.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Connect AI */}
          {currentStep === 4 && (
            <div className="flex gap-16 items-start justify-center animate-slide-up">
              {/* Left - Content */}
              <div className="w-[400px]">
                {/* Skip Link */}
                <div className="flex justify-end mb-12">
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
                    I'll do it later
                  </button>
                </div>

                <h1
                  className="text-3xl font-semibold text-gray-900 mb-4 animate-slide-up stagger-1"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}>
                  Let work find you
                </h1>
                <p className="text-gray-500 mb-8 animate-slide-up stagger-2">
                  Connect Ace AI to discover 10x more
                  opportunities through your network.
                </p>

                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="px-6 py-3 rounded-full font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center gap-2 mb-4 animate-slide-up stagger-3">
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Connecting
                    </>
                  ) : (
                    "Connect Ace AI"
                  )}
                </button>

                {isConnecting && (
                  <button className="text-gray-500 hover:text-gray-700 transition-colors text-sm animate-fade-in">
                    Cancel and do it later
                  </button>
                )}

                {/* Testimonial */}
                <div className="mt-8 p-5 border-l-2 border-gray-200 animate-slide-up stagger-4">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    "This introduced me to who I should've
                    been following all along. It's expanding
                    my network while finding leads."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Daniel G Bright
                      </p>
                      <p className="text-sm text-emerald-600">
                        $50K+ earned
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - AI Card with Orbits */}
              <div
                className="w-[420px] relative animate-slide-up"
                style={{
                  animationDelay: "0.3s",
                  opacity: 0,
                }}>
                {/* Social Orbits */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="social-orbit w-64 h-64 animate-pulse-ring" />
                  <div
                    className="social-orbit w-80 h-80 animate-pulse-ring"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <div
                    className="social-orbit w-96 h-96 animate-pulse-ring"
                    style={{ animationDelay: "0.6s" }}
                  />
                </div>

                {/* Floating Social Icons */}
                <div className="absolute top-8 right-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <X className="w-5 h-5 text-gray-900" />
                </div>
                <div className="absolute top-24 left-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="absolute top-20 right-0 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>

                {/* AI Card */}
                <div className="relative mt-24 ml-8 glass-card rounded-2xl p-6 shadow-xl shadow-gray-100/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center overflow-hidden">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xl font-semibold text-gray-900"
                        style={{
                          fontFamily: "var(--font-display)",
                        }}>
                        Ace
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                        AI
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-900 mb-4">
                    Hi, I'm Ace 👋
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    I find hidden opportunities through your
                    LinkedIn and X. I've scanned{" "}
                    <span className="font-semibold text-gray-900">
                      65.9M+
                    </span>{" "}
                    posts so far and found{" "}
                    <span className="font-semibold text-emerald-600">
                      $126M+
                    </span>{" "}
                    in opportunities.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-indigo-600 w-6"
                    : index < currentStep
                      ? "bg-indigo-300"
                      : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}