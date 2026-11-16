import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Check, 
  ArrowRight, 
  Calendar 
} from 'lucide-react';
import { ServiceMiniLogo, ServicesMiniLogosBar, ServiceType } from './ServiceMiniLogo';

export const SpecialtiesSection: React.FC = () => {
  const { setShowBookingModal, setActiveView } = useApp();
  const [activeTab, setActiveTab] = useState<ServiceType>('spine');

  const specialties: Record<ServiceType, {
    title: string;
    lead: string;
    credentialBadge: string;
    color: string;
    procedures: {
      name: string;
      indication: string;
      benefit: string;
    }[];
  }> = {
    spine: {
      title: 'Orthopedic Spine Surgery & Decompression',
      lead: 'Advanced microsurgical and minimally invasive spine interventions targeting nerve decompression, spinal fusion, and deformity correction.',
      credentialBadge: 'Diploma in Spine Surgery (Switzerland) · AO Spine (India)',
      color: 'sky',
      procedures: [
        {
          name: 'Minimally Invasive Transforaminal Lumbar Interbody Fusion (MIS-TLIF)',
          indication: 'Grade I/II Spondylolisthesis, recurrent disc herniation, severe mechanical instability.',
          benefit: 'Muscle-sparing tubular dilation, minimal blood loss, and walking within 24 hours.'
        },
        {
          name: 'Microscopic Lumbar Discectomy',
          indication: 'Acute lumbar disc prolapse (L4-L5, L5-S1) with excruciating sciatic nerve root impingement.',
          benefit: 'Targeted sub-centimeter incision, rapid nerve decompression, and immediate leg pain relief.'
        },
        {
          name: 'Cervical Disc Herniation & Artificial Disc Replacement (ADR)',
          indication: 'Cervical radiculopathy or myelopathy failing conservative care.',
          benefit: 'Preserves physiological neck range of motion while eliminating adjacent segment degeneration.'
        },
        {
          name: 'Complex Spinal Deformity Correction & Scoliosis Surgery',
          indication: 'Adolescent idiopathic scoliosis, adult degenerative scoliosis, kyphotic deformities.',
          benefit: 'Multi-planar pedicle screw 3D derotation with intraoperative neuromonitoring safety.'
        },
        {
          name: 'Percutaneous Vertebroplasty & Kyphoplasty',
          indication: 'Painful osteoporotic vertebral compression fractures refractory to bed rest.',
          benefit: 'Immediate bone cement stabilization restoring vertebral height under local anesthesia.'
        }
      ]
    },
    trauma: {
      title: 'Orthopedic Trauma & Complex Fracture Care',
      lead: 'Emergency polytrauma resuscitation, biologic internal fixation, and reconstruction of complex multi-fragment peri-articular fractures.',
      credentialBadge: 'AO Trauma Basic & Advanced Courses (Switzerland & India)',
      color: 'rose',
      procedures: [
        {
          name: 'Pelvic Ring & Acetabular Fracture Reconstruction',
          indication: 'High-energy motor vehicle collisions, fall from heights with disrupted pelvic ring stability.',
          benefit: 'Anatomical reduction of weight-bearing articular column to prevent post-traumatic osteoarthritis.'
        },
        {
          name: 'Minimally Invasive Plate Osteosynthesis (MIPO)',
          indication: 'Comminuted fractures of the distal femur, proximal tibia, and humeral shaft.',
          benefit: 'Inserts anatomical locking compression plates without stripping the biological periosteal blood supply.'
        },
        {
          name: 'Intramedullary Interlocking Nailing (IMN)',
          indication: 'Femoral shaft, tibial shaft, and subtrochanteric fractures.',
          benefit: 'Load-sharing closed cannulated nail allows prompt partial to full weight-bearing.'
        },
        {
          name: 'Open Fracture Emergency Debridement & Damage Control',
          indication: 'Gustilo Grade II & III open fractures with soft tissue loss.',
          benefit: 'Aggressive antiseptic pulse irrigation, temporary external bridging, and VAC negative pressure therapy.'
        },
        {
          name: 'Non-Union, Mal-Union & Bone Defect Reconstruction',
          indication: 'Long-standing unhealed fractures, bone infections, or limb length discrepancies.',
          benefit: 'Autologous corticocancellous bone grafting, induced membrane Masquelet technique, and Ilizarov ring fixator.'
        }
      ]
    },
    arthroscopy: {
      title: 'Arthroscopy & Sports Medicine',
      lead: 'Keyhole joint arthroscopy restoring cruciate ligaments, meniscal integrity, and shoulder stability with rapid athletic recovery.',
      credentialBadge: 'Ganga Hospital Arthroscopy · PICASI-APKS Knee Course · Advanced Sports Medicine (India)',
      color: 'indigo',
      procedures: [
        {
          name: 'Anterior Cruciate Ligament (ACL) Anatomical Reconstruction',
          indication: 'Complete ACL tear, knee instability, athletic twisting injuries with pivot shift.',
          benefit: 'Anatomic quadrupled hamstring or bone-patellar-tendon-bone graft with rigid cortical suspensory fixation.'
        },
        {
          name: 'Arthroscopic Meniscal Repair & Preservation',
          indication: 'Bucket handle, radial, and horizontal tears in the vascular red-white zone.',
          benefit: 'All-inside suture anchors preserving natural shock-absorbing knee chondro-protective mechanics.'
        },
        {
          name: 'Posterior Cruciate Ligament (PCL) & Multi-Ligament Knee Surgery',
          indication: 'High-velocity knee dislocations, combined ACL-PCL-MCL complex disruptions.',
          benefit: 'Staged or simultaneous arthroscopic reconstruction restoring 360-degree joint biomechanics.'
        },
        {
          name: 'Shoulder Arthroscopy & Rotator Cuff Tendon Repair',
          indication: 'Supraspinatus/infraspinatus tears, subacromial impingement syndrome, frozen shoulder.',
          benefit: 'Double-row suture bridge footprint reconstruction with subacromial decompression.'
        }
      ]
    },
    joint: {
      title: 'Joint Replacement & Arthroplasty',
      lead: 'Precision reconstructive arthroplasty for debilitating end-stage knee and hip arthritis, restoring natural kinematic alignment.',
      credentialBadge: 'Fellowship in Arthroscopy and Arthroplasty (IBMP, India)',
      color: 'teal',
      procedures: [
        {
          name: 'Total Knee Arthroplasty (TKA)',
          indication: 'End-stage tricompartmental osteoarthritis with persistent pain and severe bow-leg (varus) deformity.',
          benefit: 'Subvastus quadriceps-preserving approach with computer-assisted ligament tension balancing.'
        },
        {
          name: 'Total Hip Arthroplasty (THA)',
          indication: 'Severe hip osteoarthritis, avascular necrosis (AVN) of femoral head, femoral neck fractures.',
          benefit: 'Ceramic-on-highly-crosslinked-polyethylene bearings for maximum longevity and zero dislocation risk.'
        },
        {
          name: 'Unicompartmental (Partial) Knee Replacement',
          indication: 'Isolated medial compartment knee arthritis with intact anterior cruciate ligament.',
          benefit: 'Preserves 75% of native joint tissues and normal cruciate ligaments for natural joint sensation.'
        },
        {
          name: 'Revision Hip & Knee Arthroplasty',
          indication: 'Aseptic implant loosening, periprosthetic fractures, or polyethylene wear.',
          benefit: 'Modular revision stems, porous tantalum metal augments, and structural bone reconstruction.'
        }
      ]
    },
    pain: {
      title: 'Interventional Pain Management & Spine Injections',
      lead: 'Targeted fluoroscopic and ultrasound-guided interventions delivering therapeutic relief for chronic back, neck, and joint pain.',
      credentialBadge: 'Fellowship in Pain Management & Spine Intervention (India)',
      color: 'amber',
      procedures: [
        {
          name: 'Transforaminal Epidural Steroid Injection (TFESI)',
          indication: 'Severe acute lumbar radicular pain (sciatica) refractory to oral analgesics.',
          benefit: 'Direct fluoroscopy-guided precision needle placement delivering targeted anti-inflammatory depot.'
        },
        {
          name: 'Facet Joint Diagnostic Block & Radiofrequency Ablation (RFA)',
          indication: 'Chronic lumbar or cervical spondylosis with facet arthropathy and twisting pain.',
          benefit: 'Denervates medial branch nerves providing 12 to 24 months of sustained pain relief without surgery.'
        },
        {
          name: 'Sacroiliac (SI) Joint Infiltration & Denervation',
          indication: 'Sacroiliitis, pelvic girdle pain, buttock and posterior thigh pain.',
          benefit: 'Ultrasound-guided therapeutic steroid and local anesthetic cocktail with immediate relief.'
        },
        {
          name: 'Viscosupplementation & PRP Joint Injections',
          indication: 'Mild-to-moderate knee osteoarthritis and tendinopathies.',
          benefit: 'High molecular weight hyaluronic acid cushioning synovial fluid and stimulating regenerative tissue.'
        }
      ]
    },
    rehab: {
      title: 'Post-Op Care Guides & Recovery Protocols',
      lead: 'Structured patient recovery pathways, weight-bearing milestones, wound hygiene checklists, and warning indicators.',
      credentialBadge: 'Clinical Recovery Protocols · NITOR & Border Guard Hospital Standards',
      color: 'emerald',
      procedures: [
        {
          name: 'Spine Post-Op Mobilization Protocol',
          indication: 'All lumbar & cervical spine decompression and fusion patients.',
          benefit: 'Safe log-rolling techniques, lumbar brace wear schedule, and progression to office work.'
        },
        {
          name: 'Joint Replacement Day 1-90 Rehabilitation',
          indication: 'Patients undergoing primary or revision total knee and hip replacements.',
          benefit: 'Quadriceps activation, range-of-motion targets (0°-120°), DVT blood thinner schedule.'
        },
        {
          name: 'Fracture Weight-Bearing Progression Guides',
          indication: 'Patients with locking plates, intramedullary nails, and cast immobilizations.',
          benefit: 'Clear timeline from Non-Weight Bearing (NWB) to Partial (PWB) and Full Weight Bearing (FWB).'
        },
        {
          name: 'Emergency Red Flags & Infection Checklist',
          indication: 'Essential guidance for patients and home caregivers.',
          benefit: 'Immediate detection rules for Cauda Equina Syndrome, Deep Vein Thrombosis, and surgical site infection.'
        }
      ]
    }
  };

  const currentSpecialty = specialties[activeTab];

  return (
    <section id="specialties" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-2">
            Clinical Domains &amp; Surgical Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Surgical Care for Spine, Trauma &amp; Joints
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
            Assistant Professor Dr. Faisal Amin Ahmed combines microscopic accuracy, biological fracture 
            preservation, and contemporary joint reconstruction to restore patient mobility and 
            relieve chronic debilitating pain.
          </p>
        </div>

        {/* Services Mini Logos Showcase Bar */}
        <ServicesMiniLogosBar onSelectService={(t) => setActiveTab(t as ServiceType)} />

        {/* Interactive Segmented Filter Controls with Mini Logos */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab('spine')}
            className={`flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'spine'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ServiceMiniLogo type="spine" size="sm" />
            <span>Spine Surgery</span>
          </button>

          <button
            onClick={() => setActiveTab('trauma')}
            className={`flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'trauma'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ServiceMiniLogo type="trauma" size="sm" />
            <span>Trauma &amp; Fractures</span>
          </button>

          <button
            onClick={() => setActiveTab('arthroscopy')}
            className={`flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'arthroscopy'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ServiceMiniLogo type="arthroscopy" size="sm" />
            <span>Arthroscopy &amp; Sports</span>
          </button>

          <button
            onClick={() => setActiveTab('joint')}
            className={`flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'joint'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ServiceMiniLogo type="joint" size="sm" />
            <span>Joint Replacement</span>
          </button>

          <button
            onClick={() => setActiveTab('pain')}
            className={`flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'pain'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ServiceMiniLogo type="pain" size="sm" />
            <span>Pain &amp; Spine Intervention</span>
          </button>

          <button
            onClick={() => setActiveTab('rehab')}
            className={`flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'rehab'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ServiceMiniLogo type="rehab" size="sm" />
            <span>Post-Op Care Guides</span>
          </button>
        </div>

        {/* Dynamic Specialty Showcase Area */}
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="flex items-start gap-4">
                <ServiceMiniLogo type={activeTab} size="lg" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {currentSpecialty.title}
                  </h3>
                  <div className="text-xs text-sky-800 font-semibold mt-0.5">
                    {currentSpecialty.credentialBadge}
                  </div>
                  <p className="mt-1 text-sm text-slate-600 max-w-2xl">
                    {currentSpecialty.lead}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg shadow-sm transition-all whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>Consult Dr. Faisal</span>
                </button>
                {activeTab === 'rehab' && (
                  <button
                    onClick={() => setActiveView('guides')}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-sky-800 bg-sky-100 hover:bg-sky-200 rounded-lg transition-all whitespace-nowrap"
                  >
                    <span>View All Guides</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Procedures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {currentSpecialty.procedures.map((proc, index) => (
                <div
                  key={proc.name}
                  className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:border-sky-300 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5 border border-sky-100">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                        {proc.name}
                      </h4>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        <strong className="text-slate-700 font-medium">Indications:</strong> {proc.indication}
                      </div>
                      <div className="text-xs text-sky-800 bg-sky-50/70 p-2.5 rounded-lg leading-relaxed flex items-start gap-1.5 border border-sky-100/60">
                        <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span><strong className="font-semibold text-sky-900">Surgical Advantage:</strong> {proc.benefit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
