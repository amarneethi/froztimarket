"use client";

import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Smile,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function CRMOnePricing() {
  // State
  const [billingCycle, setBillingCycle] =
    useState("annually"); // "annually" | "monthly"
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Data
  const plans = [
    {
      name: "Standard",
      description: "Simple CRM for small teams",
      monthlyPrice: 25,
      annualPrice: 20,
      annualTotal: 240,
      icon: Zap,
      cta: "Try for free",
      ctaStyle: "secondary",
      limits: [
        {
          text: "2,000 emails/member/month",
          included: true,
        },
        { text: "500 enrichments/month", included: true },
        { text: "1 email domain", included: true },
        { text: "1 email sync/member", included: true },
        {
          text: "2,000 magic fields/month",
          included: true,
        },
      ],
      advanced: [
        { text: "Dashboards", included: false },
        { text: "Custom objects", included: false },
        { text: "Email sequences", included: false },
      ],
      admin: [
        {
          text: "Roles & Permissions",
          included: false,
          comingSoon: true,
        },
      ],
      support: [
        { text: "Priority support", included: true },
        {
          text: "Dedicated customer success manager",
          included: false,
        },
        { text: "Migration service", included: false },
      ],
    },
    {
      name: "Premium",
      description: "Advanced CRM for medium teams",
      monthlyPrice: 50,
      annualPrice: 40,
      annualTotal: 480,
      icon: Users,
      cta: "Try for free",
      ctaStyle: "primary",
      popular: true,
      limits: [
        {
          text: "5,000 emails/member/month",
          included: true,
        },
        { text: "1,000 enrichments/month", included: true },
        { text: "3 email domains", included: true },
        { text: "5 emails sync/member", included: true },
        {
          text: "5,000 magic fields/month",
          included: true,
        },
      ],
      advanced: [
        { text: "Dashboards", included: true, beta: true },
        {
          text: "Custom objects",
          included: true,
          beta: true,
        },
        { text: "Email sequences", included: true },
      ],
      admin: [
        {
          text: "Roles & Permissions",
          included: true,
          comingSoon: true,
        },
      ],
      support: [
        { text: "Priority support", included: true },
        {
          text: "Dedicated customer success manager",
          included: true,
        },
        { text: "Migration service", included: true },
      ],
    },
    {
      name: "Custom",
      description: "Tailored CRM for larger teams",
      monthlyPrice: 100,
      annualPrice: 80,
      annualTotal: 960,
      icon: Building2,
      cta: "Get a demo",
      ctaStyle: "secondary",
      isCustom: true,
      limits: [
        {
          text: "Custom emails/member/month",
          included: true,
          custom: true,
        },
        {
          text: "Custom enrichments/month",
          included: true,
          custom: true,
        },
        {
          text: "Custom email domains",
          included: true,
          custom: true,
        },
        {
          text: "Custom accounts sync/member",
          included: true,
          custom: true,
        },
        {
          text: "Custom magic fields/month",
          included: true,
          custom: true,
        },
      ],
      advanced: [
        { text: "Dashboards", included: true, beta: true },
        {
          text: "Custom objects",
          included: true,
          beta: true,
        },
        { text: "Email sequences", included: true },
      ],
      admin: [
        {
          text: "Roles & Permissions",
          included: true,
          comingSoon: true,
        },
      ],
      support: [
        { text: "Priority support", included: true },
        {
          text: "Dedicated customer success manager",
          included: true,
        },
        { text: "Migration service", included: true },
      ],
    },
  ];

  const comparisonFeatures = [
    {
      category: "Core Features",
      features: [
        {
          name: "Mentions & Notes",
          standard: true,
          premium: true,
          custom: true,
        },
        {
          name: "Reminders",
          standard: true,
          premium: true,
          custom: true,
        },
        {
          name: "Roles & Permissions",
          standard: false,
          premium: true,
          custom: true,
          comingSoon: true,
        },
      ],
    },
    {
      category: "Support",
      features: [
        {
          name: "Priority support",
          standard: true,
          premium: true,
          custom: true,
        },
        {
          name: "Dedicated customer success manager",
          standard: false,
          premium: true,
          custom: true,
        },
        {
          name: "Migration service",
          standard: false,
          premium: true,
          custom: true,
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "Can I try CRMOne for free with my team?",
      answer:
        "When you sign up on CRMOne, we automatically activate a 2 weeks free trial on your workspace, so that you can fully test CRMOne for free with all the premium features.",
    },
    {
      question:
        "What happens if I don't upgrade at the end of the trial?",
      answer:
        "If you don't upgrade, your workspace will be downgraded to our free tier with limited features. Your data will be preserved, and you can upgrade at any time to restore full access.",
    },
    {
      question:
        "Do I need to add my credit card during the free trial?",
      answer:
        "No, you don't need to add payment information to start your free trial. We'll only ask for payment details when you decide to upgrade to a paid plan.",
    },
    {
      question:
        "How does adding or removing members impact my bill?",
      answer:
        "Our billing is prorated. When you add members, you'll only be charged for the remaining time in your billing cycle. When you remove members, you'll receive credit toward your next bill.",
    },
  ];

  const navItems = [
    { label: "Products", href: "#" },
    { label: "Solutions", href: "#" },
    { label: "Resources", href: "#" },
    { label: "Pricing", href: "#", active: true },
  ];

  // Derived
  const currentPrice = (plan) =>
    billingCycle === "annually"
      ? plan.annualPrice
      : plan.monthlyPrice;

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .fade-in-delay-1 {
          opacity: 0;
          animation: fadeIn 0.5s ease-out 0.1s forwards;
        }
        
        .fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 0.5s ease-out 0.2s forwards;
        }
        
        .fade-in-delay-3 {
          opacity: 0;
          animation: fadeIn 0.5s ease-out 0.3s forwards;
        }
        
        .btn-primary {
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .btn-secondary {
          transition: all 0.2s ease;
        }
        
        .btn-secondary:hover {
          background: #fafafa;
          border-color: #d4d4d4;
        }
        
        .plan-card {
          transition: all 0.3s ease;
        }
        
        .plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        }
        
        .toggle-pill {
          transition: all 0.2s ease;
        }
        
        .faq-item {
          transition: all 0.2s ease;
        }
        
        .faq-content {
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .nav-link {
          transition: color 0.15s ease;
        }
        
        .nav-link:hover {
          color: #171717;
        }
        
        .check-icon {
          transition: transform 0.2s ease;
        }
        
        .plan-card:hover .check-icon {
          transform: scale(1.1);
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-neutral-900 flex items-center justify-center">
                  <Smile
                    className="w-5 h-5 text-neutral-900"
                    strokeWidth={2.5}
                  />
                </div>
                <span
                  className="text-xl font-medium text-neutral-900"
                  style={{
                    fontFamily: "'Newsreader', serif",
                  }}>
                  CRMOne.
                </span>
              </a>

              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`nav-link text-sm ${
                      item.active
                        ? "text-neutral-900 font-medium"
                        : "text-neutral-500"
                    }`}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="nav-link text-sm text-neutral-600 hidden sm:block">
                Get a demo
              </a>
              <a
                href="#"
                className="nav-link text-sm text-neutral-600 hidden sm:block">
                Login
              </a>
              <button className="btn-primary px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg">
                Try for free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1
            className="text-5xl lg:text-6xl font-medium text-neutral-900 mb-6 fade-in"
            style={{
              fontFamily: "'Newsreader', serif",
              lineHeight: 1.1,
            }}>
            Pricing
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto fade-in-delay-1">
            CRMOne is the collaborative workspace for all
            your team's relationships
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-1 mt-10 fade-in-delay-2">
            <div className="inline-flex items-center bg-neutral-100 rounded-full p-1">
              <button
                onClick={() => setBillingCycle("annually")}
                className={`toggle-pill relative px-4 py-2 text-sm font-medium rounded-full ${
                  billingCycle === "annually"
                    ? "bg-[#d4e8a0] text-neutral-900"
                    : "text-neutral-600"
                }`}>
                Annually -20%
              </button>
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`toggle-pill px-4 py-2 text-sm font-medium rounded-full ${
                  billingCycle === "monthly"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-600"
                }`}>
                Monthly
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 fade-in-delay-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`plan-card relative rounded-2xl border ${
                  plan.popular
                    ? "border-neutral-900 shadow-lg"
                    : "border-neutral-200"
                } bg-white p-8`}>
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block px-3 py-1 bg-neutral-900 text-white text-xs font-medium rounded-full">
                      Most popular
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <h3
                    className="text-2xl font-medium text-neutral-900 mb-1"
                    style={{
                      fontFamily: "'Newsreader', serif",
                    }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    {plan.isCustom && (
                      <span className="text-sm text-neutral-500 mr-1">
                        From
                      </span>
                    )}
                    <span
                      className="text-4xl font-semibold text-neutral-900"
                      style={{
                        fontFamily: "'Newsreader', serif",
                      }}>
                      ${currentPrice(plan)}
                    </span>
                    <span className="text-neutral-500 text-sm">
                      /member/month
                    </span>
                  </div>
                  {billingCycle === "annually" && (
                    <p className="text-sm text-neutral-400 mt-1">
                      ${plan.annualTotal} billed yearly
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg text-sm font-medium mb-8 ${
                    plan.ctaStyle === "primary"
                      ? "btn-primary bg-neutral-900 text-white"
                      : "btn-secondary border border-neutral-200 text-neutral-700 bg-white"
                  }`}>
                  {plan.cta}
                </button>

                {/* Limits */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-900 mb-3">
                    Limits
                  </h4>
                  <ul className="space-y-2.5">
                    {plan.limits.map((limit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5">
                        {limit.custom ? (
                          <Settings className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-neutral-900 flex items-center justify-center mt-0.5 flex-shrink-0 check-icon">
                            <Check
                              className="w-2.5 h-2.5 text-white"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                        <span className="text-sm text-neutral-600">
                          {limit.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Advanced */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-900 mb-3">
                    Advanced
                  </h4>
                  <ul className="space-y-2.5">
                    {plan.advanced.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5">
                        {feature.included ? (
                          <div className="w-4 h-4 rounded-full bg-neutral-900 flex items-center justify-center mt-0.5 flex-shrink-0 check-icon">
                            <Check
                              className="w-2.5 h-2.5 text-white"
                              strokeWidth={3}
                            />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-neutral-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Check
                              className="w-2.5 h-2.5 text-neutral-400"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-neutral-600"
                              : "text-neutral-400"
                          }`}>
                          {feature.text}
                          {feature.beta && (
                            <span className="ml-1.5 inline-block px-1.5 py-0.5 bg-neutral-100 text-neutral-500 text-xs rounded">
                              Beta
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Admin */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 mb-3">
                    Admin
                  </h4>
                  <ul className="space-y-2.5">
                    {plan.admin.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5">
                        {feature.included ? (
                          <div className="w-4 h-4 rounded-full bg-neutral-900 flex items-center justify-center mt-0.5 flex-shrink-0 check-icon">
                            <Check
                              className="w-2.5 h-2.5 text-white"
                              strokeWidth={3}
                            />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-neutral-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Check
                              className="w-2.5 h-2.5 text-neutral-400"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-neutral-600"
                              : "text-neutral-400"
                          }`}>
                          {feature.text}
                          {feature.comingSoon && (
                            <span className="ml-1.5 text-neutral-400">
                              (coming soon)
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-6 lg:px-8 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div></div>
            <div className="text-center">
              <span className="text-sm font-medium text-neutral-900">
                Standard
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-neutral-900">
                Premium
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-neutral-900">
                Custom
              </span>
            </div>
          </div>

          {/* Feature Categories */}
          {comparisonFeatures.map((category) => (
            <div key={category.category} className="mb-8">
              <h3
                className="text-xl font-medium text-neutral-900 mb-4 pb-2 border-b border-neutral-200"
                style={{
                  fontFamily: "'Newsreader', serif",
                }}>
                {category.category}
              </h3>
              <div className="space-y-0">
                {category.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 gap-4 py-4 border-b border-neutral-100">
                    <div className="text-sm text-neutral-600">
                      {feature.name}
                      {feature.comingSoon && (
                        <span className="ml-1.5 text-neutral-400">
                          (coming soon)
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center">
                      {feature.standard ? (
                        <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center">
                          <X
                            className="w-3 h-3 text-neutral-300"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center">
                      {feature.premium ? (
                        <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center">
                          <X
                            className="w-3 h-3 text-neutral-300"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center">
                      {feature.custom ? (
                        <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center">
                          <X
                            className="w-3 h-3 text-neutral-300"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-0">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="faq-item border-b border-neutral-200">
                <button
                  onClick={() =>
                    setExpandedFaq(
                      expandedFaq === idx ? -1 : idx,
                    )
                  }
                  className="w-full py-6 flex items-center justify-between text-left">
                  <h3
                    className="text-lg font-medium text-neutral-900 pr-4"
                    style={{
                      fontFamily: "'Newsreader', serif",
                    }}>
                    {faq.question}
                  </h3>
                  {expandedFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                  )}
                </button>
                <div
                  className="faq-content"
                  style={{
                    maxHeight:
                      expandedFaq === idx ? "200px" : "0",
                    opacity: expandedFaq === idx ? 1 : 0,
                  }}>
                  <p className="pb-6 text-neutral-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl lg:text-4xl font-medium text-neutral-900 mb-4"
            style={{
              fontFamily: "'Newsreader', serif",
              lineHeight: 1.2,
            }}>
            Ready to build real relationships?
          </h2>
          <p className="text-neutral-500 mb-8">
            Start your 14-day free trial. No credit card
            required.
          </p>
          <button className="btn-primary inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg">
            Start free trial
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
              <Smile
                className="w-5 h-5 text-white"
                strokeWidth={2.5}
              />
            </div>
            <span
              className="text-xl font-medium"
              style={{ fontFamily: "'Newsreader', serif" }}>
              CRMOne.
            </span>
          </div>
          <p className="text-sm text-neutral-400">
            © 2025 CRMOne. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
