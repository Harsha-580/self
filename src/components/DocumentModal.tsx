import React, { useState } from 'react';
import { StudentDocument, DocumentCategory } from '../types/student';
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  FileText,
  Upload,
  AlertCircle,
  FileCheck,
  Calendar,
  Lock,
} from 'lucide-react';
import { sound } from '../services/audio';

interface DocumentPreviewModalProps {
  document: StudentDocument;
  studentName: string;
  collegeName: string;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  studentName,
  collegeName,
  onClose,
  onDelete,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDownload = () => {
    sound.playClick();
    if (!document.fileData) return;
    const link = window.document.createElement('a');
    link.href = document.fileData;
    link.download = document.fileName;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const handlePrint = () => {
    sound.playClick();
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${document.name} - ${studentName}</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
            img { max-width: 95%; max-height: 95vh; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${document.fileData}" onload="window.print();window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {document.name}
                </h3>
                {document.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Official Record
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {document.fileName} · {document.fileSize} · Uploaded {document.uploadDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Document"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              title="Download Document"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Preview Viewport */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-slate-100 dark:bg-slate-950/80 flex items-center justify-center min-h-[350px]">
          {document.fileData ? (
            <div className="max-w-full max-h-[60vh] flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-white">
              <img
                src={document.fileData}
                alt={document.name}
                className="w-full h-auto max-h-[60vh] object-contain select-none"
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Binary preview not available
              </p>
              <p className="text-xs text-slate-400 mt-1">
                You can download the original file to view on your device.
              </p>
            </div>
          )}
        </div>

        {/* Footer Meta & Danger Zone */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-blue-500" />
              <span>Encrypted Student Vault</span>
            </span>
            <span>·</span>
            <span>Document No: {document.documentNumber || document.id}</span>
          </div>

          <div className="flex items-center gap-3">
            {onDelete && !showDeleteConfirm && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium transition-colors"
              >
                Delete Document
              </button>
            )}

            {showDeleteConfirm && (
              <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60">
                <span className="text-xs text-rose-700 dark:text-rose-300">
                  Confirm deletion?
                </span>
                <button
                  onClick={() => {
                    onDelete?.(document.id);
                    onClose();
                  }}
                  className="px-2 py-0.5 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded font-medium transition-colors"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface UploadDocumentModalProps {
  onClose: () => void;
  onUpload: (doc: {
    name: string;
    category: DocumentCategory;
    fileName: string;
    fileType: string;
    fileSize: string;
    fileData?: string;
    description?: string;
    documentNumber?: string;
  }) => void;
  studentName: string;
  studentId: string;
  collegeName: string;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  onClose,
  onUpload,
  studentName,
  studentId,
  collegeName,
}) => {
  const [docName, setDocName] = useState('');
  const [category, setCategory] = useState<DocumentCategory>('Academic Certificate');
  const [docNumber, setDocNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 10 * 1024 * 1024) {
      setError('File size must be below 10 MB.');
      return;
    }

    setFile(selected);
    setError('');
    if (!docName) {
      const baseName = selected.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setDocName(baseName.charAt(0).toUpperCase() + baseName.slice(1));
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewData(reader.result as string);
    };
    reader.readAsDataURL(selected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) {
      setError('Please provide a document title.');
      return;
    }

    setIsSubmitting(true);
    sound.playClick();

    const formattedSize = file
      ? (file.size / 1024 > 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`)
      : '1.4 MB';

    // If user uploaded a file, use its data URL; otherwise use SVG generator
    const dataUrl = previewData || '';

    setTimeout(() => {
      onUpload({
        name: docName.trim(),
        category,
        fileName: file ? file.name : `${docName.trim().replace(/\s+/g, '_')}.pdf`,
        fileType: file ? file.type : 'application/pdf',
        fileSize: formattedSize,
        fileData: dataUrl,
        description: notes.trim() || undefined,
        documentNumber: docNumber.trim() || `DOC-${Date.now().toString().slice(-6)}`,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upload Student Document
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Securely store official credentials into your private student vault
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Document Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Document Name / Title *
            </label>
            <input
              type="text"
              required
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="e.g. Intermediate Certificate or SSC Marksheet"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Document Category & Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              >
                <option value="Identity">Identity Document</option>
                <option value="Academic Certificate">Academic Certificate</option>
                <option value="Marksheet">Marksheet / Transcript</option>
                <option value="Bonafide & Conduct">Bonafide & Conduct</option>
                <option value="Transfer & Migration">Transfer & Migration</option>
                <option value="Photograph">Photograph</option>
                <option value="Other">Other Document</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Document / Serial Number
              </label>
              <input
                type="text"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                placeholder="e.g. DOC-2024-9912"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* File Upload Drop Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Document File (PDF, PNG, JPG)
            </label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-xl p-5 text-center transition-colors bg-slate-50/50 dark:bg-slate-800/40">
              <input
                type="file"
                id="doc-file-upload"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="doc-file-upload"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <Upload className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                {file ? (
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(0)} KB · Click to change file
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Click to choose file or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                      Supports PDF, PNG, JPG up to 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Description / Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add optional notes about issuing authority or validity..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition-colors shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Securing Document...' : 'Upload & Encrypt'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
