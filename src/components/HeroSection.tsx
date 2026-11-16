import React from 'react';
import { useApp } from '../context/AppContext';
import { DOCTOR_INFO } from '../data/initialData';
import { 
  Calendar, 
  Award, 
  Activity, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { ServiceMiniLogo } from './ServiceMiniLogo';

export const HeroSection: React.FC = () => {
  const { setShowBookingModal, setActiveView } = useApp();

  return (
    <section id="hero" className="relative bg-gradient-to-b from-[#071728] via-[#0b1e33] to-[#0f2742] text-white pt-8 pb-16 overflow-hidden">
      {/* Background ambient lighting subtle surgical glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* 2-Column Balanced Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clinical Title, Academic Rank & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Academic Credential Kicker (clean text with separators, no pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-sky-300 font-medium tracking-wide">
              <span>Assistant Professor</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Head of Dept. Orthopedics (Border Guard Hospital)</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Former Consultant NITOR</span>
            </div>

            {/* Doctor Full Name Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white text-balance leading-[1.15]">
              Assistant Professor <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-white">
                Dr. Faisal Amin Ahmed
              </span>
            </h1>

            {/* Specialty Subtitle */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-sky-400">
                Orthopedic Spine, Trauma, Arthroscopy &amp; Joint Replacement Surgeon
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Head of the Department of Orthopedic Surgery at Border Guard Hospital (Shaheed Zakir Hossain Hospital), 
                Pilkhana, Dhaka, and Former Consultant at NITOR. Specialized in Swiss Spine Surgery, 
                Arthroscopy &amp; Sports Medicine (Ganga Hospital), and Advanced Joint Arthroplasty (IBMP).
              </p>
            </div>

            {/* Clinical Services with Mini Logos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <ServiceMiniLogo type="spine" size="sm" />
                <span className="text-xs text-slate-200 font-medium">Spine Surgery &amp; Swiss Decompression</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <ServiceMiniLogo type="trauma" size="sm" />
                <span className="text-xs text-slate-200 font-medium">AO Trauma Biologic Fixation</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <ServiceMiniLogo type="arthroscopy" size="sm" />
                <span className="text-xs text-slate-200 font-medium">Ganga Hospital Arthroscopy</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <ServiceMiniLogo type="joint" size="sm" />
                <span className="text-xs text-slate-200 font-medium">IBMP Arthroplasty &amp; Joint Replacement</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowBookingModal(true)}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-sky-400 to-sky-300 hover:from-sky-300 hover:to-white rounded-lg shadow-lg hover:shadow-sky-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book Chamber Consultation</span>
              </button>

              <button
                onClick={() => setActiveView('dashboard')}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Activity className="w-4 h-4 text-sky-400" />
                <span>Patient &amp; Doctor Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Chamber timing quick glance */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Long Life Hospital, Kolabagan (5:00 PM)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Popular Diagnostic, North Badda (10:00 AM)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Serial Helpline: +880 1712-530515</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Doctor Photos */}
          <div className="lg:col-span-5 relative">
            <HeroPhotoShowcase />
          </div>
        </div>

        {/* 4-Column KPI / Metrics Strip (Full-width row below hero split) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              16+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Years Surgical Mastery
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono tabular-nums">
              1,850+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Complex Spine Surgeries
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono tabular-nums">
              2,350+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Trauma &amp; Joint Cases
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
              99.2%
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Patient Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroPhotoShowcase: React.FC = () => {
  const [photoIndex, setPhotoIndex] = React.useState<number>(0);

  const photos = [
    {
      src: DOCTOR_INFO.heroOtPhoto,
      title: 'Spine & Trauma Operating Theater',
      subtitle: 'Assistant Professor Dr. Faisal Amin Ahmed · Head of Department, Orthopedic Surgery',
      badge: 'Senior Orthopedic Spine Surgeon'
    },
    {
      src: DOCTOR_INFO.chamberLhlPhoto,
      title: 'Executive Chamber · Long Life Hospital',
      subtitle: 'Consultation Suite 302, 3rd Floor · 161/A Lake Circus, Kolabagan',
      badge: 'Advance Care for Bone & Spine'
    },
    {
      src: DOCTOR_INFO.consultationDeskPhoto,
      title: 'Orthopedic Diagnostic Suite',
      subtitle: 'Clinical & Radiologic Examination · X-Ray Lightbox & Joint Models',
      badge: 'Head of Dept. Orthopedics'
    }
  ];

  const current = photos[photoIndex];

  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Outer frame matching surgical scrub colors */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-sky-500/40 bg-[#08192a]">
        {/* Top Interactive View Selector Bar */}
        <div className="bg-[#061524]/90 backdrop-blur-md px-3 py-2 border-b border-slate-700/60 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1 overflow-x-auto">
            {photos.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPhotoIndex(idx)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  photoIndex === idx
                    ? 'bg-sky-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {idx === 0 ? 'Surgical OT (Top)' : (idx === 1 ? 'Chamber (LHL)' : 'Diagnostics')}
              </button>
            ))}
          </div>

          <span className="text-[10px] text-sky-400 font-mono hidden sm:inline">
            Photo {photoIndex + 1} of 3
          </span>
        </div>

        {/* Display Image */}
        <div className="relative h-[390px] sm:h-[460px] bg-slate-950 overflow-hidden">
          <img
            key={current.src}
            src={current.src}
            alt={`${DOCTOR_INFO.shortTitle} - ${current.title}`}
            className="w-full h-full object-cover object-top transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          {/* Subtle dark gradient scrim at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071728] via-transparent to-transparent pointer-events-none" />

          {/* Badge at top right */}
          <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-[10px] text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30 font-medium">
            {current.badge}
          </div>
        </div>

        {/* Bottom doctor credential overlay */}
        <div className="p-4 bg-[#091f36]/95 backdrop-blur-md border-t border-sky-400/20 shadow-lg">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{DOCTOR_INFO.shortTitle}</span>
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
              </div>
              <div className="text-xs text-sky-300 font-medium">
                {current.title}
              </div>
              <div className="text-[11px] text-slate-400">
                {current.subtitle}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-mono font-bold text-sky-400">
                {DOCTOR_INFO.surgeriesCompleted}+
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                Surgeries
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

