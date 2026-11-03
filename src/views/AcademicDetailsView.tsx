import React, { useState } from 'react';
import { StudentProfile } from '../types/student';
import {
  GraduationCap,
  Building2,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { sound } from '../services/audio';

interface AcademicDetailsViewProps {
  student: StudentProfile;
  onOpenMarksheetDoc?: () => void;
}

export const AcademicDetailsView: React.FC<AcademicDetailsViewProps> = ({
  student,
  onOpenMarksheetDoc,
}) => {
  const [expandedSemester, setExpandedSemester] = useState<number | null>(
    student.academic.semesterHistory.length > 0
      ? student.academic.semesterHistory[student.academic.semesterHistory.length - 1].semester
      : null
  );

  const toggleSemester = (sem: number) => {
    sound.playClick();
    setExpandedSemester((prev) => (prev === sem ? null : sem));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Academic Details & Curriculum Progression
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Official enrollment credentials, university affiliation, and semester-by-semester academic performance
        </p>
      </div>

      {/* Program Information Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Degree & Branch */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Program & Specialization
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Degree & Course</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {student.academic.courseName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Department</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {student.academic.department}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Branch / Focus Area</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {student.academic.branch}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Degree Type</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {student.academic.degreeType}
              </span>
            </div>
          </div>
        </div>

        {/* Enrollment Status */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Enrollment Standing
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-400 block mb-0.5">Year of Study</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {student.academic.yearOfStudy}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Current Semester</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {student.academic.semester}
                </span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Admission Number</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {student.academic.admissionNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">University Roll Number</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {student.academic.rollNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Academic Calendar</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {student.academic.academicYear}
              </span>
            </div>
          </div>
        </div>

        {/* Institutional Affiliation */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Affiliation & Accrediting Bodies
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">College Institution</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {student.academic.collegeName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Institution Code</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {student.academic.collegeCode}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Affiliated University</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {student.academic.universityName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Accreditation Grade</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {student.collegeDetails.accreditation}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Performance Metrics Summary Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-900/40 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-1">
              Cumulative CGPA
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-1">
              <span className="text-3xl font-black font-mono text-white">
                {student.academic.cgpa}
              </span>
              <span className="text-xs text-blue-300">/ 10.0</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">
              Grade: Outstanding (O)
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-1">
              Cumulative Credits
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-1">
              <span className="text-3xl font-black font-mono text-white">
                {student.academic.totalCreditsCompleted}
              </span>
              <span className="text-xs text-blue-300">/ 160</span>
            </div>
            <span className="text-[11px] text-blue-200 font-medium">
              85% Degree Requirement Satisfied
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-1">
              Term Attendance
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-1">
              <span className="text-3xl font-black font-mono text-white">
                {student.academic.attendancePercent}%
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">
              Clear for University Examinations
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-1">
              Academic Standing
            </span>
            <p className="text-sm font-bold text-white mt-1">
              {student.academic.academicStanding}
            </p>
            <span className="text-[11px] text-slate-300">
              Zero Backlogs / Active Honors
            </span>
          </div>
        </div>
      </div>

      {/* Semester by Semester Marksheet Breakdown */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Official Semester Results & Course Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curricular subjects, earned letter grades, grade points, and credits
            </p>
          </div>
        </div>

        {student.academic.semesterHistory.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">No archived semester results found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {student.academic.semesterHistory.map((sem) => {
              const isExpanded = expandedSemester === sem.semester;
              return (
                <div
                  key={sem.semester}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
                >
                  {/* Semester Accordion Header */}
                  <button
                    onClick={() => toggleSemester(sem.semester)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                        S{sem.semester}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            Semester {sem.semester}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            ({sem.academicYear})
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Credits: {sem.creditsEarned} / {sem.totalCredits} · Status: {sem.status}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Semester SGPA</span>
                        <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                          {sem.sgpa}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Subjects Table */}
                  {isExpanded && (
                    <div className="overflow-x-auto p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 pb-2">
                            <th className="py-2 font-semibold">Code</th>
                            <th className="py-2 font-semibold">Subject Title</th>
                            <th className="py-2 font-semibold text-center">Grade</th>
                            <th className="py-2 font-semibold text-center">Credits</th>
                            <th className="py-2 font-semibold text-center">Grade Points</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                          {sem.subjects.map((sub) => (
                            <tr key={sub.code} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                              <td className="py-2.5 font-mono font-medium text-slate-600 dark:text-slate-400">
                                {sub.code}
                              </td>
                              <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                {sub.name}
                              </td>
                              <td className="py-2.5 text-center font-bold text-emerald-600 dark:text-emerald-400">
                                {sub.grade}
                              </td>
                              <td className="py-2.5 text-center font-mono text-slate-700 dark:text-slate-300">
                                {sub.credits}
                              </td>
                              <td className="py-2.5 text-center font-mono font-semibold text-blue-600 dark:text-blue-400">
                                {sub.points}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
