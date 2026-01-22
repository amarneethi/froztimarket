"use client";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  Clock,
  Info,
  Pencil,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PayrollE5AddCompensation() {
  // State
  const [currentStep, setCurrentStep] = useState(3);
  const [employmentType, setEmploymentType] =
    useState("full-time");
  const [compensationType, setCompensationType] =
    useState("annual");
  const [salaryAmount, setSalaryAmount] =
    useState("345672");
  const [marketRateView, setMarketRateView] =
    useState("annual");
  const [showBonusModal, setShowBonusModal] =
    useState(false);
  const [bonusAmount, setBonusAmount] = useState("");
  const [bonusPayout, setBonusPayout] =
    useState("first-payroll");
  const [savedBonus, setSavedBonus] = useState(null);
  const [helpExpanded, setHelpExpanded] = useState(false);

  // Data
  const steps = [
    {
      id: 1,
      title: "Personal details",
      status: "completed",
    },
    { id: 2, title: "Job details", status: "completed" },
    {
      id: 3,
      title: "Compensation and dates",
      status: "current",
    },
    {
      id: 4,
      title: "Benefits and extras",
      status: "upcoming",
    },
  ];

  const marketRateData = [
    { range: "$137.7k", value: 35, label: "LOW" },
    { range: "$250k", value: 55 },
    { range: "$400k", value: 70 },
    { range: "$550k", value: 85 },
    { range: "$700k", value: 75 },
    { range: "$884.7k", value: 60, label: "MEDIAN" },
    { range: "$1m", value: 50 },
    { range: "$1.2m", value: 40 },
    { range: "$1.5m", value: 30 },
    { range: "$1.9m", value: 25, label: "HIGH" },
  ];

  const payoutOptions = [
    { id: "first-payroll", label: "On the first payroll" },
    { id: "specific-date", label: "On a specific date" },
    {
      id: "after-probation",
      label: "After probation period",
    },
  ];

  // Derived
  const formattedSalary = salaryAmount
    ? Number(salaryAmount).toLocaleString()
    : "";
  const usdEquivalent = salaryAmount
    ? `$${(Number(salaryAmount) * 0.032).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      )} USD`
    : "$0 USD";

  const currentSalaryPosition = salaryAmount
    ? Number(salaryAmount) / 1000
    : 0;

  // Handlers
  const handleSalaryChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSalaryAmount(value);
  };

  const handleBonusSubmit = () => {
    if (bonusAmount) {
      setSavedBonus({
        amount: bonusAmount,
        payout: bonusPayout,
      });
      setShowBonusModal(false);
    }
  };

  const handleEditBonus = () => {
    if (savedBonus) {
      setBonusAmount(savedBonus.amount);
      setBonusPayout(savedBonus.payout);
    }
    setShowBonusModal(true);
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 text-white px-3 py-1.5 rounded-lg text-sm body-font font-medium shadow-lg">
          {payload[0].payload.range}
        </div>
      );
    }
    return null;
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
        
        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; }
        .stagger-4 { animation-delay: 0.2s; }
        
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="heading-font text-2xl font-semibold text-stone-900 tracking-tight">
                  Add person
                </h1>
                <p className="body-font text-stone-500 text-sm mt-0.5">
                  Create a new contract for your EOR
                  employee
                </p>
              </div>
            </div>
            <button className="p-2.5 hover:bg-stone-100 rounded-xl transition-colors">
              <X size={20} className="text-stone-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pre-filled Information Banner */}
            <div
              className="card-section p-5 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.05s",
              }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Sparkles
                    size={16}
                    className="text-amber-600"
                  />
                </div>
                <div>
                  <h3 className="body-font font-semibold text-amber-700 text-sm mb-1">
                    Review the pre-filled information
                  </h3>
                  <p className="body-font text-stone-600 text-sm leading-relaxed">
                    We've pre-filled this contract form with
                    some information from existing employee.
                    Please confirm all pre-filled
                    information correct.
                  </p>
                </div>
              </div>
            </div>

            {/* Employment Type Card */}
            <div
              className="card-section p-6 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.1s",
              }}>
              <h2 className="body-font font-semibold text-stone-900 mb-4">
                Employment type
              </h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    employmentType === "full-time"
                      ? "border-stone-900 bg-stone-50"
                      : "border-stone-200 hover:border-stone-300"
                  }`}>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      employmentType === "full-time"
                        ? "border-stone-900"
                        : "border-stone-300"
                    }`}>
                    {employmentType === "full-time" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="employmentType"
                    value="full-time"
                    checked={employmentType === "full-time"}
                    onChange={(e) =>
                      setEmploymentType(e.target.value)
                    }
                    className="sr-only"
                  />
                  <span className="body-font font-medium text-stone-800">
                    Full-time
                  </span>
                </label>

                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    employmentType === "part-time"
                      ? "border-stone-900 bg-stone-50"
                      : "border-stone-200 hover:border-stone-300"
                  }`}>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      employmentType === "part-time"
                        ? "border-stone-900"
                        : "border-stone-300"
                    }`}>
                    {employmentType === "part-time" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="employmentType"
                    value="part-time"
                    checked={employmentType === "part-time"}
                    onChange={(e) =>
                      setEmploymentType(e.target.value)
                    }
                    className="sr-only"
                  />
                  <span className="body-font font-medium text-stone-800">
                    Part-time
                  </span>
                </label>
              </div>
            </div>

            {/* Compensation Card */}
            <div
              className="card-section p-6 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.15s",
              }}>
              <h2 className="body-font font-semibold text-stone-900 mb-2">
                Compensation
              </h2>
              <p className="body-font text-stone-500 text-sm mb-5">
                All compensation will be awarded in New
                Taiwan Dollar ( TWD ). Due to compliance,
                contract currencies are not customizable in
                EOR.
              </p>

              {/* Annual/Hourly Toggle */}
              <div className="flex bg-stone-100 rounded-xl p-1 mb-5">
                <button
                  onClick={() =>
                    setCompensationType("annual")
                  }
                  className={`flex-1 py-2.5 px-4 rounded-lg body-font font-medium text-sm transition-all ${
                    compensationType === "annual"
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-600 hover:text-stone-800"
                  }`}>
                  Annual
                </button>
                <button
                  onClick={() =>
                    setCompensationType("hourly")
                  }
                  className={`flex-1 py-2.5 px-4 rounded-lg body-font font-medium text-sm transition-all ${
                    compensationType === "hourly"
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-600 hover:text-stone-800"
                  }`}>
                  Hourly
                </button>
              </div>

              {/* Salary Input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <span className="body-font text-stone-400 text-sm">
                      $
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formattedSalary}
                    onChange={handleSalaryChange}
                    placeholder="Gross annual base salary *"
                    className="w-full pl-8 pr-20 py-4 border border-stone-200 rounded-xl body-font text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <span className="body-font text-stone-400 text-sm font-medium">
                      TWD
                    </span>
                  </div>
                </div>
                <p className="body-font text-stone-400 text-xs mt-1.5 ml-1">
                  Required field
                </p>
              </div>

              {/* USD Equivalent */}
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl mb-6">
                <span className="body-font text-stone-600 text-sm">
                  Gross Annual base salary Equivalent to USD
                </span>
                <span className="body-font font-semibold text-stone-900">
                  {usdEquivalent}
                </span>
              </div>

              {/* Market Rate Insights */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="body-font font-semibold text-stone-900">
                    Market rate insights
                  </h3>
                  <div className="flex bg-stone-100 rounded-lg p-0.5">
                    <button
                      onClick={() =>
                        setMarketRateView("annual")
                      }
                      className={`px-3 py-1.5 rounded-md body-font font-medium text-xs transition-all ${
                        marketRateView === "annual"
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-600 hover:text-stone-800"
                      }`}>
                      Annual
                    </button>
                    <button
                      onClick={() =>
                        setMarketRateView("monthly")
                      }
                      className={`px-3 py-1.5 rounded-md body-font font-medium text-xs transition-all ${
                        marketRateView === "monthly"
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-600 hover:text-stone-800"
                      }`}>
                      Monthly
                    </button>
                  </div>
                </div>

                <h4 className="body-font font-medium text-stone-800 mb-1">
                  Junior Digital Marketing annual
                  compensation in Taiwan.
                </h4>
                <p className="body-font text-stone-500 text-sm mb-1">
                  Your payment rate is equal to NT$
                  {formattedSalary || "0"} annually in TWD .
                </p>
                <p className="body-font text-stone-400 text-xs mb-4">
                  Market rate insights will not be shown to
                  employees .
                </p>

                {/* Chart */}
                <div className="relative h-48 mb-2">
                  <ResponsiveContainer
                    width="100%"
                    height="100%">
                    <BarChart
                      data={marketRateData}
                      margin={{
                        top: 30,
                        right: 10,
                        left: 10,
                        bottom: 5,
                      }}>
                      <XAxis
                        dataKey="range"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#a8a29e",
                        }}
                        interval={0}
                        hide
                      />
                      <YAxis hide />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                          fill: "rgba(0,0,0,0.02)",
                        }}
                      />
                      {salaryAmount && (
                        <ReferenceLine
                          x={0}
                          stroke="#0ea5e9"
                          strokeDasharray="4 4"
                          strokeWidth={2}
                          label={{
                            value: `$${(Number(salaryAmount) / 1000).toFixed(1)}k`,
                            position: "top",
                            fill: "white",
                            fontSize: 12,
                            fontWeight: 600,
                            offset: -25,
                          }}
                        />
                      )}
                      <Bar
                        dataKey="value"
                        radius={[6, 6, 0, 0]}>
                        {marketRateData.map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                index === 0
                                  ? "#60a5fa"
                                  : index < 5
                                    ? "#93c5fd"
                                    : "#bfdbfe"
                              }
                            />
                          ),
                        )}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  {/* Current Salary Indicator */}
                  {salaryAmount && (
                    <div
                      className="absolute top-0 flex flex-col items-center"
                      style={{ left: "12%" }}>
                      <div className="bg-sky-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold body-font shadow-lg">
                        $
                        {(
                          Number(salaryAmount) / 1000
                        ).toFixed(1)}
                        k
                      </div>
                      <div className="w-0.5 h-36 border-l-2 border-dashed border-sky-500" />
                    </div>
                  )}
                </div>

                {/* Chart Labels */}
                <div className="flex justify-between px-2">
                  <div className="text-left">
                    <p className="body-font font-medium text-stone-700 text-sm">
                      $137.7k
                    </p>
                    <p className="body-font text-stone-400 text-xs">
                      LOW
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="body-font font-medium text-stone-700 text-sm">
                      $884.7k
                    </p>
                    <p className="body-font text-stone-400 text-xs">
                      MEDIAN
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="body-font font-medium text-stone-700 text-sm">
                      $1.9m
                    </p>
                    <p className="body-font text-stone-400 text-xs">
                      HIGH
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signing/Retention Bonus Card */}
            <div
              className="card-section p-6 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.2s",
              }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="body-font font-semibold text-stone-900">
                  Signing/retention bonus
                </h2>
                {!savedBonus && (
                  <button
                    onClick={() => setShowBonusModal(true)}
                    className="px-4 py-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                    Add
                  </button>
                )}
              </div>
              <p className="body-font text-stone-500 text-sm mb-4">
                One time payment to the employee on specific
                date or as part of their first payroll.
              </p>

              {savedBonus ? (
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="body-font text-stone-600 text-sm">
                    Bonus amount
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="body-font font-semibold text-stone-900">
                        $
                        {Number(
                          savedBonus.amount,
                        ).toLocaleString()}{" "}
                        TWD
                      </p>
                      <p className="body-font text-stone-500 text-xs">
                        {payoutOptions.find(
                          (o) => o.id === savedBonus.payout,
                        )?.label || "On the first payroll"}
                      </p>
                    </div>
                    <button
                      onClick={handleEditBonus}
                      className="p-2 hover:bg-stone-200 rounded-lg transition-colors">
                      <Pencil
                        size={16}
                        className="text-stone-500"
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-4 bg-stone-50 rounded-xl">
                  <Info
                    size={16}
                    className="text-stone-400"
                  />
                  <span className="body-font text-stone-500 text-sm">
                    No bonus added yet
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Steps */}
            <div
              className="card-section p-6 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.1s",
              }}>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-3">
                    {step.status === "completed" ? (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Check
                          size={16}
                          className="text-white"
                        />
                      </div>
                    ) : step.status === "current" ? (
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-stone-900 flex items-center justify-center">
                        <span className="body-font font-semibold text-stone-900 text-sm">
                          {step.id}
                        </span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                        <span className="body-font font-medium text-stone-400 text-sm">
                          {step.id}
                        </span>
                      </div>
                    )}
                    <div>
                      {step.status === "completed" && (
                        <p className="body-font text-green-600 text-xs font-semibold uppercase tracking-wide">
                          COMPLETED
                        </p>
                      )}
                      <p
                        className={`body-font font-medium text-sm ${
                          step.status === "upcoming"
                            ? "text-stone-400"
                            : "text-stone-800"
                        }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help and Support */}
            <div
              className="card-section slide-up overflow-hidden"
              style={{
                opacity: 0,
                animationDelay: "0.15s",
              }}>
              <button
                onClick={() =>
                  setHelpExpanded(!helpExpanded)
                }
                className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition-colors">
                <span className="body-font font-semibold text-stone-900">
                  Help and support
                </span>
                <ChevronDown
                  size={18}
                  className={`text-stone-500 transition-transform ${helpExpanded ? "rotate-180" : ""}`}
                />
              </button>
              {helpExpanded && (
                <div className="px-5 pb-5 border-t border-stone-100 pt-4">
                  <p className="body-font text-stone-500 text-sm">
                    Need assistance? Contact our support
                    team for help with compensation setup.
                  </p>
                </div>
              )}
            </div>

            {/* Autosaved Notice */}
            <div
              className="card-section p-5 slide-up"
              style={{
                opacity: 0,
                animationDelay: "0.2s",
              }}>
              <div className="flex items-center gap-2 mb-3">
                <Clock
                  size={16}
                  className="text-stone-500"
                />
                <span className="body-font font-semibold text-stone-900 text-sm">
                  Autosaved
                </span>
              </div>
              <p className="body-font text-stone-500 text-sm mb-4">
                This form automatically saves your progress
              </p>
              <button className="w-full px-4 py-2.5 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-all body-font font-medium text-stone-700 text-sm">
                Delete draft
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-200">
          <button className="flex items-center gap-2 body-font font-medium text-stone-800 hover:text-stone-600 transition-colors">
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <button className="px-6 py-3 bg-stone-900 text-white rounded-xl body-font font-medium hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20">
            Continue
          </button>
        </div>
      </div>

      {/* Floating AI Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-stone-900 hover:bg-stone-800 rounded-full flex items-center justify-center shadow-lg shadow-stone-900/30 transition-all hover:scale-105">
        <Wand2 size={22} className="text-white" />
      </button>

      {/* Bonus Modal */}
      {showBonusModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 fade-in">
          <div
            className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl modal-enter"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="heading-font text-xl font-semibold text-stone-900">
                  Add signing/retention bonus
                </h2>
                <button
                  onClick={() => setShowBonusModal(false)}
                  className="p-2 hover:bg-stone-100 rounded-xl transition-colors">
                  <X size={20} className="text-stone-500" />
                </button>
              </div>
              <p className="body-font text-stone-500 text-sm mb-6">
                Specify bonus payout condition
              </p>

              {/* Bonus Amount Input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <span className="body-font text-stone-400 text-sm">
                      $
                    </span>
                  </div>
                  <input
                    type="text"
                    value={
                      bonusAmount
                        ? Number(
                            bonusAmount,
                          ).toLocaleString()
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value.replace(
                        /[^0-9]/g,
                        "",
                      );
                      setBonusAmount(value);
                    }}
                    placeholder="0"
                    className="w-full pl-8 pr-20 py-4 border border-stone-200 rounded-xl body-font text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <span className="body-font text-stone-400 text-sm font-medium">
                      TWD
                    </span>
                  </div>
                </div>
              </div>

              {/* Payout Selection */}
              <div className="mb-6">
                <div className="relative">
                  <label className="absolute left-4 top-2 body-font text-stone-400 text-xs">
                    Bonus payout *
                  </label>
                  <select
                    value={bonusPayout}
                    onChange={(e) =>
                      setBonusPayout(e.target.value)
                    }
                    className="w-full pt-6 pb-3 px-4 border border-stone-200 rounded-xl body-font text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all appearance-none cursor-pointer">
                    {payoutOptions.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown
                      size={18}
                      className="text-stone-400"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleBonusSubmit}
                disabled={!bonusAmount}
                className={`w-full py-3.5 rounded-xl body-font font-semibold transition-all ${
                  bonusAmount
                    ? "bg-stone-900 text-white hover:bg-stone-800 shadow-lg shadow-stone-900/20"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
