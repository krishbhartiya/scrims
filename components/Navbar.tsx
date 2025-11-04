'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/firebaseAuth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-[#2D2D31] animate-pulse"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#2D2D31] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9146FF] to-[#7d3cd6] flex items-center justify-center text-white font-semibold">
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-white font-medium">{user.displayName || user.email?.split('@')[0]}</span>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#18181B] border border-[#2D2D31] rounded-lg shadow-xl py-1 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-white hover:bg-[#2D2D31] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#2D2D31] transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/login"
                  className="px-4 py-2 text-white hover:text-[#9146FF] transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/signup"
                  className="px-6 py-2.5 bg-[#9146FF] text-white rounded-lg font-semibold hover:bg-[#7d3cd6] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#9146FF]/30"
                >
                  Sign Up
                </Link>
              </>
            )}
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
              {loading ? (
                <div className="px-3 py-2.5">
                  <div className="h-10 bg-[#2D2D31] rounded-lg animate-pulse"></div>
                </div>
              ) : user ? (
                <>
                  <div className="px-3 py-2.5 border-t border-[#2D2D31] mt-2">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9146FF] to-[#7d3cd6] flex items-center justify-center text-white font-semibold">
                        {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.displayName || user.email?.split('@')[0]}</p>
                        <p className="text-[#ADADAD] text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2.5 bg-[#2D2D31] text-white rounded-lg font-semibold hover:bg-[#3D3D41] transition-all text-center mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2.5 bg-[#9146FF] text-white rounded-lg font-semibold hover:bg-[#7d3cd6] transition-all text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
