import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment, AppointmentStatus } from '../../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  CheckCircle, 
  Plus, 
  Filter, 
  UserCheck 
} from 'lucide-react';
import { PatientHistoryQuickRefModal } from './PatientHistoryQuickRefModal';

export const AppointmentsQueueTab: React.FC = () => {
  const { 
    role, 
    appointments, 
    updateAppointmentStatus, 
    patients, 
    setShowBookingModal,
    setSelectedPatientForReview,
    selectedPatientForReview 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return { label: 'Confirmed', bg: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'checked_in':
        return { label: 'Checked In / Waiting', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'in_consultation':
        return { label: 'In Consultation', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse' };
      case 'completed':
        return { label: 'Completed', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
      default:
        return { label: status, bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const handleOpenPatientHistory = (apt: Appointment) => {
    const foundPatient = patients.find(p => p.id === apt.patientId) || {
      id: apt.patientId,
      uhid: `FA-ORTHO-${apt.referenceCode.split('-').pop()}`,
      fullName: apt.patientName,
      age: apt.patientAge,
      gender: apt.patientGender,
      bloodGroup: 'B+',
      phone: apt.patientPhone,
      email: apt.patientEmail,
      address: 'Chamber Registered Patient',
      emergencyContact: {
        name: 'Primary Contact',
        relationship: 'Family Member',
        phone: apt.patientPhone
      },
      allergies: ['No known allergies documented'],
      comorbidities: ['Hypertension (reported)'],
      pastSurgeries: [],
      radiologyScans: [
        {
          id: 'rad-temp',
          type: 'MRI',
          bodyPart: 'Lumbosacral Spine / Orthopedic X-Ray',
          date: apt.date,
          findings: apt.chiefComplaint,
          radiologist: 'Attached for Consultation Review'
        }
      ],
      vasPainScores: [
        {
          date: apt.date,
          score: apt.priority === 'emergency' ? 9 : (apt.priority === 'urgent' ? 7 : 4),
          note: `Pre-visit triage: ${apt.chiefComplaint}`
        }
      ],
      previousConsultations: []
    };

    setSelectedPatientForReview(foundPatient as any);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'all', label: 'All Scheduled' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'checked_in', label: 'Checked In' },
            { id: 'in_consultation', label: 'In Progress' },
            { id: 'completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient, ref code or symptoms..."
            className="px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 w-full sm:w-64"
          />

          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-sky-400" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400 space-y-2">
            <Calendar className="w-8 h-8 mx-auto text-slate-300" />
            <div className="text-sm font-semibold text-slate-700">No appointments match this filter.</div>
            <div className="text-xs">Adjust your search or status filter to see other consults.</div>
          </div>
        ) : (
          filteredAppointments.map((apt) => {
            const badge = getStatusBadge(apt.status);

            return (
              <div
                key={apt.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm shrink-0">
                      <UserCheck className="w-5 h-5 text-sky-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-slate-900">
                          {apt.patientName}
                        </span>
                        <span className="text-xs text-slate-500">
                          ({apt.patientAge}y, {apt.patientGender})
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-sky-800 font-semibold">{apt.referenceCode}</span>
                        <span>·</span>
                        <span>Phone: {apt.patientPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {/* CRITICAL FEATURE: Quick Patient History Reference Before Visit */}
                    <button
                      onClick={() => handleOpenPatientHistory(apt)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg shadow-2xs transition-colors"
                      title="Open full medical chart before consultation"
                    >
                      <FileText className="w-3.5 h-3.5 text-sky-700" />
                      <span>Pre-Visit History</span>
                    </button>

                    {/* Status Toggle Dropdown / Action for Doctor & Admin */}
                    {(role === 'doctor' || role === 'admin') && (
                      <select
                        value={apt.status}
                        onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as any)}
                        className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-sky-500"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="checked_in">Checked In</option>
                        <option value="in_consultation">In Consultation</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Complaint & Slot Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Date: <strong className="text-slate-900">{apt.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Slot: <strong className="text-slate-900">{apt.timeSlot}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{apt.chamberName}</span>
                  </div>
                </div>

                {/* Chief Complaint & Triage Notes */}
                <div className="text-xs text-slate-700 space-y-1">
                  <div>
                    <strong className="text-slate-900">Chief Complaint:</strong> {apt.chiefComplaint}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span>Duration: {apt.painDuration}</span>
                    <span>·</span>
                    <span>Scans: {apt.hasPreviousScans ? 'Yes (MRI/X-Ray on file)' : 'No prior scans'}</span>
                    <span>·</span>
                    <span className="capitalize">Priority: {apt.priority}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Render Patient History Modal if selected */}
      {selectedPatientForReview && (
        <PatientHistoryQuickRefModal
          patient={selectedPatientForReview}
          onClose={() => setSelectedPatientForReview(null)}
        />
      )}
    </div>
  );
};
