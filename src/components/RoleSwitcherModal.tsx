import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { DOCTOR_INFO } from '../data/initialData';
import { 
  X, 
  Stethoscope, 
  ShieldCheck, 
  User, 
  Check, 
  Lock, 
  KeyRound 
} from 'lucide-react';

export const RoleSwitcherModal: React.FC = () => {
  const { 
    showRoleModal, 
    setShowRoleModal, 
    role, 
    setRole, 
    patients, 
    currentPatientId, 
    setCurrentPatientId,
    setActiveView 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'quick' | 'login'>('quick');
  const [adminUsername, setAdminUsername] = useState('admin@hospital.org');
  const [adminPassword, setAdminPassword] = useState('••••••••••••');
  const [authSuccess, setAuthSuccess] = useState(false);

  if (!showRoleModal) return null;

  const handleSelectRole = (newRole: UserRole, patId?: string) => {
    setRole(newRole);
    if (patId) {
      setCurrentPatientId(patId);
    }
    setAuthSuccess(true);
    setTimeout(() => {
      setShowRoleModal(false);
      setAuthSuccess(false);
      setActiveView('dashboard');
    }, 400);
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('admin');
    setAuthSuccess(true);
    setTimeout(() => {
      setShowRoleModal(false);
      setAuthSuccess(false);
      setActiveView('dashboard');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#0b1e33] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-400" />
            <div>
              <h3 className="text-base font-bold">
                Role-Based Access Control (RBAC) Portal
              </h3>
              <p className="text-[11px] text-slate-400">
                Encrypted Session · Patient Portal Security
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowRoleModal(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-3 text-center transition-colors ${
              activeTab === 'quick'
                ? 'bg-white text-slate-900 border-b-2 border-sky-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Instant Role Switcher
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-center transition-colors ${
              activeTab === 'login'
                ? 'bg-white text-slate-900 border-b-2 border-sky-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Admin Credentials Login
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {authSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Authentication verified. Redirecting to clinical dashboard...</span>
            </div>
          )}

          {activeTab === 'quick' ? (
            <div className="space-y-3">
              {/* Doctor Role */}
              <button
                type="button"
                onClick={() => handleSelectRole('doctor')}
                className={`w-full p-4 rounded-xl border text-left flex items-start justify-between transition-all ${
                  role === 'doctor'
                    ? 'border-sky-500 bg-sky-50/70 ring-1 ring-sky-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Surgeon: {DOCTOR_INFO.shortTitle}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Doctor Access: Review pre-visit patient history, consult queue, write Rx &amp; follow-up chat.
                    </div>
                  </div>
                </div>
                {role === 'doctor' && (
                  <span className="text-[11px] font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-sky-200 shrink-0">
                    Active
                  </span>
                )}
              </button>

              {/* Administrator Role */}
              <button
                type="button"
                onClick={() => handleSelectRole('admin')}
                className={`w-full p-4 rounded-xl border text-left flex items-start justify-between transition-all ${
                  role === 'admin'
                    ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Clinic &amp; Hospital Administrator
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Admin Panel: Capacity controls, doctor OT block schedules, patient registry, and patient portal audit logs.
                    </div>
                  </div>
                </div>
                {role === 'admin' && (
                  <span className="text-[11px] font-bold text-amber-700 bg-white px-2 py-0.5 rounded border border-amber-200 shrink-0">
                    Active
                  </span>
                )}
              </button>

              {/* Patient Role (Select which demo patient) */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Patient Portal Access
                </div>
                <div className="space-y-2">
                  {patients.slice(0, 2).map((pat) => (
                    <button
                      key={pat.id}
                      type="button"
                      onClick={() => handleSelectRole('patient', pat.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        role === 'patient' && currentPatientId === pat.id
                          ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-semibold">
                          <User className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {pat.fullName} ({pat.age}y, {pat.gender})
                          </div>
                          <div className="text-[11px] text-slate-500">
                            UHID: {pat.uhid}
                          </div>
                        </div>
                      </div>
                      {role === 'patient' && currentPatientId === pat.id && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                          Active Patient
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Admin Credentials Form */
            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Demo Administrative Credentials:</div>
                <div className="text-[11px]">Username: <span className="font-mono text-slate-900">admin@hospital.org</span></div>
                <div className="text-[11px]">Role: System Supervisor &amp; Clinic Operations Lead</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Administrator Email / Staff ID
                </label>
                <input
                  type="email"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Security Passkey
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Authenticate as Administrator</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
