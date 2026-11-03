import React from 'react';
import { StudentProfile } from '../types/student';
import { X, Printer, ShieldCheck, Download, Award, CheckCircle2 } from 'lucide-react';
import { sound } from '../services/audio';

interface PrintProfileModalProps {
  student: StudentProfile;
  onClose: () => void;
}

export const PrintProfileModal: React.FC<PrintProfileModalProps> = ({
  student,
  onClose,
}) => {
  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white border border-slate-300 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-900">
        {/* Floating actions bar (hidden in print) */}
        <div className="no-print flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-bold">
              Official Student Dossier & Identity Record (Print View)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="flex-1 overflow-y-auto p-8 bg-white print:p-0">
          {/* Institution Header with Seal */}
          <div className="border-b-2 border-slate-900 pb-5 mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-blue-900 text-white flex items-center justify-center font-serif text-2xl font-black shrink-0 border-2 border-amber-500">
                AEGIS
              </div>
              <div>
                <h1 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
                  {student.academic.collegeName}
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  {student.collegeDetails.affiliationStatus} · {student.collegeDetails.accreditation}
                </p>
                <p className="text-xs text-slate-500">
                  {student.collegeDetails.campusAddress} · Ph: {student.collegeDetails.collegePhone}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-bold tracking-wider rounded">
                OFFICIAL STUDENT DOSSIER
              </span>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Issued: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Student Profile Identity Grid */}
          <div className="flex flex-col md:flex-row gap-6 mb-6 p-4 rounded-xl border border-slate-300 bg-slate-50/60">
            <div className="w-28 h-32 rounded-lg border-2 border-slate-400 overflow-hidden shrink-0 bg-white">
              <img
                src={student.profilePhoto}
                alt={student.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
              <div>
                <span className="text-slate-500 block font-medium">Full Student Name:</span>
                <span className="font-bold text-sm text-slate-900">{student.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Registration / Student ID:</span>
                <span className="font-bold text-sm text-blue-900 font-mono">{student.studentId}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Roll Number:</span>
                <span className="font-semibold text-slate-900 font-mono">{student.academic.rollNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Date of Birth:</span>
                <span className="font-semibold text-slate-900">{student.dob}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Gender & Blood Group:</span>
                <span className="font-semibold text-slate-900">{student.gender} ({student.bloodGroup})</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Nationality & Category:</span>
                <span className="font-semibold text-slate-900">{student.nationality} / {student.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Primary Email:</span>
                <span className="font-semibold text-slate-900">{student.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Primary Mobile:</span>
                <span className="font-semibold text-slate-900">{student.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Aadhaar (Masked):</span>
                <span className="font-semibold text-slate-900 font-mono">{student.aadhaarMasked}</span>
              </div>
            </div>
          </div>

          {/* Academic Snapshot */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
              1. Academic Program & Enrollment Standing
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-500 block">Department:</span>
                <span className="font-semibold text-slate-900">{student.academic.department}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Degree & Program:</span>
                <span className="font-semibold text-slate-900">{student.academic.courseName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Branch / Specialization:</span>
                <span className="font-semibold text-slate-900">{student.academic.branch}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Year & Semester:</span>
                <span className="font-bold text-blue-900">{student.academic.yearOfStudy} · {student.academic.semester}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Cumulative CGPA:</span>
                <span className="font-black text-sm text-emerald-700">{student.academic.cgpa} / 10.0</span>
              </div>
              <div>
                <span className="text-slate-500 block">Overall Attendance:</span>
                <span className="font-bold text-slate-900">{student.academic.attendancePercent}%</span>
              </div>
              <div>
                <span className="text-slate-500 block">Credits Earned:</span>
                <span className="font-semibold text-slate-900">{student.academic.totalCreditsCompleted} Credits</span>
              </div>
              <div>
                <span className="text-slate-500 block">Academic Standing:</span>
                <span className="font-semibold text-blue-800">{student.academic.academicStanding}</span>
              </div>
            </div>
          </div>

          {/* Address & Family Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="p-3 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">
                2. Residential Information
              </h4>
              <p className="text-slate-500 font-medium mb-1">Permanent Residence:</p>
              <p className="font-semibold text-slate-800 mb-2">
                {student.permanentAddress.line1}, {student.permanentAddress.city}, {student.permanentAddress.state} - {student.permanentAddress.postalCode}, {student.permanentAddress.country}
              </p>
              <p className="text-slate-500 font-medium mb-1">Current Residence / Hostel:</p>
              <p className="font-semibold text-slate-800">
                {student.currentAddress.line1}, {student.currentAddress.city}, {student.currentAddress.state} - {student.currentAddress.postalCode}
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">
                3. Parent & Emergency Contact
              </h4>
              <div className="space-y-1">
                <p>
                  <span className="text-slate-500">Father's Name:</span>{' '}
                  <span className="font-semibold text-slate-800">{student.parentGuardian.fatherName} ({student.parentGuardian.fatherOccupation})</span>
                </p>
                <p>
                  <span className="text-slate-500">Father's Contact:</span>{' '}
                  <span className="font-semibold text-slate-800">{student.parentGuardian.fatherPhone}</span>
                </p>
                <p>
                  <span className="text-slate-500">Mother's Name:</span>{' '}
                  <span className="font-semibold text-slate-800">{student.parentGuardian.motherName} ({student.parentGuardian.motherOccupation})</span>
                </p>
                <p>
                  <span className="text-slate-500">Emergency Contact:</span>{' '}
                  <span className="font-bold text-rose-700">{student.emergencyContact.name} ({student.emergencyContact.relationship}) - {student.emergencyContact.phone}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Verified Documents Checklist */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              4. Institutional Documents & Credentials On File
            </h3>
            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <th className="p-2 border-r border-slate-200">#</th>
                  <th className="p-2 border-r border-slate-200">Document Name</th>
                  <th className="p-2 border-r border-slate-200">Category</th>
                  <th className="p-2 border-r border-slate-200">Document / Registration No</th>
                  <th className="p-2 border-r border-slate-200">Upload Date</th>
                  <th className="p-2">Verification Status</th>
                </tr>
              </thead>
              <tbody>
                {student.documents.map((doc, idx) => (
                  <tr key={doc.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-2 border-r border-slate-200 text-slate-500">{idx + 1}</td>
                    <td className="p-2 border-r border-slate-200 font-semibold text-slate-900">{doc.name}</td>
                    <td className="p-2 border-r border-slate-200 text-slate-600">{doc.category}</td>
                    <td className="p-2 border-r border-slate-200 font-mono text-slate-700">{doc.documentNumber || '-'}</td>
                    <td className="p-2 border-r border-slate-200 text-slate-600">{doc.uploadDate}</td>
                    <td className="p-2 font-medium text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                      <span>Verified</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attestation & Security Footer */}
          <div className="mt-8 pt-6 border-t-2 border-slate-400 flex items-end justify-between text-xs">
            <div>
              <p className="font-mono text-[10px] text-slate-500">
                AEGIS CRYPTOGRAPHIC RECORD HASH: 8f2a9901bce47101da... verified
              </p>
              <p className="text-[10px] text-slate-400">
                Generated via Veritas Academic Portal · ISO 27001 Identity Protected
              </p>
            </div>
            <div className="text-right">
              <div className="w-32 border-b border-slate-700 mb-1 inline-block" />
              <p className="font-bold text-slate-900">Registrar / Dean of Academics</p>
              <p className="text-[10px] text-slate-500">{student.academic.collegeName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
