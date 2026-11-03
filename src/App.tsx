import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StudentProfile, StudentDocument } from './types/student';
import {
  getLoggedInStudent,
  logoutCurrentStudent,
  updateCurrentStudentProfile,
  addStudentDocument,
  deleteStudentDocument,
} from './services/storage';
import { LoginView } from './views/LoginView';
import { FaceAnimation } from './components/FaceAnimation';
import { Sidebar, TabId } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './views/DashboardOverview';
import { PersonalInformationView } from './views/PersonalInformationView';
import { AcademicDetailsView } from './views/AcademicDetailsView';
import { DocumentsView } from './views/DocumentsView';
import { ContactInfoView } from './views/ContactInfoView';
import { CollegeInfoView } from './views/CollegeInfoView';
import { AdditionalInfoView } from './views/AdditionalInfoView';
import { SecurityPrivacyView } from './views/SecurityPrivacyView';
import { DocumentPreviewModal, UploadDocumentModal } from './components/DocumentModal';
import { EditProfileModal } from './components/EditProfileModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { InactivityWarningModal } from './components/InactivityWarningModal';
import { PrintProfileModal } from './components/PrintProfileModal';

export default function App() {
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showFaceAnimation, setShowFaceAnimation] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabId>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals state
  const [previewDoc, setPreviewDoc] = useState<StudentDocument | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portal_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Inactivity tracking
  const [inactivitySecondsRemaining, setInactivitySecondsRemaining] = useState<number>(900);
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);
  const lastActivityRef = useRef<number>(Date.now());

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portal_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portal_theme', 'light');
    }
  }, [isDarkMode]);

  // Initial student session retrieval
  useEffect(() => {
    async function loadSession() {
      try {
        const student = await getLoggedInStudent();
        if (student) {
          setCurrentStudent(student);
          // Set inactivity timer based on profile
          setInactivitySecondsRemaining((student.security.autoLogoutMinutes || 15) * 60);
        }
      } catch (err) {
        console.error('Session initialization error', err);
      } finally {
        setIsInitializing(false);
      }
    }
    loadSession();
  }, []);

  // Keyboard shortcut for global search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setShowSearchModal(false);
        setPreviewDoc(null);
        setShowUploadModal(false);
        setShowEditProfileModal(false);
        setShowPrintModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Inactivity tracking interval & user activity listeners
  const resetInactivityTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (currentStudent) {
      setInactivitySecondsRemaining((currentStudent.security.autoLogoutMinutes || 15) * 60);
    }
    setShowInactivityWarning(false);
  }, [currentStudent]);

  useEffect(() => {
    if (!currentStudent || showFaceAnimation) return;

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    events.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));

    const interval = setInterval(() => {
      const timeoutSecs = (currentStudent.security.autoLogoutMinutes || 15) * 60;
      const elapsedSecs = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      const remaining = Math.max(0, timeoutSecs - elapsedSecs);

      setInactivitySecondsRemaining(remaining);

      // Warning when <= 60 seconds remain
      if (remaining <= 60 && remaining > 0) {
        setShowInactivityWarning(true);
      } else if (remaining === 0) {
        handleLogout();
      }
    }, 1000);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleActivity));
      clearInterval(interval);
    };
  }, [currentStudent, showFaceAnimation]);

  const handleLoginSuccess = (student: StudentProfile) => {
    setCurrentStudent(student);
    setShowFaceAnimation(true);
    resetInactivityTimer();
  };

  const handleFaceAnimationComplete = () => {
    setShowFaceAnimation(false);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    logoutCurrentStudent();
    setCurrentStudent(null);
    setShowFaceAnimation(false);
    setShowInactivityWarning(false);
    setCurrentTab('dashboard');
  };

  const handleProfileUpdated = (updated: StudentProfile) => {
    setCurrentStudent(updated);
  };

  const handleUploadDocument = async (docData: Parameters<typeof addStudentDocument>[0]) => {
    try {
      await addStudentDocument(docData);
      const refreshed = await getLoggedInStudent();
      if (refreshed) setCurrentStudent(refreshed);
    } catch (err) {
      console.error('Failed to add document', err);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    try {
      await deleteStudentDocument(docId);
      const refreshed = await getLoggedInStudent();
      if (refreshed) setCurrentStudent(refreshed);
    } catch (err) {
      console.error('Failed to delete document', err);
    }
  };

  const handleSaveProfileEdit = async (updates: Partial<StudentProfile>) => {
    try {
      const updated = await updateCurrentStudentProfile(updates);
      setCurrentStudent(updated);
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-mono tracking-wider">
            INITIALIZING SECURE VAULT...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in: Show Login Screen
  if (!currentStudent) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  // Logged in: Welcome Face 3D Animation transition
  if (showFaceAnimation) {
    return (
      <FaceAnimation
        studentName={currentStudent.fullName}
        studentId={currentStudent.studentId}
        onComplete={handleFaceAnimationComplete}
      />
    );
  }

  // Main Dashboard Viewport
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      <div className="flex-1 flex w-full">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onLogout={handleLogout}
          student={currentStudent}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar
            student={currentStudent}
            currentTabTitle={
              currentTab === 'dashboard'
                ? 'Student Dashboard'
                : currentTab === 'personal'
                ? 'Personal Information'
                : currentTab === 'academic'
                ? 'Academic Progression'
                : currentTab === 'documents'
                ? 'Document Storage Vault'
                : currentTab === 'contact'
                ? 'Contact Directory'
                : currentTab === 'college'
                ? 'College Information'
                : currentTab === 'additional'
                ? 'Auxiliary Records'
                : 'Security & Privacy Console'
            }
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onOpenSearch={() => setShowSearchModal(true)}
            onOpenPrint={() => setShowPrintModal(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            inactivitySecondsRemaining={inactivitySecondsRemaining}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {currentTab === 'dashboard' && (
              <DashboardOverview
                student={currentStudent}
                onNavigateTab={(tab) => setCurrentTab(tab as TabId)}
                onPreviewDoc={(doc) => setPreviewDoc(doc)}
                onOpenUpload={() => setShowUploadModal(true)}
                onOpenPrint={() => setShowPrintModal(true)}
              />
            )}

            {currentTab === 'personal' && (
              <PersonalInformationView
                student={currentStudent}
                onOpenEdit={() => setShowEditProfileModal(true)}
              />
            )}

            {currentTab === 'academic' && (
              <AcademicDetailsView
                student={currentStudent}
                onOpenMarksheetDoc={() => {
                  const marksheet = currentStudent.documents.find((d) => d.category === 'Marksheet');
                  if (marksheet) setPreviewDoc(marksheet);
                }}
              />
            )}

            {currentTab === 'documents' && (
              <DocumentsView
                student={currentStudent}
                onPreviewDoc={(doc) => setPreviewDoc(doc)}
                onOpenUpload={() => setShowUploadModal(true)}
                onDeleteDoc={handleDeleteDocument}
              />
            )}

            {currentTab === 'contact' && <ContactInfoView student={currentStudent} />}

            {currentTab === 'college' && <CollegeInfoView student={currentStudent} />}

            {currentTab === 'additional' && <AdditionalInfoView student={currentStudent} />}

            {currentTab === 'security' && (
              <SecurityPrivacyView
                student={currentStudent}
                onProfileUpdated={handleProfileUpdated}
              />
            )}
          </main>
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <DocumentPreviewModal
          document={previewDoc}
          studentName={currentStudent.fullName}
          collegeName={currentStudent.academic.collegeName}
          onClose={() => setPreviewDoc(null)}
          onDelete={handleDeleteDocument}
        />
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <UploadDocumentModal
          studentName={currentStudent.fullName}
          studentId={currentStudent.studentId}
          collegeName={currentStudent.academic.collegeName}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUploadDocument}
        />
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <EditProfileModal
          student={currentStudent}
          onClose={() => setShowEditProfileModal(false)}
          onSave={handleSaveProfileEdit}
        />
      )}

      {/* Global Search Modal */}
      {showSearchModal && (
        <GlobalSearchModal
          student={currentStudent}
          onClose={() => setShowSearchModal(false)}
          onNavigate={(tab) => setCurrentTab(tab as TabId)}
        />
      )}

      {/* Print Profile / PDF Dossier Modal */}
      {showPrintModal && (
        <PrintProfileModal
          student={currentStudent}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {/* Inactivity Warning Dialog */}
      {showInactivityWarning && (
        <InactivityWarningModal
          remainingSeconds={inactivitySecondsRemaining}
          onStayLoggedIn={resetInactivityTimer}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
