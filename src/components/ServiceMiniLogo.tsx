import React from 'react';

export type ServiceType = 
  | 'spine' 
  | 'trauma' 
  | 'arthroscopy' 
  | 'joint' 
  | 'pain' 
  | 'rehab';

interface ServiceMiniLogoProps {
  type: ServiceType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ServiceMiniLogo: React.FC<ServiceMiniLogoProps> = ({
  type,
  size = 'md',
  showLabel = false,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  switch (type) {
    case 'spine':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          <div className={`${sizeMap[size]} rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-xs text-white shrink-0 p-1.5 relative group ring-1 ring-sky-400/30`}>
            {/* Custom SVG Mini Logo: Vertebral Column with Swiss Spine Accent */}
            <svg viewBox="0 0 32 32" fill="none" className={`${iconSizeMap[size]} transition-transform duration-200 group-hover:scale-110`} stroke="currentColor">
              {/* Spine vertebrae stack */}
              <rect x="10" y="4" width="12" height="4" rx="2" strokeWidth="2" stroke="white" fill="#38bdf8" />
              <rect x="9" y="10" width="14" height="4" rx="2" strokeWidth="2" stroke="white" fill="#0284c7" />
              <rect x="8" y="16" width="16" height="4.5" rx="2" strokeWidth="2" stroke="white" fill="#0369a1" />
              <rect x="9" y="22.5" width="14" height="4" rx="2" strokeWidth="2" stroke="white" fill="#075985" />
              {/* Intervertebral disc center points */}
              <circle cx="16" cy="6" r="1" fill="white" />
              <circle cx="16" cy="12" r="1" fill="white" />
              <circle cx="16" cy="18.2" r="1" fill="white" />
              <circle cx="16" cy="24.5" r="1" fill="white" />
              {/* Lateral nerve roots */}
              <path d="M7 12H9 M23 12H25" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 18H8 M24 18H26" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {/* Swiss cross badge */}
            <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[8px] font-bold px-1 py-0.2 rounded-full border border-white shadow-xs">
              +
            </span>
          </div>
          {showLabel && (
            <div className="leading-tight">
              <div className="text-xs font-bold text-slate-900">Spine Surgery</div>
              <div className="text-[10px] text-sky-700 font-medium">Swiss Spine Diploma &amp; AO Spine</div>
            </div>
          )}
        </div>
      );

    case 'trauma':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          <div className={`${sizeMap[size]} rounded-xl bg-gradient-to-br from-rose-500 to-red-700 flex items-center justify-center shadow-xs text-white shrink-0 p-1.5 relative group ring-1 ring-rose-400/30`}>
            {/* Custom SVG Mini Logo: AO Trauma Internal Fixation Titanium Plate */}
            <svg viewBox="0 0 32 32" fill="none" className={`${iconSizeMap[size]} transition-transform duration-200 group-hover:scale-110`} stroke="currentColor">
              {/* Locking compression plate */}
              <path 
                d="M10 5C10 3.89543 10.8954 3 12 3H20C21.1046 3 22 3.89543 22 5V27C22 28.1046 21.1046 29 20 29H12C10.8954 29 10 28.1046 10 27V5Z" 
                stroke="white" 
                strokeWidth="1.8" 
                fill="#e11d48"
              />
              {/* Locking screw combi-holes with thread styling */}
              <circle cx="16" cy="7" r="2.2" stroke="white" strokeWidth="1.5" fill="#ffe4e6" />
              <circle cx="16" cy="13" r="2.2" stroke="white" strokeWidth="1.5" fill="#ffe4e6" />
              <circle cx="16" cy="19" r="2.2" stroke="white" strokeWidth="1.5" fill="#ffe4e6" />
              <circle cx="16" cy="25" r="2.2" stroke="white" strokeWidth="1.5" fill="#ffe4e6" />
              {/* Screw cross slots */}
              <path d="M15 7H17 M16 6V8" stroke="#be123c" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M15 13H17 M16 12V14" stroke="#be123c" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M15 19H17 M16 18V20" stroke="#be123c" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M15 25H17 M16 24V26" stroke="#be123c" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[7px] font-mono font-bold px-1 rounded-sm border border-rose-300">
              AO
            </span>
          </div>
          {showLabel && (
            <div className="leading-tight">
              <div className="text-xs font-bold text-slate-900">Trauma &amp; Fractures</div>
              <div className="text-[10px] text-rose-700 font-medium">AO Trauma Switzerland &amp; India</div>
            </div>
          )}
        </div>
      );

    case 'arthroscopy':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          <div className={`${sizeMap[size]} rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center shadow-xs text-white shrink-0 p-1.5 relative group ring-1 ring-indigo-400/30`}>
            {/* Custom SVG Mini Logo: Arthroscopy Camera Endoscope & Knee Cruciate Ligament */}
            <svg viewBox="0 0 32 32" fill="none" className={`${iconSizeMap[size]} transition-transform duration-200 group-hover:scale-110`} stroke="currentColor">
              {/* Optical camera lens */}
              <circle cx="12" cy="16" r="7" stroke="white" strokeWidth="1.8" fill="#4338ca" />
              <circle cx="12" cy="16" r="4" stroke="#a5b4fc" strokeWidth="1.5" fill="#312e81" />
              <circle cx="12" cy="16" r="1.5" fill="#38bdf8" />
              {/* Endoscopic fiber optic sheath & light cable */}
              <path d="M17 12L27 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 16L29 16" stroke="#c7d2fe" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M17 20L27 26" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="28" cy="16" r="2" fill="#818cf8" stroke="white" strokeWidth="1" />
            </svg>
            <span className="absolute -bottom-1 -right-1 bg-indigo-900 text-indigo-100 text-[7px] font-mono font-bold px-1 rounded-sm border border-indigo-300">
              Ganga
            </span>
          </div>
          {showLabel && (
            <div className="leading-tight">
              <div className="text-xs font-bold text-slate-900">Arthroscopy &amp; Sports</div>
              <div className="text-[10px] text-indigo-700 font-medium">Ganga Hospital &amp; PICASI-APKS</div>
            </div>
          )}
        </div>
      );

    case 'joint':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          <div className={`${sizeMap[size]} rounded-xl bg-gradient-to-br from-teal-500 to-emerald-700 flex items-center justify-center shadow-xs text-white shrink-0 p-1.5 relative group ring-1 ring-teal-400/30`}>
            {/* Custom SVG Mini Logo: Hip/Knee Arthroplasty Prosthetic Articulation */}
            <svg viewBox="0 0 32 32" fill="none" className={`${iconSizeMap[size]} transition-transform duration-200 group-hover:scale-110`} stroke="currentColor">
              {/* Femoral prosthetic component */}
              <path 
                d="M10 6C10 4.5 12 3 16 3C20 3 22 4.5 22 6V11C22 13.5 20.5 15 18 15H14C11.5 15 10 13.5 10 11V6Z" 
                stroke="white" 
                strokeWidth="1.8" 
                fill="#0d9488"
              />
              {/* Ultra-high-molecular polyethylene spacer */}
              <path d="M8 17.5C8 16.5 11 16 16 16C21 16 24 16.5 24 17.5V19C24 20 21 20.5 16 20.5C11 20.5 8 20 8 19V17.5Z" fill="#99f6e4" />
              {/* Tibial tray & stem */}
              <path 
                d="M7 21C7 20 10 19.5 16 19.5C22 19.5 25 20 25 21V23C25 23.5 23 24 20 24H18V29C18 29.5 17.5 30 16 30C14.5 30 14 29.5 14 29V24H12C9 24 7 23.5 7 23V21Z" 
                stroke="white" 
                strokeWidth="1.8" 
                fill="#047857"
              />
            </svg>
            <span className="absolute -bottom-1 -right-1 bg-teal-950 text-teal-200 text-[7px] font-mono font-bold px-1 rounded-sm border border-teal-300">
              IBMP
            </span>
          </div>
          {showLabel && (
            <div className="leading-tight">
              <div className="text-xs font-bold text-slate-900">Joint Arthroplasty</div>
              <div className="text-[10px] text-teal-700 font-medium">Fellowship in Arthroplasty (IBMP)</div>
            </div>
          )}
        </div>
      );

    case 'pain':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          <div className={`${sizeMap[size]} rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xs text-white shrink-0 p-1.5 relative group ring-1 ring-amber-400/30`}>
            {/* Custom SVG Mini Logo: Interventional Pain Needle & Targeted Neural Block Wave */}
            <svg viewBox="0 0 32 32" fill="none" className={`${iconSizeMap[size]} transition-transform duration-200 group-hover:scale-110`} stroke="currentColor">
              {/* Fluoroscopic guidance crosshair target */}
              <circle cx="16" cy="16" r="9" stroke="#fed7aa" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="16" cy="16" r="3.5" stroke="white" strokeWidth="1.8" fill="#ea580c" />
              {/* Targeted injection cannula needle */}
              <line x1="5" y1="5" x2="13" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="4" y1="4" x2="8" y2="8" stroke="#ffedd5" strokeWidth="3.5" strokeLinecap="round" />
              {/* Radiating pain-relief analgesic waves */}
              <path d="M21 11C23 13 23 19 21 21" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M24 8C27 11 27 21 24 24" stroke="#fed7aa" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="absolute -bottom-1 -right-1 bg-orange-950 text-amber-200 text-[7px] font-mono font-bold px-1 rounded-sm border border-amber-300">
              Spine
            </span>
          </div>
          {showLabel && (
            <div className="leading-tight">
              <div className="text-xs font-bold text-slate-900">Interventional Pain</div>
              <div className="text-[10px] text-amber-700 font-medium">Fellowship Pain Management &amp; Spine</div>
            </div>
          )}
        </div>
      );

    case 'rehab':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          <div className={`${sizeMap[size]} rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-xs text-white shrink-0 p-1.5 relative group ring-1 ring-emerald-400/30`}>
            {/* Custom SVG Mini Logo: Post-Op Kinematic Mobility & Vital Heart Pulse */}
            <svg viewBox="0 0 32 32" fill="none" className={`${iconSizeMap[size]} transition-transform duration-200 group-hover:scale-110`} stroke="currentColor">
              {/* Recovery shield boundary */}
              <path 
                d="M16 3L26 7V15C26 21.5 21.5 26.5 16 29C10.5 26.5 6 21.5 6 15V7L16 3Z" 
                stroke="white" 
                strokeWidth="1.8" 
                fill="#059669"
              />
              {/* Dynamic ECG / Recovery rhythm pulse line */}
              <path 
                d="M9 16H13L14.5 11L17.5 21L19 16H23" 
                stroke="#a7f3d0" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <span className="absolute -bottom-1 -right-1 bg-emerald-950 text-emerald-200 text-[7px] font-mono font-bold px-1 rounded-sm border border-emerald-300">
              Rehab
            </span>
          </div>
          {showLabel && (
            <div className="leading-tight">
              <div className="text-xs font-bold text-slate-900">Post-Op Care Guides</div>
              <div className="text-[10px] text-emerald-700 font-medium">Structured Mobility Protocols</div>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
};

/**
 * High-profile horizontal mini logos banner
 */
export const ServicesMiniLogosBar: React.FC<{ onSelectService?: (type: string) => void }> = ({ onSelectService }) => {
  const services: { type: ServiceType; label: string; sub: string; cert: string }[] = [
    {
      type: 'spine',
      label: 'Spine Surgery',
      sub: 'MIS-TLIF & Decompression',
      cert: 'Swiss Spine Diploma & AO Spine'
    },
    {
      type: 'trauma',
      label: 'Trauma & Fractures',
      sub: 'Biologic Fixation (MIPO)',
      cert: 'AO Trauma (Switzerland & India)'
    },
    {
      type: 'arthroscopy',
      label: 'Arthroscopy & Sports',
      sub: 'ACL & Knee Restoration',
      cert: 'Ganga Hospital & PICASI-APKS'
    },
    {
      type: 'joint',
      label: 'Joint Arthroplasty',
      sub: 'Total Knee & Hip Replacements',
      cert: 'IBMP Arthroplasty Fellowship'
    },
    {
      type: 'pain',
      label: 'Pain Management',
      sub: 'Targeted Spine Interventions',
      cert: 'Spine Intervention Fellowship'
    },
    {
      type: 'rehab',
      label: 'Post-Op Protocols',
      sub: 'Step-by-Step Recovery Guides',
      cert: 'NITOR Surgical Care Standard'
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Specialized Surgical Services &amp; Verified Mini Logos
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          Official Clinical Disciplines of Assistant Professor Dr. Faisal Amin Ahmed
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {services.map((srv) => (
          <div
            key={srv.type}
            onClick={() => onSelectService && onSelectService(srv.type)}
            className={`p-3 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-xs transition-all flex flex-col items-start gap-2.5 ${
              onSelectService ? 'cursor-pointer' : ''
            }`}
          >
            <ServiceMiniLogo type={srv.type} size="md" />
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {srv.label}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                {srv.sub}
              </div>
              <div className="text-[10px] text-sky-700 font-semibold mt-1 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100 inline-block">
                {srv.cert}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
