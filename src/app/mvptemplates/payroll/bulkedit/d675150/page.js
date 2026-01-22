"use client";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  FileText,
  Maximize2,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

// Step indicator component
function StepIndicator({ steps, currentStep }) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isPending = stepNumber > currentStep;

        return (
          <div
            key={step.id}
            className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ${
              isCurrent ? "bg-white shadow-sm" : ""
            }`}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-all duration-300 ${
                isCompleted
                  ? "bg-emerald-500 text-white"
                  : isCurrent
                    ? "bg-stone-900 text-white"
                    : "bg-stone-200 text-stone-400"
              }`}>
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                stepNumber
              )}
            </div>
            <div className="pt-0.5">
              {isCompleted && (
                <span className="text-xs font-semibold text-emerald-600 tracking-wide">
                  COMPLETED
                </span>
              )}
              <p
                className={`text-sm leading-tight ${
                  isPending
                    ? "text-stone-400"
                    : "text-stone-800 font-medium"
                }`}>
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Radio option card component
function RadioCard({
  selected,
  onSelect,
  title,
  description,
  disabled,
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? "border-stone-900 bg-white shadow-sm"
          : "border-stone-200 bg-white hover:border-stone-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
      <div className="flex items-start gap-4">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
            selected
              ? "border-stone-900"
              : "border-stone-300"
          }`}>
          {selected && (
            <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />
          )}
        </div>
        <div>
          <h4 className="font-semibold text-stone-900 mb-1">
            {title}
          </h4>
          <p className="text-sm text-stone-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

// Checkbox component
function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex items-start gap-4 cursor-pointer p-5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-all">
      <button
        onClick={onChange}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
          checked
            ? "bg-stone-900 border-stone-900"
            : "border-stone-300 bg-white"
        }`}>
        {checked && (
          <Check className="w-3 h-3 text-white" />
        )}
      </button>
      <span className="text-sm text-stone-700 leading-relaxed">
        {label}
      </span>
    </label>
  );
}

// Initial modal for choosing bulk edit type
function BulkEditModal({ isOpen, onClose, onSelect }) {
  const [selectedOption, setSelectedOption] =
    useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{
          animation: "modalIn 0.2s ease-out",
        }}>
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <h2 className="text-xl font-semibold text-stone-900">
            Bulk edit of workers' information
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <RadioCard
            selected={selectedOption === "download"}
            onSelect={() => setSelectedOption("download")}
            title="Download current data of workers"
            description="Select the workers whose information you want to edit, and choose the fields you want to modify."
          />
          <RadioCard
            selected={selectedOption === "upload"}
            onSelect={() => setSelectedOption("upload")}
            title="Upload new data of workers"
            description="Upload the file after editing. PayrollE5 will validate the newly uploaded data, and you can review the fields that you wish to modify."
          />
        </div>

        <div className="flex justify-end p-6 pt-2">
          <button
            onClick={() =>
              selectedOption && onSelect(selectedOption)
            }
            disabled={!selectedOption}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              selectedOption
                ? "bg-stone-900 text-white hover:bg-stone-800 shadow-sm"
                : "bg-stone-100 text-stone-400 cursor-not-allowed"
            }`}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 1: Upload CSV
function UploadStep({ onFileUpload, uploadedFile }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
      <h3 className="text-lg font-semibold text-stone-900 mb-2">
        Upload CSV
      </h3>
      <p className="text-sm text-stone-500 mb-6">
        Upload below the CSV file that you just modified.
        Don't have the CSV file?{" "}
        <a
          href="#"
          className="text-blue-600 hover:text-blue-700 hover:underline">
          Learn more
        </a>
      </p>

      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl text-center transition-all duration-200 ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : uploadedFile
              ? "border-emerald-300 bg-emerald-50"
              : "border-blue-300 bg-blue-50/30 hover:bg-blue-50/50"
        }`}>
        {uploadedFile ? (
          <div className="flex items-center justify-center gap-3 p-12">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <span className="text-emerald-700 font-medium">
              {uploadedFile.name}
            </span>
          </div>
        ) : (
          <label className="cursor-pointer">
            <button
              className="cursor-pointer p-12"
              onClick={(e) => onFileUpload("hello")}>
              <span className="text-blue-600 hover:text-blue-700 font-medium">
                Click here or drag file to upload
              </span>
            </button>
          </label>
        )}
      </div>

      <p className="text-xs text-stone-400 mt-3">
        Supported format: .csv max file size: 10MB
      </p>
    </div>
  );
}

// Step 2: Validate Data - shows the data table
function ValidateStep({
  workers,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div>
      {/* Success banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-emerald-800">
            Success
          </h4>
          <p className="text-sm text-emerald-700">
            All required columns have been mapped. You can
            proceed to the next step.
          </p>
        </div>
      </div>

      {/* Search and table */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search workers..."
              value={searchQuery}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              className="pl-10 pr-4 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 focus:border-stone-300 transition-all w-64"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-stone-100 transition-colors">
            <Maximize2 className="w-4 h-4 text-stone-500" />
          </button>
        </div>

        <div className="p-4 text-sm text-stone-500">
          Total {workers.length} workers
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3 bg-stone-50">
                  Row
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3 bg-stone-50">
                  First name
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3 bg-stone-50">
                  Last name
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3 bg-stone-50">
                  Preferred first name
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3 bg-stone-50">
                  Effective Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {workers.map((worker, index) => (
                <tr
                  key={worker.id}
                  className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-stone-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      defaultValue={worker.firstName}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 focus:border-stone-300 transition-all bg-stone-50"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      defaultValue={worker.lastName}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 focus:border-stone-300 transition-all bg-stone-50"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      defaultValue={
                        worker.preferredFirstName
                      }
                      placeholder="—"
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 focus:border-stone-300 transition-all bg-stone-50"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      defaultValue={worker.effectiveDate}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 focus:border-stone-300 transition-all bg-stone-50"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Step 3: Choose Updates
function ChooseUpdatesStep({
  updateType,
  onUpdateTypeChange,
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
      <h3 className="text-lg font-semibold text-stone-900 mb-2">
        Choose the type of updates you wish to make
      </h3>
      <p className="text-sm text-stone-500 mb-6">
        Update the worker data to be displayed in PayrollE5
        or generate a document containing the changes for
        the worker and the organization to review and sign
      </p>

      <div className="space-y-4">
        <RadioCard
          selected={updateType === "profile"}
          onSelect={() => onUpdateTypeChange("profile")}
          title="Just edit the worker profile"
          description="The profile data will be updated in PayrollE5 – no signature needed"
        />
        <RadioCard
          selected={updateType === "contract"}
          onSelect={() => onUpdateTypeChange("contract")}
          title="Edit the profile and contract and ask for a signature"
          description="The worker will receive a document with the changes to review and sign"
        />
      </div>
    </div>
  );
}

// Step 4: Review and Apply
function ReviewStep({
  workersCount,
  confirmed,
  onConfirmChange,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex items-center justify-between">
        <span className="text-stone-700">
          Review workers and new data{" "}
          <span className="font-semibold text-stone-900">
            {workersCount}
          </span>
        </span>
        <button className="px-5 py-2 rounded-lg border border-stone-200 text-stone-700 font-medium hover:bg-stone-50 transition-colors">
          Review
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <h3 className="font-semibold text-stone-900 mb-2">
          Confirm data import
        </h3>
        <p className="text-sm text-stone-500 mb-6">
          Please confirm that the uploaded data is correct.
          PayrollE5 takes no responsibility for any
          incorrect data that may have been added during the
          upload process.
        </p>
        <Checkbox
          checked={confirmed}
          onChange={() => onConfirmChange(!confirmed)}
          label="I confirm that I have reviewed and approved the imported data"
        />
      </div>
    </div>
  );
}

// Support sidebar component
function SupportSidebar({ steps, currentStep }) {
  return (
    <div className="w-80 flex-shrink-0 space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
        />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
        <h4 className="text-sm font-medium text-stone-500 mb-4">
          Need extra support?
        </h4>
        <a
          href="#"
          className="flex items-center gap-3 text-blue-600 hover:text-blue-700 group">
          <FileText className="w-4 h-4" />
          <span className="text-sm hover:underline">
            How to use bulk edit of workers' information
          </span>
        </a>
      </div>
    </div>
  );
}

// Main Bulk Edit Page
export default function BulkEditWorkers() {
  // State
  const [showModal, setShowModal] = useState(true);
  const [editType, setEditType] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateType, setUpdateType] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  // Sample worker data
  const [workers] = useState([
    {
      id: 1,
      firstName: "Jack",
      lastName: "Potts",
      preferredFirstName: "",
      effectiveDate: "2025-12-08",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      preferredFirstName: "",
      effectiveDate: "2025-12-08",
    },
    {
      id: 3,
      firstName: "Sam",
      lastName: "Lee",
      preferredFirstName: "",
      effectiveDate: "2025-12-08",
    },
    {
      id: 4,
      firstName: "Carleton",
      lastName: "Grimes",
      preferredFirstName: "",
      effectiveDate: "2025-12-08",
    },
  ]);

  const steps = [
    { id: "upload", label: "Upload new data of workers" },
    { id: "validate", label: "Validate data" },
    { id: "choose", label: "Choose updates" },
    { id: "review", label: "Review and apply" },
  ];

  const handleModalSelect = (type) => {
    setEditType(type);
    setShowModal(false);
  };

  const handleFileUpload = (file) => {
    setUploadedFile({ name: "edits-to-items.csv" });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowModal(true);
      setEditType(null);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return uploadedFile !== null;
      case 2:
        return true;
      case 3:
        return updateType !== null;
      case 4:
        return confirmed;
      default:
        return false;
    }
  };

  // Modal view
  if (showModal) {
    return (
      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #faf9f7 0%, #f5f4f1 100%)",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}>
        <BulkEditModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSelect={handleModalSelect}
        />
      </div>
    );
  }

  // Main wizard view
  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background:
          "linear-gradient(135deg, #faf9f7 0%, #f5f4f1 100%)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-8 pt-12 pb-8">
        <h1 className="text-4xl font-bold text-stone-900 tracking-tight">
          Bulk edit
        </h1>
        <p className="text-stone-500 mt-2">
          Upload new data of workers
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex gap-8">
          {/* Main area */}
          <div className="flex-1">
            {currentStep === 1 && (
              <UploadStep
                onFileUpload={handleFileUpload}
                uploadedFile={uploadedFile}
              />
            )}
            {currentStep === 2 && (
              <ValidateStep
                workers={workers}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}
            {currentStep === 3 && (
              <ChooseUpdatesStep
                updateType={updateType}
                onUpdateTypeChange={setUpdateType}
              />
            )}
            {currentStep === 4 && (
              <ReviewStep
                workersCount={workers.length}
                confirmed={confirmed}
                onConfirmChange={setConfirmed}
              />
            )}
          </div>

          {/* Sidebar */}
          <SupportSidebar
            steps={steps}
            currentStep={currentStep}
          />
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={
              currentStep === 4 ? () => {} : handleNext
            }
            disabled={!canProceed()}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              canProceed()
                ? "bg-stone-900 text-white hover:bg-stone-800 shadow-sm"
                : "bg-stone-100 text-stone-400 cursor-not-allowed"
            }`}>
            {currentStep === 4 ? "Apply" : "Continue"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
