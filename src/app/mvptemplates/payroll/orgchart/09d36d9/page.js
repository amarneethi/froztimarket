"use client";

import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Info,
  Maximize2,
  Minus,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export default function PayrollE5OrgChart() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDropdownOpen, setFilterDropdownOpen] =
    useState(false);
  const [selectedFilter, setSelectedFilter] = useState(
    "Manager and report",
  );
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedEmployee, setSelectedEmployee] =
    useState(null);
  const [expandedNodes, setExpandedNodes] = useState([
    "ceo-1",
    "mgr-1",
    "mgr-2",
    "mgr-3",
    "mgr-4",
    "mgr-5",
  ]);

  // Data
  const filterOptions = [
    "Manager and report",
    "Department",
    "Location",
    "Job title",
  ];

  const employees = [
    {
      id: "ceo-1",
      name: "Frozti",
      title: "Organization",
      department: "",
      avatar: null,
      isOrg: true,
      reports: 7,
      managerId: null,
    },
    {
      id: "mgr-1",
      name: "Emma Tamura",
      title: "Direct Functionality Designer",
      department: "B2B",
      avatar: "ET",
      avatarBg:
        "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
      reports: 12,
      managerId: "ceo-1",
      flag: "🇯🇵",
    },
    {
      id: "mgr-2",
      name: "Brown Thompson",
      title: "Supply Chain Analyst",
      department: "Finance",
      avatar: "BT",
      avatarBg:
        "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
      reports: 7,
      managerId: "ceo-1",
      flag: "🇺🇸",
    },
    {
      id: "mgr-3",
      name: "Olivia Evans",
      title: "Designer",
      department: "Culture",
      avatar: "OE",
      avatarBg:
        "linear-gradient(135deg, #ec4899 0%, #6366f1 100%)",
      reports: 4,
      managerId: "ceo-1",
      flag: "🇺🇸",
      position: "Position (3)",
      departments: [
        "Engineering",
        "Administration / HR / People / Culture",
      ],
      teams: ["Engineers", "Devops"],
      manager: {
        name: "André Fabron",
        title: "Cloud Infrastructure Engineer",
        avatar: "AF",
        avatarBg:
          "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
      },
    },
    {
      id: "mgr-4",
      name: "Chase Dach",
      title: "International Security Associate",
      department: "Internal",
      avatar: "CD",
      avatarBg:
        "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
      reports: 5,
      managerId: "ceo-1",
      flag: "🇺🇸",
    },
    {
      id: "mgr-5",
      name: "Lena Antonis",
      title: "Team Lead",
      department: "Board",
      avatar: "LA",
      avatarBg:
        "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
      reports: 3,
      managerId: "ceo-1",
      flag: "🇬🇷",
    },
    {
      id: "mgr-6",
      name: "Elianore Milnes",
      title: "Marketing Strategy",
      department: "Marketing",
      avatar: "EM",
      avatarBg:
        "linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)",
      reports: 3,
      managerId: "ceo-1",
      flag: "🇬🇧",
    },
    {
      id: "mgr-7",
      name: "Cleveland Reynolds",
      title: "Supply Chain Analyst",
      department: "Payroll",
      avatar: "CR",
      avatarBg:
        "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
      reports: 2,
      managerId: "ceo-1",
      flag: "🇨🇦",
    },
    {
      id: "emp-1",
      name: "Sam Lee",
      title: "Supply Chain Analyst",
      department: "Finance",
      avatar: "SL",
      avatarBg:
        "linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)",
      reports: 0,
      managerId: "mgr-2",
      flag: "🇰🇷",
    },
    {
      id: "emp-2",
      name: "Pamela Moore",
      title: "User Experience Researcher",
      department: "Operations",
      avatar: "PM",
      avatarBg:
        "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
      reports: 0,
      managerId: "mgr-2",
      flag: "🇺🇸",
    },
    {
      id: "emp-3",
      name: "Kira Case",
      title: "Designer",
      department: "Marketing",
      avatar: "KC",
      avatarBg:
        "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
      reports: 0,
      managerId: "mgr-2",
      flag: "🇩🇪",
    },
    {
      id: "emp-4",
      name: "Clemens McLaughlin",
      title: "Cloud Infrastructure Engineer",
      department: "Q&A",
      avatar: "CM",
      avatarBg:
        "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
      reports: 3,
      managerId: "mgr-3",
      flag: "🇺🇸",
    },
  ];

  const hiddenCount = 54;

  // Derived
  const filteredEmployees = searchQuery
    ? employees.filter(
        (emp) =>
          emp.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          emp.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          emp.department
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    : employees;

  const getDirectReports = (managerId) =>
    filteredEmployees.filter(
      (emp) => emp.managerId === managerId,
    );

  const toggleExpanded = (nodeId) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId)
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId],
    );
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) =>
      Math.min(200, Math.max(25, prev + delta)),
    );
  };

  // Employee Card Component
  const EmployeeCard = ({
    employee,
    isSelected,
    onClick,
  }) => {
    const isExpanded = expandedNodes.includes(employee.id);
    const directReports = getDirectReports(employee.id);
    const hasReports =
      directReports.length > 0 || employee.reports > 0;

    return (
      <div className="flex flex-col items-center">
        {/* Card */}
        <div
          onClick={() => onClick(employee)}
          className={`
            relative bg-white rounded-xl border-2 transition-all duration-200 cursor-pointer
            hover:shadow-lg hover:border-stone-300
            ${isSelected ? "border-stone-900 shadow-xl ring-4 ring-stone-900/10" : "border-stone-200 shadow-sm"}
            ${employee.isOrg ? "px-5 py-3" : "px-4 py-3"}
          `}
          style={{
            minWidth: employee.isOrg ? "140px" : "200px",
          }}>
          {employee.isOrg ? (
            <div className="flex items-center gap-2 justify-center">
              <span className="body-font font-semibold text-stone-800">
                {employee.name}
              </span>
              <ChevronDown
                size={16}
                className="text-stone-400"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold body-font"
                  style={{ background: employee.avatarBg }}>
                  {employee.avatar}
                </div>
                {employee.flag && (
                  <span className="absolute -bottom-0.5 -right-0.5 text-xs">
                    {employee.flag}
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="body-font font-semibold text-blue-600 text-sm truncate">
                  {employee.name}
                </p>
                <p className="body-font text-stone-600 text-xs truncate">
                  {employee.title}
                </p>
                <p className="body-font text-stone-400 text-xs">
                  {employee.department}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Reports Toggle */}
        {hasReports && !employee.isOrg && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded(employee.id);
            }}
            className="mt-0 -mb-3 relative z-10 flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-full border border-stone-200 transition-all body-font text-xs text-stone-600 font-medium">
            <span>
              {employee.reports || directReports.length}{" "}
              reports
            </span>
            {isExpanded ? (
              <ChevronUp size={12} />
            ) : (
              <ChevronDown size={12} />
            )}
          </button>
        )}
      </div>
    );
  };

  // Org Tree Level Component
  const OrgTreeLevel = ({ employees, level = 0 }) => {
    if (employees.length === 0) return null;

    return (
      <div className="flex flex-col items-center">
        <div className="flex gap-4 items-start">
          {employees.map((employee, index) => {
            const directReports = getDirectReports(
              employee.id,
            );
            const isExpanded = expandedNodes.includes(
              employee.id,
            );
            const isSelected =
              selectedEmployee?.id === employee.id;

            return (
              <div
                key={employee.id}
                className="flex flex-col items-center">
                {/* Connector Line from Parent */}
                {level > 0 && (
                  <div className="w-px h-8 bg-stone-300" />
                )}

                <EmployeeCard
                  employee={employee}
                  isSelected={isSelected}
                  onClick={setSelectedEmployee}
                />

                {/* Child Connectors */}
                {isExpanded && directReports.length > 0 && (
                  <>
                    <div className="w-px h-8 bg-stone-300" />
                    {directReports.length > 1 && (
                      <div
                        className="h-px bg-stone-300"
                        style={{
                          width: `${Math.max(200, directReports.length * 220 - 20)}px`,
                        }}
                      />
                    )}
                    <OrgTreeLevel
                      employees={directReports}
                      level={level + 1}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Root employees
  const rootOrg = filteredEmployees.find(
    (emp) => emp.isOrg,
  );
  const topLevelManagers = filteredEmployees.filter(
    (emp) => emp.managerId === "ceo-1",
  );

  return (
    <div
      className="min-h-screen w-full bg-stone-100"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap');
        
        .heading-font {
          font-family: 'Fraunces', serif;
        }
        
        .body-font {
          font-family: 'DM Sans', sans-serif;
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .org-chart-container {
          overflow: auto;
          scrollbar-width: thin;
          scrollbar-color: #d6d3d1 transparent;
        }
        
        .org-chart-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .org-chart-container::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .org-chart-container::-webkit-scrollbar-thumb {
          background-color: #d6d3d1;
          border-radius: 4px;
        }
      `}</style>

      {/* Toolbar */}
      <div className="bg-stone-100 border-b border-stone-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search by name"
                className="w-64 pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl body-font text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setFilterDropdownOpen(!filterDropdownOpen)
                }
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl body-font text-sm font-medium text-stone-700 hover:bg-stone-50 transition-all">
                <Users
                  size={16}
                  className="text-stone-500"
                />
                <span>{selectedFilter}</span>
                <ChevronDown
                  size={16}
                  className="text-stone-400"
                />
              </button>
              {filterDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-lg py-2 z-20 fade-in">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedFilter(option);
                        setFilterDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left body-font text-sm hover:bg-stone-50 transition-all ${
                        selectedFilter === option
                          ? "text-stone-900 font-medium"
                          : "text-stone-600"
                      }`}>
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button className="p-2.5 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-all">
              <Maximize2
                size={18}
                className="text-stone-500"
              />
            </button>
          </div>

          {/* Hidden Items Warning */}
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
            <AlertTriangle
              size={16}
              className="text-amber-600"
            />
            <span className="body-font text-amber-700 text-sm font-medium">
              {hiddenCount} items not displayed
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Org Chart Canvas */}
        <div
          className={`flex-1 org-chart-container p-8 transition-all duration-300 ${
            selectedEmployee ? "pr-4" : ""
          }`}>
          <div
            className="min-w-max flex flex-col items-center py-8 transition-transform"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
            }}>
            {/* Root Org */}
            {rootOrg && (
              <div className="flex flex-col items-center">
                <EmployeeCard
                  employee={rootOrg}
                  isSelected={
                    selectedEmployee?.id === rootOrg.id
                  }
                  onClick={setSelectedEmployee}
                />

                {/* Connector to managers */}
                {expandedNodes.includes("ceo-1") &&
                  topLevelManagers.length > 0 && (
                    <>
                      <div className="w-px h-10 bg-stone-300" />
                      <div
                        className="h-px bg-stone-300"
                        style={{
                          width: `${Math.max(200, topLevelManagers.length * 230 - 30)}px`,
                        }}
                      />

                      {/* Manager Level */}
                      <div className="flex gap-6 items-start">
                        {topLevelManagers.map((manager) => {
                          const directReports =
                            getDirectReports(manager.id);
                          const isExpanded =
                            expandedNodes.includes(
                              manager.id,
                            );
                          const isSelected =
                            selectedEmployee?.id ===
                            manager.id;

                          return (
                            <div
                              key={manager.id}
                              className="flex flex-col items-center">
                              <div className="w-px h-10 bg-stone-300" />
                              <EmployeeCard
                                employee={manager}
                                isSelected={isSelected}
                                onClick={
                                  setSelectedEmployee
                                }
                              />

                              {/* Reports Level */}
                              {isExpanded &&
                                directReports.length >
                                  0 && (
                                  <>
                                    <div className="w-px h-8 bg-stone-300 mt-3" />
                                    {directReports.length >
                                      1 && (
                                      <div
                                        className="h-px bg-stone-300"
                                        style={{
                                          width: `${Math.max(200, directReports.length * 230 - 30)}px`,
                                        }}
                                      />
                                    )}
                                    <div className="flex gap-6 items-start">
                                      {directReports.map(
                                        (report) => {
                                          const subReports =
                                            getDirectReports(
                                              report.id,
                                            );
                                          const reportExpanded =
                                            expandedNodes.includes(
                                              report.id,
                                            );

                                          return (
                                            <div
                                              key={
                                                report.id
                                              }
                                              className="flex flex-col items-center">
                                              <div className="w-px h-8 bg-stone-300" />
                                              <EmployeeCard
                                                employee={
                                                  report
                                                }
                                                isSelected={
                                                  selectedEmployee?.id ===
                                                  report.id
                                                }
                                                onClick={
                                                  setSelectedEmployee
                                                }
                                              />

                                              {/* Sub-reports */}
                                              {reportExpanded &&
                                                subReports.length >
                                                  0 && (
                                                  <>
                                                    <div className="w-px h-8 bg-stone-300 mt-3" />
                                                    <div className="flex flex-col gap-4">
                                                      {subReports.map(
                                                        (
                                                          sub,
                                                        ) => (
                                                          <div
                                                            key={
                                                              sub.id
                                                            }
                                                            className="flex items-center">
                                                            <div className="w-4 h-px bg-stone-300" />
                                                            <EmployeeCard
                                                              employee={
                                                                sub
                                                              }
                                                              isSelected={
                                                                selectedEmployee?.id ===
                                                                sub.id
                                                              }
                                                              onClick={
                                                                setSelectedEmployee
                                                              }
                                                            />
                                                          </div>
                                                        ),
                                                      )}
                                                    </div>
                                                  </>
                                                )}
                                            </div>
                                          );
                                        },
                                      )}
                                    </div>
                                  </>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {selectedEmployee && !selectedEmployee.isOrg && (
          <div className="w-96 bg-white border-l border-stone-200 overflow-y-auto slide-in-right">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold body-font"
                    style={{
                      background: selectedEmployee.avatarBg,
                    }}>
                    {selectedEmployee.avatar}
                  </div>
                  <div>
                    <h2 className="heading-font text-xl font-semibold text-stone-900">
                      {selectedEmployee.name}
                    </h2>
                    <p className="body-font text-stone-500">
                      {selectedEmployee.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <X size={20} className="text-stone-500" />
                </button>
              </div>

              {/* View Profile Link */}
              <button className="flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-lg body-font text-sm text-stone-700 hover:bg-stone-50 transition-all mb-6">
                <span>View full profile</span>
                <ExternalLink size={14} />
              </button>

              {/* Organization Position Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="body-font font-semibold text-stone-900">
                    Organization position and role
                  </h3>
                  <button className="px-3 py-1.5 border border-stone-200 rounded-lg body-font text-sm text-stone-600 hover:bg-stone-50 transition-all">
                    Edit
                  </button>
                </div>

                <div className="space-y-0 border border-stone-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-stone-50 border-b border-stone-200">
                    <span className="body-font text-stone-500 text-sm">
                      Position
                    </span>
                    <span className="body-font text-stone-700 text-sm">
                      {selectedEmployee.position ||
                        "Position (1)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200">
                    <span className="body-font text-stone-500 text-sm">
                      Department
                    </span>
                    <span className="body-font text-blue-600 text-sm font-medium">
                      {selectedEmployee.departments?.[0] ||
                        selectedEmployee.department ||
                        "Engineering"}
                    </span>
                  </div>
                  {selectedEmployee.departments?.length >
                    1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200">
                      <span className="body-font text-stone-500 text-sm">
                        Department
                      </span>
                      <span className="body-font text-blue-600 text-sm font-medium text-right">
                        {selectedEmployee.departments[1]}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200">
                    <span className="body-font text-stone-500 text-sm">
                      Teams
                    </span>
                    <span className="body-font text-blue-600 text-sm font-medium">
                      {selectedEmployee.teams?.join(
                        " / ",
                      ) || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="body-font text-stone-500 text-sm">
                      Additional role
                    </span>
                    <div className="flex items-center gap-2 text-stone-400">
                      <Info size={14} />
                      <span className="body-font text-sm">
                        Not assigned
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manager Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="body-font font-semibold text-stone-900">
                    Manager
                  </h3>
                  <button className="px-3 py-1.5 border border-stone-200 rounded-lg body-font text-sm text-stone-600 hover:bg-stone-50 transition-all">
                    Edit
                  </button>
                </div>

                {selectedEmployee.manager ? (
                  <div className="flex items-center gap-3 p-4 border border-stone-200 rounded-xl">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold body-font"
                      style={{
                        background:
                          selectedEmployee.manager.avatarBg,
                      }}>
                      {selectedEmployee.manager.avatar}
                    </div>
                    <div>
                      <p className="body-font font-medium text-blue-600 text-sm">
                        {selectedEmployee.manager.name}
                      </p>
                      <p className="body-font text-stone-500 text-xs">
                        {selectedEmployee.manager.title}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-4 bg-stone-50 rounded-xl text-stone-500">
                    <Info size={16} />
                    <span className="body-font text-sm">
                      No manager assigned
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white border border-stone-200 rounded-2xl shadow-lg px-4 py-2">
        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
          <Maximize2 size={18} className="text-stone-500" />
        </button>
        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
          <Users size={18} className="text-stone-500" />
        </button>
        <div className="w-px h-6 bg-stone-200 mx-2" />
        <button
          onClick={() => handleZoom(-10)}
          className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
          <Minus size={18} className="text-stone-500" />
        </button>
        <span className="body-font text-stone-700 text-sm font-medium w-12 text-center">
          {zoomLevel}%
        </span>
        <button
          onClick={() => handleZoom(10)}
          className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
          <Plus size={18} className="text-stone-500" />
        </button>
        <div className="w-px h-6 bg-stone-200 mx-2" />
        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
          <Settings size={18} className="text-stone-500" />
        </button>
        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
          <Download size={18} className="text-stone-500" />
        </button>
      </div>

      {/* Floating AI Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 transition-all hover:scale-105">
        <Sparkles size={22} className="text-white" />
      </button>
    </div>
  );
}
