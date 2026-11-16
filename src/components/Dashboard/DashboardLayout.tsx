import React from 'react';
import { useApp } from '../../context/AppContext';
import { DOCTOR_INFO } from '../../data/initialData';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  ShieldCheck, 
  ArrowLeft, 
  User, 
  Clock, 
  Plus 
} from 'lucide-react';
import { AppointmentsQueueTab } from './AppointmentsQueueTab';
import { PatientRegistryTab } from './PatientRegistryTab';
import { SecureMessagingTab } from './SecureMessagingTab';
import { AdminScheduleAuditTab } from './AdminScheduleAuditTab';

export const DashboardLayout: React.FC = () => {
  const { 
    role, 
    dashboardTab, 
    setDashboardTab, 
    setActiveView, 
    setShowRoleModal, 
    setShowBookingModal,
    appointments 
  } = useApp();

  const getRoleDisplay = () => {
    switch (role) {
      case 'doctor':
        return { name: DOCTOR_INFO.name, title: 'Attending Orthopedic Spine & Trauma Surgeon', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'admin':
        return { name: 'Hospital Operations Director', title: 'Clinical Administration & Compliance Officer', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      default:
        return { name: 'Patient Portal Session', title: 'Verified Registered Patient Record', color: 'bg-sky-50 text-sky-800 border-sky-200' };
    }
  };

  const roleInfo = getRoleDisplay();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        {/* Top Breadcrumb & User Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('portfolio')}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              title="Return to Public Portfolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              {role === 'doctor' && (
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-slate-300 shrink-0">
                  <img
                    src={DOCTOR_INFO.portraitCutout}
                    alt={DOCTOR_INFO.shortTitle}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div>
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span>Clinical Operations</span>
                  <span>/</span>
                  <span className="font-semibold text-slate-800">Hospital Portal</span>
                </div>
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                  {roleInfo.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${roleInfo.color}`}>
              <User className="w-3.5 h-3.5" />
              <span>Role: <strong className="uppercase">{role}</strong></span>
              <button
                onClick={() => setShowRoleModal(true)}
                className="underline text-[11px] ml-1 hover:opacity-80"
              >
                Change Role
              </button>
            </div>

            <button
              onClick={() => setShowBookingModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5 text-sky-400" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl">
          <button
            onClick={() => setDashboardTab('queue')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              dashboardTab === 'queue'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            <span>Consultation Queue</span>
            <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded-full">
              {appointments.length}
            </span>
          </button>

          <button
            onClick={() => setDashboardTab('patient_history')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              dashboardTab === 'patient_history'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-teal-600" />
            <span>Patient Registry &amp; Medical History</span>
          </button>

          <button
            onClick={() => setDashboardTab('messages')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              dashboardTab === 'messages'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-sky-600" />
            <span>Secure Follow-Up Chat</span>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
              Portal
            </span>
          </button>

          <button
            onClick={() => setDashboardTab('schedule')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              dashboardTab === 'schedule'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Admin OT Blocks &amp; Audit Logs</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div>
          {dashboardTab === 'queue' && <AppointmentsQueueTab />}
          {dashboardTab === 'patient_history' && <PatientRegistryTab />}
          {dashboardTab === 'messages' && <SecureMessagingTab />}
          {dashboardTab === 'schedule' && <AdminScheduleAuditTab />}
        </div>
      </div>
    </div>
  );
};
