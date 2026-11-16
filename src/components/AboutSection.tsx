import React from 'react';
import { DOCTOR_INFO } from '../data/initialData';
import { 
  Award, 
  GraduationCap, 
  Stethoscope, 
  Building, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';
import { ServiceMiniLogo } from './ServiceMiniLogo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Doctor Clinical Consultation Portrait with Desk Nameplate & X-Rays */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl bg-white p-3 border border-slate-200 shadow-lg text-center">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-200">
                <img
                  src={DOCTOR_INFO.consultationDeskPhoto}
                  alt="Assistant Professor Dr. Faisal Amin Ahmed in Orthopedic Diagnostic Suite"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs border border-slate-700">
                  Clinical Consultation Desk
                </div>
              </div>

              <div className="mt-3.5 space-y-1 text-left px-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-between">
                  <span>{DOCTOR_INFO.name}</span>
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                </h3>
                <div className="text-xs font-semibold text-sky-800">
                  Head of Department, Orthopedic Surgery · Border Guard Hospital
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Former Consultant NITOR · BMDC Reg: {DOCTOR_INFO.bmdcRegNumber}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  {DOCTOR_INFO.specialty}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">16+ Years</div>
                  <div className="text-[10px] text-slate-500">Experience</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">4,200+</div>
                  <div className="text-[10px] text-slate-500">Surgeries</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Academic Bio & Fellowships */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-2">
                Academic Leadership &amp; International Fellowships
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Department Head &amp; Internationally Fellowed Surgeon
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {DOCTOR_INFO.bio}
            </p>

            {/* Academic Credentials List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-sky-700" />
                <span>Academic Appointments &amp; Fellowships</span>
              </h4>

              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {DOCTOR_INFO.credentials.map((cred, idx) => {
                  let logoType: 'spine' | 'trauma' | 'arthroscopy' | 'joint' | 'pain' | 'rehab' = 'rehab';
                  const lower = (cred.title + ' ' + cred.institution).toLowerCase();
                  if (lower.includes('spine')) logoType = 'spine';
                  else if (lower.includes('trauma')) logoType = 'trauma';
                  else if (lower.includes('arthroscopy') || lower.includes('sports')) logoType = 'arthroscopy';
                  else if (lower.includes('arthroplasty') || lower.includes('joint')) logoType = 'joint';
                  else if (lower.includes('pain')) logoType = 'pain';

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 hover:border-sky-300 transition-all shadow-2xs"
                    >
                      <div className="flex items-start gap-3">
                        <ServiceMiniLogo type={logoType} size="sm" />
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {cred.title}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                            {cred.institution}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                        {cred.year}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Professional Memberships */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>International Professional Societies</span>
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                {DOCTOR_INFO.memberships.map((mem, mIdx) => (
                  <span
                    key={mIdx}
                    className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs font-medium"
                  >
                    {mem}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
