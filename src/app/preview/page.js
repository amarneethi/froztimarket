"use client";

import {
  Check,
  Code2,
  Copy,
  Eye,
  Loader2,
  Maximize2,
  Monitor,
  Rocket,
  ShoppingCart,
  Smartphone,
  Smile,
  Star,
  Tablet,
} from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useRef, useState } from "react";

// ============================================
// COMPONENT PREVIEW WRAPPER
// ============================================

const viewportSizes = {
  desktop: {
    width: "100%",
    icon: Monitor,
    label: "Desktop",
  },
  tablet: { width: "768px", icon: Tablet, label: "Tablet" },
  mobile: {
    width: "375px",
    icon: Smartphone,
    label: "Mobile",
  },
};

function highlightCode(code) {
  let highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  highlighted = highlighted.replace(
    /\b(import|export|default|from|const|let|var|function|return|if|else|for|while|class|extends|new|this|async|await|try|catch|throw|typeof|instanceof|in|of)\b/g,
    '<span class="text-violet-400">$1</span>',
  );

  highlighted = highlighted.replace(
    /\b(useState|useEffect|useRef|useCallback|useMemo|useContext)\b/g,
    '<span class="text-amber-400">$1</span>',
  );

  highlighted = highlighted.replace(
    /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g,
    '<span class="text-emerald-400">$&</span>',
  );

  highlighted = highlighted.replace(
    /(\/\/.*$)/gm,
    '<span class="text-stone-500 italic">$1</span>',
  );

  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="text-sky-400">$1</span>',
  );

  highlighted = highlighted.replace(
    /(&lt;\/?)([\w.]+)/g,
    '$1<span class="text-rose-400">$2</span>',
  );

  highlighted = highlighted.replace(
    /\s([\w-]+)=/g,
    ' <span class="text-amber-300">$1</span>=',
  );

  highlighted = highlighted.replace(
    /\b(true|false|null|undefined)\b/g,
    '<span class="text-orange-400">$1</span>',
  );

  return highlighted;
}

function TabButton({
  isActive,
  onClick,
  icon: Icon,
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium 
        transition-all duration-300 rounded-lg
        ${
          isActive
            ? "bg-stone-800 text-white"
            : "text-stone-500 hover:text-stone-700 hover:bg-stone-100/50"
        }
      `}>
      <Icon size={16} />
      {children}
      {isActive && (
        <span
          className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)",
          }}
        />
      )}
    </button>
  );
}

function ViewportButton({ viewport, isActive, onClick }) {
  const { icon: Icon, label } = viewportSizes[viewport];
  return (
    <button
      onClick={onClick}
      title={label}
      className={`
        p-2 rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-stone-900 text-white"
            : "text-stone-400 hover:text-stone-600 hover:bg-stone-100"
        }
      `}>
      <Icon size={16} />
    </button>
  );
}

// ============================================
// CRM AUTH COMPONENT (The actual component being previewed)
// ============================================

function CRMOneAuthFlow() {
  const [authStep, setAuthStep] = useState("initial");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleContinueWithEmail = () => {
    if (authStep === "initial") {
      setAuthStep("email-input");
    } else if (authStep === "email-input" && email) {
      setAuthStep("email-sent");
    }
  };

  const handleGoogleSignIn = () => {
    setAuthStep("loading");
  };

  const handleResendEmail = () => {
    setIsResending(true);
    setTimeout(() => setIsResending(false), 2000);
  };

  const handleBackToInitial = () => {
    setAuthStep("initial");
    setEmail("");
  };

  if (authStep === "loading") {
    return (
      <div className="min-h-[600px] bg-white flex flex-col">
        <header className="p-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleBackToInitial}>
            <div className="w-8 h-8 rounded-full border-2 border-neutral-900 flex items-center justify-center">
              <Smile
                className="w-5 h-5 text-neutral-900"
                strokeWidth={2.5}
              />
            </div>
            <span
              className="text-2xl font-medium text-neutral-900"
              style={{ fontFamily: "'Newsreader', serif" }}>
              CRMOne.
            </span>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
          <p className="text-neutral-500 text-sm tracking-wide">
            Logging in...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[600px] flex">
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-12 bg-white">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full border-2 border-neutral-900 flex items-center justify-center">
              <Smile
                className="w-5 h-5 text-neutral-900"
                strokeWidth={2.5}
              />
            </div>
            <span
              className="text-2xl font-medium text-neutral-900"
              style={{ fontFamily: "'Newsreader', serif" }}>
              CRMOne.
            </span>
          </div>

          {authStep === "email-sent" ? (
            <div className="text-center">
              <h1
                className="text-3xl font-medium text-neutral-900 mb-4"
                style={{
                  fontFamily: "'Newsreader', serif",
                }}>
                You've got mail
              </h1>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                An email has been sent to you at {email}.
                <br />
                Click the link to confirm your account.
              </p>
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-all disabled:opacity-50">
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend email"
                )}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h1
                className="text-2xl lg:text-3xl font-medium text-neutral-900 mb-8"
                style={{
                  fontFamily: "'Newsreader', serif",
                  lineHeight: 1.3,
                }}>
                Build real relationships
                <br />
                to close winning deals
              </h1>

              <div className="space-y-3">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-all">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                {authStep === "email-input" ? (
                  <div className="space-y-3">
                    <div className="text-left">
                      <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-all"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleContinueWithEmail}
                      disabled={!email}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                      Continue with email
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleContinueWithEmail}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-all">
                    Continue with email
                  </button>
                )}
              </div>

              <p className="mt-8 text-xs text-neutral-400">
                By signing up you agree to the
                <br />
                CRMOne{" "}
                <a
                  href="#"
                  className="underline text-neutral-500 hover:text-neutral-700">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline text-neutral-500 hover:text-neutral-700">
                  Terms of Use
                </a>
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-8 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-neutral-100 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500">
                4.8 out of 5
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#DA552F] flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500">
                4.9 out of 5
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-[#d4e8fc] p-8 items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)",
          }}
        />
        <div
          className="relative w-full max-w-xl aspect-[4/3] rounded-xl"
          style={{
            background:
              "linear-gradient(180deg, #d1d5db 0%, #9ca3af 100%)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          }}>
          <div className="absolute inset-4 opacity-10">
            <div className="grid grid-cols-4 gap-2 h-full">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/30 rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT PREVIEW PAGE
// ============================================

const componentCode = `import { Loader2, Smile, Star } from "lucide-react";
import { useState } from "react";

export default function CRMOneAuthFlow() {
  // State
  const [authStep, setAuthStep] = useState("initial"); // "initial" | "email-input" | "email-sent" | "loading"
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Handlers
  const handleContinueWithEmail = () => {
    if (authStep === "initial") {
      setAuthStep("email-input");
    } else if (authStep === "email-input" && email) {
      setAuthStep("email-sent");
    }
  };

  const handleGoogleSignIn = () => {
    setAuthStep("loading");
  };

  const handleResendEmail = () => {
    setIsResending(true);
    setTimeout(() => setIsResending(false), 2000);
  };

  const handleBackToInitial = () => {
    setAuthStep("initial");
    setEmail("");
  };

  // Loading state - full screen
  if (authStep === "loading") {
    return (
      <div
        className="min-h-screen bg-white flex flex-col"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{\`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Newsreader:wght@400;500;600&display=swap');
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .spinner {
            animation: spin 1s linear infinite;
          }
          
          .fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }
        \`}</style>

        {/* Header with logo */}
        <header className="p-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleBackToInitial}>
            <div className="w-8 h-8 rounded-full border-2 border-neutral-900 flex items-center justify-center">
              <Smile
                className="w-5 h-5 text-neutral-900"
                strokeWidth={2.5}
              />
            </div>
            <span
              className="text-2xl font-medium text-neutral-900"
              style={{ fontFamily: "'Newsreader', serif" }}>
              CRMOne.
            </span>
          </div>
        </header>

        {/* Centered loading */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 fade-in">
          <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full spinner" />
          <p className="text-neutral-500 text-sm tracking-wide">
            Logging in...
          </p>
        </div>
      </div>
    );
  }

  // Main auth layout
  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(12px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
        
        .slide-up-delay-1 {
          opacity: 0;
          animation: slideUp 0.4s ease-out 0.05s forwards;
        }
        
        .slide-up-delay-2 {
          opacity: 0;
          animation: slideUp 0.4s ease-out 0.1s forwards;
        }
        
        .slide-up-delay-3 {
          opacity: 0;
          animation: slideUp 0.4s ease-out 0.15s forwards;
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .product-preview {
          background: linear-gradient(180deg, #d1d5db 0%, #9ca3af 100%);
        }
        
        .btn-primary {
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .btn-primary:active {
          transform: translateY(0);
        }
        
        .btn-secondary {
          transition: all 0.2s ease;
        }
        
        .btn-secondary:hover {
          background: #f5f5f5;
          border-color: #d4d4d4;
        }
        
        .input-field {
          transition: all 0.2s ease;
        }
        
        .input-field:focus {
          border-color: #a3a3a3;
          box-shadow: 0 0 0 3px rgba(163, 163, 163, 0.1);
        }
        
        .link-hover {
          transition: color 0.15s ease;
        }
        
        .link-hover:hover {
          color: #171717;
        }
      \`}</style>

      {/* Left panel - Auth form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16 bg-white">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 slide-up">
            <div className="w-8 h-8 rounded-full border-2 border-neutral-900 flex items-center justify-center">
              <Smile
                className="w-5 h-5 text-neutral-900"
                strokeWidth={2.5}
              />
            </div>
            <span
              className="text-2xl font-medium text-neutral-900"
              style={{ fontFamily: "'Newsreader', serif" }}>
              CRMOne.
            </span>
          </div>

          {/* Content based on step */}
          {authStep === "email-sent" ? (
            <div className="text-center">
              <h1
                className="text-3xl lg:text-4xl font-medium text-neutral-900 mb-4 slide-up"
                style={{
                  fontFamily: "'Newsreader', serif",
                  lineHeight: 1.2,
                }}>
                You've got mail
              </h1>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8 slide-up-delay-1">
                An email has been sent to you at {email}.
                <br />
                Click the link to confirm your account.
              </p>
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white slide-up-delay-2 disabled:opacity-50">
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend email"
                )}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h1
                className="text-3xl lg:text-4xl font-medium text-neutral-900 mb-10 slide-up-delay-1"
                style={{
                  fontFamily: "'Newsreader', serif",
                  lineHeight: 1.2,
                }}>
                Build real relationships
                <br />
                to close winning deals
              </h1>

              {/* Auth buttons */}
              <div className="space-y-3 slide-up-delay-2">
                {/* Google button */}
                <button
                  onClick={handleGoogleSignIn}
                  className="btn-primary w-full flex items-center justify-center gap-3 px-4 py-3 bg-neutral-900 text-white rounded-lg text-sm font-medium">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* Email section */}
                {authStep === "email-input" ? (
                  <div className="space-y-3 fade-in">
                    <div className="text-left">
                      <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        placeholder="you@company.com"
                        className="input-field w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleContinueWithEmail}
                      disabled={!email}
                      className="btn-secondary w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white disabled:opacity-40 disabled:cursor-not-allowed">
                      Continue with email
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleContinueWithEmail}
                    className="btn-secondary w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white">
                    Continue with email
                  </button>
                )}
              </div>

              {/* Terms */}
              <p className="mt-8 text-xs text-neutral-400 slide-up-delay-3">
                By signing up you agree to the
                <br />
                CRMOne{" "}
                <a
                  href="#"
                  className="link-hover underline text-neutral-500">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="link-hover underline text-neutral-500">
                  Terms of Use
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Social proof - bottom */}
        <div className="flex items-center justify-center gap-8 pt-8">
          {/* Google rating */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-neutral-100 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500">
                4.8 out of 5
              </span>
            </div>
          </div>

          {/* Product Hunt rating */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#DA552F] flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500">
                4.9 out of 5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Visual showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#d4e8fc] p-8 lg:p-12 items-center justify-center relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)",
          }}
        />

        {/* Product preview card */}
        <div
          className="relative w-full max-w-2xl aspect-[4/3] rounded-xl product-preview shadow-2xl"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          }}>
          {/* Fake app content - subtle grid pattern */}
          <div className="absolute inset-4 opacity-10">
            <div className="grid grid-cols-4 gap-2 h-full">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/30 rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

export default function ComponentPreviewPage() {
  const [activeTab, setActiveTab] = useState("preview");
  const [viewport, setViewport] = useState("desktop");
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);

  const lineCount = componentCode.split("\n").length;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(componentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      previewRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange,
    );
    return () =>
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
  }, []);

  return (
    <div
      className="min-h-screen bg-stone-50"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        .code-font {
          font-family: 'JetBrains Mono', monospace;
        }

        .preview-container {
          background: 
            linear-gradient(90deg, #f5f5f4 1px, transparent 1px),
            linear-gradient(#f5f5f4 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: -1px -1px;
        }

        .code-block::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .code-block::-webkit-scrollbar-track {
          background: #1c1917;
        }

        .code-block::-webkit-scrollbar-thumb {
          background: #44403c;
          border-radius: 4px;
        }

        .code-block::-webkit-scrollbar-thumb:hover {
          background: #57534e;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Rocket size={18} className="text-white" />
              </div>
              <span
                className="text-xl font-semibold text-stone-900"
                style={{
                  fontFamily:
                    "'Instrument Serif', Georgia, serif",
                }}>
                ShipKit
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {["Browse", "Pricing", "Docs", "Blog"].map(
                (link, i) => (
                  <a
                    key={link}
                    href="#"
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      i === 0
                        ? "text-stone-900 bg-stone-100"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                    }`}>
                    {link}
                  </a>
                ),
              )}
            </nav>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-orange-500/20">
                JD
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Component Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  New
                </span>
                <span className="px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  Popular
                </span>
              </div>
              <h1
                className="text-3xl font-semibold text-stone-900 mb-2"
                style={{
                  fontFamily:
                    "'Instrument Serif', Georgia, serif",
                }}>
                CRMOne Auth Flow
              </h1>
              <p className="text-stone-600 max-w-2xl">
                A beautiful, animated authentication flow
                with email magic link support. Includes
                loading states, email confirmation, social
                login, and social proof elements.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div
                  className="text-3xl font-semibold text-stone-900"
                  style={{
                    fontFamily:
                      "'Instrument Serif', Georgia, serif",
                  }}>
                  $49
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500" />
                  <span>by FormCraft</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "Tailwind CSS",
              "Lucide Icons",
              "Authentication",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-stone-100 text-stone-600 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Preview/Code Container */}
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)",
          }}>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 bg-stone-50/50">
            <div className="flex items-center gap-1 p-1 bg-stone-100/80 rounded-xl">
              <TabButton
                isActive={activeTab === "preview"}
                onClick={() => setActiveTab("preview")}
                icon={Eye}>
                Preview
              </TabButton>
              <TabButton
                isActive={activeTab === "code"}
                onClick={() => setActiveTab("code")}
                icon={Code2}>
                Code
              </TabButton>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === "preview" && (
                <>
                  <div className="flex items-center gap-1 p-1 bg-stone-100/80 rounded-lg"></div>
                  <button
                    onClick={() => {
                      console.log("Open in fullscreen");
                    }}
                    className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                    title="Fullscreen">
                    <Maximize2 size={16} />
                  </button>
                </>
              )}

              {activeTab === "code" && (
                <button
                  onClick={handleCopy}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg
                    transition-all duration-200
                    ${
                      copied
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }
                  `}>
                  {copied ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy code
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Content area */}
          <div className="relative">
            {activeTab === "preview" && (
              <div
                ref={previewRef}
                className="preview-container bg-white animate-slideIn"
                style={{ minHeight: "600px" }}>
                <div
                  className="mx-auto transition-all duration-300 h-full"
                  style={{
                    maxWidth: viewportSizes[viewport].width,
                    boxShadow:
                      viewport !== "desktop"
                        ? "0 0 0 1px rgba(0,0,0,0.05), 0 4px 24px rgba(0,0,0,0.08)"
                        : "none",
                    borderRadius:
                      viewport !== "desktop" ? "8px" : "0",
                    overflow: "hidden",
                  }}>
                  <CRMOneAuthFlow />
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div
                className="code-block animate-slideIn"
                style={{
                  minHeight: "600px",
                  maxHeight: "80vh",
                }}>
                <Highlight
                  code={componentCode}
                  theme={themes.nightOwlLight}
                  language="jsx">
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre className="p-8" style={style}>
                      {tokens.map((line, i) => (
                        <div
                          key={i}
                          {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({ token })}
                            />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            )}
          </div>
        </div>

        {/* Bottom info */}
        <div className="flex items-center justify-between mt-4 text-sm text-stone-500">
          <span>{lineCount} lines • React component</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Compatible with Next.js, Vite, CRA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
