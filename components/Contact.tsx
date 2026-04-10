"use client";

import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { ContactData } from "../lib/types";

interface Props {
  contact: ContactData;
}

function createInitialFormData() {
  return {
    name: "",
    email: "",
    service: "",
    details: "",
  };
}

export default function Contact({ contact }: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [formData, setFormData] = useState(createInitialFormData);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmissionError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Could not submit your message. Please try again.");
      }

      setFormData(createInitialFormData());
      setIsSubmitted(true);
    } catch (error) {
      setSubmissionError(
        error instanceof Error && error.message
          ? error.message
          : "Could not submit your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof ReturnType<typeof createInitialFormData>, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-[1.1] text-white">
            {contact.headline} <span className="text-primary">{contact.highlightedText}</span>
          </h2>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 md:mb-12 max-w-lg">
            {contact.description}
          </p>
          <div className="space-y-4 font-headline">
            <div className="flex items-center gap-4 text-primary text-sm md:text-base">
              <Mail size={20} />
              <span>{contact.email}</span>
            </div>
            <div className="flex items-center gap-4 text-primary text-sm md:text-base">
              <MapPin size={20} />
              <span>{contact.location}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface-container-high p-8 md:p-10 rounded-xl min-h-100 flex flex-col justify-center"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="text-[10px] uppercase tracking-widest font-bold opacity-60 text-white"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary text-white placeholder-on-surface-variant/30 py-3 px-4 outline-none transition-all"
                      placeholder="Your name"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="text-[10px] uppercase tracking-widest font-bold opacity-60 text-white"
                    >
                      Work Email
                    </label>
                    <input
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary text-white placeholder-on-surface-variant/30 py-3 px-4 outline-none transition-all"
                      placeholder="you@company.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-service"
                    className="text-[10px] uppercase tracking-widest font-bold opacity-60 text-white"
                  >
                    Service Needed
                  </label>
                  <select
                    id="contact-service"
                    required
                    value={formData.service}
                    onChange={(e) => updateField("service", e.target.value)}
                    className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary text-white py-3 px-4 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {contact.services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-details"
                    className="text-[10px] uppercase tracking-widest font-bold opacity-60 text-white"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="contact-details"
                    required
                    value={formData.details}
                    onChange={(e) => updateField("details", e.target.value)}
                    className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary text-white placeholder-on-surface-variant/30 py-3 px-4 outline-none transition-all resize-none"
                    placeholder="What do you need built?"
                    rows={4}
                  ></textarea>
                </div>
                {submissionError && (
                  <p className="text-sm text-red-400">{submissionError}</p>
                )}
                <button
                  disabled={isSubmitting}
                  className="w-full bg-primary-container text-on-primary-fixed py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_20px_rgba(255,187,0,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="flex justify-center">
                  <CheckCircle2 size={64} className="text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Message Received</h3>
                <p className="text-on-surface-variant">
                  We&apos;ll review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmissionError("");
                    setFormData(createInitialFormData());
                    setIsSubmitted(false);
                  }}
                  className="text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
