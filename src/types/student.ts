export type DocumentCategory = 
  | 'Identity'
  | 'Academic Certificate'
  | 'Marksheet'
  | 'Transfer & Migration'
  | 'Bonafide & Conduct'
  | 'Photograph'
  | 'Other';

export interface StudentDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  fileName: string;
  fileType: 'application/pdf' | 'image/png' | 'image/jpeg' | string;
  fileSize: string;
  uploadDate: string;
  verified: boolean;
  fileData?: string; // Data URL or SVG content for preview
  description?: string;
  documentNumber?: string;
}

export interface SemesterResult {
  semester: number;
  academicYear: string;
  sgpa: number;
  creditsEarned: number;
  totalCredits: number;
  status: 'Passed' | 'Distinction' | 'Pending';
  subjects: Array<{
    code: string;
    name: string;
    grade: string;
    credits: number;
    points: number;
  }>;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface AuditLogItem {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Warning' | 'Info';
}

export interface StudentProfile {
  id: string;
  studentId: string; // Registration number
  fullName: string;
  email: string;
  phone: string;
  altPhone?: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  nationality: string;
  category: string;
  profilePhoto: string;
  aadhaarMasked: string;

  // Address
  permanentAddress: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  currentAddress: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  // Family / Guardian
  parentGuardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherPhone: string;
    motherName: string;
    motherOccupation: string;
    motherPhone: string;
    guardianName?: string;
    guardianRelation?: string;
    guardianPhone?: string;
  };

  // Emergency Contact
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    altPhone: string;
    address: string;
  };

  // Academic Info
  academic: {
    collegeName: string;
    collegeCode: string;
    universityName: string;
    department: string;
    courseName: string;
    branch: string;
    yearOfStudy: string;
    semester: string;
    admissionNumber: string;
    academicYear: string;
    admissionDate: string;
    rollNumber: string;
    cgpa: number;
    attendancePercent: number;
    totalCreditsCompleted: number;
    degreeType: string;
    academicStanding: string;
    semesterHistory: SemesterResult[];
  };

  // College details
  collegeDetails: {
    campusAddress: string;
    collegeEmail: string;
    collegePhone: string;
    website: string;
    registrarEmail: string;
    deanName: string;
    accreditation: string;
    affiliationStatus: string;
  };

  // Additional Info
  additional: {
    scholarshipName?: string;
    scholarshipAmount?: string;
    libraryCardNumber: string;
    hostelDetails: string;
    busRoute: string;
    internships: Array<{
      company: string;
      role: string;
      duration: string;
      status: string;
    }>;
    extracurriculars: string[];
  };

  // Documents
  documents: StudentDocument[];

  // Security
  security: {
    passwordHash: string;
    twoFactorEnabled: boolean;
    autoLogoutMinutes: number;
    lastPasswordChange: string;
    activeSessions: ActiveSession[];
    auditLogs: AuditLogItem[];
  };
}
