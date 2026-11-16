import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConsultationType } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  Check, 
  FileText, 
  Download, 
  MapPin, 
  CheckCircle2, 
  Mail 
} from 'lucide-react';
import { downloadAppointmentIcs } from '../utils/calendar';
import { ServiceMiniLogo, ServiceType } from './ServiceMiniLogo';

export const BookingModal: React.FC = () => {
  const { 
    showBookingModal, 
    setShowBookingModal, 
    chambers, 
    bookAppointment,
    setLatestNotificationEmail
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedChamberId, setSelectedChamberId] = useState<string>(chambers[0]?.id || 'ch-dhanmondi');
  const [consultationType, setConsultationType] = useState<ConsultationType>('spine_consultation');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-10');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('06:00 PM');
  
  // Patient details
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<number>(45);
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [chiefComplaint, setChiefComplaint] = useState<string>('');
  const [painDuration, setPainDuration] = useState<string>('1 to 3 months');
  const [hasScans, setHasScans] = useState<boolean>(true);
  const [priority, setPriority] = useState<'routine' | 'urgent' | 'emergency'>('routine');

  // Completed appointment result
  const [bookedApt, setBookedApt] = useState<any>(null);

  if (!showBookingModal) return null;

  const selectedChamber = chambers.find(c => c.id === selectedChamberId) || chambers[0];

  // Available real-time time slots
  const availableSlots = [
    { time: '05:00 PM', available: true, label: 'Available' },
    { time: '05:30 PM', available: false, label: 'Booked' },
    { time: '06:00 PM', available: true, label: 'Available' },
    { time: '06:30 PM', available: true, label: 'Available' },
    { time: '07:00 PM', available: false, label: 'Booked' },
    { time: '07:30 PM', available: true, label: 'Available' },
    { time: '08:00 PM', available: true, label: 'Available' },
    { time: '08:30 PM', available: true, label: 'Available' }
  ];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !patientEmail) {
      alert('Please fill in required patient contact details.');
      return;
    }

    const created = bookAppointment({
      patientId: 'guest',
      patientName,
      patientPhone,
      patientEmail,
      patientAge,
      patientGender,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      chamberId: selectedChamber.id,
      chamberName: selectedChamber.name,
      consultationType,
      chiefComplaint: chiefComplaint || 'Consultation regarding orthopedic and spine symptoms.',
      painDuration,
      hasPreviousScans: hasScans,
      priority
    });

    setBookedApt(created);
    setStep(4);
  };

  const handleDownloadCalendar = () => {
    if (bookedApt) {
      downloadAppointmentIcs(bookedApt, selectedChamber);
    }
  };

  const resetAndClose = () => {
    setShowBookingModal(false);
    setStep(1);
    setBookedApt(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="bg-[#0b1e33] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-sky-300 font-semibold uppercase tracking-wider">
              Assistant Professor Dr. Faisal Amin Ahmed
            </div>
            <h3 className="text-lg font-bold">
              Book Orthopedic &amp; Spine Consultation
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-sky-600 text-white' : 'bg-slate-200'}`}>1</span>
            <span className={step === 1 ? 'text-slate-900' : ''}>Chamber</span>
          </div>
          <span className="text-slate-300">/</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-sky-600 text-white' : 'bg-slate-200'}`}>2</span>
            <span className={step === 2 ? 'text-slate-900' : ''}>Date &amp; Time</span>
          </div>
          <span className="text-slate-300">/</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-sky-600 text-white' : 'bg-slate-200'}`}>3</span>
            <span className={step === 3 ? 'text-slate-900' : ''}>Symptoms</span>
          </div>
          <span className="text-slate-300">/</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>4</span>
            <span className={step === 4 ? 'text-emerald-700' : ''}>Confirmed</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: Chamber & Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Consultation Specialty
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'spine_consultation', label: 'Spine & Sciatica', type: 'spine' as ServiceType },
                    { id: 'trauma_fracture', label: 'Trauma & Fractures', type: 'trauma' as ServiceType },
                    { id: 'joint_replacement', label: 'Joint Replacement', type: 'joint' as ServiceType },
                    { id: 'post_op_review', label: 'Post-Op Follow-Up', type: 'rehab' as ServiceType },
                    { id: 'second_opinion', label: 'Arthroscopy & MRI', type: 'arthroscopy' as ServiceType },
                    { id: 'telemedicine', label: 'Interventional Pain', type: 'pain' as ServiceType }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setConsultationType(t.id as ConsultationType)}
                      className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all flex items-center gap-2.5 ${
                        consultationType === t.id
                          ? 'border-sky-500 bg-sky-50/70 text-sky-950 ring-1 ring-sky-500/20'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <ServiceMiniLogo type={t.type} size="sm" />
                      <span className="leading-tight">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Select Hospital / Chamber Location
                </label>
                <div className="space-y-3">
                  {chambers.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedChamberId(c.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedChamberId === c.id
                          ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-1 ring-sky-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          {c.image && (
                            <img
                              src={c.image}
                              alt={c.name}
                              className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0 mt-0.5"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <div>
                            <div className="text-sm font-bold text-slate-900">{c.name}</div>
                            <div className="text-xs text-sky-700 font-medium mt-0.5">{c.hospital}</div>
                            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{c.address} · {c.room}</span>
                            </div>
                            <div className="text-xs text-slate-600 mt-1 flex items-center gap-3">
                              <span>Days: {c.days.slice(0, 3).join(', ')}</span>
                              <span>Hours: {c.timing}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded">
                            ৳{c.consultationFee}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg transition-colors"
                >
                  Continue to Schedule Slot
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot Picker */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Consultation Date
                  </label>
                  <span className="text-xs text-sky-700 font-medium">
                    {selectedChamber.name}
                  </span>
                </div>
                <input
                  type="date"
                  min="2026-11-09"
                  max="2026-12-31"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Real-Time Availability Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        !slot.available
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : selectedTimeSlot === slot.time
                          ? 'border-sky-500 bg-sky-500 text-white font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="text-xs font-mono font-semibold">{slot.time}</div>
                      <div className={`text-[10px] mt-0.5 ${selectedTimeSlot === slot.time ? 'text-sky-100' : (slot.available ? 'text-emerald-600' : 'text-slate-400')}`}>
                        {slot.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-900 flex items-start gap-2">
                <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  Consultations are allocated 20–30 minutes per patient to ensure thorough physical examination and radiologic review.
                </span>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg transition-colors"
                >
                  Continue to Patient Info
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information & Clinical Triage */}
          {step === 3 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Mohammad Tariqul Islam"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (SMS Notifications) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="e.g. +880 1718-992233"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Automated Confirmation &amp; ICS Invite) *
                  </label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="e.g. patient@gmail.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age &amp; Gender
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      max="110"
                      value={patientAge}
                      onChange={(e) => setPatientAge(Number(e.target.value))}
                      className="w-16 px-2 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                    />
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value as any)}
                      className="flex-1 px-2 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chief Complaint / Main Symptom *
                </label>
                <textarea
                  rows={2}
                  required
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="e.g. Lower back pain radiating down left leg to toes for 2 months, difficulty standing upright..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pain Duration
                  </label>
                  <select
                    value={painDuration}
                    onChange={(e) => setPainDuration(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  >
                    <option value="Acute (Less than 1 week)">Acute (Less than 1 week)</option>
                    <option value="1 to 4 weeks">1 to 4 weeks</option>
                    <option value="1 to 3 months">1 to 3 months</option>
                    <option value="Chronic (> 6 months)">Chronic (&gt; 6 months)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Severity &amp; Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  >
                    <option value="routine">Routine Consultation</option>
                    <option value="urgent">Urgent (Severe Pain / Weakness)</option>
                    <option value="emergency">Emergency Trauma / Red Flag</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={hasScans}
                    onChange={(e) => setHasScans(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span>I have previous MRI, CT, or X-Ray films to bring to the chamber</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm &amp; Send Automated Email</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Automated Email Notification Confirmation */}
          {step === 4 && bookedApt && (
            <div className="text-center space-y-6 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900">
                  Appointment Confirmed!
                </h4>
                <div className="text-xs text-slate-500">
                  Booking Reference: <span className="font-mono font-bold text-sky-800">{bookedApt.referenceCode}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-900">{bookedApt.patientName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Date &amp; Time:</span>
                  <span className="font-bold text-sky-800">{bookedApt.date} at {bookedApt.timeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Chamber:</span>
                  <span className="font-medium text-slate-800">{selectedChamber.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Automated Notification:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Dispatched to {bookedApt.patientEmail}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons for ICS Calendar & Email Preview */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-sky-600" />
                  <span>Download .ICS Calendar Event</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLatestNotificationEmail(bookedApt);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-sky-900 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-700" />
                  <span>Preview Automated Email</span>
                </button>

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg transition-colors"
                >
                  <span>Done</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
