import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTOR_INFO } from '../data/initialData';
import { 
  Calendar, 
  ShieldCheck, 
  User, 
  Menu, 
  X, 
  Activity, 
  PhoneCall, 
  Stethoscope 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    activeView, 
    setActiveView, 
    setShowBookingModal, 
    setShowRoleModal 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', view: 'portfolio', hash: '#hero' },
    { label: 'Specialties & Trauma', view: 'portfolio', hash: '#specialties' },
    { label: 'Surgical & Post-Op Guides', view: 'guides', hash: '' },
    { label: 'Clinical Case Studies', view: 'portfolio', hash: '#cases' },
    { label: 'Chambers', view: 'portfolio', hash: '#chambers' }
  ];

  const handleNavClick = (view: 'portfolio' | 'guides', hash: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (hash && view === 'portfolio') {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getRoleBadge = () => {
    switch (role) {
      case 'doctor':
        return { label: 'Surgeon View', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-300' };
      case 'admin':
        return { label: 'Admin View', color: 'bg-amber-500/10 text-amber-700 border-amber-300' };
      default:
        return { label: 'Patient View', color: 'bg-sky-500/10 text-sky-700 border-sky-300' };
    }
  };

  const roleBadge = getRoleBadge();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro bar for emergency trauma hotline & Patient Portal verified status */}
      <div className="bg-[#0b1e33] text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Secure Patient Portal</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">
              BMDC Reg: <span className="font-mono text-slate-200">{DOCTOR_INFO.bmdcRegNumber}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:${DOCTOR_INFO.emergencyTraumaHotline.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-rose-300 hover:text-white transition-colors font-medium text-[11px] sm:text-xs"
            >
              <PhoneCall className="w-3 h-3 text-rose-400" />
              <span>Emergency Trauma: {DOCTOR_INFO.emergencyTraumaHotline}</span>
            </a>

            <button
              onClick={() => setShowRoleModal(true)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border font-medium transition-all ${roleBadge.color}`}
              title="Click to switch between Patient, Doctor, and Admin roles"
            >
              <User className="w-3 h-3" />
              <span>{roleBadge.label}</span>
              <span className="text-[10px] underline ml-0.5">Switch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation (3-zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => { setActiveView('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0b1e33] flex items-center justify-center text-sky-400 shadow-sm border border-slate-700/50 group-hover:bg-[#122b46] transition-colors">
              <Stethoscope className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-tight">
                {DOCTOR_INFO.shortTitle}
              </div>
              <div className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                Orthopedic Spine &amp; Trauma Surgeon
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Single-line, no wrapping) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view as any, link.hash)}
              className={`hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 text-left py-1 relative ${
                activeView === link.view && (link.hash === '' || link.hash === '#hero') 
                  ? 'text-sky-800 font-semibold' 
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              activeView === 'dashboard'
                ? 'bg-sky-100 text-sky-900 border border-sky-300'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>Clinical Dashboard</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4 text-sky-300" />
            <span>Book Consultation</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view as any, link.hash)}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveView('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-sky-900 bg-sky-50 border border-sky-200 rounded-lg"
            >
              <Activity className="w-4 h-4 text-sky-600" />
              <span>Open Clinical Dashboard ({roleBadge.label})</span>
            </button>

            <button
              onClick={() => {
                setShowRoleModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              <User className="w-3.5 h-3.5" />
              <span>Switch User Role (Current: {role.toUpperCase()})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
