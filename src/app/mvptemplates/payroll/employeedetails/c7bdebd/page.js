"use client";

import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Copy,
  ExternalLink,
  FileCheck,
  FilePlus,
  FileText,
  Heart,
  History,
  Info,
  LayoutGrid,
  Monitor,
  MoreVertical,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  StickyNote,
  Target,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export default function PayrollE5PersonDetails() {
  // State
  const [showBanner, setShowBanner] = useState(true);
  const [copiedField, setCopiedField] = useState("");
  const [activeQuickAction, setActiveQuickAction] =
    useState("");

  // Worker Data
  const [worker] = useState({
    name: "Adriana Costa",
    role: "Regional Web Administrator",
    status: "Active",
    avatarColors: ["#f472b6", "#fbbf24", "#06b6d4"],
    workerId: "219",
    externalWorkerId: "",
    workerType: "Person without a contract",
    group: "Wayne Enterprise Global",
    organizationEntity: "Wayne Enterprise Global",
    startDate: "Jul 4th 2025",
    endDate: "",
    lastDateOfWork: "",
    country: "Taiwan",
    workEmail: "jackpotts@content-frozti.com",
    personalEmail: "jackpotts@content-frozti.com",
    personalPhone: "95198222227",
    jobTitle: "Regional Web Administrator",
    seniorityLevel: "",
    workLocation: "",
    department: "Customer Support",
    teams: "Engineers",
    additionalRole: "",
    positions: 2,
  });

  const [manager] = useState({
    name: "Chinara Kamau",
    role: "User Experience Researcher",
    avatarColors: ["#06b6d4", "#f472b6", "#fbbf24"],
  });

  const [reports] = useState([
    {
      name: "Gladyce Cummerata",
      role: "Product Marketing Associate",
      avatarColors: ["#06b6d4", "#fbbf24", "#f472b6"],
      initials: "",
    },
    {
      name: "Heloise Stark",
      role: "Sustainability Consultant",
      avatarColors: ["#a78bfa", "#f472b6"],
      initials: "HS",
    },
    {
      name: "Jacinto Schmidt",
      role: "Cloud Infrastructure Engineer",
      avatarColors: ["#a78bfa", "#06b6d4"],
      initials: "JS",
    },
  ]);

  // Quick Actions Data
  const quickActions = [
    {
      id: "personal",
      title: "Personal information",
      description:
        "Check their contact info and other personal details",
      icon: FileText,
    },
    {
      id: "supplementary",
      title: "Supplementary information",
      description:
        "Custom information related to the worker",
      icon: FilePlus,
    },
    {
      id: "timeoff",
      title: "Time off",
      description: "Review and manage time off information",
      icon: Calendar,
    },
    {
      id: "documents",
      title: "Documents",
      description:
        "Verify compliance. See if required documents are uploaded",
      icon: FileCheck,
    },
    {
      id: "reviews",
      title: "Review cycles",
      description:
        "View review cycles assigned to the user",
      icon: ClipboardList,
    },
    {
      id: "goals",
      title: "Goals",
      description:
        "View goals assigned to the user, the user's team, or public goals",
      icon: Target,
    },
    {
      id: "surveys",
      title: "Surveys",
      description:
        "Track your team survey progress and view insights",
      icon: BarChart3,
    },
    {
      id: "certificates",
      title: "Certificates",
      description:
        "View all certificates issued to the user",
      icon: Award,
    },
    {
      id: "learning",
      title: "Learning courses",
      description:
        "Review progress of assigned or self-enrolled courses",
      icon: BookOpen,
    },
    {
      id: "apps",
      title: "Apps",
      description:
        "Integrations and tools used for this worker",
      icon: LayoutGrid,
    },
    {
      id: "equity",
      title: "Equity",
      description: "View, manage, and track equity",
      icon: CircleDollarSign,
    },
    {
      id: "it",
      title: "PayrollE5 IT",
      description: "View, manage, and order equipment",
      icon: Monitor,
    },
    {
      id: "benefits",
      title: "Benefits",
      description:
        "Healthcare, pension and others where compliant",
      icon: Heart,
      disabled: true,
    },
    {
      id: "history",
      title: "History",
      description:
        "Review past changes to the worker profile",
      icon: History,
    },
    {
      id: "compliance",
      title: "Compliance",
      description:
        "Review compliance assessment history for this worker",
      icon: Scale,
    },
    {
      id: "verifications",
      title: "Verifications",
      description:
        "Access background check, identity, and remote worker verification results",
      icon: ShieldCheck,
    },
  ];

  // Handlers
  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  // Avatar Component
  const Avatar = ({ colors, initials, size = "md" }) => {
    const sizeClasses = {
      sm: "w-10 h-10",
      md: "w-12 h-12",
      lg: "w-16 h-16",
    };

    if (initials) {
      return (
        <div
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center body-font font-semibold text-white`}
          style={{
            background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1] || colors[0]} 100%)`,
          }}>
          {initials}
        </div>
      );
    }

    return (
      <div
        className={`${sizeClasses[size]} rounded-full relative overflow-hidden`}>
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 180deg, ${colors[0]} 0deg, ${colors[1]} 120deg, ${colors[2]} 240deg, ${colors[0]} 360deg)`,
          }}
        />
        <div className="absolute inset-[3px] bg-white rounded-full" />
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background: `conic-gradient(from 180deg, ${colors[0]} 0deg, ${colors[1]} 120deg, ${colors[2]} 240deg, ${colors[0]} 360deg)`,
            clipPath:
              "polygon(0 0, 60% 0, 40% 100%, 0 100%)",
          }}
        />
      </div>
    );
  };

  // Info Row Component
  const InfoRow = ({
    label,
    value,
    isLink,
    copyable,
    linkExternal,
  }) => (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-stone-50 transition-colors rounded-lg">
      <span className="body-font text-stone-500 text-sm">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {value ? (
          <>
            {isLink ? (
              <a
                href="#"
                className="body-font text-pink-600 hover:text-pink-700 font-medium text-sm flex items-center gap-1">
                {value}
                {linkExternal && <ExternalLink size={14} />}
              </a>
            ) : (
              <span className="body-font text-stone-800 font-medium text-sm">
                {value}
              </span>
            )}
            {copyable && (
              <button
                onClick={() => handleCopy(value, label)}
                className="p-1 hover:bg-stone-100 rounded transition-colors">
                <Copy
                  size={14}
                  className={
                    copiedField === label
                      ? "text-green-600"
                      : "text-stone-400"
                  }
                />
              </button>
            )}
          </>
        ) : (
          <span className="body-font text-stone-400 text-sm">
            Not specified
          </span>
        )}
      </div>
    </div>
  );

  // Quick Action Card Component
  const QuickActionCard = ({ action }) => (
    <button
      onClick={() =>
        !action.disabled && setActiveQuickAction(action.id)
      }
      disabled={action.disabled}
      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${
        action.disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-stone-50 cursor-pointer"
      }`}>
      <div className="w-11 h-11 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-stone-200 transition-colors">
        <action.icon size={20} className="text-stone-700" />
      </div>
      <div className="flex-1 text-left">
        <h4 className="body-font font-semibold text-stone-900 text-sm">
          {action.title}
        </h4>
        <p className="body-font text-stone-500 text-xs mt-0.5 leading-relaxed">
          {action.description}
        </p>
      </div>
      <ChevronRight
        size={18}
        className={`text-stone-400 flex-shrink-0 transition-transform ${
          action.disabled ? "" : "group-hover:translate-x-1"
        }`}
      />
    </button>
  );

  // Person Card Component
  const PersonCard = ({ person, showAvatar = true }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer">
      {showAvatar && (
        <Avatar
          colors={person.avatarColors}
          initials={person.initials}
          size="sm"
        />
      )}
      <div>
        <a
          href="#"
          className="body-font text-pink-600 hover:text-pink-700 font-medium text-sm">
          {person.name}
        </a>
        <p className="body-font text-stone-500 text-xs">
          {person.role}
        </p>
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
        
        .card-section {
          background: white;
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
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
        
        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; }
        .stagger-4 { animation-delay: 0.2s; }
        .stagger-5 { animation-delay: 0.25s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Navigation */}
        <button className="flex items-center gap-2 text-stone-800 hover:text-stone-600 transition-colors mb-6 body-font font-medium fade-in">
          <ArrowLeft size={18} />
          <span>Back to people</span>
        </button>

        {/* Header Section */}
        <div className="flex items-start justify-between mb-8 fade-in">
          <div className="flex items-center gap-5">
            <Avatar
              colors={worker.avatarColors}
              size="lg"
            />
            <div>
              <h1 className="heading-font text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight">
                {worker.name}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="body-font text-stone-600">
                  {worker.role}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="body-font text-green-700 text-xs font-medium">
                    {worker.status}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-800 shadow-sm">
              <Network size={18} />
              <span>View in org chart</span>
            </button>
            <button className="p-2.5 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all shadow-sm">
              <MoreVertical
                size={18}
                className="text-stone-600"
              />
            </button>
          </div>
        </div>

        {/* Promotional Banner */}
        {showBanner && (
          <div
            className="relative mb-8 rounded-2xl overflow-hidden slide-up stagger-1"
            style={{ opacity: 0 }}>
            <div
              className="p-6 pr-48"
              style={{
                background:
                  "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #fef3c7 100%)",
              }}>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="body-font text-stone-800">
                    <span className="font-semibold">
                      Looking for workers?
                    </span>{" "}
                    Get matched to the best talent partners
                    and start hiring with confidence.
                  </p>
                </div>
                <button className="px-5 py-2.5 bg-white rounded-xl body-font font-medium text-stone-800 shadow-sm hover:shadow-md transition-all border border-stone-100">
                  Try PayrollE5 Talent
                </button>
              </div>
            </div>
            {/* Decorative illustration area */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-24 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-amber-300 absolute -left-4 top-0" />
                <div className="w-12 h-12 rounded-full bg-cyan-400 absolute left-8 -top-2" />
                <div className="w-10 h-10 rounded-full bg-pink-300 absolute left-4 top-6" />
                <div className="w-8 h-8 rounded-full bg-blue-400 absolute left-16 top-4" />
                <Sparkles
                  className="absolute left-0 top-8 text-amber-500"
                  size={16}
                />
                <Users
                  className="absolute left-12 top-10 text-stone-700"
                  size={20}
                />
              </div>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-4 top-4 p-1.5 rounded-lg hover:bg-white/50 transition-colors">
              <X size={18} className="text-stone-500" />
            </button>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contracts Section */}
            <div
              className="card-section p-6 slide-up stagger-2"
              style={{ opacity: 0 }}>
              <h2 className="body-font font-semibold text-stone-900 mb-4">
                Contracts
              </h2>
              <div className="bg-stone-50 rounded-xl p-5 border border-stone-100">
                <div className="flex items-start gap-3">
                  <Info
                    size={18}
                    className="text-cyan-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <h3 className="body-font font-semibold text-stone-900 mb-1">
                      This worker doesn't have a contract
                    </h3>
                    <p className="body-font text-stone-500 text-sm mb-4">
                      Create a contract or agreement for the
                      worker to become active
                    </p>
                    <button className="px-4 py-2.5 bg-stone-900 text-white rounded-xl body-font font-medium hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/20">
                      Create contract
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* General Information Section */}
            <div
              className="card-section p-6 slide-up stagger-3"
              style={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="body-font font-semibold text-stone-900">
                  General information
                </h2>
                <button className="px-4 py-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                  Edit
                </button>
              </div>
              <div className="space-y-1">
                <InfoRow
                  label="Worker type"
                  value={worker.workerType}
                />
                <InfoRow
                  label="Group"
                  value={worker.group}
                />
                <InfoRow
                  label="Organization entity"
                  value={worker.organizationEntity}
                  isLink
                  linkExternal
                />
                <InfoRow
                  label="Worker ID"
                  value={worker.workerId}
                  copyable
                />
                <InfoRow
                  label="External worker ID"
                  value={worker.externalWorkerId}
                />
                <InfoRow
                  label="Start date"
                  value={worker.startDate}
                />
                <InfoRow
                  label="End date"
                  value={worker.endDate}
                />
                <InfoRow
                  label="Last date of work"
                  value={worker.lastDateOfWork}
                />
                <InfoRow
                  label="Country"
                  value={worker.country}
                />
                <InfoRow
                  label="Work email"
                  value={worker.workEmail}
                  copyable
                />
                <InfoRow
                  label="Personal email"
                  value={worker.personalEmail}
                  copyable
                />
                <InfoRow
                  label="Personal phone"
                  value={worker.personalPhone}
                  copyable
                />
                <InfoRow
                  label="Job title"
                  value={worker.jobTitle}
                />
                <InfoRow
                  label="Seniority level"
                  value={worker.seniorityLevel}
                />
                <InfoRow
                  label="Work location"
                  value={worker.workLocation}
                />
              </div>
            </div>

            {/* Organization Position and Role */}
            <div
              className="card-section p-6 slide-up stagger-4"
              style={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="body-font font-semibold text-stone-900">
                  Organization position and role
                </h2>
                <button className="px-4 py-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                  Edit
                </button>
              </div>
              <div className="space-y-1">
                <InfoRow
                  label={`Position (${worker.positions})`}
                  value=""
                />
                <InfoRow
                  label="Department"
                  value={worker.department}
                  isLink
                />
                <InfoRow
                  label="Teams"
                  value={worker.teams}
                  isLink
                />
                <div className="py-3 px-4">
                  <span className="body-font text-stone-500 text-sm">
                    Additional role
                  </span>
                </div>
                <div className="flex items-center gap-2 py-3 px-4 bg-stone-50 rounded-lg">
                  <Info
                    size={16}
                    className="text-stone-400"
                  />
                  <span className="body-font text-stone-500 text-sm">
                    Not assigned
                  </span>
                </div>
              </div>
            </div>

            {/* Manager Section */}
            <div
              className="card-section p-6 slide-up stagger-5"
              style={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="body-font font-semibold text-stone-900">
                  Manager
                </h2>
                <button className="px-4 py-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                  Edit
                </button>
              </div>
              <PersonCard person={manager} />
            </div>

            {/* Reports Section */}
            <div
              className="card-section p-6 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.3s",
              }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="body-font font-semibold text-stone-900">
                  Reports ({reports.length})
                </h2>
                <button className="px-4 py-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                  Edit
                </button>
              </div>
              <div className="space-y-1">
                {reports.map((report, index) => (
                  <PersonCard key={index} person={report} />
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div
              className="card-section p-6 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.35s",
              }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="body-font font-semibold text-stone-900">
                  Notes
                </h2>
                <button className="px-4 py-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                  Add
                </button>
              </div>
              <div className="flex items-center gap-2 py-3 px-4 bg-stone-50 rounded-lg">
                <Info
                  size={16}
                  className="text-stone-400"
                />
                <span className="body-font text-stone-500 text-sm">
                  This space is for internal notes. It's
                  visible to your organization's managers
                  only.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-2">
            <div
              className="card-section p-2 slide-up stagger-2"
              style={{ opacity: 0 }}>
              <div className="divide-y divide-stone-100">
                {quickActions.map((action) => (
                  <QuickActionCard
                    key={action.id}
                    action={action}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center shadow-lg shadow-pink-600/30 transition-all hover:scale-105">
        <StickyNote size={24} className="text-white" />
      </button>
    </div>
  );
}
