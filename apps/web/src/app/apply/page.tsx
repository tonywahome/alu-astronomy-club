"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ApplicationSchema } from "@alu/types";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ApplicationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    if (!file && data.cv) {
      // File validation
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "cv") {
          formData.append(key, String(value));
        }
      });

      if (file) {
        formData.append("cv", file);
      }

      // For now, mock the API call. Replace with actual endpoint.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      reset();
      setFile(null);

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      if (
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(selectedFile.type)
      ) {
        alert("Only PDF and Word documents are allowed");
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-[#0b0c10] via-[#1f2833] to-[#0b0c10] py-20 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-orbitron font-bold text-4xl sm:text-5xl text-[#66fcf1] mb-4">
              Join the ALU Astronomy Club
            </h1>
            <p className="text-white/70 text-lg">
              Take your first step toward exploring the cosmos with us.
            </p>
          </motion.div>

          {/* Success State */}
          {submitStatus === "success" && (
            <motion.div
              className="mb-8 glass p-8 rounded-xl border-l-4 border-[#45a29e] flex items-start gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle
                className="text-[#45a29e] flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h2 className="font-orbitron font-bold text-[#66fcf1] mb-2">
                  Application Received!
                </h2>
                <p className="text-white/70">
                  Welcome to the stars! We'll review your application and reach
                  out soon. Check your email for confirmation.
                </p>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {submitStatus === "error" && (
            <motion.div
              className="mb-8 glass p-8 rounded-xl border-l-4 border-red-500 flex items-start gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AlertCircle
                className="text-red-500 flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h2 className="font-orbitron font-bold text-red-400 mb-2">
                  Submission Error
                </h2>
                <p className="text-white/70">
                  Something went wrong. Please try again or contact us for help.
                </p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          {submitStatus !== "success" && (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="glass p-8 rounded-xl space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name *
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66fcf1] focus:border-transparent"
                />
                {/* validation errors hidden in UI per request */}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your.email@alu.edu"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66fcf1] focus:border-transparent"
                />
                {/* validation errors hidden in UI per request */}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66fcf1] focus:border-transparent"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Department
                </label>
                <input
                  {...register("department")}
                  type="text"
                  placeholder="e.g., Computer Science, Physics"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66fcf1] focus:border-transparent"
                />
              </div>

              {/* Reason for Joining */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Why do you want to join? *
                </label>
                <textarea
                  {...register("reason")}
                  placeholder="Tell us what inspired you to join the astronomy club..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66fcf1] focus:border-transparent resize-none"
                />
                {/* validation errors hidden in UI per request */}
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Skills & Experience
                </label>
                <textarea
                  {...register("skills")}
                  placeholder="Any relevant skills or experience with astronomy, coding, etc."
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#66fcf1] focus:border-transparent resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Upload CV (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/5 border-2 border-dashed border-[#66fcf1]/50 hover:border-[#66fcf1] cursor-pointer transition-colors"
                  >
                    <Upload size={18} className="text-[#66fcf1]" />
                    <span className="text-white/70">
                      {file ? file.name : "Click to upload CV (PDF or Word)"}
                    </span>
                  </label>
                </div>
                <p className="text-white/50 text-xs mt-2">
                  Max 5MB. PDF or Word documents only.
                </p>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  {...register("consent")}
                  type="checkbox"
                  id="consent"
                  className="mt-1 w-4 h-4 rounded border-white/10 text-[#45a29e] focus:ring-[#66fcf1] bg-white/5"
                />
                <label htmlFor="consent" className="text-white/70 text-sm">
                  I consent to the processing of my personal data and agree to
                  the club's terms. *
                </label>
              </div>
              {/* validation errors hidden in UI per request */}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
