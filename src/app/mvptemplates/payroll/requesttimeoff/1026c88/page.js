"use client";

import {
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  MessageCircle,
  Palmtree,
  Plus,
  Upload,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

export default function PayrollE5TimeOff() {
  // State
  const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] =
    useState(false);
  const [selectedType, setSelectedType] =
    useState("Vacation - TW");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [description, setDescription] = useState("");
  const [showTypeDropdown, setShowTypeDropdown] =
    useState(false);
  const [balanceExpanded, setBalanceExpanded] =
    useState(false);
  const [timeOffRequests, setTimeOffRequests] = useState(
    [],
  );
  const [vacationDaysAvailable, setVacationDaysAvailable] =
    useState(3);

  // Data
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const timeOffTypes = [
    { id: "vacation-tw", label: "Vacation - TW" },
    { id: "sick-leave", label: "Sick Leave" },
    { id: "personal-leave", label: "Personal Leave" },
    { id: "bereavement", label: "Bereavement Leave" },
  ];

  const publicHolidays = [
    {
      date: "2025-01-01",
      name: "Republic Day",
      country: "TW",
    },
    {
      date: "2025-01-29",
      name: "Chinese New Year's Eve",
      country: "TW",
    },
    {
      date: "2025-01-30",
      name: "Chinese New Year",
      country: "TW",
    },
    {
      date: "2025-02-28",
      name: "Peace Memorial Day",
      country: "TW",
    },
    {
      date: "2025-04-04",
      name: "Children's Day",
      country: "TW",
    },
    {
      date: "2025-04-05",
      name: "Tomb Sweeping Day",
      country: "TW",
    },
    {
      date: "2025-05-01",
      name: "Labour Day",
      country: "TW",
    },
    {
      date: "2025-06-02",
      name: "Dragon Boat Festival",
      country: "TW",
    },
    {
      date: "2025-09-29",
      name: "Mid-Autumn Festival",
      country: "TW",
    },
    {
      date: "2025-10-10",
      name: "National Day",
      country: "TW",
    },
  ];

  // Derived
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) =>
    new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(
      currentMonth,
      currentYear,
    );
    const firstDay = getFirstDayOfMonth(
      currentMonth,
      currentYear,
    );
    const days = [];

    // Previous month days
    const prevMonth =
      currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear =
      currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(
      prevMonth,
      prevYear,
    );

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
        date: `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(daysInPrevMonth - i).padStart(2, "0")}`,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
      });
    }

    // Next month days
    const nextMonth =
      currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear =
      currentMonth === 11 ? currentYear + 1 : currentYear;
    const remainingDays = 42 - days.length;

    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        date: `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const isToday = (date) => {
    const today = new Date();
    const checkDate = new Date(date);
    return (
      today.toDateString() === checkDate.toDateString()
    );
  };

  const getHolidayForDate = (date) => {
    return publicHolidays.find((h) => h.date === date);
  };

  const calculateDaysBetween = (from, to) => {
    if (!from || !to) return 0;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = Math.abs(toDate - fromDate);
    const diffDays =
      Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const requestedDays = calculateDaysBetween(
    fromDate,
    toDate,
  );
  const availableAfterRequest = Math.max(
    0,
    vacationDaysAvailable - requestedDays,
  );

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
            ? "rd"
            : "th";
    return `${months[date.getMonth()]} ${day}${suffix}`;
  };

  // Handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const handleSubmitTimeOff = () => {
    if (fromDate && toDate) {
      const newRequest = {
        id: Date.now(),
        from: fromDate,
        to: toDate,
        type: selectedType,
        days: requestedDays,
        status: "Approved",
        approvedBy: "Marneethi A",
        description: description,
      };
      setTimeOffRequests([...timeOffRequests, newRequest]);
      setVacationDaysAvailable(availableAfterRequest);
      setShowAddModal(false);
      setShowSuccessModal(true);
      setFromDate("");
      setToDate("");
      setDescription("");
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-stone-50"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }
        
        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .modal-enter {
          animation: modalEnter 0.25s ease-out forwards;
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
        
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .bounce-once {
          animation: bounce 0.6s ease-in-out;
        }
        
        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; }
        .stagger-4 { animation-delay: 0.2s; }
        
        .gradient-header {
          background: linear-gradient(180deg, #f5f0ff 0%, #faf9fb 100%);
        }
        
        .calendar-cell:hover {
          background: #f5f5f4;
        }
        
        .holiday-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
        }
        
        .upload-zone {
          border: 2px dashed #0ea5e9;
          background: #f0f9ff;
        }
        
        .upload-zone:hover {
          background: #e0f2fe;
          border-color: #0284c7;
        }
      `}</style>

      {/* Header with gradient */}
      <div className="gradient-header border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm body-font text-stone-600 mb-4">
            <User size={16} className="text-stone-400" />
            <span>Adriana Costa</span>
            <span className="text-stone-300">/</span>
            <div className="flex items-center gap-1">
              <span>Time off</span>
              <ChevronDown
                size={14}
                className="text-stone-400"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="heading-font text-3xl font-semibold text-stone-900 tracking-tight">
              Time off
            </h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm shadow-sm">
                <Calendar size={16} />
                <span>Team calendar</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl body-font font-medium text-sm hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20">
                <Plus size={16} />
                <span>Add time off</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            {/* Time off balances */}
            <div
              className="card-section p-5 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.05s",
              }}>
              <h2 className="body-font font-semibold text-stone-900 mb-4">
                Time off balances
              </h2>
              <div className="border border-stone-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="body-font font-medium text-stone-800">
                      Vacation - TW
                    </span>
                    <Info
                      size={14}
                      className="text-stone-400"
                    />
                  </div>
                  <span className="body-font font-semibold text-stone-900">
                    {vacationDaysAvailable} days available
                  </span>
                </div>
                <button
                  onClick={() =>
                    setBalanceExpanded(!balanceExpanded)
                  }
                  className="flex items-center gap-1 text-blue-600 text-sm body-font hover:text-blue-700 transition-colors">
                  <span>View details</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${balanceExpanded ? "rotate-180" : ""}`}
                  />
                </button>
                {balanceExpanded && (
                  <div className="mt-3 pt-3 border-t border-stone-100 space-y-2">
                    <div className="flex justify-between text-sm body-font">
                      <span className="text-stone-500">
                        Annual allocation
                      </span>
                      <span className="text-stone-700">
                        15 days
                      </span>
                    </div>
                    <div className="flex justify-between text-sm body-font">
                      <span className="text-stone-500">
                        Used
                      </span>
                      <span className="text-stone-700">
                        {15 - vacationDaysAvailable} days
                      </span>
                    </div>
                    <div className="flex justify-between text-sm body-font">
                      <span className="text-stone-500">
                        Pending
                      </span>
                      <span className="text-stone-700">
                        0 days
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <button className="w-full mt-4 py-2.5 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                View all
              </button>
            </div>

            {/* Time off requests */}
            <div
              className="card-section p-5 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.1s",
              }}>
              <h2 className="body-font font-semibold text-stone-900 mb-4">
                Time off requests
              </h2>
              {timeOffRequests.length === 0 ? (
                <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl">
                  <Info
                    size={16}
                    className="text-stone-400"
                  />
                  <span className="body-font text-stone-500 text-sm">
                    No time off requested yet
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  {timeOffRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Palmtree
                            size={18}
                            className="text-amber-600"
                          />
                        </div>
                        <div className="flex-1">
                          <a
                            href="#"
                            className="body-font font-medium text-blue-600 text-sm hover:underline">
                            {formatDateForDisplay(
                              request.from,
                            )}{" "}
                            -{" "}
                            {formatDateForDisplay(
                              request.to,
                            )}{" "}
                            {new Date(
                              request.to,
                            ).getFullYear()}
                          </a>
                          <p className="body-font text-stone-500 text-xs mt-0.5">
                            {request.type} · {request.days}{" "}
                            days · Approved by{" "}
                            {request.approvedBy}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="body-font text-green-700 text-xs font-medium">
                            Approved
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Public holidays */}
            <div
              className="card-section p-5 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.15s",
              }}>
              <h2 className="body-font font-semibold text-stone-900 mb-4">
                Public holidays
              </h2>
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full flex flex-col">
                      <div className="h-1/3 bg-blue-600" />
                      <div className="h-1/3 bg-white" />
                      <div className="h-1/3 bg-red-500" />
                    </div>
                  </div>
                  <div>
                    <p className="body-font font-medium text-stone-800 text-sm">
                      Taiwan public holidays
                    </p>
                    <p className="body-font text-stone-500 text-xs">
                      {publicHolidays.length} holidays in
                      2025
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-stone-200 rounded-lg bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="lg:col-span-2">
            <div
              className="card-section p-6 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.1s",
              }}>
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToday}
                    className="px-4 py-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                    Today
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                      <ChevronLeft
                        size={18}
                        className="text-stone-500"
                      />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                      <ChevronRight
                        size={18}
                        className="text-stone-500"
                      />
                    </button>
                  </div>
                  <h3 className="heading-font text-xl font-semibold text-stone-900">
                    {months[currentMonth]} {currentYear}
                  </h3>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-stone-100 rounded-xl overflow-hidden border border-stone-100">
                {/* Day Headers */}
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="bg-stone-50 py-3 px-2 text-center">
                    <span className="body-font font-medium text-stone-500 text-sm">
                      {day}
                    </span>
                  </div>
                ))}

                {/* Calendar Days */}
                {calendarDays.map((day, index) => {
                  const holiday = getHolidayForDate(
                    day.date,
                  );
                  const today = isToday(day.date);

                  return (
                    <div
                      key={index}
                      className={`bg-white min-h-[100px] p-2 calendar-cell transition-colors ${
                        !day.currentMonth
                          ? "opacity-40"
                          : ""
                      }`}>
                      <div className="flex items-start justify-between">
                        <span
                          className={`body-font text-sm ${
                            today
                              ? "w-7 h-7 flex items-center justify-center rounded-full bg-stone-900 text-white font-semibold"
                              : day.currentMonth
                                ? "text-stone-700"
                                : "text-stone-400"
                          }`}>
                          {day.day === 1 && day.currentMonth
                            ? `${day.day} ${months[currentMonth].slice(0, 3)}`
                            : day.day}
                        </span>
                      </div>
                      {holiday && (
                        <div className="mt-2 flex items-center gap-1.5 px-2 py-1.5 bg-red-50 rounded-lg">
                          <div className="w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <div className="w-full h-full flex flex-col">
                              <div className="h-1/3 bg-blue-600" />
                              <div className="h-1/3 bg-white" />
                              <div className="h-1/3 bg-red-500" />
                            </div>
                          </div>
                          <span className="body-font text-xs text-stone-700 truncate">
                            {holiday.name}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-violet-600 hover:bg-violet-700 rounded-full flex items-center justify-center shadow-lg shadow-violet-600/30 transition-all hover:scale-105">
        <MessageCircle size={22} className="text-white" />
      </button>

      {/* Add Time Off Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 fade-in"
          onClick={() => setShowAddModal(false)}>
          <div
            className="bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl modal-enter"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-font text-xl font-semibold text-stone-900">
                  Add time off
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-stone-100 rounded-xl transition-colors">
                  <X size={20} className="text-stone-500" />
                </button>
              </div>

              {/* Type Dropdown */}
              <div className="mb-4">
                <div className="relative">
                  <label className="absolute left-4 top-2 body-font text-stone-400 text-xs">
                    Type
                  </label>
                  <button
                    onClick={() =>
                      setShowTypeDropdown(!showTypeDropdown)
                    }
                    className="w-full pt-6 pb-3 px-4 border border-stone-200 rounded-xl body-font text-stone-900 text-left focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all">
                    {selectedType}
                  </button>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown
                      size={18}
                      className="text-stone-400"
                    />
                  </div>
                  {showTypeDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-10 overflow-hidden">
                      {timeOffTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => {
                            setSelectedType(type.label);
                            setShowTypeDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left body-font text-stone-700 hover:bg-stone-50 transition-colors">
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="relative">
                  <label className="absolute left-4 top-2 body-font text-stone-400 text-xs">
                    From *
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) =>
                      setFromDate(e.target.value)
                    }
                    className="w-full pt-6 pb-3 px-4 border border-stone-200 rounded-xl body-font text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <label className="absolute left-4 top-2 body-font text-stone-400 text-xs">
                    To *
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) =>
                      setToDate(e.target.value)
                    }
                    className="w-full pt-6 pb-3 px-4 border border-stone-200 rounded-xl body-font text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Request Summary */}
              {fromDate && toDate && requestedDays > 0 && (
                <div className="mb-4 p-4 border border-stone-200 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1">
                      <span className="body-font text-stone-600 text-sm">
                        Request
                      </span>
                      <button className="flex items-center gap-1 text-blue-600 text-sm body-font hover:text-blue-700 transition-colors">
                        <span>View details</span>
                        <ChevronDown size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="body-font font-semibold text-stone-900">
                        {requestedDays} days
                      </p>
                      <p className="body-font text-stone-500 text-xs">
                        Available after request approval:
                      </p>
                      <p className="body-font text-stone-500 text-xs">
                        {availableAfterRequest} day
                        {availableAfterRequest !== 1
                          ? "s"
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-4">
                <div className="relative">
                  <textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    maxLength={280}
                    placeholder="Description (optional)"
                    rows={4}
                    className="w-full px-4 py-4 border border-stone-200 rounded-xl body-font text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all resize-none"
                  />
                  <span className="absolute bottom-3 right-4 body-font text-stone-400 text-xs">
                    {description.length}/280
                  </span>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <p className="body-font text-stone-600 text-sm mb-2">
                  Attachment (optional)
                </p>
                <div className="upload-zone rounded-xl p-6 text-center cursor-pointer transition-all">
                  <Upload
                    size={20}
                    className="mx-auto text-sky-500 mb-2"
                  />
                  <p className="body-font text-sky-600 text-sm font-medium">
                    Click here or drag file to upload
                  </p>
                </div>
                <p className="body-font text-stone-400 text-xs mt-2">
                  Supported formats: JPEG, PNG, HEIC, PDF.
                  Max file size: 5MB.
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitTimeOff}
                disabled={!fromDate || !toDate}
                className={`w-full py-3.5 rounded-xl body-font font-semibold transition-all ${
                  fromDate && toDate
                    ? "bg-stone-900 text-white hover:bg-stone-800 shadow-lg shadow-stone-900/20"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 fade-in"
          onClick={handleCloseSuccess}>
          <div
            className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl modal-enter text-center p-8"
            onClick={(e) => e.stopPropagation()}>
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-sky-100 rounded-full" />
              <div className="absolute inset-2 bg-sky-50 rounded-full flex items-center justify-center">
                <div className="w-14 h-14 bounce-once">
                  <CalendarDays
                    size={56}
                    className="text-sky-500"
                  />
                </div>
              </div>
            </div>

            <h2 className="heading-font text-2xl font-semibold text-stone-900 mb-2">
              Time off requested
            </h2>
            <p className="body-font text-stone-500 text-sm mb-6">
              An email has been sent for your request to be
              reviewed
            </p>

            <button
              onClick={handleCloseSuccess}
              className="w-full py-3.5 bg-stone-900 text-white rounded-xl body-font font-semibold hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
