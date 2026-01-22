"use client";

import {
  Briefcase,
  Check,
  ChevronDown,
  Gift,
  GripVertical,
  HelpCircle,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

// Tax Modal Component
function TaxModal({ isOpen, onClose, onSave, existingTax }) {
  const [taxType, setTaxType] = useState(existingTax?.type || "VAT");
  const [taxId, setTaxId] = useState(existingTax?.id || "");
  const [taxRate, setTaxRate] = useState(existingTax?.rate || "");
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const taxTypes = ["VAT", "GST", "HST", "PST", "Sales Tax"];

  const handleSave = () => {
    if (taxRate) {
      onSave({ type: taxType, id: taxId, rate: parseFloat(taxRate) });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50 animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl animate-scale-in">
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                Add inclusive tax
              </h2>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                This tax information will be included in future invoices.
                <br />
                <span className="font-semibold text-gray-900">Important:</span> Contra does not file any taxes on your
                behalf.
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors -mr-2 -mt-2">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <label className="text-sm font-medium text-gray-900 mb-3 block">Tax information</label>

            <div className="flex gap-3">
              {/* Tax Type Dropdown */}
              <div className="relative w-36">
                <button
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between text-gray-800 hover:border-gray-300 transition-colors">
                  <span>{taxType}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isTypeOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isTypeOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsTypeOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden z-20 animate-scale-in">
                      {taxTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setTaxType(type);
                            setIsTypeOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between">
                          {type}
                          {taxType === type && <Check className="w-4 h-4 text-indigo-600" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* ID/Account Number */}
              <div className="flex-1">
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
                    ID/account number
                  </label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="87635123"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-800"
                  />
                </div>
              </div>

              {/* Tax Rate */}
              <div className="w-28">
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Tax rate</label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    placeholder="20"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-800 pr-8"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-2">e.g. VAT, GST, HST, PST</p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 pb-6">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Dropdown Component - Fixed z-index issues
function Dropdown({ label, value, options, onChange, placeholder, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${isOpen ? "z-40" : "z-0"}`}>
      {label && (
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">{label}</label>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between text-gray-800 hover:border-gray-300 transition-colors">
        <span className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          <span className={value ? "text-gray-900" : "text-gray-400"}>{value || placeholder}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden z-40 animate-scale-in max-h-56 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between">
                {option}
                {value === option && <Check className="w-4 h-4 text-indigo-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Client Search Component - Fixed z-index issues
function ClientSearch({ value, onChange, contacts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={`relative ${isOpen ? "z-40" : "z-0"}`}>
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Bill to</label>
      <div
        className={`border rounded-xl transition-all ${
          isOpen ? "border-indigo-400 ring-2 ring-indigo-100" : "border-gray-200"
        }`}>
        <div className="flex items-center gap-2 px-4 py-3.5">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={value ? value.name : searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (value) onChange(null);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search your network by name or email"
            className="flex-1 outline-none text-sm text-gray-800 placeholder:text-gray-400"
          />
          {value && (
            <button onClick={() => onChange(null)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {isOpen && !value && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => {
              setIsOpen(false);
              setSearchQuery("");
            }}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden z-40 animate-scale-in max-h-56 overflow-y-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <button
                  key={contact.email}
                  onClick={() => {
                    onChange(contact);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900 text-sm">{contact.name}</div>
                  <div className="text-gray-500 text-xs">{contact.email}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-400">No contacts found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Line Item Component
function LineItem({ item, onUpdate, onDelete, index }) {
  return (
    <div className="flex items-center gap-3 group animate-slide-up">
      <button className="p-1 cursor-grab text-gray-300 hover:text-gray-500 transition-colors opacity-0 group-hover:opacity-100">
        <GripVertical className="w-4 h-4" />
      </button>

      <div className="flex-1 grid grid-cols-12 gap-3 items-center">
        {/* Item Name */}
        <div className="col-span-5">
          <input
            type="text"
            value={item.name}
            onChange={(e) => onUpdate(index, { ...item, name: e.target.value })}
            placeholder="Item/Service name"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-800 text-sm"
          />
        </div>

        {/* Quantity */}
        <div className="col-span-2">
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              onUpdate(index, {
                ...item,
                quantity: parseInt(e.target.value) || 1,
              })
            }
            min="1"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-800 text-sm text-center"
          />
        </div>

        {/* Rate */}
        <div className="col-span-2">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={item.rate}
              onChange={(e) =>
                onUpdate(index, {
                  ...item,
                  rate: parseFloat(e.target.value) || 0,
                })
              }
              step="0.01"
              className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-800 text-sm"
            />
          </div>
        </div>

        {/* Total */}
        <div className="col-span-2 text-right">
          <span className="text-gray-900 font-medium">${(item.quantity * item.rate).toFixed(2)}</span>
        </div>

        {/* Delete */}
        <div className="col-span-1 flex justify-end">
          <button
            onClick={() => onDelete(index)}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InvoiceCreation() {
  // State
  const [invoiceNumber, setInvoiceNumber] = useState("25-001");
  const [issuedDate, setIssuedDate] = useState("2025-01-22");
  const [dueOption, setDueOption] = useState("Upon Receipt");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [memo, setMemo] = useState("");
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [tax, setTax] = useState(null);

  const [items, setItems] = useState([{ name: "", quantity: 1, rate: 0 }]);

  // Data
  const senderInfo = {
    name: "Sam Lee",
    company: "AS Mobbin",
    email: "samleemobbin@gmail.com",
    logo: "AS\nMOB",
  };

  const contacts = [
    { name: "Alex Thompson", email: "alex@company.com" },
    { name: "Jordan Rivera", email: "jordan@startup.io" },
    { name: "Casey Morgan", email: "casey@design.co" },
    { name: "Taylor Kim", email: "taylor@agency.com" },
  ];

  const projects = ["3D Motion Design", "Brand Identity", "UI/UX Design", "Web Development", "Mobile App Design"];

  const dueOptions = ["Upon Receipt", "Net 7", "Net 15", "Net 30", "Net 45", "Net 60"];

  const clientInvoiceFee = 29.0;

  // Handlers
  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, rate: 0 }]);
  };

  const updateItem = (index, updatedItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
  };

  const deleteItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSaveTax = (taxInfo) => {
    setTax(taxInfo);
  };

  const removeTax = () => {
    setTax(null);
  };

  // Derived
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const taxAmount = tax ? (subtotal * tax.rate) / (100 + tax.rate) : 0;
  const total = subtotal;
  const isValid = selectedClient && items.some((item) => item.name && item.rate > 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] relative">
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
        h3,
        .display-font {
          font-family: var(--font-display);
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }

        .stagger-1 {
          animation-delay: 0.05s;
          opacity: 0;
        }
        .stagger-2 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        .stagger-3 {
          animation-delay: 0.15s;
          opacity: 0;
        }
        .stagger-4 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .stagger-5 {
          animation-delay: 0.25s;
          opacity: 0;
        }

        input::placeholder {
          color: #9ca3af;
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }

        /* Custom scrollbar */
        .max-h-56::-webkit-scrollbar {
          width: 6px;
        }
        .max-h-56::-webkit-scrollbar-track {
          background: transparent;
        }
        .max-h-56::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 3px;
        }
        .max-h-56::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }

        .gradient-banner {
          background: linear-gradient(
            135deg,
            rgba(199, 210, 254, 0.5) 0%,
            rgba(233, 213, 255, 0.3) 50%,
            rgba(254, 202, 202, 0.2) 100%
          );
        }

        .pro-banner {
          background: linear-gradient(
            90deg,
            rgba(224, 231, 255, 0.6) 0%,
            rgba(237, 233, 254, 0.4) 50%,
            rgba(252, 231, 243, 0.3) 100%
          );
        }
      `}</style>

      {/* Referral Banner */}
      <div className="gradient-banner border-b border-indigo-100 animate-fade-in">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gift className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-gray-700">
              Earn by inviting clients! Get a referral bonus when they join Contra via your invoice and complete
              projects.{" "}
              <a href="#" className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                Learn more →
              </a>
            </span>
          </div>
          <button className="p-1 hover:bg-white/50 rounded-full transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Invoice Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up stagger-1">
          <div className="p-8">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-8 animate-slide-up stagger-2">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide mb-3">
                  Draft
                </span>
                <h1 className="text-3xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                  Invoice
                </h1>
              </div>

              {/* Logo */}
              <div className="relative group">
                <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-lg bg-gray-900 flex items-center justify-center">
                      <span className="text-white text-xs font-bold leading-tight whitespace-pre-line text-center">
                        {senderInfo.logo}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50">
                  <Pencil className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Invoice Details Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-8 animate-slide-up stagger-3 relative z-50">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Invoice Number */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                    Invoice #
                  </label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full max-w-[180px] px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-800"
                  />
                </div>

                {/* Issued On */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                    Issued on
                  </label>
                  <div className="relative w-full max-w-[180px]">
                    <input
                      type="date"
                      value={issuedDate}
                      onChange={(e) => setIssuedDate(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-800"
                    />
                  </div>
                </div>

                {/* Due */}
                <div className="max-w-[180px] relative z-50">
                  <Dropdown
                    label="Due"
                    value={dueOption}
                    options={dueOptions}
                    onChange={setDueOption}
                    placeholder="Select due date"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* From */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">From</label>
                  <div className="text-gray-900 font-medium">
                    {senderInfo.name} - {senderInfo.company}
                  </div>
                  <div className="text-gray-500 text-sm">{senderInfo.email}</div>
                </div>

                {/* Bill To */}
                <ClientSearch value={selectedClient} onChange={setSelectedClient} contacts={contacts} />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-8" />

            {/* Project Selection */}
            <div className="mb-8 animate-slide-up stagger-4 relative z-40">
              <div className="max-w-xs">
                <Dropdown
                  label="Project"
                  value={selectedProject}
                  options={projects}
                  onChange={setSelectedProject}
                  placeholder="Select a project"
                  icon={Briefcase}
                />
              </div>
            </div>

            {/* Line Items */}
            <div className="mb-6 animate-slide-up stagger-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6" /> {/* Spacer for grip */}
                <div className="flex-1 grid grid-cols-12 gap-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-5">Items</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-center">Rate</div>
                  <div className="col-span-2 text-right">Total</div>
                  <div className="col-span-1" />
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <LineItem key={index} item={item} index={index} onUpdate={updateItem} onDelete={deleteItem} />
                ))}
              </div>

              {/* Add Item Button */}
              <button
                onClick={addItem}
                className="flex items-center gap-2 mt-4 ml-9 text-gray-500 hover:text-gray-700 transition-colors">
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Add an item</span>
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 mb-6" />

            {/* Totals Section */}
            <div className="space-y-3 mb-6">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Subtotal (USD)</span>
                <span className="text-gray-900 font-semibold text-lg">${subtotal.toFixed(2)}</span>
              </div>

              {/* Tax */}
              {tax ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      Tax ({tax.rate}% {tax.type}, included in total)
                    </span>
                    <button
                      onClick={() => setShowTaxModal(true)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button onClick={removeTax} className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                  <span className="text-gray-700">${taxAmount.toFixed(2)}</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowTaxModal(true)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center">
                    <Plus className="w-3 h-3" />
                  </div>
                  <span className="text-sm">Add inclusive tax</span>
                </button>
              )}

              {/* Total */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="text-gray-900 font-bold text-xl">${total.toFixed(2)}</span>
              </div>

              {/* Fees */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Client invoice fee</span>
                  <button className="p-0.5 hover:bg-gray-100 rounded transition-colors">
                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
                <span className="text-gray-500">
                  <span className="text-gray-400">(waived)</span>{" "}
                  <span className="line-through">${clientInvoiceFee.toFixed(2)}</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Stripe processing fee</span>
                  <button className="p-0.5 hover:bg-gray-100 rounded transition-colors">
                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
            </div>

            {/* Pro Banner */}
            <div className="pro-banner rounded-xl px-5 py-4 mb-8">
              <p className="text-sm text-gray-700">
                Alex's invoice fee is waived because you are{" "}
                <span className="font-semibold text-indigo-600">Contra Pro</span>
              </p>
            </div>

            {/* Memo */}
            <div className="mb-8">
              <div className="rounded-xl border border-gray-200 overflow-hidden focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <label className="block px-4 pt-3 text-xs font-medium text-gray-500">Memo</label>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="Add payment terms, scope of work, and other notes"
                  rows={3}
                  className="w-full px-4 py-2 pb-4 outline-none text-gray-800 text-sm resize-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Commission Notice */}
            <p className="text-center text-sm text-gray-400 mb-8">Your earnings are always 100% commission-free.</p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
              <button
                disabled={!isValid}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  isValid ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}>
                Send Invoice
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Tax Modal */}
      <TaxModal isOpen={showTaxModal} onClose={() => setShowTaxModal(false)} onSave={handleSaveTax} existingTax={tax} />
    </div>
  );
}
