"use client";

import {
  ArrowUpRight,
  Award,
  Bookmark,
  Calendar,
  ChevronLeft,
  Clock,
  ExternalLink,
  Eye,
  Flame,
  Globe,
  Heart,
  Linkedin,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function FreelancerDetail() {
  // State
  const [activeTab, setActiveTab] = useState("Work");
  const [isFollowing, setIsFollowing] = useState(false);
  const [expandedReview, setExpandedReview] = useState(null);

  // Data - Freelancer Profile
  const freelancer = {
    id: 1,
    name: "Sarineh Issagholian",
    title: "Full-Stack Product Designer",
    tagline: "Booked through October",
    location: "Los Angeles County, USA",
    avatar: "https://i.pravatar.cc/200?img=47",
    coverImage: null,
    isPro: true,
    isOnline: true,
    isVerified: true,
    earned: "$100k+",
    hired: "1x",
    rating: 5.0,
    reviewCount: 3,
    followers: 152,
    badges: [{ name: "Top Independent", icon: Award }],
    bio: "I craft thoughtful digital experiences that balance aesthetics with functionality. Specializing in end-to-end product design, from initial research and strategy through to polished UI and micro-interactions. I believe great design tells a story.",
    languages: ["English", "Armenian", "Spanish"],
    responseTime: "Within 2 hours",
    timezone: "PST (UTC-8)",
    memberSince: "2021",
    socialLinks: {
      linkedin: "https://linkedin.com",
      portfolio: "https://portfolio.com",
    },
  };

  // Featured Work
  const featuredWork = [
    {
      id: 1,
      title: "Banking App: Buy Now, Pay Later",
      emoji: "🏦",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      tools: ["Android", "Product Designer"],
      extraTools: 4,
      likes: 20,
      views: 592,
    },
    {
      id: 2,
      title: "AstroClub: Astrology + Tarot App",
      emoji: "✨",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      tools: ["Figma", "Product Designer"],
      extraTools: 3,
      likes: 7,
      views: 212,
    },
    {
      id: 3,
      title: "Growth Campaign: Mindfulness Series",
      emoji: "🌸",
      gradient: "from-rose-400 via-pink-500 to-orange-400",
      tools: ["Figma", "Visual Designer"],
      extraTools: 3,
      likes: 4,
      views: 202,
    },
    {
      id: 4,
      title: "E-Commerce Dashboard Redesign",
      emoji: "📊",
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      tools: ["Figma", "UX Research"],
      extraTools: 2,
      likes: 15,
      views: 445,
    },
  ];

  // Reviews
  const reviews = [
    {
      id: 1,
      text: "Need excellent copywriting skills? Gorgeous and unique designs with expert attention to detail? Looking for someone who makes the effort to understand your vision? Sar is this and beyond! Working with her on social media templates is such a joy - her energy and drive is refreshing, not to mention her humor that keeps the vibe light and fun while focused. Highly recommend Sar to everyone!",
      author: "Skylar Schlueter",
      company: "Luni",
      avatar: "https://i.pravatar.cc/60?img=32",
      role: "Client",
      date: "Oct 23, 2024",
      companyLogo: "https://i.pravatar.cc/40?img=65",
    },
    {
      id: 2,
      text: "Working with Sar was a game changer for our app. She joined us at a super chaotic time when we were racing against the clock, but she immediately brought a sense of calm and direction. Sar's great humor, spot-on organization, and fresh ideas were exactly what we needed. What really stands out is how she does it all—from understanding the business side to nailing the UX, UI, and especially her copywriting, which I absolutely love. I can't recommend her enough!",
      author: "Gabriela García",
      company: "Luni",
      avatar: "https://i.pravatar.cc/60?img=44",
      role: "Client",
      date: "May 22, 2024",
      companyLogo: "https://i.pravatar.cc/40?img=65",
    },
    {
      id: 3,
      text: "Sar is a lovely person to work with. Didn't even see the time go as I worked with her. She's a delight!",
      author: "Hanna Woa",
      company: null,
      avatar: "https://i.pravatar.cc/60?img=25",
      role: "Independent",
      date: "Oct 18, 2023",
      isTopRated: true,
    },
  ];

  // Services
  const services = [
    {
      id: 1,
      title: "Full-Stack Product Design Retainer",
      emoji: "✍️",
      gradient: "from-amber-300 via-orange-400 to-rose-500",
      tools: ["Figma", "Product Designer", "UX Designer"],
      extraTools: 1,
      price: "$2,600/wk",
    },
    {
      id: 2,
      title: "Brand-Driven UI Design",
      emoji: "⭐",
      gradient: "from-sky-400 via-blue-500 to-indigo-600",
      tools: ["Figma", "UI Designer", "Visual Designer"],
      extraTools: 1,
      price: "$4,000/wk",
    },
  ];

  // Tabs
  const tabs = ["Work", "Services", "Reviews", "About"];

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
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -16px rgba(0, 0, 0, 0.12);
        }

        .work-card {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .work-card:hover {
          transform: scale(1.02);
        }

        .work-card:hover .work-overlay {
          opacity: 1;
        }

        .review-card {
          transition: all 0.25s ease;
        }

        .review-card:hover {
          background-color: #fafafa;
        }

        .tab-indicator {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary {
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.3);
        }

        .btn-secondary {
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background-color: #f9fafb;
          border-color: #d1d5db;
        }

        .gradient-text {
          background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tool-tag {
          transition: all 0.2s ease;
        }

        .tool-tag:hover {
          background-color: #e5e7eb;
        }

        .stats-divider {
          width: 1px;
          height: 24px;
          background: linear-gradient(to bottom, transparent, #e5e7eb, transparent);
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to search</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
                <Bookmark className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <section className="animate-fade-in mb-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column - Info */}
            <div className="flex-1">
              {/* Avatar & Basic Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  {freelancer.isOnline && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-3 border-white rounded-full" />
                  )}
                </div>
                <div className="pt-1">
                  {freelancer.isPro && (
                    <span className="inline-block px-2.5 py-1 bg-gray-900 text-white text-xs font-semibold rounded mb-2">
                      PRO
                    </span>
                  )}
                </div>
              </div>

              {/* Name & Title */}
              <h1
                className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-display)" }}>
                {freelancer.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1">
                {freelancer.title} <span className="text-gray-400">📦</span> {freelancer.tagline}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6 mb-8">
                <button className="btn-primary flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Get in touch
                </button>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`btn-secondary px-6 py-3 rounded-full text-sm font-medium border transition-all ${
                    isFollowing ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-200"
                  }`}>
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button className="btn-secondary p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Stats */}
              <div className="inline-flex items-center gap-6 px-6 py-4 bg-gray-50 rounded-2xl mb-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{freelancer.earned}</p>
                  <p className="text-xs text-gray-500">Earned</p>
                </div>
                <div className="stats-divider" />
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{freelancer.hired}</p>
                  <p className="text-xs text-gray-500">Hired</p>
                </div>
                <div className="stats-divider" />
                <div className="text-center flex items-center gap-1">
                  <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                  <p className="text-lg font-semibold text-gray-900">{freelancer.rating.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 ml-1">Rating</p>
                </div>
                <div className="stats-divider" />
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{freelancer.followers}</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {freelancer.badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm">
                    <badge.icon className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Featured Image/Reel */}
            <div className="lg:w-[420px]">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur flex items-center justify-center mx-auto mb-3 shadow-lg animate-float">
                      <Globe className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Featured Reel</p>
                  </div>
                </div>
              </div>
              {/* Location & Links */}
              <div className="flex items-center justify-end gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{freelancer.location}</span>
                </div>
                <a
                  href={freelancer.socialLinks.linkedin}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 text-gray-500" />
                </a>
                <a
                  href={freelancer.socialLinks.portfolio}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer">
                  <ArrowUpRight className="w-5 h-5 text-gray-500" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work Section */}
        <section className="animate-slide-up mb-16" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              Featured work
            </h2>
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              View all
              <span className="text-gray-400">({featuredWork.length})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWork.slice(0, 3).map((work, index) => (
              <div
                key={work.id}
                className="work-card group cursor-pointer"
                style={{ animationDelay: `${0.15 + index * 0.1}s` }}>
                {/* Work Image */}
                <div
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${work.gradient} mb-4`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">{work.emoji}</span>
                  </div>
                  <div className="work-overlay absolute inset-0 bg-black/40 opacity-0 flex items-center justify-center transition-opacity">
                    <button className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-900">
                      View project
                    </button>
                  </div>
                </div>

                {/* Tools */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {work.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="tool-tag px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg flex items-center gap-1.5">
                      {idx === 0 && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                      {idx === 1 && <span className="w-1.5 h-3 rounded-sm bg-purple-500" />}
                      {tool}
                    </span>
                  ))}
                  {work.extraTools > 0 && <span className="px-2.5 py-1 text-gray-400 text-xs">+{work.extraTools}</span>}
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {work.emoji} {work.title}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4" />
                    <span>{work.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>{work.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="animate-slide-up mb-16" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              Reviews
            </h2>
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              View all
              <span className="text-gray-400">({reviews.length})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`review-card p-6 border border-gray-100 rounded-2xl ${index === 2 ? "lg:col-span-1" : ""}`}>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">{review.text}</p>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                    {review.companyLogo && (
                      <img
                        src={review.companyLogo}
                        alt={review.company}
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white"
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{review.author}</span>
                      {review.isTopRated && <Flame className="w-4 h-4 text-orange-500" />}
                      {review.company && <span className="text-sm text-gray-500">{review.company}</span>}
                    </div>
                    <p className="text-xs text-gray-400">
                      {review.role} · {review.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="animate-slide-up mb-16" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              Services
            </h2>
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              View all
              <span className="text-gray-400">({services.length})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="card-hover cursor-pointer"
                style={{ animationDelay: `${0.35 + index * 0.1}s` }}>
                {/* Service Image */}
                <div
                  className={`relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br ${service.gradient} mb-4`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">{service.emoji}</span>
                  </div>
                </div>

                {/* Tools */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {service.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="tool-tag px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg flex items-center gap-1.5">
                      {idx === 0 && <span className="w-1.5 h-3 rounded-sm bg-purple-500" />}
                      {tool}
                    </span>
                  ))}
                  {service.extraTools > 0 && (
                    <span className="px-2.5 py-1 text-gray-400 text-xs">+{service.extraTools}</span>
                  )}
                </div>

                {/* Title & Price */}
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {service.title} {service.emoji}
                </h3>
                <p className="text-sm text-gray-500">{service.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="animate-slide-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
            About
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bio */}
            <div className="lg:col-span-2">
              <p className="text-gray-600 leading-relaxed mb-6">{freelancer.bio}</p>
              <div className="flex items-center gap-4">
                <a
                  href={freelancer.socialLinks.portfolio}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View full portfolio
                </a>
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Response time</p>
                  <p className="text-sm font-medium text-gray-900">{freelancer.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Timezone</p>
                  <p className="text-sm font-medium text-gray-900">{freelancer.timezone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Languages</p>
                  <p className="text-sm font-medium text-gray-900">{freelancer.languages.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Member since</p>
                  <p className="text-sm font-medium text-gray-900">{freelancer.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100 p-4 z-50">
        <div className="flex items-center gap-3">
          <button className="flex-1 btn-primary flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-full text-sm font-medium">
            <Zap className="w-4 h-4" />
            Get in touch
          </button>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-3.5 rounded-full text-sm font-medium border transition-all ${
              isFollowing ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-200"
            }`}>
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}
