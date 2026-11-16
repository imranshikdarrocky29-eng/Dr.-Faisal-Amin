import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientHistoryRecord } from '../../types';
import { 
  Users, 
  Search, 
  FileText, 
  MessageSquare, 
  AlertTriangle, 
  Activity, 
  Plus, 
  Calendar 
} from 'lucide-react';
import { PatientHistoryQuickRefModal } from './PatientHistoryQuickRefModal';

export const PatientRegistryTab: React.FC = () => {
  const { 
    patients, 
    setCurrentPatientId, 
    setDashboardTab, 
    setSelectedPatientForReview, 
    selectedPatientForReview 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter((p) => {
    return (
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.allergies.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleOpenChat = (patId: string) => {
    setCurrentPatientId(patId);
    setDashboardTab('messages');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-700" />
            <span>Patient Registry &amp; Medical History Database</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Encrypted PHI Records with complete surgical histories, implants, and follow-up charts.
          </p>
        </div>

        <div className="w-full md:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, UHID, allergy..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPatients.map((pat) => (
          <div
            key={pat.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs space-y-4"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-tight">
                    {pat.fullName}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {pat.age} yrs · {pat.gender} · Blood: <strong className="font-mono text-slate-700">{pat.bloodGroup}</strong>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-sky-50 text-sky-800 px-2 py-0.5 rounded border border-sky-200">
                  {pat.uhid.split('-').pop()}
                </span>
              </div>

              {/* Allergy flags */}
              {pat.allergies.length > 0 ? (
                <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-xs text-rose-800 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="line-clamp-2">
                    <strong className="font-semibold">Allergies:</strong> {pat.allergies.join(', ')}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 bg-slate-50 p-2 rounded-lg">
                  No known allergies reported
                </div>
              )}

              {/* Surgical history */}
              <div className="text-xs space-y-1">
                <span className="text-slate-500 font-semibold block">Surgical History &amp; Implants:</span>
                {pat.pastSurgeries.length > 0 ? (
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800 space-y-1">
                    <div className="font-bold text-slate-900 text-xs line-clamp-1">
                      {pat.pastSurgeries[0].procedure}
                    </div>
                    {pat.pastSurgeries[0].implantDetails && (
                      <div className="text-[11px] font-mono text-sky-900 line-clamp-1">
                        {pat.pastSurgeries[0].implantDetails}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-slate-400 italic">No prior surgeries</div>
                )}
              </div>

              {/* Recent Consultation info */}
              <div className="text-xs text-slate-600 pt-1">
                <span className="text-slate-500 font-semibold">Last Diagnosis: </span>
                <span>
                  {pat.previousConsultations[0]?.diagnosis || 'Initial consultation queued'}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setSelectedPatientForReview(pat)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-sky-700" />
                <span>Open Full Chart</span>
              </button>

              <button
                onClick={() => handleOpenChat(pat.id)}
                className="p-2 text-slate-600 hover:text-sky-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                title="Open encrypted follow-up chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPatientForReview && (
        <PatientHistoryQuickRefModal
          patient={selectedPatientForReview}
          onClose={() => setSelectedPatientForReview(null)}
        />
      )}
    </div>
  );
};
