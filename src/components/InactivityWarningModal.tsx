import React, { useEffect, useState } from 'react';
import { Clock, ShieldAlert, LogOut, CheckCircle } from 'lucide-react';
import { sound } from '../services/audio';

interface InactivityWarningModalProps {
  remainingSeconds: number;
  onStayLoggedIn: () => void;
  onLogout: () => void;
}

export const InactivityWarningModal: React.FC<InactivityWarningModalProps> = ({
  remainingSeconds: initialSeconds,
  onStayLoggedIn,
  onLogout,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      onLogout();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onLogout]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-center">
        {/* Warning Icon with Pulsing Halo */}
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
          Session Inactivity Detected
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
          To protect your private personal data and documents, your session will automatically terminate due to inactivity.
        </p>

        {/* Countdown display */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/60 rounded-xl mb-6 flex items-center justify-center gap-3">
          <Clock className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Logging out automatically in{' '}
            <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-base">
              {seconds}s
            </span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onLogout();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Now</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onStayLoggedIn();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Stay Logged In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
