import React from 'react';
import { StudentProfile } from '../types/student';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  FileText,
  Phone,
  Building2,
  Info,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { sound } from '../services/audio';

export type TabId =
  | 'dashboard'
  | 'personal'
  | 'academic'
  | 'documents'
  | 'contact'
  | 'college'
  | 'additional'
  | 'security';

interface SidebarProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onLogout: () => void;
  student: StudentProfile;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  student,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const menuItems: Array<{ id: TabId; label: string; icon: React.ReactNode; badge?: string | number }> = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'personal',
      label: 'Personal Information',
      icon: <User className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'academic',
      label: 'Academic Details',
      icon: <GraduationCap className="w-5 h-5 shrink-0" />,
      badge: 'S7',
    },
    {
      id: 'documents',
      label: 'My Documents',
      icon: <FileText className="w-5 h-5 shrink-0" />,
      badge: student.documents.length,
    },
    {
      id: 'contact',
      label: 'Contact Information',
      icon: <Phone className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'college',
      label: 'College Information',
      icon: <Building2 className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'additional',
      label: 'Additional Information',
      icon: <Info className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'security',
      label: 'Security & Privacy',
      icon: <ShieldCheck className="w-5 h-5 shrink-0" />,
    },
  ];

  const handleTabClick = (tabId: TabId) => {
    sound.playClick();
    onSelectTab(tabId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Branding */}
        <div>
          <div className="h-18 px-5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/30">
                <Shield className="w-5 h-5" />
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white tracking-tight text-base truncate">
                      AEGIS
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">
                      PORTAL
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    Student Identity Vault
                  </p>
                </div>
              )}
            </div>

            {/* Collapse toggle (desktop only) */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <span
                    className={`${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-blue-400 transition-colors'
                    }`}
                  >
                    {item.icon}
                  </span>

                  {!isCollapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}

                  {!isCollapsed && item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Student Card & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          {/* Mini Student Pill */}
          <div
            className={`flex items-center gap-3 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-blue-500/40 shrink-0">
              <img
                src={student.profilePhoto}
                alt={student.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">
                  {student.fullName}
                </p>
                <p className="text-[10px] text-slate-400 font-mono truncate">
                  {student.studentId}
                </p>
              </div>
            )}
          </div>

          {/* Logout Action */}
          <button
            onClick={() => {
              sound.playClick();
              onLogout();
            }}
            title={isCollapsed ? 'Logout' : undefined}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-600/20 border border-transparent hover:border-rose-500/30 transition-all ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
