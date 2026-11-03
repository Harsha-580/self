import React from 'react';
import { StudentProfile } from '../types/student';
import {
  Mail,
  Phone,
  Building,
  ShieldAlert,
  Users,
  Copy,
  Check,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { sound } from '../services/audio';

interface ContactInfoViewProps {
  student: StudentProfile;
}

export const ContactInfoView: React.FC<ContactInfoViewProps> = ({ student }) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Contact Information & Communications Directory
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click any telephone number or email address to initiate direct call or electronic correspondence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Direct Contact */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Student Direct Communication
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {/* Email */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Email</span>
                <a
                  href={`mailto:${student.email}`}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                >
                  {student.email}
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(student.email, 'email')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Copy Email"
              >
                {copiedKey === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Mobile */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Mobile Number</span>
                <a
                  href={`tel:${student.phone}`}
                  className="font-bold text-slate-900 dark:text-white hover:text-blue-600 font-mono text-sm"
                >
                  {student.phone}
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(student.phone, 'phone')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Copy Phone"
              >
                {copiedKey === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Alternate phone */}
            {student.altPhone && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">Secondary Contact</span>
                  <a
                    href={`tel:${student.altPhone}`}
                    className="font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 font-mono"
                  >
                    {student.altPhone}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(student.altPhone!, 'altPhone')}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {copiedKey === 'altPhone' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Parent / Guardian Contacts */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Parent & Guardian Contact Numbers
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {/* Father */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Father's Telephone</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {student.parentGuardian.fatherName}
                </span>
                <a
                  href={`tel:${student.parentGuardian.fatherPhone}`}
                  className="block text-blue-600 dark:text-blue-400 font-mono font-semibold mt-0.5 hover:underline"
                >
                  {student.parentGuardian.fatherPhone}
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(student.parentGuardian.fatherPhone, 'fatherPhone')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {copiedKey === 'fatherPhone' ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Mother */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Mother's Telephone</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {student.parentGuardian.motherName}
                </span>
                <a
                  href={`tel:${student.parentGuardian.motherPhone}`}
                  className="block text-blue-600 dark:text-blue-400 font-mono font-semibold mt-0.5 hover:underline"
                >
                  {student.parentGuardian.motherPhone}
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(student.parentGuardian.motherPhone, 'motherPhone')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {copiedKey === 'motherPhone' ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Emergency Contact Hotline
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 space-y-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Designated Responder</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">
                {student.emergencyContact.name} ({student.emergencyContact.relationship})
              </p>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Hotline Phone</span>
              <a
                href={`tel:${student.emergencyContact.phone}`}
                className="text-base font-black text-rose-600 dark:text-rose-400 font-mono hover:underline inline-block"
              >
                {student.emergencyContact.phone}
              </a>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Emergency Physical Address</span>
              <p className="text-slate-700 dark:text-slate-300">
                {student.emergencyContact.address}
              </p>
            </div>
          </div>
        </div>

        {/* College Administrative Contact */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              College & University Administrative Channels
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">College Central Helpline</span>
                <a
                  href={`tel:${student.collegeDetails.collegePhone}`}
                  className="font-bold text-slate-900 dark:text-white hover:text-blue-600 font-mono"
                >
                  {student.collegeDetails.collegePhone}
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(student.collegeDetails.collegePhone, 'collegePhone')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {copiedKey === 'collegePhone' ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Registrar Office Email</span>
                <a
                  href={`mailto:${student.collegeDetails.collegeEmail}`}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {student.collegeDetails.collegeEmail}
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(student.collegeDetails.collegeEmail, 'collegeEmail')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {copiedKey === 'collegeEmail' ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-400 block text-[11px]">Institutional Postal Campus Address</span>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {student.collegeDetails.campusAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
