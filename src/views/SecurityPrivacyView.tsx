import React, { useState } from 'react';
import { StudentProfile } from '../types/student';
import {
  Shield,
  KeyRound,
  Lock,
  Clock,
  Smartphone,
  History,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  Fingerprint,
} from 'lucide-react';
import { changeStudentPassword, updateCurrentStudentProfile } from '../services/storage';
import { sound } from '../services/audio';

interface SecurityPrivacyViewProps {
  student: StudentProfile;
  onProfileUpdated: (updated: StudentProfile) => void;
}

export const SecurityPrivacyView: React.FC<SecurityPrivacyViewProps> = ({
  student,
  onProfileUpdated,
}) => {
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwdStatus, setPwdStatus] = useState<{ success: boolean; msg: string } | null>(null);
  const [isChangingPwd, setIsChangingPwd] = useState(false);

  // Inactivity timeout setting
  const [autoLogoutMins, setAutoLogoutMins] = useState(student.security.autoLogoutMinutes || 15);
  const [twoFactor, setTwoFactor] = useState(student.security.twoFactorEnabled);
  const [sessions, setSessions] = useState(student.security.activeSessions);
  const [settingSaveSuccess, setSettingSaveSuccess] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdStatus(null);

    if (newPassword !== confirmPassword) {
      setPwdStatus({ success: false, msg: 'New password and confirmation do not match.' });
      return;
    }

    if (newPassword.length < 8) {
      setPwdStatus({ success: false, msg: 'Password must be at least 8 characters long.' });
      return;
    }

    setIsChangingPwd(true);
    sound.playClick();

    const res = await changeStudentPassword(currentPassword, newPassword);
    setIsChangingPwd(false);

    if (res.success) {
      setPwdStatus({
        success: true,
        msg: 'Password updated successfully! Cryptographic hash refreshed in secure vault.',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPwdStatus({ success: false, msg: res.error || 'Password update failed.' });
    }
  };

  const handleSaveSecurityPreferences = async () => {
    sound.playClick();
    const updated = await updateCurrentStudentProfile({
      security: {
        ...student.security,
        autoLogoutMinutes: autoLogoutMins,
        twoFactorEnabled: twoFactor,
        activeSessions: sessions,
      },
    });
    onProfileUpdated(updated);
    setSettingSaveSuccess(true);
    setTimeout(() => setSettingSaveSuccess(false), 3000);
  };

  const handleRevokeSession = (sessionId: string) => {
    sound.playClick();
    const updatedSessions = sessions.filter((s) => s.id !== sessionId);
    setSessions(updatedSessions);
    updateCurrentStudentProfile({
      security: {
        ...student.security,
        activeSessions: updatedSessions,
      },
    }).then(onProfileUpdated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Private Security & Session Management Console
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Cryptographic password management, biometric 2FA parameters, session lifetime, and real-time audit ledger
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <KeyRound className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Change Account Password
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Passwords are cryptographically hashed using SHA-256 before storage.
          </p>

          {pwdStatus && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                pwdStatus.success
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
              }`}
            >
              {pwdStatus.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              )}
              <span>{pwdStatus.msg}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full pl-3 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-2 text-slate-400 hover:text-slate-600"
                >
                  {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                New Password (Minimum 8 Characters)
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter strong new password"
                  className="w-full pl-3 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-2 text-slate-400 hover:text-slate-600"
                >
                  {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isChangingPwd}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition-colors shadow-sm"
            >
              {isChangingPwd ? 'Updating Cryptographic Hash...' : 'Update Password Hash'}
            </button>
          </form>
        </div>

        {/* Inactivity & 2FA Session Settings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Session Governance & Privacy Settings
            </h3>
          </div>

          {settingSaveSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Security preferences saved successfully!</span>
            </div>
          )}

          {/* Automatic Inactivity Logout */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-900 dark:text-white">
              Automatic Logout on Inactivity
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Terminates active session and locks personal records when no input is detected.
            </p>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[5, 15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setAutoLogoutMins(mins)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    autoLogoutMins === mins
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  {mins} Mins
                </button>
              ))}
            </div>
          </div>

          {/* Two-Factor Authentication Toggle */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                <Fingerprint className="w-4 h-4 text-blue-500" />
                <span>Biometric Three.js Verification Gate</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Enforces 3D FACE biometric authentication check on every student login.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                twoFactor ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  twoFactor ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <button
            onClick={handleSaveSecurityPreferences}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-white hover:bg-blue-600 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors shadow-sm"
          >
            Save Security Preferences
          </button>
        </div>
      </div>

      {/* Active Login Sessions Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Active Authorized Sessions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Devices currently holding authenticated cryptographic tokens for your student record
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {sess.device}
                    </span>
                    {sess.isCurrent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                        This Current Device
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 font-mono text-[11px]">
                    IP: {sess.ip} · {sess.browser} · {sess.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-[11px]">{sess.lastActive}</span>
                {!sess.isCurrent && (
                  <button
                    onClick={() => handleRevokeSession(sess.id)}
                    className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                  >
                    Revoke Access
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Audit Log */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <History className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Real-Time Security Audit Ledger
          </h3>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {student.security.auditLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    log.status === 'Success'
                      ? 'bg-emerald-500'
                      : log.status === 'Warning'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {log.action}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-slate-400 font-mono text-[11px]">
                <span>{log.ipAddress}</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
