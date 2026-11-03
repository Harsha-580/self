import React from 'react';
import { StudentProfile } from '../types/student';
import {
  Building2,
  Award,
  Globe,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

interface CollegeInfoViewProps {
  student: StudentProfile;
}

export const CollegeInfoView: React.FC<CollegeInfoViewProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          College & Institutional Details
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Official statutory accreditation, governance, leadership, and campus infrastructure data
        </p>
      </div>

      {/* Main Campus Banner Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-serif text-2xl font-black shrink-0 border border-blue-700">
              NIET
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {student.academic.collegeName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                College Code: {student.academic.collegeCode} · Established 1998
              </p>
            </div>
          </div>

          <span className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NAAC A++ Accredited</span>
          </span>
        </div>

        {/* Key stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Affiliation</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {student.academic.universityName}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Campus Status</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              UGC Autonomous Tier-1
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Dean of Academics</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {student.collegeDetails.deanName}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">NIRF Engineering Rank</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400 font-mono">
              Top 35 In India
            </span>
          </div>
        </div>
      </div>

      {/* College Directory and Campus Infrastructure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leadership & Administration */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Governance & Department Leadership
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px]">Enrolled Department</span>
              <p className="font-bold text-slate-900 dark:text-white">
                {student.academic.department}
              </p>
              <p className="text-slate-500 mt-0.5">Head of Department: Prof. K. Ramesh Rao, Ph.D.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px]">Office of the Dean</span>
              <p className="font-bold text-slate-900 dark:text-white">
                {student.collegeDetails.deanName}
              </p>
              <a
                href={`mailto:${student.collegeDetails.registrarEmail}`}
                className="text-blue-600 dark:text-blue-400 hover:underline mt-0.5 inline-block"
              >
                {student.collegeDetails.registrarEmail}
              </a>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px]">Controller of Examinations (COE)</span>
              <p className="font-bold text-slate-900 dark:text-white">
                Dr. S. V. Krishna Kumar, Ph.D.
              </p>
              <p className="text-slate-500 mt-0.5">exambranch@niet-edu.ac.in · Ext: 412</p>
            </div>
          </div>
        </div>

        {/* Location & Academic Calendar */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Campus Facilities & Transit
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px]">Campus Location</span>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {student.collegeDetails.campusAddress}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px]">Official Web Portal</span>
              <a
                href={student.collegeDetails.website}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mt-0.5"
              >
                <span>{student.collegeDetails.website}</span>
              </a>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px]">Institutional Accreditation</span>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {student.collegeDetails.accreditation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
