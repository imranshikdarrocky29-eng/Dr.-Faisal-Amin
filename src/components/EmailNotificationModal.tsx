import React from 'react';
import { useApp } from '../context/AppContext';
import { DOCTOR_INFO } from '../data/initialData';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  CheckCircle2, 
  Printer 
} from 'lucide-react';
import { downloadAppointmentIcs } from '../utils/calendar';

export const EmailNotificationModal: React.FC = () => {
  const { latestNotificationEmail, setLatestNotificationEmail, chambers } = useApp();

  if (!latestNotificationEmail) return null;

  const chamber = chambers.find(c => c.id === latestNotificationEmail.chamberId) || chambers[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Email Client Header bar */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            </div>
            <span className="text-xs font-semibold text-slate-700 ml-2">
              Automated Email Dispatch System · Confirmation Preview
            </span>
          </div>
          <button
            onClick={() => setLatestNotificationEmail(null)}
            className="p-1 text-slate-500 hover:text-slate-800 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Email Metadata */}
        <div className="bg-slate-50/80 px-6 py-3 border-b border-slate-200 text-xs text-slate-600 space-y-1">
          <div><strong className="text-slate-800">From:</strong> {DOCTOR_INFO.name} &lt;noreply@drfoysolspine.org&gt;</div>
          <div><strong className="text-slate-800">To:</strong> {latestNotificationEmail.patientName} &lt;{latestNotificationEmail.patientEmail}&gt;</div>
          <div><strong className="text-slate-800">Subject:</strong> Consultation Confirmed (Ref: {latestNotificationEmail.referenceCode}) - {latestNotificationEmail.date} at {latestNotificationEmail.timeSlot}</div>
        </div>

        {/* Email Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* Clinic Letterhead */}
          <div className="border-b-2 border-sky-800 pb-4 flex items-start justify-between">
            <div>
              <div className="text-base sm:text-lg font-extrabold text-slate-900">
                {DOCTOR_INFO.name}
              </div>
              <div className="text-xs font-semibold text-sky-800">
                {DOCTOR_INFO.specialty}
              </div>
              <div className="text-[11px] text-slate-500">
                {DOCTOR_INFO.degrees} · BMDC Reg: {DOCTOR_INFO.bmdcRegNumber}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Visit Confirmed</span>
              </span>
            </div>
          </div>

          {/* Salutation & Booking Confirmation Details */}
          <div className="space-y-3">
            <p>Dear <strong>{latestNotificationEmail.patientName}</strong>,</p>
            <p className="text-slate-600 leading-relaxed">
              Your appointment with Assistant Professor Dr. Faisal Amin Ahmed has been successfully booked 
              and verified in our clinical scheduling system.
            </p>
          </div>

          {/* Structured Appointment Summary Box */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Booking Reference:</span>
                <span className="font-mono font-bold text-sky-800 text-sm">{latestNotificationEmail.referenceCode}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Scheduled Date &amp; Time:</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  {latestNotificationEmail.date} ({latestNotificationEmail.timeSlot})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Chamber Location:</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  {chamber.name}
                </span>
                <span className="text-[11px] text-slate-500 block">{chamber.address} ({chamber.room})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Chamber Serial Contact:</span>
                <span className="font-mono text-slate-800">{chamber.phone}</span>
              </div>
            </div>
          </div>

          {/* Pre-Visit Clinical Preparation Checklist */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Essential Pre-Consultation Instructions
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4 leading-relaxed">
              <li>
                <strong>Radiology Films:</strong> Please bring physical printed MRI, CT, and X-Ray scan films along with radiologist reports. Do not bring only phone photos.
              </li>
              <li>
                <strong>Medications:</strong> Bring all ongoing prescription slips and medicine packaging (especially blood thinners, diabetes, or blood pressure tablets).
              </li>
              <li>
                <strong>Timing:</strong> Please arrive 15 minutes prior to your scheduled slot for vital checks (blood pressure, pulse, initial triage).
              </li>
              <li>
                <strong>Attire:</strong> Wear loose, comfortable clothing for joint range-of-motion or spine examination.
              </li>
            </ul>
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            For urgent reschedule or emergency trauma admissions, please call the hospital reception desk at {chamber.phone} or our emergency helpline at {DOCTOR_INFO.emergencyTraumaHotline}.
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadAppointmentIcs(latestNotificationEmail, chamber)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-sky-600" />
              <span>Download .ICS Calendar File</span>
            </button>
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Confirmation Slip</span>
            </button>
          </div>

          <button
            onClick={() => setLatestNotificationEmail(null)}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
