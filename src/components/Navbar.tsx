import React, { useState } from 'react';
import { StudentProfile } from '../types/student';
import {
  Search,
  Moon,
  Sun,
  Printer,
  Bell,
  Menu,
  Shield,
  Clock,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { sound } from '../services/audio';

interface NavbarProps {
  student: StudentProfile;
  currentTabTitle: string;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onOpenPrint: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  inactivitySecondsRemaining: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  student,
  currentTabTitle,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenPrint,
  isDarkMode,
  onToggleDarkMode,
  inactivitySecondsRemaining,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const sampleNotifications = [
    {
      id: 1,
      title: 'Document Verified',
      desc: 'SSC Secondary School Certificate attested by Dean Office.',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: 2,
      title: 'Academic Term Registration',
      desc: 'Enrollment confirmed for 7th Semester (2024-2025).',
      time: '1 day ago',
      type: 'info',
    },
    {
      id: 3,
      title: 'Security Notice',
      desc: 'Biometric Face ID authentication active on your profile.',
      time: '3 days ago',
      type: 'security',
    },
  ];

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) sound.playClick();
  };

  const minutesRemaining = Math.floor(inactivitySecondsRemaining / 60);

  return (
    <header className="h-18 px-4 sm:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white capitalize">
            {currentTabTitle}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
            {student.academic.collegeName} · {student.academic.department}
          </p>
        </div>
      </div>

      {/* Center: Global Search Trigger Button */}
      <button
        onClick={() => {
          sound.playClick();
          onOpenSearch();
        }}
        className="hidden md:flex items-center gap-3 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-500 dark:text-slate-400 max-w-sm w-full transition-colors"
      >
        <Search className="w-4 h-4 text-slate-400" />
        <span className="flex-1 text-left truncate">Search documents, subjects, records...</span>
        <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded font-mono text-slate-400">
          ⌘K
        </kbd>
      </button>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Icon */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Inactivity Session Remaining Indicator */}
        <div
          title="Session inactivity timeout"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{minutesRemaining}m Session</span>
        </div>

        {/* Print Profile / Dossier Button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenPrint();
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
          title="Print official student profile"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Dossier</span>
        </button>

        {/* Audio Mute/Unmute toggle */}
        <button
          onClick={toggleSound}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleDarkMode();
          }}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              sound.playClick();
              setShowNotifications(!showNotifications);
            }}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 text-xs z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                <span className="font-bold text-slate-900 dark:text-white">
                  Student Alerts & Notices
                </span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                  3 Unread
                </span>
              </div>

              <div className="space-y-2.5">
                {sampleNotifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowNotifications(false)}
                className="w-full mt-3 py-1.5 text-center text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Close Notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
