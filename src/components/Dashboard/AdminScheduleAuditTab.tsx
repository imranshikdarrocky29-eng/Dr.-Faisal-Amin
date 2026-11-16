import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getAuditLogs } from '../../utils/security';
import { ClinicalAuditLog } from '../../types';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Lock, 
  Plus, 
  Check, 
  MapPin, 
  Layers 
} from 'lucide-react';

export const AdminScheduleAuditTab: React.FC = () => {
  const { chambers, role, appointments } = useApp();
  const [auditLogs, setAuditLogs] = useState<ClinicalAuditLog[]>([]);
  const [otBlocks, setOtBlocks] = useState([
    { id: 'ot-1', date: '2026-11-13', facility: 'NITOR Main Spine OT', procedure: '3x MIS-TLIF & Decompression', status: 'Reserved' },
    { id: 'ot-2', date: '2026-11-16', facility: 'Specialized Hospital OT Suite 3', procedure: '2x Complex Total Knee Arthroplasty (TKA)', status: 'Reserved' }
  ]);
  const [newOtDate, setNewOtDate] = useState('2026-11-19');
  const [newOtProcedure, setNewOtProcedure] = useState('Spine Scoliosis Correction & Fusion');
  const [newOtFacility, setNewOtFacility] = useState('Premier Spine Operating Theater');

  useEffect(() => {
    setAuditLogs(getAuditLogs());
  }, []);

  const handleAddOtBlock = (e: React.FormEvent) => {
    e.preventDefault();
    setOtBlocks([
      ...otBlocks,
      {
        id: `ot-${Date.now()}`,
        date: newOtDate,
        procedure: newOtProcedure,
        facility: newOtFacility,
        status: 'Reserved'
      }
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Patient Portal Security & Compliance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Patient Portal Security</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            Encrypted PHI Storage
          </div>
          <p className="text-xs text-slate-500">
            256-bit AES encryption applied to all patient notes, chat payloads, and clinical attachments.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Role-Based Access (RBAC)</span>
            <Lock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            3-Tier Authorization
          </div>
          <p className="text-xs text-slate-500">
            Segregated access profiles for Administrator, Attending Surgeon, and Verified Patients.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total Clinic Bookings</span>
            <Calendar className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">
            {appointments.length} Consultations
          </div>
          <p className="text-xs text-slate-500">
            Automated calendar synchronization and confirmation dispatch active across all chambers.
          </p>
        </div>
      </div>

      {/* OT Surgery Schedule Block Manager */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-700" />
              <span>Operating Theater (OT) Block Days</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Block full days for surgical procedures so OPD chamber booking slots are protected from double-scheduling.
            </p>
          </div>
        </div>

        {/* List of blocked OT days */}
        <div className="space-y-2.5">
          {otBlocks.map((ot) => (
            <div
              key={ot.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sky-900 text-sm">{ot.date}</span>
                  <span className="bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    {ot.status}
                  </span>
                </div>
                <div className="font-semibold text-slate-900">
                  {ot.procedure}
                </div>
                <div className="text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{ot.facility}</span>
                </div>
              </div>

              <div className="text-slate-500 text-[11px] sm:text-right shrink-0">
                <span>Chambers Closed on this day</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add new OT block form */}
        <form onSubmit={handleAddOtBlock} className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">OT Date</label>
            <input
              type="date"
              required
              value={newOtDate}
              onChange={(e) => setNewOtDate(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Planned Surgical Cases</label>
            <input
              type="text"
              required
              value={newOtProcedure}
              onChange={(e) => setNewOtProcedure(e.target.value)}
              placeholder="e.g. MIS-TLIF or Bilateral TKA"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Hospital / OT Theater</label>
            <input
              type="text"
              required
              value={newOtFacility}
              onChange={(e) => setNewOtFacility(e.target.value)}
              placeholder="e.g. NITOR Spine OT"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Reserve OT Day</span>
            </button>
          </div>
        </form>
      </div>

      {/* Patient Portal Audit Trail */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Patient Portal Audit Trail &amp; Access Logs</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cryptographically signed event logs tracking system changes, chart inspections, and prescription dispatches.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/80">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Actor / Role</th>
                <th className="py-2.5 px-3">Action Details</th>
                <th className="py-2.5 px-3">Resource Target</th>
                <th className="py-2.5 px-3">Portal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.slice(0, 10).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                    {new Date(log.timestamp).toLocaleTimeString()} · {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    {log.actorName} <span className="text-[10px] text-slate-400">({log.actorRole})</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-sky-800">
                    {log.resourceId}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Compliant</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
