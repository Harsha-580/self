import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Fingerprint,
} from 'lucide-react';
import { authenticateStudent, resetStudentPassword } from '../services/storage';
import { StudentProfile } from '../types/student';
import { sound } from '../services/audio';

interface LoginViewProps {
  onLoginSuccess: (student: StudentProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [studentId, setStudentId] = useState('STU2024CS089');
  const [studentName, setStudentName] = useState('Harsha Vardhan P');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetId, setResetId] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState<{ success: boolean; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    sound.playClick();

    try {
      const result = await authenticateStudent(studentId, password, studentName);
      if (result.success && result.student) {
        onLoginSuccess(result.student);
      } else {
        setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setErrorMessage('A security exception occurred during credential verification.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoStudent = (id: string, name: string) => {
    sound.playClick();
    setStudentId(id);
    setStudentName(name);
    setPassword('Password@123');
    setErrorMessage('');
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setResetStatus({ success: false, msg: 'Password must be at least 8 characters long.' });
      return;
    }
    const res = await resetStudentPassword(resetId, resetEmail, newPassword);
    if (res.success) {
      setResetStatus({
        success: true,
        msg: 'Password updated successfully! You can now log in with your new password.',
      });
      setPassword(newPassword);
    } else {
      setResetStatus({ success: false, msg: res.error || 'Password reset failed.' });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-slate-900 text-slate-100 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top institutional identity bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">AEGIS</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium">
                Identity Vault
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              National University Digital Student Record System
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>FIPS 140-2 · 256-Bit Cryptographic Session</span>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 w-full max-w-md mx-auto px-6 py-4 my-auto">
        <div className="bg-slate-950/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-7 sm:p-8 shadow-2xl relative">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 rounded-full" />

          {/* Title & Welcome Message */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5 flex items-center gap-2">
              <span>Student Sign In</span>
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your credentials to access your personal identity, academic records, and private documents.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Student Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Harsha Vardhan P"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Student ID / Reg No */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Student ID / Registration Number
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. STU2024CS089"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Account Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(true);
                    setResetStatus(null);
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your portal password"
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 p-1 text-slate-400 hover:text-white transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              <Fingerprint className="w-4 h-4" />
              <span>{isLoading ? 'Verifying Student Identity...' : 'Secure Student Login'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </form>

          {/* Quick Demo Student Switcher */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>One-Click Demo Profiles (Testing Accounts)</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillDemoStudent('STU2024CS089', 'Harsha Vardhan P')}
                className={`p-2 rounded-xl text-left border transition-all text-xs ${
                  studentId === 'STU2024CS089'
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-slate-200">Harsha V.</div>
                <div className="text-[10px] text-slate-400">CS 4th Yr</div>
              </button>

              <button
                type="button"
                onClick={() => fillDemoStudent('STU2024AI104', 'Priya Sharma')}
                className={`p-2 rounded-xl text-left border transition-all text-xs ${
                  studentId === 'STU2024AI104'
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-slate-200">Priya S.</div>
                <div className="text-[10px] text-slate-400">AI & DS 3rd Yr</div>
              </button>

              <button
                type="button"
                onClick={() => fillDemoStudent('STU2024EC055', 'Alexander Chen')}
                className={`p-2 rounded-xl text-left border transition-all text-xs ${
                  studentId === 'STU2024EC055'
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-slate-200">Alex Chen</div>
                <div className="text-[10px] text-slate-400">ECE 2nd Yr</div>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              Universal Demo Password: <span className="text-blue-400 font-mono font-medium">Password@123</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 py-6 text-center text-xs text-slate-400">
        <p>
          Aegis University Digital Identity & Student Document Repository · Protected by End-to-End Encryption
        </p>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">
              Reset Student Portal Password
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your Registration Number and registered institutional email to reset your credentials.
            </p>

            {resetStatus && (
              <div
                className={`p-3 rounded-xl mb-4 text-xs ${
                  resetStatus.success
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                }`}
              >
                {resetStatus.msg}
              </div>
            )}

            <form onSubmit={handlePasswordReset} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  required
                  value={resetId}
                  onChange={(e) => setResetId(e.target.value)}
                  placeholder="e.g. STU2024CS089"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="e.g. harshavardhanp580@gmail.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  New Password (min 8 characters)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
