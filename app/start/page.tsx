"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Suspense } from "react";

interface FormData {
  firstName: string;
  businessName: string;
  industry: string;
  websiteStatus: string;
  packageInterest: string;
  goal: string;
  phone: string;
  email: string;
  timeline: string;
}

const industries = [
  "Mobile Detailer",
  "Cleaning Company",
  "Contractor / Builder",
  "Consultant",
  "Plumber / HVAC",
  "Landscaping",
  "Retail / Shop",
  "Restaurant / Food",
  "Personal Trainer / Coach",
  "Other Service Business",
];

const packages = [
  { id: "starter", label: "Starter Landing Page — $399", detail: "1 page · 1–3 days" },
  { id: "core", label: "Core Business Site — $999", detail: "5 pages · 2–4 days" },
  { id: "pro", label: "Pro + E-Commerce — $2,999", detail: "10 pages · 3–7 days" },
  { id: "unsure", label: "Not sure yet — help me decide", detail: "" },
];

function StartForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultPkg = searchParams.get("pkg") || "";

  const [form, setForm] = useState<FormData>({
    firstName: "",
    businessName: "",
    industry: "",
    websiteStatus: "",
    packageInterest: defaultPkg,
    goal: "",
    phone: "",
    email: "",
    timeline: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.businessName || (!form.email && !form.phone)) {
      setError("Please fill in your name, business name, and at least one contact method.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please email us directly at hello@vizulux.com");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding bg-hero-gradient pb-10">
        <div className="container-max mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            <span className="badge bg-green/15 text-green border border-green/30 mb-5">
              Let&apos;s Build Your Website
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Tell Us About Your Project.{" "}
              <span className="gradient-text">Takes 2 Minutes.</span>
            </h1>
            <p className="mt-4 text-white/60 text-base">
              No payment. No commitment. Just tell us about your business and we&apos;ll follow up within 2 hours.
            </p>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><Shield size={13} className="text-green" /> Zero deposit until approval</span>
              <span className="flex items-center gap-1.5"><Clock size={13} className="text-accent" /> Response within 2 hours</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-gold" /> 100% confidential</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-dark-card border border-white/8 rounded-3xl p-6 sm:p-8 space-y-6"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  First Name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="Zack"
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Business Name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder="Vermont Shine Co."
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Industry / Business Type
              </label>
              <select
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
              >
                <option value="">Select your industry...</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Website status */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                What&apos;s your current situation?
              </label>
              <div className="space-y-2">
                {[
                  { id: "none", label: "No website yet", detail: "Starting from scratch" },
                  { id: "bad", label: "Have one but it's bad", detail: "Needs a full rebuild" },
                  { id: "rebuild", label: "Need a complete redesign", detail: "Keep the brand, start over" },
                ].map(({ id, label, detail }) => (
                  <label key={id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    form.websiteStatus === id ? "border-accent bg-accent/8" : "border-white/8 hover:border-white/15"
                  }`}>
                    <input
                      type="radio"
                      name="websiteStatus"
                      value={id}
                      checked={form.websiteStatus === id}
                      onChange={(e) => update("websiteStatus", e.target.value)}
                      className="accent-accent"
                    />
                    <div>
                      <span className="text-sm font-medium text-white">{label}</span>
                      <span className="text-xs text-muted ml-2">{detail}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Package */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Which package interests you?
              </label>
              <div className="space-y-2">
                {packages.map(({ id, label, detail }) => (
                  <label key={id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    form.packageInterest === id ? "border-accent bg-accent/8" : "border-white/8 hover:border-white/15"
                  }`}>
                    <input
                      type="radio"
                      name="packageInterest"
                      value={id}
                      checked={form.packageInterest === id}
                      onChange={(e) => update("packageInterest", e.target.value)}
                      className="accent-accent"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white">{label}</span>
                      {detail && <span className="text-xs text-muted ml-2">{detail}</span>}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                What&apos;s your #1 goal for this website?
              </label>
              <textarea
                value={form.goal}
                onChange={(e) => update("goal", e.target.value)}
                placeholder="E.g. 'Get more phone calls from local customers' or 'Look more professional than my competitor'"
                rows={3}
                className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(802) 555-0100"
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@yourbusiness.com"
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
            <p className="text-xs text-muted -mt-2">Provide at least one. SMS converts 5x faster.</p>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                How soon do you need this?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "asap", label: "ASAP", detail: "Right now" },
                  { id: "soon", label: "1–2 Weeks", detail: "No rush" },
                  { id: "exploring", label: "Just Exploring", detail: "No deadline" },
                ].map(({ id, label, detail }) => (
                  <label key={id} className={`text-center p-3 rounded-xl border cursor-pointer transition-all ${
                    form.timeline === id ? "border-accent bg-accent/8" : "border-white/8 hover:border-white/15"
                  }`}>
                    <input
                      type="radio"
                      name="timeline"
                      value={id}
                      checked={form.timeline === id}
                      onChange={(e) => update("timeline", e.target.value)}
                      className="sr-only"
                    />
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs text-muted mt-0.5">{detail}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red bg-red/10 border border-red/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending your project details...
                </>
              ) : (
                "Send My Project Details — I'll Hear Back Within 2 Hours →"
              )}
            </button>

            <p className="text-center text-xs text-muted">
              🔒 No payment. No commitment. 100% confidential.
            </p>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-white">Loading...</div>}>
      <StartForm />
    </Suspense>
  );
}
