import React from 'react';
import { StudentProfile } from '../types/student';
import {
  Award,
  Calendar,
  FileCheck,
  TrendingUp,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Download,
  AlertCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { sound } from '../services/audio';

interface DashboardOverviewProps {
  student: StudentProfile;
  onNavigateTab: (tabId: string) => void;
  onPreviewDoc: (doc: any) => void;
  onOpenUpload: () => void;
  onOpenPrint: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  student,
  onNavigateTab,
  onPreviewDoc,
  onOpenUpload,
  onOpenPrint,
}) => {
  // Calculate profile completion score
  const completionItems = [
    { label: 'Basic Personal Details', completed: true },
    { label: 'Academic Enrollment', completed: true },
    { label: 'Permanent Address Registered', completed: !!student.permanentAddress.line1 },
    { label: 'Parent / Guardian Records', completed: !!student.parentGuardian.fatherName },
    { label: 'Emergency Contact Assigned', completed: !!student.emergencyContact.phone },
    { label: 'Two-Factor Authentication', completed: student.security.twoFactorEnabled },
    { label: 'Core Documents Verified', completed: student.documents.filter(d => d.verified).length >= 5 },
  ];
  const completedCount = completionItems.filter(i => i.completed).length;
  const completionPercent = Math.round((completedCount / completionItems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 md:p-8 shadow-xl border border-blue-800/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Academic Year {student.academic.academicYear} · Active Semester</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Welcome Back, {student.fullName}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {student.academic.courseName} · {student.academic.branch}
              <br className="hidden sm:inline" />
              <span className="text-blue-300 font-mono text-xs">
                Registration No: {student.studentId} · Roll No: {student.academic.rollNumber}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onOpenUpload();
              }}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-sm flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenPrint();
              }}
              className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CGPA */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Cumulative CGPA</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {student.academic.cgpa}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 10.00</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            {student.academic.academicStanding}
          </p>
        </div>

        {/* Verified Documents */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Document Vault</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {student.documents.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">Documents Stored</span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
            {student.documents.filter((d) => d.verified).length} Institutionally Verified
          </p>
        </div>

        {/* Attendance */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Attendance Rate</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {student.academic.attendancePercent}%
            </span>
            <span className="text-xs text-slate-400 font-medium">Verified Hours</span>
          </div>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">
            Eligible for All Term End Exams
          </p>
        </div>

        {/* Total Credits */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Credits Completed</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {student.academic.totalCreditsCompleted}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 160 Required</span>
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
            On Track for 2025 Graduation
          </p>
        </div>
      </div>

      {/* 2-Column Section: Profile Completion Meter & SGPA Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Completion Checklist Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Profile Completion
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Institutional KYC & Verification status
              </p>
            </div>
            <span className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
              {completionPercent}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          <div className="space-y-2 pt-2">
            {completionItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-800/60 last:border-0"
              >
                <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                <span
                  className={`font-semibold ${
                    item.completed
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-500 dark:text-amber-400'
                  }`}
                >
                  {item.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('personal')}
            className="w-full py-2.5 px-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-blue-200 dark:border-blue-900/50"
          >
            <span>Review Personal Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Semester Grade History Graph / Snapshot */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Academic Performance Progression
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Semester Grade Point Average (SGPA) history across terms
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('academic')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All Semesters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bar Chart Representation */}
          <div className="space-y-3 my-2">
            {(student.academic.semesterHistory.length > 0
              ? student.academic.semesterHistory
              : [
                  { semester: 1, sgpa: 9.05, academicYear: 'Sem 1', status: 'Passed' },
                  { semester: 2, sgpa: 9.2, academicYear: 'Sem 2', status: 'Passed' },
                  { semester: 3, sgpa: 9.35, academicYear: 'Sem 3', status: 'Passed' },
                  { semester: 4, sgpa: 9.15, academicYear: 'Sem 4', status: 'Passed' },
                ]
            ).map((sem) => (
              <div key={sem.semester} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Semester {sem.semester} ({sem.academicYear})
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    SGPA: {sem.sgpa}
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(sem.sgpa / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Minimum Passing SGPA: 5.00</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              Dean's Honor List Distinction: ≥ 9.00
            </span>
          </div>
        </div>
      </div>

      {/* Recent Uploaded Documents Quick Access */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recently Uploaded & Verified Documents
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any document card to inspect preview, print, or download
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('documents')}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
          >
            <span>View All ({student.documents.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {student.documents.slice(0, 4).map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                sound.playClick();
                onPreviewDoc(doc);
              }}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    {doc.category}
                  </span>
                  {doc.verified && (
                    <span title="Verified Document">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {doc.name}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>{doc.fileSize}</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                  Preview
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
