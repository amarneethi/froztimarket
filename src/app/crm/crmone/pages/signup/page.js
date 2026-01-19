"use client";

import { Loader2, Smile, Star } from "lucide-react";
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
        <style>{`
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
        `}</style>

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
      <style>{`
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
      `}</style>

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
}
