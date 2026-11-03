import React from 'react';
import { StudentProfile } from '../types/student';
import {
  User,
  MapPin,
  Users,
  ShieldAlert,
  Edit3,
  Calendar,
  Heart,
  Globe,
  Award,
  CreditCard,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { sound } from '../services/audio';

interface PersonalInformationViewProps {
  student: StudentProfile;
  onOpenEdit: () => void;
}

export const PersonalInformationView: React.FC<PersonalInformationViewProps> = ({
  student,
  onOpenEdit,
}) => {
  return (
    <div className="space-y-6">
      {/* Header with Title and Edit Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Personal Information & Identity Dossier
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Verified institutional identification records and student demographic data
          </p>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onOpenEdit();
          }}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Contact & Residence</span>
        </button>
      </div>

      {/* Main Identity Banner Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-500 shrink-0 shadow-md">
          <img
            src={student.profilePhoto}
            alt={student.fullName}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full shadow">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {student.fullName}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Active Student
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span>
              Student ID: <strong className="text-blue-600 dark:text-blue-400 font-mono">{student.studentId}</strong>
            </span>
            <span>·</span>
            <span>
              Roll Number: <strong className="text-slate-800 dark:text-slate-200 font-mono">{student.academic.rollNumber}</strong>
            </span>
            <span>·</span>
            <span>
              National ID: <strong className="text-slate-800 dark:text-slate-200 font-mono">{student.aadhaarMasked}</strong>
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {student.academic.department} · {student.academic.collegeName}
          </p>
        </div>
      </div>

      {/* Identity & Demographics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Demographics */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Demographic & Vital Details
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Date of Birth</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                {student.dob}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Gender</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {student.gender}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Blood Group</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {student.bloodGroup}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Nationality</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {student.nationality}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Category / Quota</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {student.category}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Admission Year</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                {student.academic.admissionDate}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Contact Channels */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Direct Contact Details
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Primary Student Email</span>
              <a
                href={`mailto:${student.email}`}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {student.email}
              </a>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Primary Mobile Number</span>
              <a
                href={`tel:${student.phone}`}
                className="font-semibold text-slate-800 dark:text-slate-200 font-mono hover:text-blue-600"
              >
                {student.phone}
              </a>
            </div>

            {student.altPhone && (
              <div>
                <span className="text-slate-400 block mb-0.5">Alternate Mobile Number</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                  {student.altPhone}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Details (Permanent & Current) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Permanent Address */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Permanent Address (Statutory KYC)
            </h4>
          </div>
          <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">
              {student.permanentAddress.line1}
            </p>
            <p>
              {student.permanentAddress.city}, {student.permanentAddress.state} -{' '}
              <span className="font-mono">{student.permanentAddress.postalCode}</span>
            </p>
            <p className="text-slate-400">{student.permanentAddress.country}</p>
          </div>
        </div>

        {/* Current Residence */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Current Residence / Campus Hostel
            </h4>
          </div>
          <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">
              {student.currentAddress.line1}
            </p>
            <p>
              {student.currentAddress.city}, {student.currentAddress.state} -{' '}
              <span className="font-mono">{student.currentAddress.postalCode}</span>
            </p>
            <p className="text-slate-400">{student.currentAddress.country}</p>
          </div>
        </div>
      </div>

      {/* Parent & Emergency Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parent & Guardian */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Parent & Guardian Information
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px]">Father's Details</span>
              <p className="font-bold text-slate-900 dark:text-white">
                {student.parentGuardian.fatherName}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Occupation: {student.parentGuardian.fatherOccupation}
              </p>
              <a
                href={`tel:${student.parentGuardian.fatherPhone}`}
                className="text-blue-600 dark:text-blue-400 font-mono mt-1 inline-block hover:underline"
              >
                Phone: {student.parentGuardian.fatherPhone}
              </a>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 block text-[11px]">Mother's Details</span>
              <p className="font-bold text-slate-900 dark:text-white">
                {student.parentGuardian.motherName}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Occupation: {student.parentGuardian.motherOccupation}
              </p>
              <a
                href={`tel:${student.parentGuardian.motherPhone}`}
                className="text-blue-600 dark:text-blue-400 font-mono mt-1 inline-block hover:underline"
              >
                Phone: {student.parentGuardian.motherPhone}
              </a>
            </div>

            {student.parentGuardian.guardianName && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Local Guardian</span>
                <p className="font-bold text-slate-900 dark:text-white">
                  {student.parentGuardian.guardianName} ({student.parentGuardian.guardianRelation})
                </p>
                <a
                  href={`tel:${student.parentGuardian.guardianPhone}`}
                  className="text-blue-600 dark:text-blue-400 font-mono mt-1 inline-block hover:underline"
                >
                  Phone: {student.parentGuardian.guardianPhone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Emergency Priority Contact
              </h4>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Contact Person</span>
                <p className="font-bold text-slate-900 dark:text-white text-sm">
                  {student.emergencyContact.name}
                </p>
                <span className="text-rose-600 dark:text-rose-400 font-medium">
                  Relationship: {student.emergencyContact.relationship}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Emergency Hotline</span>
                <a
                  href={`tel:${student.emergencyContact.phone}`}
                  className="text-base font-bold text-rose-700 dark:text-rose-400 font-mono hover:underline"
                >
                  {student.emergencyContact.phone}
                </a>
              </div>

              {student.emergencyContact.altPhone && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Alternate Phone</span>
                  <a
                    href={`tel:${student.emergencyContact.altPhone}`}
                    className="font-mono text-slate-800 dark:text-slate-200"
                  >
                    {student.emergencyContact.altPhone}
                  </a>
                </div>
              )}

              <div>
                <span className="text-slate-400 block text-[11px]">Contact Address</span>
                <p className="text-slate-600 dark:text-slate-400">
                  {student.emergencyContact.address}
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-[11px] text-slate-500">
            Emergency contacts are verified upon admission and are utilized exclusively by campus medical and security services in critical events.
          </div>
        </div>
      </div>
    </div>
  );
};
