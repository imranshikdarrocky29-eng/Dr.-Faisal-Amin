import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SecureMessage } from '../../types';
import { DOCTOR_INFO } from '../../data/initialData';
import { 
  Send, 
  ShieldCheck, 
  Lock, 
  CheckCheck, 
  Clock, 
  AlertCircle, 
  Paperclip, 
  Image as ImageIcon, 
  Stethoscope, 
  User 
} from 'lucide-react';

export const SecureMessagingTab: React.FC = () => {
  const { 
    role, 
    messages, 
    sendSecureMessage, 
    patients, 
    currentPatientId, 
    setCurrentPatientId 
  } = useApp();

  const [inputMsg, setInputMsg] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SecureMessage['category']>('wound_check');
  const [attachedImageName, setAttachedImageName] = useState<string | null>(null);

  // If doctor or admin, allow switching which patient conversation to view
  const activePatient = patients.find(p => p.id === currentPatientId) || patients[0];

  // Filter messages for current active conversation
  const threadMessages = messages.filter(m => m.patientId === activePatient.id);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() && !attachedImageName) return;

    sendSecureMessage(inputMsg, selectedCategory, activePatient.id);
    setInputMsg('');
    setAttachedImageName(null);
  };

  // Doctor Quick-Reply presets
  const doctorQuickReplies = [
    'Surgical wound shows healthy epithelialization. Keep clean & dry.',
    'Apply cryotherapy (ice pack) 15 minutes, 3 times daily after walking.',
    'Continue prescribed oral pain medication for 3 more days, then taper.',
    'Please schedule suture/staple removal at Day 12 at our chamber.'
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[720px]">
      {/* Left Patient List (For Doctor & Admin, or patient self-card) */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {role === 'doctor' ? 'Patient Follow-Up Queue' : 'My Care Channel'}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              <Lock className="w-3 h-3 text-sky-600" />
              <span>AES-256 E2EE</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Direct encrypted patient portal channel with Assistant Professor Dr. Faisal Amin Ahmed.
          </p>
        </div>

        {/* Patient Selection List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {patients.map((pat) => {
            const lastMsg = [...messages].reverse().find(m => m.patientId === pat.id);
            const isSelected = pat.id === activePatient.id;

            return (
              <button
                key={pat.id}
                onClick={() => setCurrentPatientId(pat.id)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  isSelected
                    ? 'bg-white border-sky-400 shadow-xs ring-1 ring-sky-400/20'
                    : 'bg-transparent border-transparent hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {pat.fullName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {pat.uhid.split('-').pop()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {lastMsg ? lastMsg.messageText : 'No messages yet'}
                </div>
                {lastMsg && (
                  <div className="flex items-center gap-1 text-[10px] text-sky-700 mt-1">
                    <span className="capitalize">{lastMsg.category.replace('_', ' ')}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Security Badge */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Encrypted PHI Storage &amp; Audit Logs Active</span>
        </div>
      </div>

      {/* Right Chat Interface */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Active Conversation Header */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shrink-0 flex items-center justify-center">
              {role === 'doctor' ? (
                <User className="w-5 h-5 text-sky-700" />
              ) : (
                <img
                  src={DOCTOR_INFO.portraitCutout}
                  alt={DOCTOR_INFO.shortTitle}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>
                  {role === 'doctor' ? activePatient.fullName : DOCTOR_INFO.shortTitle}
                </span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-200 font-semibold">
                  Verified Encrypted
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                {role === 'doctor'
                  ? `Age ${activePatient.age}y · ${activePatient.gender} · UHID: ${activePatient.uhid}`
                  : `Specialist Orthopedic Spine & Trauma Surgeon · BMDC Reg: ${DOCTOR_INFO.bmdcRegNumber}`}
              </div>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-500 block">Current Category:</span>
            <span className="text-xs font-semibold text-sky-800 capitalize">
              {selectedCategory.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Message Thread Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {threadMessages.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Lock className="w-8 h-8 mx-auto text-slate-300" />
              <div className="text-sm font-medium">No messages in this secure thread yet.</div>
              <div className="text-xs">Start a follow-up query regarding wound status or medications.</div>
            </div>
          ) : (
            threadMessages.map((msg) => {
              const isMe = (role === 'doctor' && msg.senderRole === 'doctor') ||
                           (role === 'patient' && msg.senderRole === 'patient');

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1 px-1">
                    <span className="font-semibold text-slate-700">{msg.senderName}</span>
                    <span>·</span>
                    <span className="capitalize">{msg.category.replace('_', ' ')}</span>
                  </div>

                  <div
                    className={`max-w-md sm:max-w-lg p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-[#0b1e33] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {msg.messageText}
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 px-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5 text-emerald-600 font-medium">
                      <Lock className="w-2.5 h-2.5" />
                      <span>E2EE</span>
                    </span>
                    {isMe && <CheckCheck className="w-3 h-3 text-sky-500" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Doctor Quick-Replies (Only visible when role is doctor) */}
        {role === 'doctor' && (
          <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Quick Presets:
            </span>
            {doctorQuickReplies.map((reply, rIdx) => (
              <button
                key={rIdx}
                type="button"
                onClick={() => setInputMsg(reply)}
                className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-[11px] text-slate-700 whitespace-nowrap shrink-0 transition-colors"
              >
                {reply.slice(0, 36)}...
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white space-y-3">
          {/* Category Selector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            <span className="text-[11px] font-semibold text-slate-500 shrink-0">Topic:</span>
            {[
              { id: 'wound_check', label: 'Wound Check' },
              { id: 'pain_management', label: 'Pain & Titration' },
              { id: 'medication_query', label: 'Medication' },
              { id: 'rehab_exercise', label: 'Rehab' },
              { id: 'urgent_concern', label: 'Urgent Concern' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Attached image preview if any */}
          {attachedImageName && (
            <div className="flex items-center gap-2 p-2 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-900">
              <ImageIcon className="w-3.5 h-3.5 text-sky-600" />
              <span>Attached: {attachedImageName} (Encrypted)</span>
              <button
                type="button"
                onClick={() => setAttachedImageName(null)}
                className="ml-auto text-slate-400 hover:text-rose-600 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAttachedImageName('surgical_wound_day7_check.jpg')}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Attach photo for wound review"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={
                role === 'doctor'
                  ? `Reply to ${activePatient.fullName} as ${DOCTOR_INFO.shortTitle}...`
                  : 'Message Dr. Faisal’s care team (e.g. dressing status, pain level)...'
              }
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />

            <button
              type="submit"
              disabled={!inputMsg.trim() && !attachedImageName}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send Securely</span>
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span>Patient Portal End-to-End Encrypted Communication Protocol</span>
            <span className="flex items-center gap-1 text-slate-500">
              <AlertCircle className="w-3 h-3 text-amber-500" />
              <span>Not for acute life-threatening trauma emergencies</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
