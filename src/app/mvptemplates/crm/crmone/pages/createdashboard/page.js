"use client";

import {
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Gem,
  Handshake,
  LayoutGrid,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CRMOneDashboard() {
  // State
  const [showNewDashboardModal, setShowNewDashboardModal] =
    useState(false);
  const [selectedGroup, setSelectedGroup] = useState(
    "Recruitment pipeline",
  );
  const [dashboardType, setDashboardType] =
    useState("People");
  const [expandedSections, setExpandedSections] = useState({
    founders: true,
    recruitment: true,
  });
  const [currentView, setCurrentView] =
    useState("dashboard"); // "empty" | "dashboard"
  const [activeNav, setActiveNav] = useState("Dashboards");

  // Data
  const sidebarGroups = [
    {
      title: "Shared to everyone",
      items: [
        {
          name: "Partnerships",
          icon: Handshake,
          emoji: "🤝",
        },
        {
          name: "Sales pipeline",
          icon: CircleDollarSign,
          emoji: "🤑",
        },
      ],
    },
    {
      title: "Shared",
      items: [
        {
          name: "Recruitment pipeline",
          icon: MoreHorizontal,
          expandable: true,
          children: [
            {
              name: "Recruitment pipeline",
              icon: LayoutGrid,
            },
            {
              name: "All applicants",
              icon: Users,
              hasGlobe: true,
            },
            { name: "All people", icon: Users },
            { name: "All companies", icon: Building2 },
          ],
        },
      ],
    },
    {
      title: "Private",
      items: [
        {
          name: "Founders",
          icon: Users,
          emoji: "👥",
          expandable: true,
          children: [
            { name: "All people", icon: Users },
            { name: "All companies", icon: Building2 },
          ],
        },
      ],
    },
  ];

  const navItems = [
    { name: "Search", icon: Search },
    { name: "Notifications", icon: Bell },
    { name: "Messages", icon: Mail },
    { name: "Dashboards", icon: BarChart3, badge: "Beta" },
    { name: "Duplicates", icon: Users, count: 1 },
    { name: "Settings & members", icon: Settings },
  ];

  const groups = [
    "Recruitment pipeline",
    "Founders",
    "Sales pipeline",
    "Partnerships",
  ];

  // KPI Data
  const kpiData = [
    {
      label: "Generated revenue",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up",
    },
    {
      label: "Conversion rate",
      value: "24.8%",
      change: "+3.2%",
      trend: "up",
    },
    {
      label: "Average deal value",
      value: "$48.2K",
      change: "-2.1%",
      trend: "down",
    },
    {
      label: "Number of deals closed",
      value: "156",
      change: "+18.7%",
      trend: "up",
    },
  ];

  // Chart Data
  const leadsByStatusData = [
    { name: "New", value: 45, fill: "#171717" },
    { name: "Contacted", value: 32, fill: "#404040" },
    { name: "Qualified", value: 28, fill: "#737373" },
    { name: "Proposal", value: 18, fill: "#a3a3a3" },
    { name: "Won", value: 24, fill: "#d4d4d4" },
  ];

  const leadsByIndustryData = [
    { name: "Technology", value: 35 },
    { name: "Healthcare", value: 25 },
    { name: "Finance", value: 20 },
    { name: "Retail", value: 12 },
    { name: "Other", value: 8 },
  ];

  const lostDealsData = [
    { reason: "Budget", count: 23 },
    { reason: "Timing", count: 18 },
    { reason: "Competition", count: 15 },
    { reason: "No response", count: 12 },
    { reason: "Features", count: 8 },
  ];

  const leadsByCreationDate = [
    { month: "Jan", leads: 42 },
    { month: "Feb", leads: 38 },
    { month: "Mar", leads: 55 },
    { month: "Apr", leads: 47 },
    { month: "May", leads: 62 },
    { month: "Jun", leads: 58 },
    { month: "Jul", leads: 71 },
    { month: "Aug", leads: 65 },
    { month: "Sep", leads: 78 },
    { month: "Oct", leads: 82 },
    { month: "Nov", leads: 74 },
    { month: "Dec", leads: 89 },
  ];

  const revenueByClosingDate = [
    { month: "Jan", revenue: 180000 },
    { month: "Feb", revenue: 220000 },
    { month: "Mar", revenue: 195000 },
    { month: "Apr", revenue: 280000 },
    { month: "May", revenue: 310000 },
    { month: "Jun", revenue: 290000 },
    { month: "Jul", revenue: 340000 },
    { month: "Aug", revenue: 380000 },
    { month: "Sep", revenue: 420000 },
    { month: "Oct", revenue: 390000 },
    { month: "Nov", revenue: 450000 },
    { month: "Dec", revenue: 520000 },
  ];

  const leadsByClosingDate = [
    { month: "Jan", leads: 12 },
    { month: "Feb", leads: 15 },
    { month: "Mar", leads: 11 },
    { month: "Apr", leads: 18 },
    { month: "May", leads: 22 },
    { month: "Jun", leads: 19 },
    { month: "Jul", leads: 25 },
    { month: "Aug", leads: 28 },
    { month: "Sep", leads: 31 },
    { month: "Oct", leads: 27 },
    { month: "Nov", leads: 33 },
    { month: "Dec", leads: 38 },
  ];

  const avgDealValueData = [
    { month: "Jan", value: 42000 },
    { month: "Feb", value: 45000 },
    { month: "Mar", value: 48000 },
    { month: "Apr", value: 44000 },
    { month: "May", value: 51000 },
    { month: "Jun", value: 49000 },
    { month: "Jul", value: 53000 },
    { month: "Aug", value: 48000 },
    { month: "Sep", value: 52000 },
    { month: "Oct", leads: 54000 },
    { month: "Nov", value: 51000 },
    { month: "Dec", value: 56000 },
  ];

  const COLORS = [
    "#171717",
    "#404040",
    "#737373",
    "#a3a3a3",
    "#d4d4d4",
  ];

  // Handlers
  const handleCreateDashboard = () => {
    setShowNewDashboardModal(false);
    setCurrentView("dashboard");
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatCurrency = (value) => {
    if (value >= 1000000)
      return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000)
      return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-neutral-300">
            {typeof payload[0].value === "number" &&
            payload[0].value > 1000
              ? formatCurrency(payload[0].value)
              : payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="min-h-screen flex bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(8px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
        
        .scale-in {
          animation: scaleIn 0.2s ease-out forwards;
        }
        
        .sidebar-item {
          transition: all 0.15s ease;
        }
        
        .sidebar-item:hover {
          background: #f5f5f5;
        }
        
        .sidebar-item.active {
          background: #f5f5f5;
        }
        
        .btn-primary {
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .btn-secondary {
          transition: all 0.15s ease;
        }
        
        .btn-secondary:hover {
          background: #f5f5f5;
          border-color: #d4d4d4;
        }
        
        .chart-card {
          transition: all 0.2s ease;
        }
        
        .chart-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .kpi-card {
          transition: all 0.2s ease;
        }
        
        .kpi-card:hover {
          border-color: #d4d4d4;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .select-field {
          transition: all 0.15s ease;
        }
        
        .select-field:hover {
          border-color: #a3a3a3;
        }
        
        .toggle-btn {
          transition: all 0.15s ease;
        }
        
        .toggle-btn.active {
          background: #f5f5f5;
          border-color: #171717;
        }
        
        .toggle-btn:hover:not(.active) {
          background: #fafafa;
        }

        /* Custom scrollbar */
        .sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 2px;
        }
        
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #d4d4d4;
        }
      `}</style>

      {/* Sidebar */}
      <aside className="w-56 border-r border-neutral-100 flex flex-col bg-neutral-50/50">
        {/* Workspace header */}
        <div className="p-4 border-b border-neutral-100">
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded bg-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-700">
              S
            </div>
            <span className="text-sm font-medium text-neutral-900">
              Frozti
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>

        {/* Premium trial banner */}
        <div className="px-4 py-3 border-b border-neutral-100">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
            <Gem className="w-3.5 h-3.5" />
            <span>
              Premium trial{" "}
              <span className="text-neutral-400">
                (2 weeks left)
              </span>
            </span>
          </div>
          <button className="btn-primary px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md">
            Subscribe
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll py-2">
          {/* Main nav items */}
          <div className="px-2 space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`sidebar-item w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                  activeNav === item.name
                    ? "active text-neutral-900"
                    : "text-neutral-600"
                }`}>
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 bg-neutral-200 text-neutral-600 text-[10px] font-medium rounded">
                    {item.badge}
                  </span>
                )}
                {item.count && (
                  <span className="text-xs text-neutral-400">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Groups */}
          {sidebarGroups.map((group, groupIndex) => (
            <div key={group.title} className="mt-4">
              <div className="px-4 py-1.5">
                <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  {group.title}
                </span>
              </div>
              <div className="px-2 space-y-0.5">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() =>
                        item.expandable &&
                        toggleSection(
                          item.name
                            .toLowerCase()
                            .split(" ")[0],
                        )
                      }
                      className="sidebar-item w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-neutral-600">
                      <div className="flex items-center gap-2.5">
                        {item.emoji ? (
                          <span className="text-sm">
                            {item.emoji}
                          </span>
                        ) : item.expandable ? (
                          <span className="text-neutral-400">
                            ••
                          </span>
                        ) : (
                          <item.icon className="w-4 h-4" />
                        )}
                        <span>{item.name}</span>
                      </div>
                      {item.expandable && (
                        <ChevronRight
                          className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                            expandedSections[
                              item.name
                                .toLowerCase()
                                .split(" ")[0]
                            ]
                              ? "rotate-90"
                              : ""
                          }`}
                        />
                      )}
                    </button>
                    {item.expandable &&
                      expandedSections[
                        item.name
                          .toLowerCase()
                          .split(" ")[0]
                      ] && (
                        <div className="ml-4 space-y-0.5">
                          {item.children.map((child) => (
                            <button
                              key={child.name}
                              className="sidebar-item w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm text-neutral-500">
                              <child.icon className="w-3.5 h-3.5" />
                              <span>{child.name}</span>
                              {child.hasGlobe && (
                                <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-[8px]">
                                    🌐
                                  </span>
                                </span>
                              )}
                            </button>
                          ))}
                          <button className="sidebar-item w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm text-neutral-400">
                            <Plus className="w-3.5 h-3.5" />
                            <span>New view</span>
                          </button>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* New group button */}
          <div className="px-2 mt-4">
            <button className="sidebar-item w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-400">
              <Plus className="w-4 h-4" />
              <span>New group</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Header */}
        <header className="h-14 border-b border-neutral-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h1
              className="text-lg font-medium text-neutral-900"
              style={{ fontFamily: "'Newsreader', serif" }}>
              {currentView === "empty"
                ? "Dashboards"
                : "Recruitment pipeline dashboard"}
            </h1>
            {currentView === "dashboard" && (
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="text-neutral-400">••</span>
                <span>Recruitment pipeline</span>
                <span className="text-neutral-300">•</span>
                <User className="w-3 h-3" />
                <span>People</span>
              </div>
            )}
          </div>
          {currentView === "dashboard" && (
            <button className="p-2 hover:bg-neutral-50 rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4 text-neutral-400" />
            </button>
          )}
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {currentView === "empty" ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full slide-up">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-neutral-400" />
              </div>
              <h2
                className="text-2xl font-medium text-neutral-900 mb-3"
                style={{
                  fontFamily: "'Newsreader', serif",
                }}>
                Get insights with dashboards
              </h2>
              <p className="text-sm text-neutral-500 text-center max-w-sm mb-6">
                Measure your efforts and optimize your
                growth by setting up a new dashboard
              </p>
              <button
                onClick={() =>
                  setShowNewDashboardModal(true)
                }
                className="btn-primary px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg">
                New dashboard
              </button>
            </div>
          ) : (
            /* Dashboard view */
            <div className="p-6 space-y-6 fade-in">
              {/* KPI Cards */}
              <div className="grid grid-cols-4 gap-4">
                {kpiData.map((kpi, index) => (
                  <div
                    key={kpi.label}
                    className="kpi-card border border-neutral-200 rounded-xl p-5"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}>
                    <p className="text-xs text-neutral-500 mb-1">
                      {kpi.label}
                    </p>
                    <div className="flex items-end justify-between">
                      <span
                        className="text-2xl font-medium text-neutral-900"
                        style={{
                          fontFamily: "'Newsreader', serif",
                        }}>
                        {kpi.value}
                      </span>
                      <div
                        className={`flex items-center gap-1 text-xs ${kpi.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                        {kpi.trend === "up" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{kpi.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 1: Leads by creation date + Revenue by closing date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="chart-card border border-neutral-200 rounded-xl p-5">
                  <h3 className="text-sm font-medium text-neutral-900 mb-4">
                    Leads by creation date
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer
                      width="100%"
                      height="100%">
                      <AreaChart data={leadsByCreationDate}>
                        <defs>
                          <linearGradient
                            id="leadsGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1">
                            <stop
                              offset="5%"
                              stopColor="#171717"
                              stopOpacity={0.1}
                            />
                            <stop
                              offset="95%"
                              stopColor="#171717"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f5f5f5"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                        />
                        <Area
                          type="monotone"
                          dataKey="leads"
                          stroke="#171717"
                          strokeWidth={2}
                          fill="url(#leadsGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="chart-card border border-neutral-200 rounded-xl p-5">
                  <h3 className="text-sm font-medium text-neutral-900 mb-4">
                    Revenue by closing date
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer
                      width="100%"
                      height="100%">
                      <AreaChart
                        data={revenueByClosingDate}>
                        <defs>
                          <linearGradient
                            id="revenueGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1">
                            <stop
                              offset="5%"
                              stopColor="#171717"
                              stopOpacity={0.1}
                            />
                            <stop
                              offset="95%"
                              stopColor="#171717"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f5f5f5"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                          tickFormatter={formatCurrency}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#171717"
                          strokeWidth={2}
                          fill="url(#revenueGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Row 2: Leads by closing date + Average deal value */}
              <div className="grid grid-cols-2 gap-4">
                <div className="chart-card border border-neutral-200 rounded-xl p-5">
                  <h3 className="text-sm font-medium text-neutral-900 mb-4">
                    Leads by closing date
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer
                      width="100%"
                      height="100%">
                      <BarChart
                        data={leadsByClosingDate}
                        barSize={24}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f5f5f5"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                        />
                        <Bar
                          dataKey="leads"
                          fill="#171717"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="chart-card border border-neutral-200 rounded-xl p-5">
                  <h3 className="text-sm font-medium text-neutral-900 mb-4">
                    Average deal value by closing date
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer
                      width="100%"
                      height="100%">
                      <LineChart data={avgDealValueData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f5f5f5"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                          tickFormatter={formatCurrency}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#171717"
                          strokeWidth={2}
                          dot={{
                            fill: "#171717",
                            strokeWidth: 0,
                            r: 3,
                          }}
                          activeDot={{
                            r: 5,
                            fill: "#171717",
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Row 3: Leads by status + Leads by industry */}
              <div className="grid grid-cols-2 gap-4">
                <div className="chart-card border border-neutral-200 rounded-xl p-5">
                  <h3 className="text-sm font-medium text-neutral-900 mb-4">
                    Leads by status
                  </h3>
                  <div className="h-64 flex items-center">
                    <div className="w-1/2">
                      <ResponsiveContainer
                        width="100%"
                        height={200}>
                        <PieChart>
                          <Pie
                            data={leadsByStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value">
                            {leadsByStatusData.map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.fill}
                                />
                              ),
                            )}
                          </Pie>
                          <Tooltip
                            content={({
                              active,
                              payload,
                            }) => {
                              if (
                                active &&
                                payload &&
                                payload.length
                              ) {
                                return (
                                  <div className="bg-neutral-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
                                    <p className="font-medium">
                                      {payload[0].name}
                                    </p>
                                    <p className="text-neutral-300">
                                      {payload[0].value}{" "}
                                      leads
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-1/2 space-y-2">
                      {leadsByStatusData.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-sm"
                              style={{
                                backgroundColor: item.fill,
                              }}
                            />
                            <span className="text-neutral-600">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-neutral-900 font-medium">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="chart-card border border-neutral-200 rounded-xl p-5">
                  <h3 className="text-sm font-medium text-neutral-900 mb-4">
                    Leads by industry
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer
                      width="100%"
                      height="100%">
                      <BarChart
                        data={leadsByIndustryData}
                        layout="vertical"
                        barSize={20}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f5f5f5"
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#737373",
                          }}
                          width={80}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                        />
                        <Bar
                          dataKey="value"
                          fill="#171717"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Row 4: Lost deals reasons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="chart-card border border-neutral-200 rounded-xl p-5">
                  <h3 className="text-sm font-medium text-neutral-900 mb-4">
                    Lost deals reasons
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer
                      width="100%"
                      height="100%">
                      <BarChart
                        data={lostDealsData}
                        barSize={32}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f5f5f5"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="reason"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "#a3a3a3",
                          }}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                        />
                        <Bar
                          dataKey="count"
                          fill="#737373"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* New Dashboard Modal */}
      {showNewDashboardModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-medium text-neutral-900"
                style={{
                  fontFamily: "'Newsreader', serif",
                }}>
                New dashboard
              </h2>
              <button
                onClick={() =>
                  setShowNewDashboardModal(false)
                }
                className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Group selector */}
            <div className="mb-5">
              <label className="block text-xs text-neutral-500 mb-2">
                Select a group
              </label>
              <div className="relative">
                <select
                  value={selectedGroup}
                  onChange={(e) =>
                    setSelectedGroup(e.target.value)
                  }
                  className="select-field w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-900 appearance-none cursor-pointer outline-none focus:border-neutral-400">
                  {groups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Dashboard type */}
            <div className="mb-6">
              <label className="block text-xs text-neutral-500 mb-2">
                Dashboard on
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setDashboardType("People")}
                  className={`toggle-btn flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg text-sm ${
                    dashboardType === "People"
                      ? "active border-neutral-900 bg-neutral-50"
                      : "border-neutral-200"
                  }`}>
                  <User className="w-4 h-4" />
                  <span>People</span>
                </button>
                <button
                  onClick={() =>
                    setDashboardType("Companies")
                  }
                  className={`toggle-btn flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg text-sm ${
                    dashboardType === "Companies"
                      ? "active border-neutral-900 bg-neutral-50"
                      : "border-neutral-200"
                  }`}>
                  <Building2 className="w-4 h-4" />
                  <span>Companies</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowNewDashboardModal(false)
                }
                className="btn-secondary px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700">
                Cancel
              </button>
              <button
                onClick={handleCreateDashboard}
                className="btn-primary px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium">
                Create dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background preview when modal is open */}
      {showNewDashboardModal && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute left-56 right-0 top-14 bottom-0 p-6 opacity-30">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="border border-neutral-200 rounded-xl bg-white p-4">
                <div className="h-4 w-24 bg-neutral-100 rounded mb-4" />
                <div className="h-48 bg-neutral-50 rounded-lg flex items-end justify-around px-4 pb-4">
                  {[
                    40, 60, 30, 80, 50, 70, 45, 90, 55, 65,
                    75, 85,
                  ].map((h, i) => (
                    <div
                      key={i}
                      className="w-4 bg-neutral-200 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="border border-neutral-200 rounded-xl bg-white p-4">
                <div className="h-4 w-24 bg-neutral-100 rounded mb-4" />
                <div className="h-48 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border-[24px] border-neutral-100 relative">
                    <div
                      className="absolute inset-0 rounded-full border-[24px] border-transparent border-t-neutral-300"
                      style={{
                        transform: "rotate(-45deg)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
