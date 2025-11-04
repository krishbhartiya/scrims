'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#18181B]/95 backdrop-blur-lg border-b border-[#2D2D31] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 hover:opacity-80 transition-opacity group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#9146FF] to-[#7d3cd6] rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-[#9146FF]/30 group-hover:scale-110 transition-transform">
              G
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline">GameWave</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-[#9146FF] transition-colors font-medium relative group">
              <span>Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#9146FF] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/browse" className="text-white hover:text-[#9146FF] transition-colors font-medium relative group">
              <span>Browse</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#9146FF] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/profile" className="text-white hover:text-[#9146FF] transition-colors font-medium relative group">
              <span>Profile</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#9146FF] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/auth/login"
              className="px-6 py-2.5 bg-[#9146FF] text-white rounded-lg font-semibold hover:bg-[#7d3cd6] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#9146FF]/30"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2.5 hover:bg-[#2D2D31] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2D2D31] animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-white hover:text-[#9146FF] transition-colors font-medium px-3 py-2.5 hover:bg-[#2D2D31] rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/browse"
                className="text-white hover:text-[#9146FF] transition-colors font-medium px-3 py-2.5 hover:bg-[#2D2D31] rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                href="/profile"
                className="text-white hover:text-[#9146FF] transition-colors font-medium px-3 py-2.5 hover:bg-[#2D2D31] rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-2.5 bg-[#9146FF] text-white rounded-lg font-semibold hover:bg-[#7d3cd6] transition-all text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
