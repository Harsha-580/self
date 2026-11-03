import React, { useState, useMemo } from 'react';
import { StudentProfile } from '../types/student';
import {
  Search,
  X,
  FileText,
  GraduationCap,
  Phone,
  Building,
  User,
  Shield,
  ArrowRight,
} from 'lucide-react';

interface GlobalSearchModalProps {
  student: StudentProfile;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
}

interface SearchResult {
  id: string;
  category: 'Document' | 'Academic' | 'Contact' | 'Personal' | 'Security';
  title: string;
  subtitle: string;
  targetTab: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  student,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const searchResults: SearchResult[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResult[] = [];

    // Documents
    student.documents.forEach((doc) => {
      if (
        doc.name.toLowerCase().includes(q) ||
        doc.fileName.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q) ||
        (doc.documentNumber && doc.documentNumber.toLowerCase().includes(q))
      ) {
        results.push({
          id: `doc-${doc.id}`,
          category: 'Document',
          title: doc.name,
          subtitle: `${doc.category} · ${doc.fileName}`,
          targetTab: 'documents',
        });
      }
    });

    // Academic Subjects & Details
    if (student.academic.department.toLowerCase().includes(q) || student.academic.branch.toLowerCase().includes(q)) {
      results.push({
        id: 'acad-branch',
        category: 'Academic',
        title: student.academic.branch,
        subtitle: `${student.academic.department} · Current Year: ${student.academic.yearOfStudy}`,
        targetTab: 'academic',
      });
    }

    student.academic.semesterHistory.forEach((sem) => {
      sem.subjects.forEach((sub) => {
        if (sub.name.toLowerCase().includes(q) || sub.code.toLowerCase().includes(q)) {
          results.push({
            id: `sub-${sub.code}`,
            category: 'Academic',
            title: `${sub.code}: ${sub.name}`,
            subtitle: `Grade: ${sub.grade} · Credits: ${sub.credits} (Semester ${sem.semester})`,
            targetTab: 'academic',
          });
        }
      });
    });

    // Contact records
    if (
      student.email.toLowerCase().includes(q) ||
      student.phone.toLowerCase().includes(q) ||
      student.collegeDetails.collegeEmail.toLowerCase().includes(q)
    ) {
      results.push({
        id: 'cont-student',
        category: 'Contact',
        title: 'Communication Channels',
        subtitle: `${student.email} · ${student.phone}`,
        targetTab: 'contact',
      });
    }

    // Personal items
    if (
      student.fullName.toLowerCase().includes(q) ||
      student.studentId.toLowerCase().includes(q) ||
      student.permanentAddress.city.toLowerCase().includes(q)
    ) {
      results.push({
        id: 'pers-identity',
        category: 'Personal',
        title: student.fullName,
        subtitle: `Registration: ${student.studentId} · DOB: ${student.dob}`,
        targetTab: 'personal',
      });
    }

    // Security
    if ('password security 2fa session'.includes(q)) {
      results.push({
        id: 'sec-settings',
        category: 'Security',
        title: 'Security & Privacy Console',
        subtitle: `Auto-logout: ${student.security.autoLogoutMinutes} min · 2FA: ${
          student.security.twoFactorEnabled ? 'Enabled' : 'Disabled'
        }`,
        targetTab: 'security',
      });
    }

    return results;
  }, [query, student]);

  const handleSelect = (targetTab: string) => {
    onNavigate(targetTab);
    onClose();
  };

  const getIcon = (cat: SearchResult['category']) => {
    switch (cat) {
      case 'Document':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'Academic':
        return <GraduationCap className="w-4 h-4 text-emerald-500" />;
      case 'Contact':
        return <Phone className="w-4 h-4 text-purple-500" />;
      case 'Personal':
        return <User className="w-4 h-4 text-amber-500" />;
      case 'Security':
        return <Shield className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, subjects, contact details, grades, or profile..."
            className="w-full text-base bg-transparent border-none focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Type anything to search across your student profile
              </p>
              <p className="text-xs text-slate-400 mt-1">
                E.g. "Aadhaar", "Machine Learning", "CGPA", "Bonafide", "Dean"
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                No matching records found for "{query}"
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Check spelling or try a broader search term
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.targetTab)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      {getIcon(item.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
