'use client';

import Link from 'next/link';
import { Menu, X, LogOut, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              CC
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:inline">
              Community Care
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
            >
              Home
            </Link>
            <Link
              href="/activities"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
            >
              Activities
            </Link>
            <Link
              href="/volunteer"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
            >
              Volunteer
            </Link>
            <Link
              href="/cleanup-recommendation"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
            >
              Cleanup
            </Link>
            <Link
              href="/snow-pickup"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
            >
              Snow Pickup
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
            >
              Contact
            </Link>

            {/* Auth Links */}
            {isMounted && !loading && user && (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded bg-blue-50"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 px-2 py-1 rounded"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}

            {isMounted && !loading && !user && (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <Link
              href="/"
              className="block px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/activities"
              className="block px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Activities
            </Link>
            <Link
              href="/volunteer"
              className="block px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Volunteer
            </Link>
            <Link
              href="/cleanup-recommendation"
              className="block px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Cleanup
            </Link>
            <Link
              href="/snow-pickup"
              className="block px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Snow Pickup
            </Link>
            <Link
              href="/contact"
              className="block px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Auth Links */}
            {isMounted && !loading && user && (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-2 py-2 text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-2 py-2 text-red-600 hover:text-red-700 font-medium text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}

            {isMounted && !loading && !user && (
              <Link
                href="/login"
                className="block px-2 py-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-center"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
