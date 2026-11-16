export type UserRole = 'patient' | 'doctor' | 'admin';

export type ConsultationType =
  | 'spine_consultation'
  | 'trauma_fracture'
  | 'joint_replacement'
  | 'post_op_review'
  | 'telemedicine'
  | 'second_opinion';

export type AppointmentStatus =
  | 'confirmed'
  | 'checked_in'
  | 'in_consultation'
  | 'completed'
  | 'rescheduled'
  | 'cancelled';

export interface Chamber {
  id: string;
  name: string;
  hospital: string;
  address: string;
  days: string[];
  timing: string;
  room: string;
  phone: string;
  consultationFee: number;
  followUpFee: number;
  isOperatingDay?: boolean;
  image?: string;
}

export interface PatientHistoryRecord {
  id: string;
  uhid: string; // Unique Health ID e.g. "FA-ORTHO-8910"
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  comorbidities: string[]; // e.g. "Type 2 Diabetes Mellitus", "Hypertension"
  pastSurgeries: {
    procedure: string;
    date: string;
    surgeon: string;
    implantDetails?: string;
    notes?: string;
  }[];
  radiologyScans: {
    id: string;
    type: 'MRI' | 'X-Ray' | 'CT 3D' | 'Ultrasound';
    bodyPart: string;
    date: string;
    findings: string;
    radiologist: string;
  }[];
  vasPainScores: {
    date: string;
    score: number; // 0 - 10
    note: string;
  }[];
  previousConsultations: {
    id: string;
    date: string;
    diagnosis: string;
    clinicalNotes: string;
    prescribedMedications: {
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }[];
    advisedTherapy?: string;
    nextFollowUp?: string;
  }[];
}

export interface Appointment {
  id: string;
  referenceCode: string; // e.g. "FA-APT-7429"
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "06:30 PM"
  chamberId: string;
  chamberName: string;
  consultationType: ConsultationType;
  chiefComplaint: string;
  painDuration: string;
  hasPreviousScans: boolean;
  priority: 'emergency' | 'urgent' | 'routine';
  status: AppointmentStatus;
  createdAt: string;
  automatedEmailSent: boolean;
  notes?: string;
  doctorPrescription?: {
    diagnosis: string;
    advice: string;
    medications: string[];
    followUpDate: string;
  };
}

export interface SecureMessage {
  id: string;
  conversationId: string;
  patientId: string;
  patientName: string;
  senderRole: UserRole | 'system';
  senderName: string;
  messageText: string;
  category:
    | 'wound_check'
    | 'pain_management'
    | 'medication_query'
    | 'rehab_exercise'
    | 'urgent_concern'
    | 'general';
  attachments?: {
    name: string;
    type: 'image' | 'pdf' | 'document';
    url?: string;
    description: string;
  }[];
  timestamp: string;
  isEncrypted: boolean;
  encryptionAlgorithm: string; // e.g. "AES-256-GCM / Patient Portal Grade"
  status: 'sent' | 'delivered' | 'read';
  flaggedUrgent?: boolean;
}

export interface SurgicalGuide {
  id: string;
  category: 'spine' | 'trauma' | 'joint' | 'post_op';
  title: string;
  subtitle: string;
  overview: string;
  keyIndications: string[];
  surgicalApproach: string[];
  rehabMilestones: {
    phase: string;
    timeframe: string;
    goals: string[];
    restrictions: string[];
  }[];
  redFlags: string[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export interface ClinicalAuditLog {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorName: string;
  action: string;
  resourceId: string;
  hipaaVerified: boolean;
}
