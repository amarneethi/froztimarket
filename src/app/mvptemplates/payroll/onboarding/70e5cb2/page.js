"use client";

import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Info,
  Mail,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

export default function PayrollE5OnboardingFlow() {
  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usePreferredName, setUsePreferredName] =
    useState(false);
  const [selectedPlatformUse, setSelectedPlatformUse] =
    useState("");
  const [resendCountdown, setResendCountdown] =
    useState(59);

  // Derived
  const isEmailValid =
    email.includes("@") && email.includes(".");
  const isStep1Complete = isEmailValid;
  const isStep5Complete =
    isEmailValid &&
    password.length >= 8 &&
    firstName.trim() !== "" &&
    lastName.trim() !== "";

  // Handlers
  const handleContinue = () => {
    if (currentStep === 1 && isStep1Complete) {
      setCurrentStep(2);
    }
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatformUse(platform);
    setCurrentStep(3);
  };

  const handleBackFromVerification = () => {
    setCurrentStep(4);
  };

  const handleContinueToFullForm = () => {
    setCurrentStep(5);
  };

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1);
    else if (currentStep === 4) setCurrentStep(2);
    else if (currentStep === 5) setCurrentStep(4);
  };

  const handleCreateAccount = () => {
    if (isStep5Complete) {
      setCurrentStep(3);
    }
  };

  // Platform options data
  const platformOptions = [
    {
      id: "hire",
      title: "Hire people globally",
      description:
        "Hire in 150+ countries without opening an organization, stay compliant with local taxes and laws, and pay your global people.",
      bgColor: "bg-pink-100",
      icon: Building2,
      iconBg: "bg-pink-200",
    },
    {
      id: "contractor",
      title: "Work as a contractor",
      description:
        "Work compliantly from 150+ countries, automate invoicing, and avoid transfer fees.",
      bgColor: "bg-cyan-100",
      icon: Briefcase,
      iconBg: "bg-cyan-200",
    },
    {
      id: "profile",
      title: "Create a profile",
      description:
        "Build your profile to unlock opportunities worldwide. Explore immigration solutions in 50+ countries.",
      bgColor: "bg-orange-100",
      icon: UserCircle,
      iconBg: "bg-orange-200",
    },
  ];

  // Google Icon Component
  const GoogleIcon = () => (
    <div className="flex items-center justify-center w-5 h-5 mr-3">
      <div className="relative w-5 h-5">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 180deg, #EA4335 0deg, #FBBC05 90deg, #34A853 180deg, #4285F4 270deg, #EA4335 360deg)",
          }}
        />
        <div className="absolute inset-[3px] bg-white rounded-full" />
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background:
              "conic-gradient(from 180deg, #EA4335 0deg, #FBBC05 90deg, #34A853 180deg, #4285F4 270deg, #EA4335 360deg)",
            clipPath:
              "polygon(50% 50%, 100% 0, 100% 100%, 50% 100%)",
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen w-full"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background:
          "linear-gradient(180deg, #fce7f3 0%, #fdf2f8 15%, #faf5f5 30%, #f5f5f4 100%)",
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap');
        
        .heading-font {
          font-family: 'Fraunces', serif;
        }
        
        .body-font {
          font-family: 'DM Sans', sans-serif;
        }
        
        .input-floating-label {
          position: relative;
        }
        
        .input-floating-label input {
          padding-top: 1.5rem;
          padding-bottom: 0.5rem;
        }
        
        .input-floating-label label {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.2s ease;
          pointer-events: none;
          color: #6b7280;
          font-size: 1rem;
        }
        
        .input-floating-label input:focus + label,
        .input-floating-label input:not(:placeholder-shown) + label {
          top: 0.75rem;
          transform: translateY(0);
          font-size: 0.75rem;
          color: #9ca3af;
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.15);
        }
        
        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

      <div className="max-w-xl mx-auto px-6 py-12">
        {/* Step 1: Initial Email Entry */}
        {currentStep === 1 && (
          <div className="fade-in">
            <button className="flex items-center gap-2 text-stone-800 hover:text-stone-600 transition-colors mb-8 body-font font-medium">
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>

            <h1 className="heading-font text-4xl md:text-5xl font-semibold text-stone-900 mb-3 tracking-tight">
              Create organization account
            </h1>
            <p className="body-font text-stone-600 mb-8 text-lg">
              Sign up using the form, or the Google account
              you use at work
            </p>

            <button className="w-full flex items-center justify-center py-4 px-6 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all duration-200 mb-6 shadow-sm">
              <GoogleIcon />
              <span className="body-font font-medium text-stone-800">
                Sign up with Google
              </span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="body-font text-stone-400 text-sm">
                or
              </span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className="input-floating-label mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="w-full px-4 py-4 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all body-font text-stone-800"
              />
              <label>Email address *</label>
            </div>

            <button
              onClick={handleContinue}
              disabled={!isStep1Complete}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 body-font ${
                isStep1Complete
                  ? "bg-stone-900 text-white hover:bg-stone-800 shadow-lg shadow-stone-900/20"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}>
              Continue
            </button>

            <p className="body-font text-stone-500 text-sm mt-6 leading-relaxed">
              By creating your account, you confirm that you
              have read, understood, and agree to the terms
              in the{" "}
              <a
                href="#"
                className="text-pink-600 hover:text-pink-700 underline underline-offset-2">
                PayrollE5 Legal Hub ↗
              </a>
            </p>
          </div>
        )}

        {/* Step 2: Platform Selection */}
        {currentStep === 2 && (
          <div className="fade-in max-w-4xl mx-auto">
            <h1 className="heading-font text-4xl md:text-5xl font-semibold text-stone-900 mb-3 tracking-tight text-center">
              What will you use the platform for?
            </h1>
            <p className="body-font text-stone-500 mb-12 text-lg text-center">
              Select one of the options below
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {platformOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() =>
                    handlePlatformSelect(option.id)
                  }
                  className={`${option.bgColor} rounded-2xl p-8 text-center card-hover cursor-pointer border-2 border-transparent hover:border-pink-300 slide-up stagger-${index + 1}`}
                  style={{ opacity: 0 }}>
                  <div
                    className={`${option.iconBg} w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center`}>
                    <option.icon
                      size={40}
                      className="text-stone-700"
                    />
                  </div>
                  <h3 className="heading-font text-xl font-semibold text-stone-900 mb-3">
                    {option.title}
                  </h3>
                  <p className="body-font text-stone-600 text-sm leading-relaxed">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            <div
              className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm border border-stone-100 slide-up stagger-4"
              style={{ opacity: 0 }}>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail
                  size={24}
                  className="text-amber-600"
                />
              </div>
              <div>
                <h4 className="body-font font-semibold text-stone-900 mb-1">
                  Are you an employee? Check your inbox!
                </h4>
                <p className="body-font text-stone-500 text-sm">
                  If your employer uses PayrollE5, they will send
                  you an{" "}
                  <span className="font-semibold text-stone-700">
                    email invitation
                  </span>{" "}
                  to sign up
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Email Verification */}
        {currentStep === 3 && (
          <div className="fade-in text-center pt-24">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-cyan-200 rounded-full" />
              <div className="absolute inset-4 bg-cyan-100 rounded-full flex items-center justify-center">
                <div className="relative">
                  <Mail
                    size={48}
                    className="text-pink-500"
                  />
                  <div className="absolute -top-2 -right-4 bg-white rounded px-2 py-1 shadow-md">
                    <span className="body-font text-xs font-mono text-stone-700">
                      123 456
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="heading-font text-4xl md:text-5xl font-semibold text-stone-900 mb-4 tracking-tight">
              Check your inbox
            </h1>
            <p className="body-font text-stone-600 mb-8 text-lg">
              We've sent a confirmation email to{" "}
              <span className="font-semibold text-stone-800">
                {email}
              </span>
            </p>

            <button
              disabled
              className="body-font text-stone-400 font-medium mb-24">
              Resend email in{" "}
              {resendCountdown < 10
                ? `0:0${resendCountdown}`
                : `0:${resendCountdown}`}
            </button>

            <div className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm border border-stone-100 text-left max-w-lg mx-auto slide-up">
              <Info
                size={20}
                className="text-cyan-600 flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 className="body-font font-semibold text-stone-900 mb-1">
                  Can't find your email?
                </h4>
                <p className="body-font text-stone-500 text-sm">
                  Try checking your junk/spam folder, or
                  resend the email above
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(5)}
              className="mt-8 body-font text-pink-600 hover:text-pink-700 underline underline-offset-2 text-sm">
              Continue to Create organization account
            </button>
          </div>
        )}

        {/* Step 4: Email Entered State */}
        {currentStep === 4 && (
          <div className="fade-in">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-stone-800 hover:text-stone-600 transition-colors mb-8 body-font font-medium">
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>

            <h1 className="heading-font text-4xl md:text-5xl font-semibold text-stone-900 mb-3 tracking-tight">
              Create organization account
            </h1>
            <p className="body-font text-stone-600 mb-8 text-lg">
              Sign up using the form, or the Google account
              you use at work
            </p>

            <button className="w-full flex items-center justify-center py-4 px-6 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all duration-200 mb-6 shadow-sm">
              <GoogleIcon />
              <span className="body-font font-medium text-stone-800">
                Sign up with Google
              </span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="body-font text-stone-400 text-sm">
                or
              </span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className="input-floating-label mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="w-full px-4 py-4 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all body-font text-stone-800"
              />
              <label>Email address *</label>
            </div>

            <button
              onClick={handleContinueToFullForm}
              className="w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 body-font bg-stone-900 text-white hover:bg-stone-800 shadow-lg shadow-stone-900/20">
              Continue
            </button>

            <p className="body-font text-stone-500 text-sm mt-6 leading-relaxed">
              By creating your account, you confirm that you
              have read, understood, and agree to the terms
              in the{" "}
              <a
                href="#"
                className="text-pink-600 hover:text-pink-700 underline underline-offset-2">
                PayrollE5 Legal Hub ↗
              </a>
            </p>
          </div>
        )}

        {/* Step 5: Full Registration Form */}
        {currentStep === 5 && (
          <div className="fade-in">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-stone-800 hover:text-stone-600 transition-colors mb-8 body-font font-medium">
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>

            <h1 className="heading-font text-4xl md:text-5xl font-semibold text-stone-900 mb-3 tracking-tight">
              Create organization account
            </h1>
            <p className="body-font text-stone-600 mb-8 text-lg">
              Sign up using the form, or the Google account
              you use at work
            </p>

            <button className="w-full flex items-center justify-center py-4 px-6 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all duration-200 mb-6 shadow-sm">
              <GoogleIcon />
              <span className="body-font font-medium text-stone-800">
                Sign up with Google
              </span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="body-font text-stone-400 text-sm">
                or
              </span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className="space-y-4 mb-6">
              <div className="input-floating-label">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="w-full px-4 py-4 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all body-font text-stone-800"
                />
                <label>Email address *</label>
              </div>

              <div className="input-floating-label relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder=" "
                  className="w-full px-4 py-4 pr-12 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all body-font text-stone-800"
                />
                <label>Password *</label>
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors">
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <div className="input-floating-label">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                  placeholder=" "
                  className="w-full px-4 py-4 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all body-font text-stone-800"
                />
                <label>Legal first name *</label>
              </div>

              <div className="input-floating-label">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  placeholder=" "
                  className="w-full px-4 py-4 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all body-font text-stone-800"
                />
                <label>Legal last name *</label>
              </div>
            </div>

            <label className="flex items-center gap-3 mb-8 cursor-pointer group">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  usePreferredName
                    ? "bg-stone-900 border-stone-900"
                    : "border-stone-300 group-hover:border-stone-400"
                }`}
                onClick={() =>
                  setUsePreferredName(!usePreferredName)
                }>
                {usePreferredName && (
                  <CheckCircle2
                    size={14}
                    className="text-white"
                  />
                )}
              </div>
              <span className="body-font text-stone-700">
                I want to use a preferred name
              </span>
            </label>

            <button
              onClick={handleCreateAccount}
              disabled={!isStep5Complete}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 body-font ${
                isStep5Complete
                  ? "bg-stone-900 text-white hover:bg-stone-800 shadow-lg shadow-stone-900/20"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}>
              Create account
            </button>

            <p className="body-font text-stone-500 text-sm mt-6 leading-relaxed">
              By creating your account, you confirm that you
              have read, understood, and agree to the terms
              in the{" "}
              <a
                href="#"
                className="text-pink-600 hover:text-pink-700 underline underline-offset-2">
                PayrollE5 Legal Hub ↗
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
