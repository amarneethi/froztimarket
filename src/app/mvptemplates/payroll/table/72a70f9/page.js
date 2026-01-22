"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Info,
  Maximize2,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";

export default function PayrollE5PeopleTable() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterPanelOpen, setIsFilterPanelOpen] =
    useState(false);
  const [expandedFilters, setExpandedFilters] = useState(
    [],
  );
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [
    selectedWorkerStatuses,
    setSelectedWorkerStatuses,
  ] = useState([]);
  const [selectedWorkerTypes, setSelectedWorkerTypes] =
    useState([]);
  const [selectedJobTitles, setSelectedJobTitles] =
    useState([]);
  const [selectedContractTypes, setSelectedContractTypes] =
    useState([]);
  const [
    selectedContractStatuses,
    setSelectedContractStatuses,
  ] = useState([]);
  const [selectedCountries, setSelectedCountries] =
    useState([]);
  const [filterSearchQuery, setFilterSearchQuery] =
    useState("");

  // Data
  const [people] = useState([
    {
      id: 1,
      name: "Adriana Costa",
      jobTitle: "Regional Web Administrator",
      country: "Taiwan",
      countryFlag: "🇹🇼",
      group: "Wayne Enterprise Global",
      workerType: "Person without a contract",
      workerStatus: "Active",
      startDate: "Jul 4th 2025",
      avatarBg:
        "bg-gradient-to-br from-pink-400 to-purple-500",
      initials: "",
      hasImage: true,
    },
    {
      id: 2,
      name: "Alverta Gauvin",
      jobTitle: "Designer",
      country: "Japan",
      countryFlag: "🇯🇵",
      group: "JP - group",
      workerType: "Direct Employee Payroll",
      workerStatus: "Active",
      startDate: "Nov 1st 2025",
      avatarBg: "bg-stone-600",
      initials: "AG",
      hasImage: false,
    },
    {
      id: 3,
      name: "Anna Olsson",
      jobTitle: "Manager",
      country: "United States",
      countryFlag: "🇺🇸",
      group: "Wayne Enterprise Team",
      workerType: "PEO employee",
      workerStatus: "Active",
      startDate: "Nov 24th 2025",
      avatarBg:
        "bg-gradient-to-br from-pink-300 to-purple-400",
      initials: "",
      hasImage: true,
    },
    {
      id: 4,
      name: "Bernardo Brakus",
      jobTitle: "Supply Chain Analyst",
      country: "United States",
      countryFlag: "🇺🇸",
      group: "Wayne Enterprise Global",
      workerType: "Contractor",
      workerStatus: "Active",
      startDate: "Aug 4th 2025",
      avatarBg: "bg-indigo-600",
      initials: "BB",
      hasImage: false,
    },
    {
      id: 5,
      name: "Berny Humbie",
      jobTitle: "Software Engineer",
      country: "United States",
      countryFlag: "🇺🇸",
      group: "US - Payroll Connect - group",
      workerType: "Direct Employee Payroll",
      workerStatus: "Active",
      startDate: "Nov 1st 2025",
      avatarBg:
        "bg-gradient-to-br from-amber-300 to-orange-400",
      initials: "",
      hasImage: true,
    },
    {
      id: 6,
      name: "Billie Pfeffer",
      jobTitle: "Legal Assistant",
      country: "United States",
      countryFlag: "🇺🇸",
      group: "Wayne Enterprise Team",
      workerType: "Direct Employee Payroll",
      workerStatus: "Invited",
      startDate: "Jan 1st 2025",
      avatarBg: "bg-violet-600",
      initials: "BP",
      hasImage: false,
    },
    {
      id: 7,
      name: "Blanca Doyle",
      jobTitle: "Digital Marketing Strategist",
      country: "Svalbard and Jan Mayen",
      countryFlag: "🇸🇯",
      group: "Wayne Enterprise Global",
      workerType: "Direct Employee",
      workerStatus: "Ready to start",
      startDate: "Feb 4th 2025",
      avatarBg:
        "bg-gradient-to-br from-pink-400 to-rose-500",
      initials: "",
      hasImage: true,
    },
    {
      id: 8,
      name: "Bobby Armstrong",
      jobTitle: "Supply Chain Analyst",
      country: "Ecuador",
      countryFlag: "🇪🇨",
      group: "Wayne Enterprise Global",
      workerType: "Direct Employee",
      workerStatus: "Onboarding",
      startDate: "Feb 4th 2025",
      avatarBg:
        "bg-gradient-to-br from-teal-300 to-cyan-400",
      initials: "",
      hasImage: true,
    },
    {
      id: 9,
      name: "Candie Shropsheir",
      jobTitle: "COO",
      country: "Japan",
      countryFlag: "🇯🇵",
      group: "JP - group",
      workerType: "Direct Employee Payroll",
      workerStatus: "Active",
      startDate: "Nov 1st 2025",
      avatarBg:
        "bg-gradient-to-br from-fuchsia-400 to-pink-500",
      initials: "",
      hasImage: true,
    },
    {
      id: 10,
      name: "Frasier Belvin",
      jobTitle: "COO",
      country: "Japan",
      countryFlag: "🇯🇵",
      group: "JP - group",
      workerType: "Direct Employee Payroll",
      workerStatus: "Active",
      startDate: "Nov 1st 2025",
      avatarBg:
        "bg-gradient-to-br from-rose-400 to-pink-500",
      initials: "",
      hasImage: true,
    },
  ]);

  const filterOptions = {
    groups: [
      "COR - client team",
      "JP - group",
      "US - group",
      "US - Payroll Connect - group",
      "Wayne Enterprise Global",
      "Wayne Enterprise PEO",
      "Wayne Enterprise Team",
    ],
    workerStatuses: [
      "Active",
      "Invited",
      "Ready to start",
      "Onboarding",
      "Offboarding",
      "Inactive",
    ],
    workerTypes: [
      "Direct Employee",
      "Direct Employee Payroll",
      "PEO employee",
      "Contractor",
      "Person without a contract",
    ],
    jobTitles: [
      "Designer",
      "Manager",
      "Software Engineer",
      "Supply Chain Analyst",
      "Legal Assistant",
      "Digital Marketing Strategist",
      "COO",
      "Regional Web Administrator",
      "SEO Specialist",
      "Team Lead",
    ],
    contractTypes: [
      "Full-time",
      "Part-time",
      "Fixed-term",
      "Indefinite",
    ],
    contractStatuses: [
      "Active",
      "Pending",
      "Expired",
      "Terminated",
    ],
    countries: [
      "Taiwan",
      "Japan",
      "United States",
      "Ecuador",
      "Svalbard and Jan Mayen",
    ],
  };

  const frequentFilters = [
    "Group",
    "Worker status",
    "Worker type",
    "Job title",
    "Contract type",
  ];
  const otherFilters = [
    "Contract status",
    "Country",
    "Currency",
    "Entity",
    "Event",
  ];

  // Derived
  const activeFilterCount =
    selectedGroups.length +
    selectedWorkerStatuses.length +
    selectedWorkerTypes.length +
    selectedJobTitles.length +
    selectedContractTypes.length +
    selectedContractStatuses.length +
    selectedCountries.length;

  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      searchQuery === "" ||
      person.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      person.jobTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesGroup =
      selectedGroups.length === 0 ||
      selectedGroups.includes(person.group);
    const matchesWorkerStatus =
      selectedWorkerStatuses.length === 0 ||
      selectedWorkerStatuses.includes(person.workerStatus);
    const matchesWorkerType =
      selectedWorkerTypes.length === 0 ||
      selectedWorkerTypes.includes(person.workerType);
    const matchesCountry =
      selectedCountries.length === 0 ||
      selectedCountries.includes(person.country);

    return (
      matchesSearch &&
      matchesGroup &&
      matchesWorkerStatus &&
      matchesWorkerType &&
      matchesCountry
    );
  });

  // Handlers
  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((f) => f !== filterName)
        : [...prev, filterName],
    );
    setFilterSearchQuery("");
  };

  const getFilterOptions = (filterName) => {
    switch (filterName) {
      case "Group":
        return filterOptions.groups;
      case "Worker status":
        return filterOptions.workerStatuses;
      case "Worker type":
        return filterOptions.workerTypes;
      case "Job title":
        return filterOptions.jobTitles;
      case "Contract type":
        return filterOptions.contractTypes;
      case "Contract status":
        return filterOptions.contractStatuses;
      case "Country":
        return filterOptions.countries;
      default:
        return [];
    }
  };

  const getSelectedForFilter = (filterName) => {
    switch (filterName) {
      case "Group":
        return selectedGroups;
      case "Worker status":
        return selectedWorkerStatuses;
      case "Worker type":
        return selectedWorkerTypes;
      case "Job title":
        return selectedJobTitles;
      case "Contract type":
        return selectedContractTypes;
      case "Contract status":
        return selectedContractStatuses;
      case "Country":
        return selectedCountries;
      default:
        return [];
    }
  };

  const toggleFilterOption = (filterName, option) => {
    const setters = {
      Group: setSelectedGroups,
      "Worker status": setSelectedWorkerStatuses,
      "Worker type": setSelectedWorkerTypes,
      "Job title": setSelectedJobTitles,
      "Contract type": setSelectedContractTypes,
      "Contract status": setSelectedContractStatuses,
      Country: setSelectedCountries,
    };

    const setter = setters[filterName];
    if (setter) {
      setter((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option],
      );
    }
  };

  const resetFilter = (filterName) => {
    const setters = {
      Group: setSelectedGroups,
      "Worker status": setSelectedWorkerStatuses,
      "Worker type": setSelectedWorkerTypes,
      "Job title": setSelectedJobTitles,
      "Contract type": setSelectedContractTypes,
      "Contract status": setSelectedContractStatuses,
      Country: setSelectedCountries,
    };

    const setter = setters[filterName];
    if (setter) {
      setter([]);
    }
  };

  const resetAllFilters = () => {
    setSelectedGroups([]);
    setSelectedWorkerStatuses([]);
    setSelectedWorkerTypes([]);
    setSelectedJobTitles([]);
    setSelectedContractTypes([]);
    setSelectedContractStatuses([]);
    setSelectedCountries([]);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Invited":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Ready to start":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Onboarding":
        return "bg-violet-50 text-violet-700 border-violet-200";
      case "Offboarding":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Inactive":
        return "bg-stone-100 text-stone-600 border-stone-200";
      default:
        return "bg-stone-100 text-stone-600 border-stone-200";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500";
      case "Invited":
        return "bg-sky-500";
      case "Ready to start":
        return "bg-amber-500";
      case "Onboarding":
        return "bg-violet-500";
      case "Offboarding":
        return "bg-orange-500";
      case "Inactive":
        return "bg-stone-400";
      default:
        return "bg-stone-400";
    }
  };

  // Filter chip buttons for toolbar
  const filterChips = [
    {
      name: "Group",
      selected: selectedGroups,
      count: selectedGroups.length,
    },
    {
      name: "Worker status",
      selected: selectedWorkerStatuses,
      count: selectedWorkerStatuses.length,
    },
    {
      name: "Worker type",
      selected: selectedWorkerTypes,
      count: selectedWorkerTypes.length,
    },
    {
      name: "Job title",
      selected: selectedJobTitles,
      count: selectedJobTitles.length,
    },
    {
      name: "Contract type",
      selected: selectedContractTypes,
      count: selectedContractTypes.length,
    },
    {
      name: "Contract status",
      selected: selectedContractStatuses,
      count: selectedContractStatuses.length,
    },
    {
      name: "Country",
      selected: selectedCountries,
      count: selectedCountries.length,
    },
  ];

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
        
        .fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .table-row:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
        
        .filter-chip:hover {
          background-color: #f5f5f4;
        }
        
        .filter-chip-active {
          background-color: #e7e5e4;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #d6d3d1;
          border-radius: 3px;
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="heading-font text-4xl font-semibold text-stone-900 tracking-tight">
            People
          </h1>
          <button className="flex items-center gap-2 px-5 py-3 bg-stone-900 text-white rounded-xl body-font font-medium hover:bg-stone-800 transition-all duration-200 shadow-lg shadow-stone-900/20">
            <Plus size={18} />
            <span>Add people</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3 flex-wrap">
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
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all body-font text-stone-800 placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter toggle button */}
            <button
              onClick={() => setIsFilterPanelOpen(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all body-font ${
                activeFilterCount > 0
                  ? "bg-stone-100 border-stone-300 text-stone-800"
                  : "border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}>
              <SlidersHorizontal size={16} />
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 bg-purple-700 text-white text-xs font-medium rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Filter chips */}
            {filterChips.map((chip) => (
              <button
                key={chip.name}
                onClick={() => setIsFilterPanelOpen(true)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all body-font text-sm ${
                  chip.count > 0
                    ? "bg-stone-100 border-stone-300 text-stone-800 filter-chip-active"
                    : "border-stone-200 text-stone-600 filter-chip"
                }`}>
                <span>{chip.name}</span>
                {chip.count > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 bg-purple-700 text-white text-xs font-medium rounded-full">
                    {chip.count}
                  </span>
                )}
                <ChevronDown
                  size={14}
                  className="text-stone-400"
                />
              </button>
            ))}

            <div className="flex-1" />

            {/* Right side buttons */}
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all body-font text-sm">
              <FileText size={16} />
              <span>View as report</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all body-font text-sm">
              Configure columns
            </button>
            <button className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all">
              <MoreVertical size={18} />
            </button>
            <button className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all">
              <Maximize2 size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          {/* Table header info */}
          <div className="px-6 py-4 border-b border-stone-100">
            <p className="body-font text-stone-500 text-sm">
              Total {filteredPeople.length}{" "}
              {filteredPeople.length === 1
                ? "person"
                : "people"}
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left px-6 py-4 body-font text-stone-500 font-medium text-sm w-[280px]">
                    Person
                  </th>
                  <th className="text-left px-6 py-4 body-font text-stone-500 font-medium text-sm w-[160px]">
                    Country
                  </th>
                  <th className="text-left px-6 py-4 body-font text-stone-500 font-medium text-sm w-[200px]">
                    Group
                  </th>
                  <th className="text-left px-6 py-4 body-font text-stone-500 font-medium text-sm w-[200px]">
                    Worker type
                  </th>
                  <th className="text-left px-6 py-4 body-font text-stone-500 font-medium text-sm w-[140px]">
                    <div className="flex items-center gap-1">
                      Worker status
                      <Info
                        size={14}
                        className="text-stone-400"
                      />
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 body-font text-stone-500 font-medium text-sm w-[140px]">
                    <div className="flex items-center gap-1">
                      Start date
                      <Info
                        size={14}
                        className="text-stone-400"
                      />
                    </div>
                  </th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPeople.map((person, index) => (
                  <tr
                    key={person.id}
                    className="table-row border-b border-stone-50 last:border-0 transition-colors cursor-pointer"
                    style={{
                      animationDelay: `${index * 0.03}s`,
                    }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${person.avatarBg}`}>
                          {person.initials}
                        </div>
                        <div>
                          <p className="body-font font-medium text-slate-800 hover:text-pink-700 cursor-pointer">
                            {person.name}
                          </p>
                          <p className="body-font text-stone-500 text-sm">
                            {person.jobTitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {person.countryFlag}
                        </span>
                        <span className="body-font text-stone-700 text-sm truncate max-w-[120px]">
                          {person.country}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="body-font text-stone-700 text-sm truncate block max-w-[180px]">
                        {person.group}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="body-font text-stone-700 text-sm truncate block max-w-[180px]">
                        {person.workerType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                          person.workerStatus,
                        )}`}>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${getStatusDot(person.workerStatus)}`}></span>
                        {person.workerStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="body-font text-stone-700 text-sm">
                        {person.startDate}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="p-2 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredPeople.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="body-font text-stone-500 text-lg">
                No people found matching your filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-4 body-font text-pink-600 hover:text-pink-700 font-medium">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Panel Overlay */}
      {isFilterPanelOpen && (
        <div className="fixed inset-0 z-50 fade-in">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsFilterPanelOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl slide-in overflow-hidden flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <h2 className="heading-font text-2xl font-semibold text-stone-900">
                  Select filters below
                </h2>
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center w-6 h-6 bg-purple-700 text-white text-xs font-medium rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
              {/* Frequent Filters */}
              <div className="mb-6">
                <p className="body-font text-stone-400 text-sm font-medium mb-3">
                  Frequent
                </p>
                <div className="space-y-1">
                  {frequentFilters.map((filterName) => {
                    const isExpanded =
                      expandedFilters.includes(filterName);
                    const options =
                      getFilterOptions(filterName);
                    const selected =
                      getSelectedForFilter(filterName);
                    const filteredOptions =
                      filterSearchQuery
                        ? options.filter((opt) =>
                            opt
                              .toLowerCase()
                              .includes(
                                filterSearchQuery.toLowerCase(),
                              ),
                          )
                        : options;

                    return (
                      <div
                        key={filterName}
                        className="border-b border-stone-100 last:border-0">
                        <div
                          role="button"
                          onClick={() =>
                            toggleFilter(filterName)
                          }
                          className="w-full flex items-center justify-between py-4 text-left body-font text-stone-800 font-medium hover:text-stone-900 transition-colors">
                          <div className="flex items-center gap-2">
                            <span>{filterName}</span>
                            {selected.length > 0 && (
                              <span className="flex items-center justify-center w-5 h-5 bg-purple-700 text-white text-xs font-medium rounded-full">
                                {selected.length}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {selected.length > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resetFilter(filterName);
                                }}
                                className="px-3 py-1 text-xs font-medium text-stone-500 bg-stone-100 rounded-md hover:bg-stone-200 transition-colors">
                                Reset
                              </button>
                            )}
                            {isExpanded ? (
                              <ChevronUp
                                size={18}
                                className="text-stone-400"
                              />
                            ) : (
                              <ChevronDown
                                size={18}
                                className="text-stone-400"
                              />
                            )}
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="pb-4 fade-in">
                            {/* Filter search */}
                            <div className="relative mb-3">
                              <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                              />
                              <input
                                type="text"
                                value={filterSearchQuery}
                                onChange={(e) =>
                                  setFilterSearchQuery(
                                    e.target.value,
                                  )
                                }
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all body-font text-stone-800 placeholder:text-stone-400 text-sm"
                              />
                            </div>

                            {/* Select all */}
                            <button
                              onClick={() => {
                                if (
                                  selected.length ===
                                  options.length
                                ) {
                                  resetFilter(filterName);
                                } else {
                                  const setter = {
                                    Group:
                                      setSelectedGroups,
                                    "Worker status":
                                      setSelectedWorkerStatuses,
                                    "Worker type":
                                      setSelectedWorkerTypes,
                                    "Job title":
                                      setSelectedJobTitles,
                                    "Contract type":
                                      setSelectedContractTypes,
                                  }[filterName];
                                  if (setter)
                                    setter(options);
                                }
                              }}
                              className="w-full flex items-center gap-3 py-2.5 text-left body-font text-stone-700 hover:bg-stone-50 rounded-lg px-2 transition-colors">
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                  selected.length > 0 &&
                                  selected.length <
                                    options.length
                                    ? "bg-stone-900 border-stone-900"
                                    : selected.length ===
                                        options.length
                                      ? "bg-stone-900 border-stone-900"
                                      : "border-stone-300"
                                }`}>
                                {selected.length > 0 &&
                                  selected.length <
                                    options.length && (
                                    <div className="w-2 h-0.5 bg-white rounded-full" />
                                  )}
                                {selected.length ===
                                  options.length && (
                                  <Check
                                    size={12}
                                    className="text-white"
                                  />
                                )}
                              </div>
                              <span className="font-medium">
                                Select all
                              </span>
                            </button>

                            {/* Options */}
                            <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
                              {filteredOptions.map(
                                (option) => (
                                  <button
                                    key={option}
                                    onClick={() =>
                                      toggleFilterOption(
                                        filterName,
                                        option,
                                      )
                                    }
                                    className="w-full flex items-center gap-3 py-2.5 text-left body-font text-stone-700 hover:bg-stone-50 rounded-lg px-2 transition-colors">
                                    <div
                                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                        selected.includes(
                                          option,
                                        )
                                          ? "bg-stone-900 border-stone-900"
                                          : "border-stone-300"
                                      }`}>
                                      {selected.includes(
                                        option,
                                      ) && (
                                        <Check
                                          size={12}
                                          className="text-white"
                                        />
                                      )}
                                    </div>
                                    <span>{option}</span>
                                  </button>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Other Filters */}
              <div>
                <p className="body-font text-stone-400 text-sm font-medium mb-3">
                  Other
                </p>
                <div className="space-y-1">
                  {otherFilters.map((filterName) => {
                    const isExpanded =
                      expandedFilters.includes(filterName);
                    const options =
                      getFilterOptions(filterName);
                    const selected =
                      getSelectedForFilter(filterName);

                    return (
                      <div
                        key={filterName}
                        className="border-b border-stone-100 last:border-0">
                        <button
                          onClick={() =>
                            toggleFilter(filterName)
                          }
                          className="w-full flex items-center justify-between py-4 text-left body-font text-stone-800 font-medium hover:text-stone-900 transition-colors">
                          <div className="flex items-center gap-2">
                            <span>{filterName}</span>
                            {selected.length > 0 && (
                              <span className="flex items-center justify-center w-5 h-5 bg-purple-700 text-white text-xs font-medium rounded-full">
                                {selected.length}
                              </span>
                            )}
                          </div>
                          {isExpanded ? (
                            <ChevronUp
                              size={18}
                              className="text-stone-400"
                            />
                          ) : (
                            <ChevronDown
                              size={18}
                              className="text-stone-400"
                            />
                          )}
                        </button>

                        {isExpanded &&
                          options.length > 0 && (
                            <div className="pb-4 fade-in">
                              <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
                                {options.map((option) => (
                                  <button
                                    key={option}
                                    onClick={() =>
                                      toggleFilterOption(
                                        filterName,
                                        option,
                                      )
                                    }
                                    className="w-full flex items-center gap-3 py-2.5 text-left body-font text-stone-700 hover:bg-stone-50 rounded-lg px-2 transition-colors">
                                    <div
                                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                        selected.includes(
                                          option,
                                        )
                                          ? "bg-stone-900 border-stone-900"
                                          : "border-stone-300"
                                      }`}>
                                      {selected.includes(
                                        option,
                                      ) && (
                                        <Check
                                          size={12}
                                          className="text-white"
                                        />
                                      )}
                                    </div>
                                    <span>{option}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="px-6 py-4 border-t border-stone-100 bg-white flex items-center justify-between">
              <button
                onClick={resetAllFilters}
                className="px-4 py-2.5 body-font text-stone-600 font-medium hover:text-stone-800 transition-colors">
                Reset all
              </button>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-xl body-font font-medium hover:bg-stone-800 transition-all duration-200 shadow-lg shadow-stone-900/20">
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
