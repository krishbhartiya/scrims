'use client';
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import { signInWithGoogle, signInWithEmail, sendPhoneVerificationCode, verifyPhoneCode, initializeRecaptcha, formatPhoneNumber, resetRecaptcha } from '@/lib/firebaseAuth';
import { ConfirmationResult } from 'firebase/auth';
import '@/lib/firebaseDebug';

type AuthMode = 'email' | 'phone';

interface FormData {
  email: string;
  password: string;
  phoneNumber: string;
  verificationCode: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  phoneNumber?: string;
  verificationCode?: string;
  general?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('email');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    phoneNumber: '',
    verificationCode: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Cleanup recaptcha on unmount
    return () => {
      resetRecaptcha();
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (authMode === 'email') {
      // Email validation
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    } else {
      // Phone validation
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }

      if (codeSent && !formData.verificationCode) {
        newErrors.verificationCode = 'Verification code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrors({});
    try {
      const result = await signInWithGoogle();
      console.log('Google sign-in successful:', result.user.email);
      router.push('/profile');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setErrors({ general: error.message || 'Failed to sign in with Google' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPhoneCode = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    try {
      const formattedPhone = formatPhoneNumber(formData.phoneNumber);
      console.log('Sending verification code to:', formattedPhone);
      const recaptchaVerifier = initializeRecaptcha('recaptcha-container');
      const confirmation = await sendPhoneVerificationCode(formattedPhone, recaptchaVerifier);
      setConfirmationResult(confirmation);
      setCodeSent(true);
      console.log('Verification code sent successfully');
    } catch (error: any) {
      console.error('Phone verification error:', error);
      setErrors({ general: error.message || 'Failed to send verification code' });
      resetRecaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPhoneCode = async () => {
    if (!confirmationResult || !formData.verificationCode) {
      setErrors({ verificationCode: 'Please enter the verification code' });
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      await verifyPhoneCode(confirmationResult, formData.verificationCode);
      router.push('/profile');
    } catch (error: any) {
      setErrors({ general: error.message || 'Invalid verification code' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (authMode === 'phone') {
      if (codeSent) {
        await handleVerifyPhoneCode();
      } else {
        await handleSendPhoneCode();
      }
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    try {
      const result = await signInWithEmail(formData.email, formData.password);
      console.log('Email sign-in successful:', result.user.email);
      router.push('/profile');
    } catch (error: any) {
      console.error('Email sign-in error:', error);
      setErrors({ general: error.message || 'Failed to sign in' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Clear general errors
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9146FF]/20 via-transparent to-transparent py-8">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#18181B] rounded-2xl border border-[#2D2D31] p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-[#9146FF] rounded-lg flex items-center justify-center font-bold text-white text-2xl">
                G
              </div>
              <span className="text-2xl font-bold text-white">GameWave</span>
            </Link>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-[#ADADAD]">Sign in to continue to GameWave</p>
          </div>

          {/* Login Methods */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-sm text-red-500 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.general}
                </p>
              </div>
            )}

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 bg-[#9146FF] hover:bg-[#7d3cd6] text-white font-semibold py-4 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2D2D31]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#18181B] text-[#ADADAD]">Or continue with</span>
              </div>
            </div>

            {/* Auth Mode Tabs */}
            <div className="flex space-x-2 bg-[#0E0E10] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('email');
                  setCodeSent(false);
                  setErrors({});
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  authMode === 'email'
                    ? 'bg-[#9146FF] text-white'
                    : 'text-[#ADADAD] hover:text-white'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('phone');
                  setCodeSent(false);
                  setErrors({});
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  authMode === 'phone'
                    ? 'bg-[#9146FF] text-white'
                    : 'text-[#ADADAD] hover:text-white'
                }`}
              >
                Phone
              </button>
            </div>

            {/* Email Login Form */}
            {authMode === 'email' && (
              <>
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-[#ADADAD] text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full bg-[#0E0E10] text-white px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-[#2D2D31]'
                    } focus:border-[#9146FF] focus:outline-none focus:ring-2 focus:ring-[#9146FF]/20 transition-all`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-[#ADADAD] text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      className={`w-full bg-[#0E0E10] text-white px-4 py-3 pr-12 rounded-lg border ${
                        errors.password ? 'border-red-500' : 'border-[#2D2D31]'
                      } focus:border-[#9146FF] focus:outline-none focus:ring-2 focus:ring-[#9146FF]/20 transition-all`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ADADAD] hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      className="w-4 h-4 rounded border-[#2D2D31] bg-[#0E0E10] text-[#9146FF] focus:ring-[#9146FF]/20"
                      disabled={isLoading}
                    />
                    <span className="text-[#ADADAD]">Remember me</span>
                  </label>
                  <a href="#" className="text-[#9146FF] hover:text-[#7d3cd6] transition-colors">
                    Forgot password?
                  </a>
                </div>
              </>
            )}

            {/* Phone Login Form */}
            {authMode === 'phone' && (
              <>
                {!codeSent ? (
                  <div>
                    <label htmlFor="phoneNumber" className="block text-[#ADADAD] text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full bg-[#0E0E10] text-white px-4 py-3 rounded-lg border ${
                        errors.phoneNumber ? 'border-red-500' : 'border-[#2D2D31]'
                      } focus:border-[#9146FF] focus:outline-none focus:ring-2 focus:ring-[#9146FF]/20 transition-all`}
                      disabled={isLoading}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label htmlFor="verificationCode" className="block text-[#ADADAD] text-sm font-medium mb-2">
                      Verification Code
                    </label>
                    <input
                      id="verificationCode"
                      type="text"
                      value={formData.verificationCode}
                      onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                      placeholder="123456"
                      className={`w-full bg-[#0E0E10] text-white px-4 py-3 rounded-lg border ${
                        errors.verificationCode ? 'border-red-500' : 'border-[#2D2D31]'
                      } focus:border-[#9146FF] focus:outline-none focus:ring-2 focus:ring-[#9146FF]/20 transition-all`}
                      disabled={isLoading}
                      maxLength={6}
                    />
                    {errors.verificationCode && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.verificationCode}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setCodeSent(false);
                        setFormData(prev => ({ ...prev, verificationCode: '' }));
                        resetRecaptcha();
                      }}
                      className="mt-2 text-sm text-[#9146FF] hover:text-[#7d3cd6]"
                    >
                      Change phone number
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2D2D31] hover:bg-[#3D3D41] text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? authMode === 'phone'
                  ? codeSent
                    ? 'Verifying...'
                    : 'Sending Code...'
                  : 'Signing in...'
                : authMode === 'phone'
                ? codeSent
                  ? 'Verify Code'
                  : 'Send Code'
                : 'Sign In'}
            </button>
          </form>

          {/* reCAPTCHA container */}
          <div id="recaptcha-container"></div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-[#ADADAD]">Don't have an account? </span>
            <Link href="/auth/signup" className="text-[#9146FF] hover:text-[#7d3cd6] font-semibold transition-colors">
              Sign up
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-[#ADADAD] hover:text-white text-sm transition-colors inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
