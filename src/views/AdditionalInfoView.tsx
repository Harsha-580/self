import React from 'react';
import { StudentProfile } from '../types/student';
import {
  Award,
  BookMarked,
  Home,
  Bus,
  Briefcase,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface AdditionalInfoViewProps {
  student: StudentProfile;
}

export const AdditionalInfoView: React.FC<AdditionalInfoViewProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Additional Information & Student Auxiliaries
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Scholarships, institutional memberships, campus housing, transportation, and technical internships
        </p>
      </div>

      {/* Auxiliary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scholarships & Merit Fellowships */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Award className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Scholarships & Financial Merit
            </h3>
          </div>

          {student.additional.scholarshipName ? (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-1.5 text-xs">
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Awarded Scholarship
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {student.additional.scholarshipName}
              </p>
              <p className="text-amber-700 dark:text-amber-400 font-semibold font-mono">
                Amount: {student.additional.scholarshipAmount}
              </p>
              <p className="text-slate-500 text-[11px] pt-1">
                Sanctioned by University Academic Council on grounds of sustained CGPA ≥ 9.0.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500">
              No active scholarship record registered for this term.
            </div>
          )}
        </div>

        {/* Campus Housing & Transit */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Hostel Accommodation & Transit
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px] flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-blue-500" />
                <span>Hostel / Residential Hall</span>
              </span>
              <p className="font-semibold text-slate-900 dark:text-white mt-1">
                {student.additional.hostelDetails}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px] flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-emerald-500" />
                <span>Campus Bus & Commuter Route</span>
              </span>
              <p className="font-semibold text-slate-900 dark:text-white mt-1">
                {student.additional.busRoute}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px] flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-purple-500" />
                <span>Central Library Smart Card</span>
              </span>
              <p className="font-mono font-semibold text-slate-900 dark:text-white mt-1">
                {student.additional.libraryCardNumber} (Active Privileges)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Internships & Practicums */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Industry Internships & Research Practicums
          </h3>
        </div>

        {student.additional.internships.length === 0 ? (
          <p className="text-xs text-slate-400 py-3">No internships logged yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.additional.internships.map((intern, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {intern.company}
                  </h4>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-medium">
                    Verified
                  </span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">{intern.role}</p>
                <p className="text-slate-500">{intern.duration}</p>
                <p className="text-slate-600 dark:text-slate-400 pt-1 font-medium">
                  {intern.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Extracurriculars */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Extracurricular Leadership & Honors
          </h3>
        </div>

        <div className="space-y-2">
          {student.additional.extracurriculars.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-800 dark:text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
