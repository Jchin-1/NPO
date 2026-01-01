'use client';

import Link from 'next/link';
import { Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:max-w-4xl md:mx-auto">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logos/npo logo.png"
                alt="Peel Community Club"
                className="h-10 w-auto"
              />
              <h3 className="text-xl font-bold">Peel Community Club</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Dedicated to serving and supporting our community with compassion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/activities"
                  className="hover:text-white transition-colors"
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  href="/snow-pickup"
                  className="hover:text-white transition-colors"
                >
                  Snow Pickup
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex gap-2 items-start">
                <Mail className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>peelcommunityclub@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media - Removed */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Peel Community Club. All rights reserved.
            </p>
            <Link
              href="/login"
              className="text-gray-400 hover:text-gray-200 text-sm font-medium transition-colors mt-4 sm:mt-0"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
