'use client';

import Link from 'next/link';
import { Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Community Care</h3>
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
                <Phone className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex gap-2 items-start">
                <Mail className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>info@communitycare.org</span>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>123 Main St, City, State 12345</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Community Care NPO. All rights reserved.
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
