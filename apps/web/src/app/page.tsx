"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowDown } from "lucide-react";

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-[#0b0c10] via-[#1f2833] to-[#0b0c10] relative overflow-hidden pt-16 flex items-center">
        {/* Animated starfield background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ top: "20%", left: "10%" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ top: "40%", left: "80%", animationDelay: "1s" }}
          />
          <div
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{ top: "60%", left: "30%", animationDelay: "2s" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ top: "80%", left: "70%", animationDelay: "1.5s" }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="font-orbitron font-bold text-5xl sm:text-6xl lg:text-7xl mb-6 text-[#66fcf1]"
            variants={fadeInUp}
          >
            Exploring Beyond the Horizon
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-white/80 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Connecting students through the wonders of space
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <Link href="/apply" className="btn-primary">
              Join the Mission
            </Link>
            <Link href="/projects" className="btn-secondary">
              Explore Projects
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="text-[#66fcf1]" size={24} />
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b0c10]">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Mission Card */}
            <motion.div
              className="glass p-8 rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 rounded-lg bg-[#45a29e] flex items-center justify-center mb-4">
                <span className="text-2xl"></span>
              </div>
              <h2 className="font-orbitron font-bold text-2xl text-[#66fcf1] mb-4">
                Our Mission
              </h2>
              <p className="text-white/70 leading-relaxed">
                To foster a vibrant community of space enthusiasts, where
                students explore the wonders of the universe, share knowledge,
                and engage in hands-on activities that ignite curiosity and
                inspire lifelong learning.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="glass p-8 rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 rounded-lg bg-[#45a29e] flex items-center justify-center mb-4">
                <span className="text-2xl"></span>
              </div>
              <h2 className="font-orbitron font-bold text-2xl text-[#66fcf1] mb-4">
                Our Vision
              </h2>
              <p className="text-white/70 leading-relaxed">
                To foster scientific inquiry, spark curiosity and advocate for
                the importance of scientific knowledge and research in
                policymaking.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1f2833]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { number: "100+", label: "Active Members" },
              { number: "10+", label: "African Countries Represented" },
              { number: "2025", label: "Founded" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold text-[#66fcf1] mb-2">
                  {stat.number}
                </p>
                <p className="text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b0c10]">
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron font-bold text-4xl mb-6 text-white">
              Ready to Explore?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Join the ALU Astronomy Club and become part of a community
              dedicated to uncovering the mysteries of the cosmos.
            </p>
            <Link href="/apply" className="btn-primary">
              Apply Now
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
