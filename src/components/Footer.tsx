import React from 'react';
import { useApp } from '../context/AppContext';
import { DOCTOR_INFO, CHAMBERS } from '../data/initialData';
import { 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Calendar, 
  Activity, 
  Stethoscope 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setShowBookingModal, setShowRoleModal } = useApp();

  return (
    <footer className="bg-[#071728] text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Doctor Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span>{DOCTOR_INFO.shortTitle}</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Assistant Professor of Orthopedic Surgery. Specialist in Minimally Invasive 
              Spine Surgery, Pelvic-Acetabular Trauma, and Joint Arthroplasty.
            </p>

            <div className="space-y-1 text-slate-400 font-mono text-[11px]">
              <div>BMDC Reg No: <span className="text-white">{DOCTOR_INFO.bmdcRegNumber}</span></div>
              <div>Hotline: <span className="text-sky-300">{DOCTOR_INFO.emergencyTraumaHotline}</span></div>
            </div>
          </div>

          {/* Col 2: Clinical Domains */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Specialized Care
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => { setActiveView('portfolio'); }}
                  className="hover:text-white transition-colors"
                >
                  Minimally Invasive Spine Surgery (MIS-TLIF)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('portfolio'); }}
                  className="hover:text-white transition-colors"
                >
                  Microscopic Lumbar Discectomy &amp; Sciatica
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('portfolio'); }}
                  className="hover:text-white transition-colors"
                >
                  High-Energy Trauma &amp; Pelvic Fractures
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('portfolio'); }}
                  className="hover:text-white transition-colors"
                >
                  Total Knee &amp; Hip Arthroplasty
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('guides'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-sky-400 font-medium"
                >
                  Post-Op Care Guides &amp; Protocols →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Chambers & Timing */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Consultation Chambers
            </h4>
            <div className="space-y-3 text-slate-400 text-xs">
              <div>
                <strong className="text-white block">{CHAMBERS[0].name}</strong>
                <span>161/A, Lake Circus, Kolabagan, Dhaka · {CHAMBERS[0].timing}</span>
              </div>
              <div>
                <strong className="text-white block">{CHAMBERS[1].name}</strong>
                <span>North Badda, Pragati Sharani, Dhaka · {CHAMBERS[1].timing}</span>
              </div>
              <div>
                <strong className="text-white block">{CHAMBERS[2].name}</strong>
                <span>House 16, Road 2, Dhanmondi / DC Branch · {CHAMBERS[2].timing}</span>
              </div>
              <div className="pt-1 text-slate-300">
                <span>Chamber &amp; Emergency Serial: </span>
                <strong className="text-sky-400 font-mono">+880 1712-530515</strong>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Portals & Compliance */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Portal Access
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-900 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </button>

              <button
                onClick={() => setActiveView('dashboard')}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
              >
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                <span>Open Clinical Dashboard</span>
              </button>

              <button
                onClick={() => setShowRoleModal(true)}
                className="w-full text-center text-[11px] text-slate-400 hover:text-white underline pt-1"
              >
                Switch Role / Login Admin Panel
              </button>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Patient Portal Secure Storage &amp; E2EE</span>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-slate-500 text-[11px] space-y-2 leading-relaxed">
          <p>
            <strong>Medical Disclaimer:</strong> The information provided on this portfolio is for educational and clinical scheduling purposes. It does not replace individualized clinical examination and radiologic confirmation by Assistant Professor Dr. Faisal Amin Ahmed. For acute life-threatening trauma or emergency neuro-deficits, please report immediately to the nearest emergency room.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-slate-600">
            <div>
              © 2026 Assistant Professor Dr. Faisal Amin Ahmed (Dr. Foysol Amin Ahmed). All Rights Reserved.
            </div>
            <div className="flex gap-4">
              <span>Head of Dept. Orthopedics, Border Guard Hospital</span>
              <span>·</span>
              <span>Former Consultant NITOR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
