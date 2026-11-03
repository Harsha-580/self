import React, { useState, useMemo } from 'react';
import { StudentDocument, DocumentCategory, StudentProfile } from '../types/student';
import {
  FileText,
  Upload,
  Search,
  Download,
  Eye,
  Trash2,
  ShieldCheck,
  Filter,
  FileCheck,
  Calendar,
  Lock,
  Plus,
} from 'lucide-react';
import { sound } from '../services/audio';

interface DocumentsViewProps {
  student: StudentProfile;
  onPreviewDoc: (doc: StudentDocument) => void;
  onOpenUpload: () => void;
  onDeleteDoc: (docId: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  student,
  onPreviewDoc,
  onOpenUpload,
  onDeleteDoc,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const categories: string[] = [
    'All',
    'Identity',
    'Academic Certificate',
    'Marksheet',
    'Bonafide & Conduct',
    'Transfer & Migration',
    'Photograph',
  ];

  const filteredDocs = useMemo(() => {
    return student.documents.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.documentNumber && doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' || doc.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [student.documents, searchQuery, selectedCategory]);

  const handleDownload = (doc: StudentDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    if (!doc.fileData) return;
    const link = document.createElement('a');
    link.href = doc.fileData;
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setDeleteTargetId(docId);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      onDeleteDoc(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              My Private Document Vault
            </h2>
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
              <Lock className="w-3 h-3" />
              <span>Owner Isolated Vault</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Secure cloud document repository for verified government credentials, academic marksheets, and identity files
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenUpload();
          }}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by document title, filename, or certificate number..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            No Documents Found
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search criteria or upload a new certificate to your vault.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                sound.playClick();
                onPreviewDoc(doc);
              }}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2.5 py-0.5 rounded-lg">
                    {doc.category}
                  </span>
                  {doc.verified && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {doc.name}
                </h4>

                {/* Sub details */}
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                  Doc No: {doc.documentNumber || 'REG-PENDING'}
                </p>

                {doc.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                    {doc.description}
                  </p>
                )}
              </div>

              {/* Meta & Card Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {doc.fileSize}
                  </span>
                  <span>·</span>
                  <span>{doc.uploadDate}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleDownload(doc, e)}
                    title="Download File"
                    className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(doc.id, e)}
                    title="Delete Document"
                    className="p-1.5 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onPreviewDoc(doc)}
                    title="Preview Document"
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 rounded-lg transition-colors ml-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl text-center">
            <Trash2 className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Delete Document from Vault?
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              This action permanently deletes this document from your student record vault. This operation cannot be reversed.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
