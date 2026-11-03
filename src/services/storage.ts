import { StudentProfile, StudentDocument } from '../types/student';

// Standard SHA-256 password hashing via Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate high quality mock certificate SVG as base64 data URL
export function generateCertificateSvg(
  type: string,
  title: string,
  studentName: string,
  studentId: string,
  docNumber: string,
  date: string,
  collegeName: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" width="100%" height="100%">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ca8a04" />
        <stop offset="50%" stop-color="#eab308" />
        <stop offset="100%" stop-color="#a16207" />
      </linearGradient>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fdfbf7" />
        <stop offset="100%" stop-color="#f8f4eb" />
      </linearGradient>
      <pattern id="guilloche" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 0 20 Q 20 0 40 20 Q 20 40 0 20" fill="none" stroke="#e2d8c3" stroke-width="0.7" opacity="0.35"/>
      </pattern>
    </defs>

    <!-- Background with border -->
    <rect width="800" height="550" fill="url(#bgGrad)"/>
    <rect width="800" height="550" fill="url(#guilloche)"/>

    <!-- Dual Border Frame -->
    <rect x="25" y="25" width="750" height="500" rx="4" fill="none" stroke="#1e3a8a" stroke-width="3"/>
    <rect x="33" y="33" width="734" height="484" rx="2" fill="none" stroke="url(#goldGrad)" stroke-width="1.5"/>
    
    <!-- Corner Ornaments -->
    <circle cx="45" cy="45" r="8" fill="none" stroke="#1e3a8a" stroke-width="2"/>
    <circle cx="755" cy="45" r="8" fill="none" stroke="#1e3a8a" stroke-width="2"/>
    <circle cx="45" cy="505" r="8" fill="none" stroke="#1e3a8a" stroke-width="2"/>
    <circle cx="755" cy="505" r="8" fill="none" stroke="#1e3a8a" stroke-width="2"/>

    <!-- Watermark Seal Center -->
    <circle cx="400" cy="275" r="140" fill="none" stroke="#1e3a8a" stroke-width="1" opacity="0.06"/>
    <text x="400" y="275" text-anchor="middle" font-family="'Plus Jakarta Sans', serif" font-size="28" font-weight="bold" fill="#1e3a8a" opacity="0.06" transform="rotate(-25 400 275)">OFFICIAL VERIFIED</text>

    <!-- Header Section -->
    <g transform="translate(400, 85)" text-anchor="middle">
      <text font-family="'Plus Jakarta Sans', serif" font-size="22" font-weight="800" fill="#0f172a" letter-spacing="1.5">${collegeName.toUpperCase()}</text>
      <text y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="1">NATIONAL ACCREDITATION BOARD · INSTITUTION CODE: REG-7410</text>
      <line x1="-250" y1="36" x2="250" y2="36" stroke="url(#goldGrad)" stroke-width="2"/>
    </g>

    <!-- Document Category & Title -->
    <g transform="translate(400, 160)" text-anchor="middle">
      <text font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#2563eb" letter-spacing="2">GOVERNMENT VERIFIED ACADEMIC RECORD</text>
      <text y="32" font-family="'Plus Jakarta Sans', serif" font-size="26" font-weight="800" fill="#1e3a8a" letter-spacing="0.5">${title.toUpperCase()}</text>
    </g>

    <!-- Body Text -->
    <g transform="translate(400, 240)" text-anchor="middle">
      <text font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#475569">This is to officially certify that</text>
      <text y="34" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="#0f172a">${studentName}</text>
      <text y="62" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#475569">Student Registration Number: <tspan font-weight="bold" fill="#1e3a8a">${studentId}</tspan> · Document No: <tspan font-weight="bold" fill="#1e3a8a">${docNumber}</tspan></text>
      <text y="90" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#64748b" width="600">Has fulfilled all requisite institutional requirements, statutory verifications, and academic standards</text>
      <text y="112" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#64748b">pertaining to the issuance of this official record as per university regulations.</text>
    </g>

    <!-- Signatures & Verification Stamp -->
    <g transform="translate(100, 430)">
      <!-- Left Signature: Controller of Exams -->
      <path d="M 0 25 Q 30 5 60 20 T 120 15" fill="none" stroke="#1e3a8a" stroke-width="2"/>
      <line x1="0" y1="35" x2="160" y2="35" stroke="#94a3b8" stroke-width="1"/>
      <text y="50" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#1e293b">Controller of Examinations</text>
      <text y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#64748b">Verified & Attested</text>
    </g>

    <!-- Center Official Seal -->
    <g transform="translate(400, 420)">
      <circle r="42" fill="#f8fafc" stroke="#1e3a8a" stroke-width="2.5" stroke-dasharray="4,2"/>
      <circle r="36" fill="none" stroke="url(#goldGrad)" stroke-width="1.5"/>
      <text y="-8" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="800" fill="#1e3a8a" letter-spacing="1">DIGITAL SEAL</text>
      <text y="6" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#1e3a8a">VERIFIED</text>
      <text y="18" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" fill="#64748b">SECURE ID</text>
    </g>

    <g transform="translate(540, 430)">
      <!-- Right Signature: Dean / Registrar -->
      <path d="M 0 20 Q 40 30 80 15 T 140 25" fill="none" stroke="#1e3a8a" stroke-width="2"/>
      <line x1="0" y1="35" x2="160" y2="35" stroke="#94a3b8" stroke-width="1"/>
      <text y="50" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#1e293b">Dean & Registrar</text>
      <text y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#64748b">Issue Date: ${date}</text>
    </g>

    <!-- Security Footer Barcode Simulation -->
    <g transform="translate(45, 500)">
      <text font-family="'JetBrains Mono', monospace" font-size="9" fill="#94a3b8">SHA256: 4b8f...e92a · DIGITALLY SIGNED VIA AEGIS IDENTITY ENGINE</text>
    </g>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Initial realistic default students
const DEFAULT_STUDENTS: StudentProfile[] = [
  {
    id: 'student-001',
    studentId: 'STU2024CS089',
    fullName: 'Harsha Vardhan P',
    email: 'harshavardhanp580@gmail.com',
    phone: '+91 98480 22334',
    altPhone: '+91 98480 99887',
    dob: '2003-08-14',
    gender: 'Male',
    bloodGroup: 'O+ Positive',
    nationality: 'Indian',
    category: 'General / Merit',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    aadhaarMasked: 'XXXX-XXXX-8924',
    permanentAddress: {
      line1: 'Plot 42, Silicon Enclave, Road No. 12',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      country: 'India',
    },
    currentAddress: {
      line1: 'Hostel Block C, Room 314, Campus Residence',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500085',
      country: 'India',
    },
    parentGuardian: {
      fatherName: 'P. Venkata Ramana',
      fatherOccupation: 'Executive Director (Telecom)',
      fatherPhone: '+91 94401 55678',
      motherName: 'P. Lakshmi Devi',
      motherOccupation: 'High School Educator',
      motherPhone: '+91 94402 11234',
      guardianName: 'Dr. K. Srinivas Rao',
      guardianRelation: 'Maternal Uncle (Local Guardian)',
      guardianPhone: '+91 98490 77654',
    },
    emergencyContact: {
      name: 'P. Venkata Ramana',
      relationship: 'Father',
      phone: '+91 94401 55678',
      altPhone: '+91 98480 22334',
      address: 'Plot 42, Silicon Enclave, Hyderabad, 500081',
    },
    academic: {
      collegeName: 'National Institute of Engineering & Technology',
      collegeCode: 'NIET-HYD-04',
      universityName: 'Apex Technological University',
      department: 'Department of Computer Science & Engineering',
      courseName: 'Bachelor of Technology (B.Tech)',
      branch: 'Computer Science and Engineering (Artificial Intelligence & Systems)',
      yearOfStudy: '4th Year (Senior)',
      semester: '7th Semester',
      admissionNumber: 'ADM-2021-CS-089',
      academicYear: '2024 - 2025',
      admissionDate: '2021-08-16',
      rollNumber: '21041A0589',
      cgpa: 9.18,
      attendancePercent: 94.2,
      totalCreditsCompleted: 136,
      degreeType: 'Undergraduate Full-Time',
      academicStanding: 'Distinction / Dean Honor List',
      semesterHistory: [
        {
          semester: 1,
          academicYear: '2021-22 Sem I',
          sgpa: 9.05,
          creditsEarned: 20,
          totalCredits: 20,
          status: 'Distinction',
          subjects: [
            { code: 'CS101', name: 'Programming for Problem Solving (C & DS)', grade: 'O', credits: 4, points: 10 },
            { code: 'MA101', name: 'Linear Algebra & Advanced Calculus', grade: 'A+', credits: 4, points: 9 },
            { code: 'PH101', name: 'Applied Semiconductor Physics', grade: 'A+', credits: 3, points: 9 },
            { code: 'EE101', name: 'Basic Electrical Engineering', grade: 'O', credits: 3, points: 10 },
            { code: 'EN101', name: 'Professional English & Technical Writing', grade: 'A', credits: 2, points: 8 },
            { code: 'CS102P', name: 'Computer Programming Laboratory', grade: 'O', credits: 2, points: 10 },
            { code: 'PH102P', name: 'Physics Laboratory', grade: 'O', credits: 2, points: 10 },
          ],
        },
        {
          semester: 2,
          academicYear: '2021-22 Sem II',
          sgpa: 9.20,
          creditsEarned: 20,
          totalCredits: 20,
          status: 'Distinction',
          subjects: [
            { code: 'CS201', name: 'Data Structures & Algorithms', grade: 'O', credits: 4, points: 10 },
            { code: 'MA201', name: 'Differential Equations & Vector Calculus', grade: 'O', credits: 4, points: 10 },
            { code: 'CS202', name: 'Object Oriented Programming via Java', grade: 'A+', credits: 3, points: 9 },
            { code: 'EC201', name: 'Digital Logic & Circuit Design', grade: 'A+', credits: 3, points: 9 },
            { code: 'CS203P', name: 'Data Structures Laboratory', grade: 'O', credits: 2, points: 10 },
            { code: 'CS204P', name: 'Java Programming Laboratory', grade: 'O', credits: 2, points: 10 },
            { code: 'MC201', name: 'Environmental Science & Ethics', grade: 'Sat', credits: 2, points: 8 },
          ],
        },
        {
          semester: 3,
          academicYear: '2022-23 Sem I',
          sgpa: 9.35,
          creditsEarned: 22,
          totalCredits: 22,
          status: 'Distinction',
          subjects: [
            { code: 'CS301', name: 'Database Management Systems', grade: 'O', credits: 4, points: 10 },
            { code: 'CS302', name: 'Computer Organization & Architecture', grade: 'A+', credits: 4, points: 9 },
            { code: 'CS303', name: 'Discrete Mathematics & Graph Theory', grade: 'O', credits: 4, points: 10 },
            { code: 'CS304', name: 'Design and Analysis of Algorithms', grade: 'O', credits: 4, points: 10 },
            { code: 'CS305P', name: 'DBMS & SQL Laboratory', grade: 'O', credits: 2, points: 10 },
            { code: 'CS306P', name: 'Algorithm Benchmarking Lab', grade: 'O', credits: 2, points: 10 },
            { code: 'HS301', name: 'Managerial Economics & Financial Analysis', grade: 'A', credits: 2, points: 8 },
          ],
        },
        {
          semester: 4,
          academicYear: '2022-23 Sem II',
          sgpa: 9.15,
          creditsEarned: 22,
          totalCredits: 22,
          status: 'Distinction',
          subjects: [
            { code: 'CS401', name: 'Operating Systems & System Calls', grade: 'O', credits: 4, points: 10 },
            { code: 'CS402', name: 'Theory of Computation & Automata', grade: 'A+', credits: 4, points: 9 },
            { code: 'CS403', name: 'Software Engineering & Agile Methodologies', grade: 'A+', credits: 3, points: 9 },
            { code: 'CS404', name: 'Artificial Intelligence & Search Algorithms', grade: 'O', credits: 4, points: 10 },
            { code: 'CS405P', name: 'Operating Systems Laboratory', grade: 'O', credits: 2, points: 10 },
            { code: 'CS406P', name: 'AI & Python Computing Lab', grade: 'O', credits: 2, points: 10 },
            { code: 'IN401', name: 'Industry Internship Evaluation I', grade: 'O', credits: 3, points: 10 },
          ],
        },
        {
          semester: 5,
          academicYear: '2023-24 Sem I',
          sgpa: 9.25,
          creditsEarned: 22,
          totalCredits: 22,
          status: 'Distinction',
          subjects: [
            { code: 'CS501', name: 'Computer Networks & Protocols', grade: 'O', credits: 4, points: 10 },
            { code: 'CS502', name: 'Machine Learning & Statistical Modeling', grade: 'O', credits: 4, points: 10 },
            { code: 'CS503', name: 'Compiler Design & Lexical Analysis', grade: 'A+', credits: 4, points: 9 },
            { code: 'CS504', name: 'Cloud Computing & Distributed Systems', grade: 'A+', credits: 3, points: 9 },
            { code: 'CS505P', name: 'Computer Networks Simulation Lab', grade: 'O', credits: 2, points: 10 },
            { code: 'CS506P', name: 'Machine Learning Practical Lab', grade: 'O', credits: 2, points: 10 },
            { code: 'PR501', name: 'Capstone Phase 1 Project Initiation', grade: 'O', credits: 3, points: 10 },
          ],
        },
        {
          semester: 6,
          academicYear: '2023-24 Sem II',
          sgpa: 9.10,
          creditsEarned: 22,
          totalCredits: 22,
          status: 'Distinction',
          subjects: [
            { code: 'CS601', name: 'Cryptography & Cyber Network Security', grade: 'O', credits: 4, points: 10 },
            { code: 'CS602', name: 'Deep Learning & Neural Architectures', grade: 'O', credits: 4, points: 10 },
            { code: 'CS603', name: 'Web Services & Microservices Arch', grade: 'A+', credits: 3, points: 9 },
            { code: 'CS604', name: 'Natural Language Processing & LLMs', grade: 'A+', credits: 3, points: 9 },
            { code: 'CS605P', name: 'Cyber Security & Cryptography Lab', grade: 'O', credits: 2, points: 10 },
            { code: 'CS606P', name: 'Deep Learning Models Lab', grade: 'O', credits: 2, points: 10 },
            { code: 'PR601', name: 'Comprehensive Technical Viva Voce', grade: 'O', credits: 4, points: 10 },
          ],
        },
      ],
    },
    collegeDetails: {
      campusAddress: 'University Avenue, Knowledge Park Sector 5, Hyderabad - 500085, India',
      collegeEmail: 'registrar@niet-edu.ac.in',
      collegePhone: '+91 40 2314 7800',
      website: 'https://niet-edu.ac.in',
      registrarEmail: 'dean.academics@niet-edu.ac.in',
      deanName: 'Dr. Aruna Sundaram, Ph.D. (IISc)',
      accreditation: 'NAAC A++ Grade (CGPA 3.82/4.00) · NBA Accredited (Tier 1)',
      affiliationStatus: 'Autonomous Institute affiliated with Apex Technological University',
    },
    additional: {
      scholarshipName: 'Merit Academic Excellence Full Fellowship',
      scholarshipAmount: '₹ 1,20,000 / Academic Year',
      libraryCardNumber: 'LIB-CS-2021-998',
      hostelDetails: 'Hostel Block C (Aryabhata Hall), Room 314, North Wing',
      busRoute: 'Campus Bus Route #12 (Miyapur - Hitec City Express)',
      internships: [
        {
          company: 'Vertex AI Labs / Systems Research',
          role: 'Machine Learning Research Intern',
          duration: 'May 2023 - July 2023 (10 weeks)',
          status: 'Completed with Certificate of Commendation',
        },
        {
          company: 'Cognitive Data Cloud Systems',
          role: 'Full-Stack Software Engineering Intern',
          duration: 'Jan 2024 - Present',
          status: 'Ongoing Technical Practicum',
        },
      ],
      extracurriculars: [
        'Lead Organizer, Campus Hackathon 2023 (1,200+ participants)',
        'Secretary, ACM Student Chapter (2023-2024)',
        '1st Place, National Algorithmic Coding Challenge (Zonal Finalist)',
      ],
    },
    documents: [
      {
        id: 'doc-001',
        name: 'Aadhaar Card (National ID)',
        category: 'Identity',
        fileName: 'Aadhaar_Harsha_Vardhan_Masked.pdf',
        fileType: 'application/pdf',
        fileSize: '1.2 MB',
        uploadDate: '2021-08-14',
        verified: true,
        documentNumber: 'XXXX-XXXX-8924',
        description: 'Government of India Unique Identification Authority Aadhaar Card (Masked e-Aadhaar).',
      },
      {
        id: 'doc-002',
        name: 'Student ID Card (Institutional)',
        category: 'Identity',
        fileName: 'Student_ID_NIET_21041A0589.pdf',
        fileType: 'application/pdf',
        fileSize: '840 KB',
        uploadDate: '2021-08-20',
        verified: true,
        documentNumber: 'NIET-CS-21041A0589',
        description: 'Digital Smart RFID Institutional Identity Card with Barcode & Access Permissions.',
      },
      {
        id: 'doc-003',
        name: 'SSC Secondary School Certificate (10th)',
        category: 'Academic Certificate',
        fileName: 'SSC_Marks_Memo_Board_Secondary.pdf',
        fileType: 'application/pdf',
        fileSize: '2.1 MB',
        uploadDate: '2021-08-14',
        verified: true,
        documentNumber: 'SSC-TS-2019-881290',
        description: 'Board of Secondary Education 10th Standard Consolidated Certificate (GPA: 10.0/10.0).',
      },
      {
        id: 'doc-004',
        name: 'Intermediate Examination Certificate (12th)',
        category: 'Academic Certificate',
        fileName: 'Intermediate_Plus2_Pass_Certificate.pdf',
        fileType: 'application/pdf',
        fileSize: '2.4 MB',
        uploadDate: '2021-08-14',
        verified: true,
        documentNumber: 'BIE-TS-2021-447812',
        description: 'Board of Intermediate Education (MPC stream) Passing Certificate (98.6%).',
      },
      {
        id: 'doc-005',
        name: 'Institutional Bonafide & Conduct Certificate',
        category: 'Bonafide & Conduct',
        fileName: 'Bonafide_Certificate_NIET_2024.pdf',
        fileType: 'application/pdf',
        fileSize: '650 KB',
        uploadDate: '2024-01-10',
        verified: true,
        documentNumber: 'BONA-2024-NIET-0988',
        description: 'Official College Bonafide and Conduct Certificate issued by Principal Office.',
      },
      {
        id: 'doc-006',
        name: 'Consolidated B.Tech Marksheet (Sem 1 - 6)',
        category: 'Marksheet',
        fileName: 'Consolidated_Semester_Transcript_S1_S6.pdf',
        fileType: 'application/pdf',
        fileSize: '3.8 MB',
        uploadDate: '2024-07-15',
        verified: true,
        documentNumber: 'TRANS-ATU-2024-8902',
        description: 'Official University Grade Card with Security Holostamp and Controller Signature.',
      },
      {
        id: 'doc-007',
        name: 'Official Transfer & Migration Certificate',
        category: 'Transfer & Migration',
        fileName: 'Transfer_Certificate_Junior_College.pdf',
        fileType: 'application/pdf',
        fileSize: '1.4 MB',
        uploadDate: '2021-08-15',
        verified: true,
        documentNumber: 'TC-2021-HYD-5501',
        description: 'Transfer Certificate and Migration clearance certificate from prior institute.',
      },
      {
        id: 'doc-008',
        name: 'Formal Passport-Size Photograph (Biometric)',
        category: 'Photograph',
        fileName: 'Passport_Photograph_Biometric_Format.png',
        fileType: 'image/png',
        fileSize: '480 KB',
        uploadDate: '2021-08-10',
        verified: true,
        documentNumber: 'BIO-PHOTO-2021-89',
        description: 'White background studio biometric identity photograph for official university hall tickets.',
      },
    ],
    security: {
      passwordHash: '', // Will be initialized with SHA-256 of 'Password@123'
      twoFactorEnabled: true,
      autoLogoutMinutes: 15,
      lastPasswordChange: '2024-06-20',
      activeSessions: [
        {
          id: 'sess-01',
          device: 'MacBook Pro 16" (Sonoma)',
          browser: 'Chrome 128.0.0',
          ip: '103.24.120.45',
          location: 'Hyderabad, India',
          lastActive: 'Active Now',
          isCurrent: true,
        },
        {
          id: 'sess-02',
          device: 'iPhone 15 Pro (iOS 18)',
          browser: 'Safari Mobile',
          ip: '103.24.120.45',
          location: 'Hyderabad, India',
          lastActive: '2 hours ago',
          isCurrent: false,
        },
      ],
      auditLogs: [
        {
          id: 'log-01',
          action: 'Biometric Face Scan Authentication Succeeded',
          timestamp: '2024-11-03 08:30:12',
          ipAddress: '103.24.120.45',
          device: 'MacBook Pro (Chrome)',
          status: 'Success',
        },
        {
          id: 'log-02',
          action: 'Document Downloaded: Consolidated B.Tech Marksheet',
          timestamp: '2024-11-02 16:45:00',
          ipAddress: '103.24.120.45',
          device: 'MacBook Pro (Chrome)',
          status: 'Info',
        },
        {
          id: 'log-03',
          action: 'Security Settings: 2FA Biometric Preference Updated',
          timestamp: '2024-10-28 11:15:32',
          ipAddress: '103.24.120.45',
          device: 'MacBook Pro (Chrome)',
          status: 'Success',
        },
      ],
    },
  },
  {
    id: 'student-002',
    studentId: 'STU2024AI104',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@campus.edu',
    phone: '+91 98230 44556',
    dob: '2004-03-22',
    gender: 'Female',
    bloodGroup: 'B+ Positive',
    nationality: 'Indian',
    category: 'Merit Scholars',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    aadhaarMasked: 'XXXX-XXXX-3419',
    permanentAddress: {
      line1: 'Flat 602, Gulmohar Residency, Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      postalCode: '411001',
      country: 'India',
    },
    currentAddress: {
      line1: 'Campus Hostel Block B, Room 208',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500085',
      country: 'India',
    },
    parentGuardian: {
      fatherName: 'Rajesh Sharma',
      fatherOccupation: 'Senior Architect',
      fatherPhone: '+91 98220 11990',
      motherName: 'Sunita Sharma',
      motherOccupation: 'Chartered Accountant',
      motherPhone: '+91 98220 11991',
    },
    emergencyContact: {
      name: 'Rajesh Sharma',
      relationship: 'Father',
      phone: '+91 98220 11990',
      altPhone: '+91 98230 44556',
      address: 'Flat 602, Gulmohar Residency, Pune',
    },
    academic: {
      collegeName: 'National Institute of Engineering & Technology',
      collegeCode: 'NIET-HYD-04',
      universityName: 'Apex Technological University',
      department: 'Department of Artificial Intelligence & Data Science',
      courseName: 'Bachelor of Technology (B.Tech)',
      branch: 'Artificial Intelligence & Machine Learning',
      yearOfStudy: '3rd Year (Junior)',
      semester: '5th Semester',
      admissionNumber: 'ADM-2022-AI-104',
      academicYear: '2024 - 2025',
      admissionDate: '2022-08-18',
      rollNumber: '22041A3104',
      cgpa: 9.42,
      attendancePercent: 96.5,
      totalCreditsCompleted: 98,
      degreeType: 'Undergraduate Full-Time',
      academicStanding: 'Dean Honor Roll · Rank #1 in Department',
      semesterHistory: [],
    },
    collegeDetails: {
      campusAddress: 'University Avenue, Knowledge Park Sector 5, Hyderabad - 500085, India',
      collegeEmail: 'registrar@niet-edu.ac.in',
      collegePhone: '+91 40 2314 7800',
      website: 'https://niet-edu.ac.in',
      registrarEmail: 'dean.academics@niet-edu.ac.in',
      deanName: 'Dr. Aruna Sundaram, Ph.D. (IISc)',
      accreditation: 'NAAC A++ Grade (CGPA 3.82/4.00) · NBA Accredited (Tier 1)',
      affiliationStatus: 'Autonomous Institute affiliated with Apex Technological University',
    },
    additional: {
      scholarshipName: 'Women in STEM National Leadership Scholarship',
      scholarshipAmount: '₹ 1,50,000 / Academic Year',
      libraryCardNumber: 'LIB-AI-2022-411',
      hostelDetails: 'Hostel Block B (Kalpana Chawla Hall), Room 208',
      busRoute: 'Campus Resident',
      internships: [],
      extracurriculars: ['Vice President, Women in Tech Club', 'Classical Violinist'],
    },
    documents: [
      {
        id: 'doc-p01',
        name: 'Aadhaar Card (National ID)',
        category: 'Identity',
        fileName: 'Aadhaar_Priya_Sharma_Masked.pdf',
        fileType: 'application/pdf',
        fileSize: '1.1 MB',
        uploadDate: '2022-08-12',
        verified: true,
        documentNumber: 'XXXX-XXXX-3419',
      },
      {
        id: 'doc-p02',
        name: 'Student ID Card (Institutional)',
        category: 'Identity',
        fileName: 'Student_ID_NIET_22041A3104.pdf',
        fileType: 'application/pdf',
        fileSize: '820 KB',
        uploadDate: '2022-08-20',
        verified: true,
        documentNumber: 'NIET-AI-22041A3104',
      },
      {
        id: 'doc-p03',
        name: 'SSC Secondary School Certificate (10th)',
        category: 'Academic Certificate',
        fileName: 'SSC_Marks_Memo_Priya.pdf',
        fileType: 'application/pdf',
        fileSize: '1.9 MB',
        uploadDate: '2022-08-12',
        verified: true,
        documentNumber: 'SSC-MH-2020-771928',
      },
    ],
    security: {
      passwordHash: '',
      twoFactorEnabled: true,
      autoLogoutMinutes: 15,
      lastPasswordChange: '2024-05-10',
      activeSessions: [],
      auditLogs: [],
    },
  },
  {
    id: 'student-003',
    studentId: 'STU2024EC055',
    fullName: 'Alexander Chen',
    email: 'alexander.chen@campus.edu',
    phone: '+91 97000 88123',
    dob: '2004-11-05',
    gender: 'Male',
    bloodGroup: 'A+ Positive',
    nationality: 'International / Canadian',
    category: 'International Student Quota',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    aadhaarMasked: 'PASS-CAN-Z992819',
    permanentAddress: {
      line1: '450 Bay Street, Suite 1200',
      city: 'Toronto',
      state: 'Ontario',
      postalCode: 'M5H 2V6',
      country: 'Canada',
    },
    currentAddress: {
      line1: 'International Hostel Block D, Room 102',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500085',
      country: 'India',
    },
    parentGuardian: {
      fatherName: 'Dr. Michael Chen',
      fatherOccupation: 'Biotech Scientist',
      fatherPhone: '+1 416 555 0192',
      motherName: 'Grace Chen',
      motherOccupation: 'University Professor',
      motherPhone: '+1 416 555 0193',
    },
    emergencyContact: {
      name: 'International Students Office Liaison',
      relationship: 'Institutional Guardian',
      phone: '+91 40 2314 7890',
      altPhone: '+1 416 555 0192',
      address: 'University International Affairs Building, Hyderabad',
    },
    academic: {
      collegeName: 'National Institute of Engineering & Technology',
      collegeCode: 'NIET-HYD-04',
      universityName: 'Apex Technological University',
      department: 'Department of Electronics & Communication',
      courseName: 'Bachelor of Technology (B.Tech)',
      branch: 'Electronics and Embedded Systems',
      yearOfStudy: '2nd Year (Sophomore)',
      semester: '3rd Semester',
      admissionNumber: 'ADM-2023-EC-055',
      academicYear: '2024 - 2025',
      admissionDate: '2023-08-10',
      rollNumber: '23041A0455',
      cgpa: 8.94,
      attendancePercent: 91.8,
      totalCreditsCompleted: 54,
      degreeType: 'Undergraduate Full-Time',
      academicStanding: 'First Class with Distinction',
      semesterHistory: [],
    },
    collegeDetails: {
      campusAddress: 'University Avenue, Knowledge Park Sector 5, Hyderabad - 500085, India',
      collegeEmail: 'registrar@niet-edu.ac.in',
      collegePhone: '+91 40 2314 7800',
      website: 'https://niet-edu.ac.in',
      registrarEmail: 'dean.academics@niet-edu.ac.in',
      deanName: 'Dr. Aruna Sundaram, Ph.D. (IISc)',
      accreditation: 'NAAC A++ Grade (CGPA 3.82/4.00) · NBA Accredited (Tier 1)',
      affiliationStatus: 'Autonomous Institute affiliated with Apex Technological University',
    },
    additional: {
      libraryCardNumber: 'LIB-EC-2023-118',
      hostelDetails: 'International Scholar Residence, Room 102',
      busRoute: 'Campus Shuttle',
      internships: [],
      extracurriculars: ['Robotics Team Hardware Lead', 'Campus Chess Club Captain'],
    },
    documents: [
      {
        id: 'doc-a01',
        name: 'Passport & Student Visa (International)',
        category: 'Identity',
        fileName: 'Passport_Copy_Canada_Alex.pdf',
        fileType: 'application/pdf',
        fileSize: '2.5 MB',
        uploadDate: '2023-08-05',
        verified: true,
        documentNumber: 'CAN-Z992819',
      },
    ],
    security: {
      passwordHash: '',
      twoFactorEnabled: false,
      autoLogoutMinutes: 30,
      lastPasswordChange: '2024-01-15',
      activeSessions: [],
      auditLogs: [],
    },
  },
];

const STORAGE_KEY_STUDENTS = 'secure_portal_students_v2';
const STORAGE_KEY_CURRENT_SESSION = 'secure_portal_current_student_id';

// Initialize storage with SHA-256 password hash if not exists
export async function initializeStudentDatabase(): Promise<StudentProfile[]> {
  if (typeof window === 'undefined') return DEFAULT_STUDENTS;
  
  const existing = localStorage.getItem(STORAGE_KEY_STUDENTS);
  if (existing) {
    try {
      const parsed: StudentProfile[] = JSON.parse(existing);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // JSON parse error, re-init
    }
  }

  // Pre-hash default password "Password@123"
  const defaultHash = await hashPassword('Password@123');
  const initialized = DEFAULT_STUDENTS.map(student => {
    // Populate generated SVGs for documents if not set
    const docs = student.documents.map(doc => ({
      ...doc,
      fileData: doc.fileData || generateCertificateSvg(
        doc.category,
        doc.name,
        student.fullName,
        student.studentId,
        doc.documentNumber || 'DOC-2024-' + doc.id,
        doc.uploadDate,
        student.academic.collegeName
      )
    }));

    return {
      ...student,
      documents: docs,
      security: {
        ...student.security,
        passwordHash: defaultHash,
      }
    };
  });

  localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(initialized));
  return initialized;
}

// Get all students (internal store)
export async function getAllStudents(): Promise<StudentProfile[]> {
  return await initializeStudentDatabase();
}

// Get logged in student strictly isolated to their own record
export async function getLoggedInStudent(): Promise<StudentProfile | null> {
  if (typeof window === 'undefined') return null;
  const currentId = localStorage.getItem(STORAGE_KEY_CURRENT_SESSION);
  if (!currentId) return null;
  
  const students = await initializeStudentDatabase();
  const found = students.find(s => s.id === currentId || s.studentId.toLowerCase() === currentId.toLowerCase());
  return found || null;
}

// Authenticate user with Student ID, Name (fuzzy/case-insensitive), and Password
export async function authenticateStudent(
  studentIdOrReg: string,
  providedPassword: string,
  providedName?: string
): Promise<{ success: boolean; student?: StudentProfile; error?: string }> {
  const students = await initializeStudentDatabase();
  const cleanId = studentIdOrReg.trim().toLowerCase();
  
  const student = students.find(s => 
    s.studentId.toLowerCase() === cleanId || 
    s.id.toLowerCase() === cleanId
  );

  if (!student) {
    return { success: false, error: 'Student ID or Registration number not found in university records.' };
  }

  // Optional Name matching if provided
  if (providedName && providedName.trim()) {
    const inputParts = providedName.trim().toLowerCase().split(/\s+/);
    const studentNameParts = student.fullName.toLowerCase().split(/\s+/);
    const hasNameMatch = inputParts.some(p => studentNameParts.some(sp => sp.includes(p) || p.includes(sp)));
    if (!hasNameMatch) {
      return { success: false, error: 'Student Name does not match registered university profile for this ID.' };
    }
  }

  // Verify SHA-256 password hash
  const inputHash = await hashPassword(providedPassword.trim());
  if (inputHash !== student.security.passwordHash) {
    // Log failed attempt
    await logSecurityAction(student.id, 'Failed login attempt: incorrect password', 'Warning');
    return { success: false, error: 'Invalid password. Please verify credentials or reset your password.' };
  }

  // Set session
  localStorage.setItem(STORAGE_KEY_CURRENT_SESSION, student.id);
  
  // Log successful login
  await logSecurityAction(student.id, 'Authorized student identity access', 'Success');

  return { success: true, student };
}

// Update current student profile (save back to localStorage)
export async function updateCurrentStudentProfile(updates: Partial<StudentProfile>): Promise<StudentProfile> {
  const current = await getLoggedInStudent();
  if (!current) throw new Error('No active student session');

  const students = await getAllStudents();
  const index = students.findIndex(s => s.id === current.id);
  if (index === -1) throw new Error('Student record not found');

  const updated: StudentProfile = {
    ...current,
    ...updates,
    academic: {
      ...current.academic,
      ...(updates.academic || {})
    },
    parentGuardian: {
      ...current.parentGuardian,
      ...(updates.parentGuardian || {})
    },
    emergencyContact: {
      ...current.emergencyContact,
      ...(updates.emergencyContact || {})
    },
    permanentAddress: {
      ...current.permanentAddress,
      ...(updates.permanentAddress || {})
    },
    currentAddress: {
      ...current.currentAddress,
      ...(updates.currentAddress || {})
    },
    security: {
      ...current.security,
      ...(updates.security || {})
    }
  };

  students[index] = updated;
  localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  return updated;
}

// Add document to current student's private vault
export async function addStudentDocument(doc: Omit<StudentDocument, 'id' | 'uploadDate' | 'verified'>): Promise<StudentDocument> {
  const student = await getLoggedInStudent();
  if (!student) throw new Error('No active student session');

  const newDoc: StudentDocument = {
    ...doc,
    id: 'doc-user-' + Date.now(),
    uploadDate: new Date().toISOString().split('T')[0],
    verified: true,
  };

  const updatedDocs = [newDoc, ...student.documents];
  await updateCurrentStudentProfile({ documents: updatedDocs });
  await logSecurityAction(student.id, `Uploaded new private document: ${doc.name}`, 'Info');
  return newDoc;
}

// Delete document from student vault
export async function deleteStudentDocument(docId: string): Promise<void> {
  const student = await getLoggedInStudent();
  if (!student) throw new Error('No active student session');

  const doc = student.documents.find(d => d.id === docId);
  const updatedDocs = student.documents.filter(d => d.id !== docId);
  await updateCurrentStudentProfile({ documents: updatedDocs });
  await logSecurityAction(student.id, `Deleted document: ${doc?.name || docId}`, 'Warning');
}

// Change password
export async function changeStudentPassword(oldPass: string, newPass: string): Promise<{ success: boolean; error?: string }> {
  const student = await getLoggedInStudent();
  if (!student) return { success: false, error: 'No active session.' };

  const oldHash = await hashPassword(oldPass.trim());
  if (oldHash !== student.security.passwordHash) {
    return { success: false, error: 'Current password does not match records.' };
  }

  if (newPass.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters long.' };
  }

  const newHash = await hashPassword(newPass.trim());
  await updateCurrentStudentProfile({
    security: {
      ...student.security,
      passwordHash: newHash,
      lastPasswordChange: new Date().toISOString().split('T')[0]
    }
  });

  await logSecurityAction(student.id, 'Password successfully updated via security console', 'Success');
  return { success: true };
}

// Reset password by student ID & registered email
export async function resetStudentPassword(
  studentId: string,
  email: string,
  newPass: string
): Promise<{ success: boolean; error?: string }> {
  const students = await getAllStudents();
  const cleanId = studentId.trim().toLowerCase();
  const cleanEmail = email.trim().toLowerCase();

  const student = students.find(s => 
    (s.studentId.toLowerCase() === cleanId || s.id.toLowerCase() === cleanId) &&
    s.email.toLowerCase() === cleanEmail
  );

  if (!student) {
    return { success: false, error: 'No student matches that registration number and registered email.' };
  }

  const newHash = await hashPassword(newPass.trim());
  const index = students.findIndex(s => s.id === student.id);
  students[index] = {
    ...student,
    security: {
      ...student.security,
      passwordHash: newHash,
      lastPasswordChange: new Date().toISOString().split('T')[0]
    }
  };

  localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  return { success: true };
}

// End current session
export function logoutCurrentStudent(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_CURRENT_SESSION);
  }
}

// Append security audit log
export async function logSecurityAction(
  studentId: string,
  action: string,
  status: 'Success' | 'Warning' | 'Info' = 'Info'
): Promise<void> {
  const students = await getAllStudents();
  const index = students.findIndex(s => s.id === studentId);
  if (index === -1) return;

  const now = new Date();
  const formatted = now.toISOString().replace('T', ' ').substring(0, 19);
  const newLog = {
    id: 'log-' + Date.now(),
    action,
    timestamp: formatted,
    ipAddress: '103.24.120.45',
    device: 'Desktop / Authorized Client',
    status,
  };

  const updatedLogs = [newLog, ...(students[index].security.auditLogs || [])].slice(0, 20);
  students[index].security.auditLogs = updatedLogs;
  localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
}
