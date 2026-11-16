import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Appointment, 
  PatientHistoryRecord, 
  SecureMessage, 
  Chamber,
  AppointmentStatus 
} from '../types';
import { 
  CHAMBERS, 
  INITIAL_PATIENTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_MESSAGES,
  DOCTOR_INFO 
} from '../data/initialData';
import { recordAuditLog } from '../utils/security';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeView: 'portfolio' | 'dashboard' | 'guides' | 'booking';
  setActiveView: (view: 'portfolio' | 'dashboard' | 'guides' | 'booking') => void;
  dashboardTab: 'queue' | 'patient_history' | 'messages' | 'schedule' | 'audit';
  setDashboardTab: (tab: 'queue' | 'patient_history' | 'messages' | 'schedule' | 'audit') => void;
  chambers: Chamber[];
  patients: PatientHistoryRecord[];
  appointments: Appointment[];
  messages: SecureMessage[];
  currentPatientId: string;
  setCurrentPatientId: (id: string) => void;
  selectedPatientForReview: PatientHistoryRecord | null;
  setSelectedPatientForReview: (patient: PatientHistoryRecord | null) => void;
  bookAppointment: (data: Omit<Appointment, 'id' | 'referenceCode' | 'createdAt' | 'status' | 'automatedEmailSent'>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addConsultationRecord: (patientId: string, consultation: PatientHistoryRecord['previousConsultations'][0]) => void;
  sendSecureMessage: (text: string, category: SecureMessage['category'], patientId?: string) => void;
  latestNotificationEmail: Appointment | null;
  setLatestNotificationEmail: (apt: Appointment | null) => void;
  showBookingModal: boolean;
  setShowBookingModal: (show: boolean) => void;
  showRoleModal: boolean;
  setShowRoleModal: (show: boolean) => void;
  isHipaaVerified: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  APPOINTMENTS: 'fa_ortho_appointments_v1',
  PATIENTS: 'fa_ortho_patients_v1',
  MESSAGES: 'fa_ortho_messages_v1',
  ROLE: 'fa_ortho_user_role_v1',
  CURRENT_PATIENT: 'fa_ortho_current_patient_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
      return (saved as UserRole) || 'patient';
    } catch {
      return 'patient';
    }
  });

  const [activeView, setActiveView] = useState<'portfolio' | 'dashboard' | 'guides' | 'booking'>('portfolio');
  const [dashboardTab, setDashboardTab] = useState<'queue' | 'patient_history' | 'messages' | 'schedule' | 'audit'>('queue');
  const [chambers] = useState<Chamber[]>(CHAMBERS);

  const [patients, setPatients] = useState<PatientHistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [messages, setMessages] = useState<SecureMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [currentPatientId, setCurrentPatientId] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_PATIENT) || 'pat-101';
    } catch {
      return 'pat-101';
    }
  });

  const [selectedPatientForReview, setSelectedPatientForReview] = useState<PatientHistoryRecord | null>(null);
  const [latestNotificationEmail, setLatestNotificationEmail] = useState<Appointment | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);
  const isHipaaVerified = true;

  // Persist state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
    } catch {}
  }, [role]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch {}
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    } catch {}
  }, [patients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PATIENT, currentPatientId);
    } catch {}
  }, [currentPatientId]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    recordAuditLog(newRole, newRole === 'doctor' ? DOCTOR_INFO.name : (newRole === 'admin' ? 'Clinic Administrator' : 'Patient Session'), `Switched system role to ${newRole.toUpperCase()}`, 'SYSTEM_AUTH');
  };

  const bookAppointment = (data: Omit<Appointment, 'id' | 'referenceCode' | 'createdAt' | 'status' | 'automatedEmailSent'>): Appointment => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `FA-APT-${randomDigits}`;
    const newId = `apt-${Date.now()}`;

    // Check if patient exists or create new entry
    let patientId = data.patientId;
    if (!patientId || patientId === 'guest') {
      const existingPat = patients.find(p => p.phone === data.patientPhone || p.email.toLowerCase() === data.patientEmail.toLowerCase());
      if (existingPat) {
        patientId = existingPat.id;
      } else {
        const newPatient: PatientHistoryRecord = {
          id: `pat-${Date.now()}`,
          uhid: `FA-ORTHO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          fullName: data.patientName,
          age: data.patientAge,
          gender: data.patientGender,
          bloodGroup: 'Pending',
          phone: data.patientPhone,
          email: data.patientEmail,
          address: 'Chamber Registered Patient',
          emergencyContact: {
            name: 'Primary Contact',
            relationship: 'Family Member',
            phone: data.patientPhone
          },
          allergies: [],
          comorbidities: [],
          pastSurgeries: [],
          radiologyScans: data.hasPreviousScans ? [
            {
              id: `rad-${Date.now()}`,
              type: 'MRI',
              bodyPart: 'Spine / Musculoskeletal Scan',
              date: new Date().toISOString().split('T')[0],
              findings: `Patient reported: ${data.chiefComplaint}`,
              radiologist: 'Uploaded by Patient for Consultation Review'
            }
          ] : [],
          vasPainScores: [
            {
              date: new Date().toISOString().split('T')[0],
              score: data.priority === 'emergency' ? 9 : (data.priority === 'urgent' ? 7 : 4),
              note: `Initial booking: ${data.chiefComplaint} (${data.painDuration})`
            }
          ],
          previousConsultations: []
        };
        setPatients(prev => [newPatient, ...prev]);
        patientId = newPatient.id;
      }
    }

    const newAppointment: Appointment = {
      ...data,
      id: newId,
      patientId,
      referenceCode,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      automatedEmailSent: true
    };

    setAppointments(prev => [newAppointment, ...prev]);
    setLatestNotificationEmail(newAppointment);

    // Audit log
    recordAuditLog(
      role,
      data.patientName,
      `Booked appointment ${referenceCode} with ${DOCTOR_INFO.shortTitle} for ${data.date} at ${data.timeSlot}`,
      newId
    );

    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status } : apt));
    recordAuditLog(role, role === 'doctor' ? DOCTOR_INFO.name : 'System Coordinator', `Updated appointment ${id} status to ${status.toUpperCase()}`, id);
  };

  const addConsultationRecord = (patientId: string, consultation: PatientHistoryRecord['previousConsultations'][0]) => {
    setPatients(prev => prev.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          previousConsultations: [consultation, ...patient.previousConsultations],
          vasPainScores: [
            {
              date: consultation.date,
              score: 2,
              note: `Consultation recorded: ${consultation.diagnosis}`
            },
            ...patient.vasPainScores
          ]
        };
      }
      return patient;
    }));

    recordAuditLog('doctor', DOCTOR_INFO.name, `Recorded clinical notes and prescription for Patient ${patientId}`, patientId);
  };

  const sendSecureMessage = (
    text: string, 
    category: SecureMessage['category'],
    targetPatientId?: string
  ) => {
    const currentPat = patients.find(p => p.id === (targetPatientId || currentPatientId)) || patients[0];
    const isSenderDoctor = role === 'doctor';
    
    const newMsg: SecureMessage = {
      id: `msg-${Date.now()}`,
      conversationId: `conv-${currentPat.id}`,
      patientId: currentPat.id,
      patientName: currentPat.fullName,
      senderRole: isSenderDoctor ? 'doctor' : 'patient',
      senderName: isSenderDoctor ? DOCTOR_INFO.name : currentPat.fullName,
      messageText: text,
      category,
      timestamp: new Date().toISOString(),
      isEncrypted: true,
      encryptionAlgorithm: 'AES-256-GCM / Patient Portal Standard',
      status: 'delivered'
    };

    setMessages(prev => [...prev, newMsg]);

    recordAuditLog(
      role,
      isSenderDoctor ? DOCTOR_INFO.name : currentPat.fullName,
      `Dispatched encrypted clinical message regarding ${category.replace('_', ' ')}`,
      newMsg.id
    );

    // If sent by patient, simulate doctor/care-team acknowledgement after 1.5 seconds if not already doctor
    if (!isSenderDoctor) {
      setTimeout(() => {
        let replyText = 'Thank you for updating. Your message and recovery status have been logged in Dr. Faisal\'s clinical dashboard. For post-op recovery: continue prescribed ice application and notify us if you experience any sudden swelling, fever or calf pain.';
        if (category === 'wound_check') {
          replyText = 'Wound update received. Please continue keeping the surgical site dry and clean with sterile gauze. Dr. Faisal will review this during evening chamber rounds.';
        } else if (category === 'pain_management') {
          replyText = 'Pain status logged. Please do not exceed the prescribed paracetamol/pregabalin dosage without direct consultation. If pain is accompanied by sudden numbness or leg weakness, contact the emergency hotline.';
        }

        const doctorAutoReply: SecureMessage = {
          id: `msg-${Date.now() + 1}`,
          conversationId: `conv-${currentPat.id}`,
          patientId: currentPat.id,
          patientName: currentPat.fullName,
          senderRole: 'doctor',
          senderName: `${DOCTOR_INFO.shortTitle} (Care Coordinator)`,
          messageText: replyText,
          category,
          timestamp: new Date().toISOString(),
          isEncrypted: true,
          encryptionAlgorithm: 'AES-256-GCM / Patient Portal Standard',
          status: 'delivered'
        };
        setMessages(prev => [...prev, doctorAutoReply]);
      }, 1200);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeView,
        setActiveView,
        dashboardTab,
        setDashboardTab,
        chambers,
        patients,
        appointments,
        messages,
        currentPatientId,
        setCurrentPatientId,
        selectedPatientForReview,
        setSelectedPatientForReview,
        bookAppointment,
        updateAppointmentStatus,
        addConsultationRecord,
        sendSecureMessage,
        latestNotificationEmail,
        setLatestNotificationEmail,
        showBookingModal,
        setShowBookingModal,
        showRoleModal,
        setShowRoleModal,
        isHipaaVerified
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
