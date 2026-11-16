import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientHistoryRecord } from '../../types';
import { 
  X, 
  AlertTriangle, 
  Heart, 
  FileText, 
  Activity, 
  Check, 
  Calendar, 
  Save, 
  Printer, 
  Stethoscope, 
  Plus 
} from 'lucide-react';
import { getVasScoreBadge } from '../../utils/security';

interface Props {
  patient: PatientHistoryRecord | null;
  onClose: () => void;
  onStartConsultation?: () => void;
}

export const PatientHistoryQuickRefModal: React.FC<Props> = ({ patient, onClose, onStartConsultation }) => {
  const { role, addConsultationRecord } = useApp();

  const [activeTab, setActiveTab] = useState<'chart' | 'rx_writer'>('chart');

  // Doctor Rx & Clinical Note State
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newClinicalNotes, setNewClinicalNotes] = useState('');
  const [newAdvice, setNewAdvice] = useState('');
  const [meds, setMeds] = useState([
    { name: 'Tab. Paracetamol', dosage: '665mg ER', frequency: '1 tablet 3 times daily (SOS)', duration: '7 days' },
    { name: 'Cap. Pregabalin', dosage: '50mg', frequency: '1 capsule at bedtime', duration: '14 days' }
  ]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!patient) return null;

  const handleAddMedication = () => {
    setMeds([...meds, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleMedChange = (index: number, field: string, val: string) => {
    const updated = [...meds];
    (updated[index] as any)[field] = val;
    setMeds(updated);
  };

  const handleSavePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiagnosis) {
      alert('Please enter a clinical diagnosis');
      return;
    }

    addConsultationRecord(patient.id, {
      id: `cons-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      diagnosis: newDiagnosis,
      clinicalNotes: newClinicalNotes || 'Clinical evaluation performed by Assistant Professor Dr. Faisal Amin Ahmed.',
      prescribedMedications: meds.filter(m => m.name.trim() !== ''),
      advisedTherapy: newAdvice || 'Gentle mobilization and core stabilization as tolerated.',
      nextFollowUp: 'In 4 weeks with fresh dynamic X-Rays'
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('chart');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Banner */}
        <div className="bg-[#0b1e33] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-900/60 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  {patient.fullName}
                </h3>
                <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                  {patient.uhid}
                </span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                <span>{patient.age} yrs · {patient.gender}</span>
                <span>· Blood: <strong className="text-white font-mono">{patient.bloodGroup}</strong></span>
                <span>· Contact: {patient.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Chart</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch for Doctor Rx Writer vs Patient History */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2 flex items-center justify-between text-xs font-semibold">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'chart'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pre-Visit Medical Chart &amp; History
            </button>
            {role === 'doctor' && (
              <button
                onClick={() => setActiveTab('rx_writer')}
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'rx_writer'
                    ? 'bg-sky-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Write Clinical Note &amp; Rx</span>
              </button>
            )}
          </div>

          {onStartConsultation && (
            <button
              onClick={onStartConsultation}
              className="px-3 py-1 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors"
            >
              Begin In-Chamber Visit
            </button>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'chart' ? (
            <>
              {/* Critical Alert Bar: Allergies & Comorbidities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Allergies Alert */}
                <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Known Drug Allergies ({patient.allergies.length})</span>
                  </div>
                  {patient.allergies.length > 0 ? (
                    <ul className="text-xs text-rose-800 space-y-1 font-medium pl-1">
                      {patient.allergies.map((allergy, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>{allergy}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-xs text-slate-500">No known drug allergies reported.</div>
                  )}
                </div>

                {/* Comorbidities */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <Heart className="w-4 h-4 text-amber-600" />
                    <span>Active Comorbidities</span>
                  </div>
                  {patient.comorbidities.length > 0 ? (
                    <ul className="text-xs text-amber-800 space-y-1 font-medium pl-1">
                      {patient.comorbidities.map((como, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{como}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-xs text-slate-500">No chronic comorbidities on record.</div>
                  )}
                </div>
              </div>

              {/* Past Surgical History & Implants */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-sky-600" />
                  <span>Surgical History &amp; Orthopedic Implants</span>
                </h4>

                {patient.pastSurgeries.length > 0 ? (
                  <div className="space-y-2.5">
                    {patient.pastSurgeries.map((surg, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="flex items-start justify-between">
                          <div className="text-xs sm:text-sm font-bold text-slate-900">
                            {surg.procedure}
                          </div>
                          <span className="text-xs font-mono font-medium text-slate-500">
                            {surg.date}
                          </span>
                        </div>
                        <div className="text-xs text-sky-800">
                          <strong>Operating Surgeon:</strong> {surg.surgeon}
                        </div>
                        {surg.implantDetails && (
                          <div className="text-xs text-slate-700 bg-white p-2 rounded border border-slate-200 font-mono">
                            <strong className="text-slate-900 font-sans">Implants:</strong> {surg.implantDetails}
                          </div>
                        )}
                        {surg.notes && (
                          <div className="text-xs text-slate-600 italic">
                            "{surg.notes}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-500">
                    No prior orthopedic surgeries documented.
                  </div>
                )}
              </div>

              {/* VAS Pain Progression Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Visual Analog Pain Score (VAS 0–10) Progression
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {patient.vasPainScores.map((vas, idx) => {
                    const badge = getVasScoreBadge(vas.score);
                    return (
                      <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-slate-500">{vas.date}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${badge.bg} ${badge.color}`}>
                            {vas.score}/10
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2">
                          {vas.note}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Radiology & Scan Reports */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Radiology &amp; Imaging Archive
                </h4>
                <div className="space-y-2">
                  {patient.radiologyScans.map((scan) => (
                    <div key={scan.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-mono">
                            {scan.type}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{scan.bodyPart}</span>
                          <span className="text-[11px] text-slate-400">({scan.date})</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {scan.findings}
                        </p>
                      </div>
                      <div className="text-[11px] text-slate-500 sm:text-right shrink-0">
                        {scan.radiologist}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Previous Consultation Notes & Prescriptions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Previous Consultation Records &amp; Rx History
                </h4>
                {patient.previousConsultations.length > 0 ? (
                  <div className="space-y-3">
                    {patient.previousConsultations.map((cons) => (
                      <div key={cons.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <div className="text-xs font-bold text-slate-900">
                            Diagnosis: {cons.diagnosis}
                          </div>
                          <span className="text-xs font-mono text-slate-500">
                            {cons.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong className="text-slate-800">Clinical Notes:</strong> {cons.clinicalNotes}
                        </p>
                        {cons.prescribedMedications.length > 0 && (
                          <div className="text-xs space-y-1 pt-1">
                            <span className="font-semibold text-slate-800">Prescription:</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {cons.prescribedMedications.map((m, mIdx) => (
                                <div key={mIdx} className="bg-white p-2 rounded border border-slate-200 text-xs">
                                  <div className="font-bold text-slate-900">{m.name} ({m.dosage})</div>
                                  <div className="text-slate-500 text-[11px]">{m.frequency} · {m.duration}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {cons.advisedTherapy && (
                          <div className="text-xs text-sky-900 bg-sky-50/70 p-2 rounded border border-sky-100">
                            <strong className="font-semibold">Rehabilitation Advice:</strong> {cons.advisedTherapy}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-500">
                    No previous prescriptions entered yet.
                  </div>
                )}
              </div>
            </>
          ) : (
            /* DOCTOR RX WRITER */
            <form onSubmit={handleSavePrescription} className="space-y-5">
              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Clinical note and prescription successfully added to patient's chart!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Clinical Diagnosis *
                </label>
                <input
                  type="text"
                  required
                  value={newDiagnosis}
                  onChange={(e) => setNewDiagnosis(e.target.value)}
                  placeholder="e.g. L4-L5 Lumbar Disc Herniation with Radiculopathy / Right Knee Osteoarthritis Grade III"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Examination Findings &amp; Clinical Notes
                </label>
                <textarea
                  rows={3}
                  value={newClinicalNotes}
                  onChange={(e) => setNewClinicalNotes(e.target.value)}
                  placeholder="SLR positive on left at 45 degrees, extensor hallucis longus strength 4/5, knee range of motion 0-110 deg, no surgical site tenderness..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              {/* Medication Builder */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Prescribed Medications
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMedication}
                    className="flex items-center gap-1 text-xs text-sky-700 hover:text-sky-900 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Medicine</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {meds.map((med, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <div className="col-span-4">
                        <input
                          type="text"
                          placeholder="Medicine name"
                          value={med.name}
                          onChange={(e) => handleMedChange(index, 'name', e.target.value)}
                          className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          placeholder="Dosage"
                          value={med.dosage}
                          onChange={(e) => handleMedChange(index, 'dosage', e.target.value)}
                          className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          placeholder="Frequency"
                          value={med.frequency}
                          onChange={(e) => handleMedChange(index, 'frequency', e.target.value)}
                          className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          placeholder="Duration"
                          value={med.duration}
                          onChange={(e) => handleMedChange(index, 'duration', e.target.value)}
                          className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Rehab / Physiotherapy Advice &amp; Restrictions
                </label>
                <input
                  type="text"
                  value={newAdvice}
                  onChange={(e) => setNewAdvice(e.target.value)}
                  placeholder="e.g. Lumbar brace for 3 weeks during walking, daily quad sets, avoid lifting >5kg, stationary cycle without resistance."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('chart')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save to Patient Medical Record</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Patient Portal Record: <span className="font-mono text-slate-700">ENCRYPTED-CHART-{patient.id}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg transition-colors"
          >
            Close Chart
          </button>
        </div>
      </div>
    </div>
  );
};
