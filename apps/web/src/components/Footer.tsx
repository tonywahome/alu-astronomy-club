"use client";

import Link from "next/link";
import { Mail, MessageCircle, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0c10] border-t border-[#66fcf1]/10 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-orbitron font-bold text-[#66fcf1] mb-4">
              ALU Astronomy Club
            </h3>
            <p className="text-white/60 text-sm">
              Exploring the cosmos, inspiring discovery, and connecting students
              through the wonders of space.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/60 hover:text-[#66fcf1] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-white/60 hover:text-[#66fcf1] transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="text-white/60 hover:text-[#66fcf1] transition-colors"
                >
                  Apply
                </Link>
              </li>
              <li>
                <Link
                  href="/leadership"
                  className="text-white/60 hover:text-[#66fcf1] transition-colors"
                >
                  Leadership
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:alu.astronomy@club.edu"
                  className="text-white/60 hover:text-[#66fcf1] transition-colors flex items-center gap-2"
                >
                  <Mail size={16} /> Email
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/yourwhatsappnumber"
                  className="text-white/60 hover:text-[#66fcf1] transition-colors flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/aluastronomyclub"
                  className="text-white/60 hover:text-[#66fcf1] transition-colors flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={16} /> Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-4">Follow</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/aluastronomyclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#66fcf1] hover:text-[#0b0c10] flex items-center justify-center transition-all"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#66fcf1]/10 pt-8">
          <p className="text-center text-white/50 text-sm">
            © {currentYear} ALU Astronomy Club. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
