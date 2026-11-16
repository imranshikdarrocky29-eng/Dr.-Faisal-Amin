import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle, 
  Clock, 
  UserCheck, 
  Calendar 
} from 'lucide-react';

export const CaseStudiesSection: React.FC = () => {
  const { setShowBookingModal } = useApp();

  const caseStudies = [
    {
      title: 'L4-L5 High-Grade Spondylolisthesis with Severe Sciatica',
      patientInfo: '48-Year-Old Banker · Chronic Radicular Pain & Claudication',
      diagnosis: 'Severe Grade II Isthmic Spondylolisthesis with Left L5 Nerve Root Pinching',
      procedure: 'Minimally Invasive Transforaminal Lumbar Interbody Fusion (MIS-TLIF)',
      outcomes: [
        'Pain VAS dropped from 9/10 (excruciating) to 1/10 (resolved)',
        'Walking unaided with spinal support on Post-Op Day 1',
        'Returned to office desk duties within 4 weeks'
      ],
      quote: 'I had been bed-bound for three months, terrified of paralysis. Assistant Professor Dr. Faisal explained the microscopic surgery with total clarity. Within 24 hours of surgery, my leg shooting pain was completely gone.',
      author: 'Mohammad Tariqul Islam',
      location: 'Mirpur, Dhaka'
    },
    {
      title: 'Severe Trilinear Pelvic & Complex Tibial Shaft Fracture',
      patientInfo: '34-Year-Old Engineer · High-Velocity Motorbike Polytrauma',
      diagnosis: 'AO 42-B2 Comminuted Tibial Fracture with Anterior Pelvic Ring Disruption',
      procedure: 'Anatomic Pelvic Reconstruction & Closed Reamed Tibial Interlocking Nailing',
      outcomes: [
        'Damage-control stabilization within 4 hours of trauma triage',
        '100% anatomical mechanical axis restoration',
        'Partial weight bearing initiated at 4 weeks; full union at 10 weeks'
      ],
      quote: 'After the road accident, other clinics suggested prolonged traction and cast immobilization. Dr. Faisal performed minimally invasive interlocking nailing. My fracture has completely fused and I walk without a limp.',
      author: 'Zubair Hossain',
      location: 'Gulshan, Dhaka'
    },
    {
      title: 'Grade IV Bilateral Knee Osteoarthritis with Severe Varus Deformity',
      patientInfo: '62-Year-Old Teacher · Wheelchair-Dependent Outdoors',
      diagnosis: 'Bilateral End-Stage Knee Osteoarthritis with 14° Fixed Varus Deformity',
      procedure: 'Subvastus Muscle-Sparing Total Knee Arthroplasty (TKA)',
      outcomes: [
        'Anatomical alignment fully restored to neutral mechanical axis',
        'Active flexion range achieved 115° without pain',
        'Independent stair climbing without assistance at 5 weeks'
      ],
      quote: 'Living in constant agony made me believe I would never walk freely again. Dr. Faisal’s gentle counseling and precision joint replacement restored my independence. I can now pray and walk daily in the park.',
      author: 'Mrs. Shirin Sultana',
      location: 'Uttara, Dhaka'
    }
  ];

  return (
    <section id="cases" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-2">
              Clinical Evidence &amp; Surgical Outcomes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Case Highlights &amp; Patient Restorations
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Every surgical intervention is planned with 3D radiology reconstruction, biological 
              tissue preservation, and disciplined early mobilization protocols.
            </p>
          </div>

          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg shadow-sm transition-all whitespace-nowrap self-start md:self-auto shrink-0"
          >
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>Request Surgical Evaluation</span>
          </button>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((item, idx) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Clean numbered index */}
                <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="font-mono font-semibold text-sky-700">Case 0{idx + 1}</span>
                  <span>{item.patientInfo}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong className="text-slate-800">Diagnosis:</strong> {item.diagnosis}</div>
                  <div><strong className="text-sky-800">Procedure:</strong> {item.procedure}</div>
                </div>

                {/* Outcome Metrics */}
                <div className="bg-sky-50/60 rounded-xl p-3.5 space-y-2 border border-sky-100">
                  <div className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-sky-600" />
                    <span>Documented Outcomes</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1 pl-1">
                    {item.outcomes.map((out, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-1.5">
                        <span className="text-sky-600 font-bold">·</span>
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Patient Quote */}
                <blockquote className="text-xs text-slate-600 italic leading-relaxed pt-1">
                  "{item.quote}"
                </blockquote>
              </div>

              {/* Attributable Author */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[11px]">
                    <UserCheck className="w-3.5 h-3.5 text-sky-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{item.author}</div>
                    <div className="text-[11px] text-slate-500">{item.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>Fully Recovered</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
