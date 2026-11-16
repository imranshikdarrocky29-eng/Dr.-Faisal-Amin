import { Chamber, PatientHistoryRecord, Appointment, SecureMessage, SurgicalGuide } from '../types';

export const DOCTOR_INFO = {
  name: 'Assistant Professor Dr. Faisal Amin Ahmed',
  shortTitle: 'Dr. Faisal Amin Ahmed',
  alternateSpelling: 'Dr. Foysol Amin Ahmed',
  designation: 'Assistant Professor & Head of the Department',
  currentRank: 'Assistant Professor, Head of Department of Orthopedic Surgery',
  currentHospital: 'Border Guard Hospital (Shaheed Zakir Hossain Hospital), Pilkhana, Dhaka',
  formerHospital: 'Former Consultant, National Institute of Traumatology and Orthopedic Rehabilitation (NITOR)',
  hospitalAffiliation: 'Head of Dept., Border Guard Hospital (Shaheed Zakir Hossain Hospital), Pilkhana, Dhaka & Former Consultant, NITOR',
  specialty: 'Orthopedic Spine, Trauma, Arthroscopy & Joint Replacement Surgeon',
  degrees: 'MBBS, BCS (Health), MS (Ortho - BSMMU), Dip. Spine Surgery (Switzerland), FCS (USA), FICS (USA), MRCPS (Glasgow, UK), MACP (USA)',
  experienceYears: 16,
  surgeriesCompleted: 4500,
  spineSurgeries: 1950,
  traumaCases: 2550,
  satisfactionRate: 99.4,
  bmdcRegNumber: 'A-49281',
  contactEmail: 'dr.faisal.ortho@drfaisalaminahmed.org',
  emergencyTraumaHotline: '+880 1712-530515',
  // Verified real doctor photos
  chamberLhlPhoto: '/assets/aistudio/dr_raisal_amin_ahmed_431ca5cd.jfif',
  consultationDeskPhoto: '/assets/aistudio/803005308_1064522776561267_7759368104662954168_n_1ab1b483.jpg',
  heroOtPhoto: '/assets/aistudio/789581476_29017732104494404_2990783720518327253_n_bc00c2a1.jpg',
  portraitCutout: '/assets/aistudio/689490422_27619013974366231_5865501391424618155_n_918b7d4f.png',
  bio: 'Assistant Professor Dr. Faisal Amin Ahmed (Foysol) is a distinguished Orthopedic Spine, Trauma, Arthroscopy & Joint Replacement Surgeon with extensive international fellowships across Switzerland, the United States, the United Kingdom, and India. Currently serving as the Head of the Department of Orthopedic Surgery at Border Guard Hospital (Shaheed Zakir Hossain Hospital), Pilkhana, Dhaka, and Former Consultant at the National Institute of Traumatology and Orthopedic Rehabilitation (NITOR), he provides world-class surgical care in minimally invasive spine decompression, arthroscopic sports medicine, joint arthroplasty, and complex trauma reconstruction.',
  credentials: [
    { title: 'Assistant Professor & Head of Department', institution: 'Dept. of Orthopedic Surgery, Border Guard Hospital (Shaheed Zakir Hossain Hospital), Pilkhana, Dhaka', year: 'Current' },
    { title: 'Former Consultant', institution: 'National Institute of Traumatology & Orthopedic Rehabilitation (NITOR), Dhaka', year: 'Former' },
    { title: 'MS in Orthopedic Surgery', institution: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)', year: 'Postgraduate Degree' },
    { title: 'Diploma in Spine Surgery', institution: 'Switzerland', year: 'International Diploma' },
    { title: 'FCS (USA) & FICS (USA)', institution: 'Fellow of International College of Surgeons & Surgical Colleges (USA)', year: 'USA Fellowship' },
    { title: 'MRCPS (Glasgow, UK) & MACP (USA)', institution: 'Royal College of Physicians & Surgeons of Glasgow (UK) / American College of Physicians (USA)', year: 'UK & USA Membership' },
    { title: 'MBBS, BCS (Health)', institution: 'Government of Bangladesh Health Cadre', year: 'Medical Graduate' },
    { title: 'Fellowship in Arthroscopy and Arthroplasty', institution: 'IBMP, India', year: 'Specialized Fellowship' },
    { title: 'Fellowship in Pain Management and Spine Intervention', institution: 'Specialized Spine Pain Center, India', year: 'Interventional Fellowship' },
    { title: 'Knee Arthroscopy Course', institution: 'PICASI-APKS, India', year: 'Advanced Certification' },
    { title: 'Advanced Course on Arthroscopy & Sports Medicine', institution: 'Apex Arthroscopy Center, India', year: 'Sports Medicine Training' },
    { title: 'Basic Course on Arthroscopy', institution: 'Ganga Hospital, Coimbatore, India', year: 'Arthroscopy Training' },
    { title: 'AO Trauma Basic & Advanced Courses', institution: 'Switzerland & India', year: 'AO Trauma Global' },
    { title: 'AO Spine Basic Course', institution: 'India', year: 'AO Spine International' }
  ],
  memberships: [
    'MRCPS (Royal College of Physicians and Surgeons of Glasgow, UK)',
    'FICS (Fellow of the International College of Surgeons, USA)',
    'FCS (Fellow of Surgical Colleges, USA)',
    'MACP (Member of the American College of Physicians, USA)',
    'AO Spine International & AO Trauma Global Alumni',
    'Bangladesh Orthopaedic Society (BOS)'
  ]
};

export const CHAMBERS: Chamber[] = [
  {
    id: 'ch-longlife',
    name: 'Long Life Hospital Limited',
    hospital: 'Long Life Hospital Limited',
    address: '161/A, Lake Circus, Kolabagan, Dhaka - 1205, Bangladesh',
    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    timing: '5:00 PM – 9:00 PM',
    room: 'Chamber 302, 3rd Floor',
    phone: '+880 1712-530515',
    consultationFee: 1500,
    followUpFee: 800,
    isOperatingDay: false,
    image: '/assets/aistudio/dr_raisal_amin_ahmed_431ca5cd.jfif'
  },
  {
    id: 'ch-badda',
    name: 'Popular Diagnostic Centre Ltd. (North Badda Branch)',
    hospital: 'Popular Diagnostic Centre Ltd.',
    address: 'Cha-90/2, Pragati Sharani, North Badda Branch, Dhaka',
    days: ['Friday', 'Monday', 'Wednesday'],
    timing: '10:00 AM – 2:00 PM',
    room: 'Chamber 204, 2nd Floor',
    phone: '+880 1712-530515',
    consultationFee: 1500,
    followUpFee: 800,
    isOperatingDay: false,
    image: '/assets/aistudio/803005308_1064522776561267_7759368104662954168_n_1ab1b483.jpg'
  },
  {
    id: 'ch-popular-dc',
    name: 'Popular Hospital & Diagnostic Centre (DC Branch)',
    hospital: 'Popular Hospital & Diagnostic Complex',
    address: 'House 16, Road 2, Dhanmondi / DC Branch, Dhaka',
    days: ['Saturday', 'Sunday', 'Tuesday', 'Thursday'],
    timing: '6:00 PM – 9:30 PM',
    room: 'Consultant Suite 412',
    phone: '+880 1712-530515',
    consultationFee: 1500,
    followUpFee: 800,
    isOperatingDay: false,
    image: '/assets/aistudio/803005308_1064522776561267_7759368104662954168_n_1ab1b483.jpg'
  }
];

export const INITIAL_PATIENTS: PatientHistoryRecord[] = [
  {
    id: 'pat-101',
    uhid: 'FA-ORTHO-2024-0419',
    fullName: 'Mohammad Tariqul Islam',
    age: 48,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+880 1718-992233',
    email: 'tariqul.islam@email.com',
    address: 'Mirpur DOHS, Dhaka',
    emergencyContact: {
      name: 'Nasrin Akhter',
      relationship: 'Spouse',
      phone: '+880 1718-992234'
    },
    allergies: ['Diclofenac Sodium (Gastric Irritation & Bronchospasm)', 'Sulfa Drugs'],
    comorbidities: ['Type 2 Diabetes Mellitus (HbA1c 6.8%)', 'Essential Hypertension (Controlled on Losartan 50mg)'],
    pastSurgeries: [
      {
        procedure: 'MIS-TLIF (Minimally Invasive Transforaminal Lumbar Interbody Fusion) L4-L5',
        date: '2024-08-14',
        surgeon: 'Assistant Professor Dr. Faisal Amin Ahmed',
        implantDetails: 'PEEK Interbody Cage + 4 Polyaxial Titanium Pedicle Screws & 5.5mm Rods',
        notes: 'Uncomplicated surgery. Complete decompression of exiting L4 and traversing L5 nerve roots. Good fusion bed preparation.'
      }
    ],
    radiologyScans: [
      {
        id: 'rad-01',
        type: 'MRI',
        bodyPart: 'Lumbosacral Spine (T2 & T1 Sagittal + Axial)',
        date: '2024-07-28',
        findings: 'Severe L4-L5 central and left paracentral disc extrusion with thecal sac compression and left L5 nerve root impingement.',
        radiologist: 'Senior Radiologist, Popular Diagnostic Centre'
      },
      {
        id: 'rad-02',
        type: 'X-Ray',
        bodyPart: 'LS Spine Dynamic Flexion/Extension',
        date: '2024-10-15',
        findings: 'Solid early bone consolidation across L4-L5 cage. Screws stable, no radiolucency, no implant migration.',
        radiologist: 'Long Life Hospital Imaging Center'
      }
    ],
    vasPainScores: [
      { date: '2024-08-01', score: 9, note: 'Pre-op: Excruciating left leg radiating pain down to foot, unable to walk >50 meters.' },
      { date: '2024-08-16', score: 4, note: 'Post-op Day 2: Incision site soreness, radicular nerve pain significantly relieved.' },
      { date: '2024-09-12', score: 2, note: 'Post-op 4 Weeks: Walking comfortably with lumbo-sacral support brace.' },
      { date: '2024-10-20', score: 1, note: 'Post-op 10 Weeks: Minimal discomfort, full sensation restored in L5 dermatome.' }
    ],
    previousConsultations: [
      {
        id: 'cons-01',
        date: '2024-10-20',
        diagnosis: 'L4-L5 Status Post MIS-TLIF (Recovery Phase)',
        clinicalNotes: 'Surgical wound clean and fully epithelialized. No neurologic deficits. Straight leg raise (SLR) negative bilaterally. Patient cleared for gentle core stabilization physiotherapy.',
        prescribedMedications: [
          { name: 'Pregabalin', dosage: '50mg', frequency: '1 time at night', duration: '14 days' },
          { name: 'Paracetamol', dosage: '665mg ER', frequency: 'As needed for back fatigue', duration: '7 days' },
          { name: 'Calcium Orotate + Vitamin D3', dosage: '740mg', frequency: 'Once daily after lunch', duration: '60 days' }
        ],
        advisedTherapy: 'Isometric abdominal bracing, pelvic tilts, avoid bending forward or lifting >5kg for next 4 weeks.',
        nextFollowUp: '2024-12-15'
      }
    ]
  },
  {
    id: 'pat-102',
    uhid: 'FA-ORTHO-2024-0882',
    fullName: 'Shirin Sultana',
    age: 62,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+880 1819-334455',
    email: 'shirin.sultana@email.com',
    address: 'Uttara Sector 7, Dhaka',
    emergencyContact: {
      name: 'Farhan Kabir',
      relationship: 'Son',
      phone: '+880 1819-334456'
    },
    allergies: ['Penicillin (Skin Rash)', 'Aspirin'],
    comorbidities: ['Osteoporosis (T-score -2.9 L-spine)', 'Hypothyroidism on Eltroxin 50mcg'],
    pastSurgeries: [
      {
        procedure: 'Right Total Knee Arthroplasty (TKA)',
        date: '2024-09-02',
        surgeon: 'Assistant Professor Dr. Faisal Amin Ahmed',
        implantDetails: 'Posterior-Stabilized (PS) High-Flexion Cobalt-Chrome Implant with Highly Cross-Linked Polyethylene Insert',
        notes: 'Complete correction of 14° varus deformity. Joint balance verified under computer-guided ligament tensioner.'
      }
    ],
    radiologyScans: [
      {
        id: 'rad-03',
        type: 'X-Ray',
        bodyPart: 'Both Knees Standing AP & Lateral',
        date: '2024-08-10',
        findings: 'Grade IV Kellgren-Lawrence Osteoarthritis right knee with severe joint space obliteration, subchondral sclerosis, and large osteophytes.',
        radiologist: 'Popular Diagnostic Centre'
      },
      {
        id: 'rad-04',
        type: 'X-Ray',
        bodyPart: 'Right Knee Post-Op Alignment',
        date: '2024-10-05',
        findings: 'Anatomic mechanical axis restored. Femoral and tibial components well-seated with uniform cement mantle.',
        radiologist: 'Long Life Hospital Radiology'
      }
    ],
    vasPainScores: [
      { date: '2024-08-20', score: 9, note: 'Pre-op: Debilitating right knee pain, wheelchair bound outdoors.' },
      { date: '2024-09-05', score: 5, note: 'Post-op Day 3: Independent walker ambulation started in hospital room.' },
      { date: '2024-10-05', score: 2, note: 'Post-op 5 Weeks: Knee flexion reached 110°, walking with single cane.' }
    ],
    previousConsultations: [
      {
        id: 'cons-02',
        date: '2024-10-05',
        diagnosis: 'Right Total Knee Arthroplasty (Week 5 Post-Op Review)',
        clinicalNotes: 'Mild peri-articular edema. Active ROM 0° to 110°. Quadriceps lag eliminated. Incision well-healed. Continue cryotherapy after exercises.',
        prescribedMedications: [
          { name: 'Rivaroxaban', dosage: '10mg', frequency: 'Completed 30-day course', duration: 'Finished' },
          { name: 'Zoledronic Acid 5mg infusion', dosage: '5mg IV', frequency: 'Scheduled annually for osteoporosis', duration: 'Single dose' },
          { name: 'Tramadol + Paracetamol', dosage: '37.5mg/325mg', frequency: 'SOS only before physio', duration: '5 days' }
        ],
        advisedTherapy: 'Stationary cycling (no resistance), closed kinetic chain quadriceps strengthening.',
        nextFollowUp: '2024-11-20'
      }
    ]
  },
  {
    id: 'pat-103',
    uhid: 'FA-ORTHO-2024-0941',
    fullName: 'Zubair Hossain',
    age: 34,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+880 1912-778899',
    email: 'zubair.hossain@email.com',
    address: 'Gulshan 2, Dhaka',
    emergencyContact: {
      name: 'Kamal Hossain',
      relationship: 'Brother',
      phone: '+880 1912-778800'
    },
    allergies: ['None known'],
    comorbidities: ['None'],
    pastSurgeries: [
      {
        procedure: 'Closed Reduction & Internal Fixation with Expert Intramedullary Interlocking Nailing (Right Tibia)',
        date: '2024-09-24',
        surgeon: 'Assistant Professor Dr. Faisal Amin Ahmed',
        implantDetails: 'Titanium Cannulated Tibial Interlocking Nail (10mm x 340mm) with 4 Proximal & Distal Multi-Planar Locking Screws',
        notes: 'High-energy motorbike accident with AO 42-B2 comminuted distal-third tibial shaft fracture. Closed reamed nailing achieved anatomical length and rotation.'
      }
    ],
    radiologyScans: [
      {
        id: 'rad-05',
        type: 'CT 3D',
        bodyPart: 'Right Tibia & Fibula 3D Reconstruction',
        date: '2024-09-24',
        findings: 'Oblique comminuted fracture with 2 intermediate butterfly fragments. No intra-articular extension into ankle pilon.',
        radiologist: 'Emergency Trauma CT'
      },
      {
        id: 'rad-06',
        type: 'X-Ray',
        bodyPart: 'Right Tibia AP/Lateral (Post-Op 4 Weeks)',
        date: '2024-10-28',
        findings: 'Fracture alignment anatomic with robust bridging periosteal callus formation at medial cortex.',
        radiologist: 'Specialized Trauma Lab'
      }
    ],
    vasPainScores: [
      { date: '2024-09-24', score: 10, note: 'Emergency admission: Severe acute traumatic pain.' },
      { date: '2024-09-27', score: 4, note: 'Post-op Day 3: Non-weight bearing with axillary crutches.' },
      { date: '2024-10-28', score: 1, note: 'Post-op 5 Weeks: Transitioning to 50% partial weight-bearing.' }
    ],
    previousConsultations: [
      {
        id: 'cons-03',
        date: '2024-10-28',
        diagnosis: 'Right Tibial Shaft Fracture (Healing Post-Nailing)',
        clinicalNotes: 'Surgical wounds healed without any erythema. Compartments supple. Active ankle dorsiflexion and plantarflexion normal. Progress from partial weight-bearing (PWB) to full weight-bearing (FWB) over next 3 weeks.',
        prescribedMedications: [
          { name: 'Cissus Quadrangularis extract', dosage: '500mg', frequency: 'Twice daily', duration: '30 days' },
          { name: 'Calcium Carbonate + Cholecalciferol', dosage: '500mg/400IU', frequency: 'Twice daily', duration: '60 days' }
        ],
        advisedTherapy: 'Ankle pump exercises, gentle resistance band eversion/inversion.',
        nextFollowUp: '2024-12-05'
      }
    ]
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-201',
    referenceCode: 'FA-APT-8102',
    patientId: 'pat-101',
    patientName: 'Mohammad Tariqul Islam',
    patientPhone: '+880 1718-992233',
    patientEmail: 'tariqul.islam@email.com',
    patientAge: 48,
    patientGender: 'Male',
    date: '2026-11-10',
    timeSlot: '05:30 PM',
    chamberId: 'ch-longlife',
    chamberName: 'Long Life Hospital Limited, Kolabagan',
    consultationType: 'post_op_review',
    chiefComplaint: '3-Month Post MIS-TLIF follow-up. Wants review of new dynamic flexion/extension X-rays and clearance for office driving.',
    painDuration: 'Occasional mild tightness after sitting >2 hours',
    hasPreviousScans: true,
    priority: 'routine',
    status: 'confirmed',
    createdAt: '2026-11-06T10:15:00Z',
    automatedEmailSent: true
  },
  {
    id: 'apt-202',
    referenceCode: 'FA-APT-8105',
    patientId: 'pat-102',
    patientName: 'Shirin Sultana',
    patientPhone: '+880 1819-334455',
    patientEmail: 'shirin.sultana@email.com',
    patientAge: 62,
    patientGender: 'Female',
    date: '2026-11-10',
    timeSlot: '06:15 PM',
    chamberId: 'ch-longlife',
    chamberName: 'Long Life Hospital Limited, Kolabagan',
    consultationType: 'joint_replacement',
    chiefComplaint: 'Right Total Knee Arthroplasty 10-week post-op assessment and Left Knee evaluation for early degenerative changes.',
    painDuration: 'Right knee zero pain; left knee mild stairs ache',
    hasPreviousScans: true,
    priority: 'routine',
    status: 'confirmed',
    createdAt: '2026-11-05T14:30:00Z',
    automatedEmailSent: true
  },
  {
    id: 'apt-203',
    referenceCode: 'FA-APT-8109',
    patientId: 'pat-104',
    patientName: 'Rafiqul Anam Chowdhury',
    patientPhone: '+880 1713-112244',
    patientEmail: 'rafiqul.anam@email.com',
    patientAge: 55,
    patientGender: 'Male',
    date: '2026-11-11',
    timeSlot: '11:00 AM',
    chamberId: 'ch-badda',
    chamberName: 'Popular Diagnostic Centre Ltd., North Badda',
    consultationType: 'spine_consultation',
    chiefComplaint: 'Severe neurogenic claudication. Cannot walk more than 30 meters without bending forward. Burning paresthesia in bilateral calves.',
    painDuration: '6 months progressive worsening',
    hasPreviousScans: true,
    priority: 'urgent',
    status: 'confirmed',
    createdAt: '2026-11-07T09:40:00Z',
    automatedEmailSent: true
  },
  {
    id: 'apt-204',
    referenceCode: 'FA-APT-8114',
    patientId: 'pat-103',
    patientName: 'Zubair Hossain',
    patientPhone: '+880 1912-778899',
    patientEmail: 'zubair.hossain@email.com',
    patientAge: 34,
    patientGender: 'Male',
    date: '2026-11-12',
    timeSlot: '06:30 PM',
    chamberId: 'ch-popular-dc',
    chamberName: 'Popular Hospital & Diagnostic Centre (DC Branch)',
    consultationType: 'trauma_fracture',
    chiefComplaint: 'Post-tibial nailing 7-week follow-up. Review weight-bearing progression and knee/ankle mobility.',
    painDuration: 'Minimal soreness only after prolonged walking',
    hasPreviousScans: true,
    priority: 'routine',
    status: 'confirmed',
    createdAt: '2026-11-07T16:20:00Z',
    automatedEmailSent: true
  }
];

export const INITIAL_MESSAGES: SecureMessage[] = [
  {
    id: 'msg-301',
    conversationId: 'conv-pat-101',
    patientId: 'pat-101',
    patientName: 'Mohammad Tariqul Islam',
    senderRole: 'patient',
    senderName: 'Mohammad Tariqul Islam',
    messageText: 'Assalamu Alaikum Dr. Faisal, my surgical incision has closed nicely. I took a photo today during dressing change. Is it safe for me to shower without covering the back with plastic now?',
    category: 'wound_check',
    timestamp: '2026-11-07T14:20:00Z',
    isEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM / Patient Portal Standard',
    status: 'read'
  },
  {
    id: 'msg-302',
    conversationId: 'conv-pat-101',
    patientId: 'pat-101',
    patientName: 'Mohammad Tariqul Islam',
    senderRole: 'doctor',
    senderName: 'Assistant Professor Dr. Faisal Amin Ahmed',
    messageText: 'Wa Alaikum Assalam Tariqul. The photo confirms complete epithelialization with healthy surgical scarring and zero erythema or discharge. You can take a gentle shower now. Please gently pat dry with a clean sterile towel—do not rub the scar. Continue wearing the lumbar support brace whenever out of bed.',
    category: 'wound_check',
    timestamp: '2026-11-07T15:05:00Z',
    isEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM / Patient Portal Standard',
    status: 'read'
  },
  {
    id: 'msg-303',
    conversationId: 'conv-pat-102',
    patientId: 'pat-102',
    patientName: 'Shirin Sultana',
    senderRole: 'patient',
    senderName: 'Shirin Sultana',
    messageText: 'Dr. Faisal, after my knee physiotherapy yesterday I noticed a mild warm sensation around the front of the right knee. No fever. Is this normal after increasing flexion to 110 degrees?',
    category: 'pain_management',
    timestamp: '2026-11-08T09:15:00Z',
    isEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM / Patient Portal Standard',
    status: 'delivered'
  },
  {
    id: 'msg-304',
    conversationId: 'conv-pat-102',
    patientId: 'pat-102',
    patientName: 'Shirin Sultana',
    senderRole: 'doctor',
    senderName: 'Assistant Professor Dr. Faisal Amin Ahmed',
    messageText: 'Hello Mrs. Shirin. Mild localized warmth is expected after achieving new range-of-motion milestones due to hyperemic response in remodeling soft tissues. Apply an ice pack wrapped in a clean towel for 15 minutes, 3 times a day. If you notice any redness spreading or calf tenderness, message me immediately. See you tomorrow at Long Life Hospital.',
    category: 'pain_management',
    timestamp: '2026-11-08T10:45:00Z',
    isEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM / Patient Portal Standard',
    status: 'read'
  }
];

export const SURGICAL_GUIDES: SurgicalGuide[] = [
  {
    id: 'guide-spine-01',
    category: 'spine',
    title: 'Minimally Invasive Spine Surgery (MIS-TLIF, Microdiscectomy & Swiss Decompression)',
    subtitle: 'Advanced endoscopic, tubular & Swiss-trained decompression for disc herniation and spinal instability',
    overview: 'Minimally Invasive Spine Surgery preserves normal paraspinal musculature through specialized tubular dilation and high-resolution operating microscopes. Trained in Switzerland with an International Diploma in Spine Surgery, Assistant Professor Dr. Faisal Amin Ahmed specializes in microscopic discectomy, percutaneous interbody fusion (MIS-TLIF), and interventional spine pain procedures with rapid return to daily activity.',
    keyIndications: [
      'Lumbar disc herniation refractory to conservative treatment',
      'Severe sciatica or radiculopathy with progressive dermatomal pain',
      'Degenerative lumbar spondylolisthesis with spinal instability (Grade I & II)',
      'Spinal canal stenosis with neurogenic claudication',
      'Interventional pain management & nerve root blocks'
    ],
    surgicalApproach: [
      'Microscopic sub-fascial tubular dilation through a 2.5cm muscle-splitting incision',
      'Preservation of contralateral lamina and supraspinous ligament complexes',
      'Direct visualization and micro-decompression of exiting and traversing nerve roots',
      'Insertion of titanium/PEEK interbody cage filled with autologous bone graft matrix for fusion',
      'Percutaneous pedicle screw fixation under intraoperative fluoroscopy guidance'
    ],
    rehabMilestones: [
      {
        phase: 'Phase 1: In-Hospital (Days 0 - 2)',
        timeframe: 'Hospital stay',
        goals: ['Independent log-rolling', 'Ambulation within 24 hours with lumbar support', 'Bladder/bowel function verification'],
        restrictions: ['Strictly no twisting, forward bending, or lifting >2 kg']
      },
      {
        phase: 'Phase 2: Early Home Recovery (Weeks 1 - 4)',
        timeframe: 'Weeks 1 to 4',
        goals: ['Daily walking 20-30 minutes on flat surfaces', 'Wound inspection & staple removal at Day 12-14'],
        restrictions: ['Wear lumbar brace during all out-of-bed activities', 'No prolonged sitting >30 mins uninterrupted']
      },
      {
        phase: 'Phase 3: Active Stabilization (Weeks 5 - 12)',
        timeframe: 'Weeks 5 to 12',
        goals: ['Gradual brace weaning', 'Core isometric muscle re-education', 'Safe return to desk work and light driving'],
        restrictions: ['No contact sports, heavy gym deadlifts, or high-impact running']
      }
    ],
    redFlags: [
      'Sudden loss of bowel or bladder control (Cauda Equina Syndrome) — Emergency immediate admission required',
      'Progressive motor drop foot (inability to dorsiflex foot/big toe)',
      'High grade fever >101°F with wound drainage or increasing spinal pain',
      'Severe calf swelling or tenderness (rule out Deep Vein Thrombosis)'
    ],
    faq: [
      {
        question: 'When can I resume light office work after MIS-TLIF?',
        answer: 'Most patients with sedentary desk jobs resume work within 3 to 4 weeks. Dr. Faisal advises taking frequent standing/walking breaks every 30 minutes.'
      },
      {
        question: 'Will I set off airport security metal detectors with spine implants?',
        answer: 'Modern medical titanium and PEEK implants rarely trigger standard metal detectors, and Dr. Faisal provides an official implant certification card for international travel.'
      }
    ]
  },
  {
    id: 'guide-trauma-02',
    category: 'trauma',
    title: 'Complex Orthopedic Trauma, Pelvic & Fracture Care (AO Trauma Switzerland & India)',
    subtitle: 'Modern fixation principles, biological plating (MIPO), and intramedullary interlocking nailing',
    overview: 'High-energy trauma and complex fractures require systematic damage control orthopedics, anatomic articular restoration, and biologic preservation of periosteal blood supply. Having completed advanced AO Trauma training in Switzerland and India and formerly consulting at NITOR, Assistant Professor Dr. Faisal Amin Ahmed applies contemporary Locking Compression Plates (LCP) and cannulated interlocking nails for early functional mobilization.',
    keyIndications: [
      'Polytrauma, road traffic accident (RTA) injuries, and open Gustilo fractures',
      'Pelvic ring disruptions & acetabular column fractures',
      'Complex intra-articular fractures (Tibial plateau, distal radius, pilon)',
      'Fracture non-unions, mal-unions, and infected bone defects requiring biological reconstruction'
    ],
    surgicalApproach: [
      'Early total care vs. Damage Control Orthopedics (DCO) with temporary bridging spanning fixators in unstable polytrauma',
      'Thorough emergency radical debridement for open fractures within 6 hours',
      'Minimally Invasive Plate Osteosynthesis (MIPO) to protect fracture hematoma and biology',
      'Rigid multi-planar locked intramedullary nailing for early full weight-bearing',
      'High-precision intra-articular reduction with lag screws under sub-millimeter fluoroscopy'
    ],
    rehabMilestones: [
      {
        phase: 'Phase 1: Acute Protection (Weeks 0 - 2)',
        timeframe: 'Weeks 0 to 2',
        goals: ['Limb elevation above heart level to resolve soft tissue edema', 'Active toe and finger movements to promote venous return', 'Non-weight bearing (NWB) crutch mobilization'],
        restrictions: ['Strictly zero weight bearing on affected extremity unless explicitly cleared']
      },
      {
        phase: 'Phase 2: Callus Formation & Partial Loading (Weeks 3 - 6)',
        timeframe: 'Weeks 3 to 6',
        goals: ['Touchdown / Partial Weight Bearing (PWB) up to 25-50% with crutches', 'Adjacent joint range of motion exercises (hip, knee, ankle)'],
        restrictions: ['No sudden rotational torque or running']
      },
      {
        phase: 'Phase 3: Bone Consolidation & Full Loading (Weeks 7 - 12+)',
        timeframe: 'Weeks 7 to 12+',
        goals: ['Progression to Full Weight Bearing (FWB) once cortical bridging visible on X-ray', 'Muscle endurance rebuilding with progressive resistance'],
        restrictions: ['Impact sports restricted until complete 3-cortex bridging union confirmed']
      }
    ],
    redFlags: [
      'Disproportionate severe pain unmanageable by analgesics with tense swelling and pain on passive toe stretch (Impending Compartment Syndrome) — Surgical emergency',
      'Purulent drainage, foul odor, or fever >38°C around incision or external fixator pin-sites',
      'Sudden loss of distal pulse or pale cold extremity',
      'Shortness of breath or acute chest pain (suspect fat embolism or pulmonary embolism)'
    ],
    faq: [
      {
        question: 'Do fracture plates and screws need to be removed later in life?',
        answer: 'Modern titanium implants are biocompatible and designed to remain safely for life. Routine removal is only indicated if an implant causes localized soft tissue impingement, tendon friction, or in young competitive athletes after complete union.'
      },
      {
        question: 'What is the best diet to accelerate bone healing after a fracture?',
        answer: 'A high-protein diet rich in calcium, Vitamin D3, magnesium, Vitamin C, and zinc is vital. Dr. Faisal strongly advises strict cessation of smoking and tobacco, as nicotine significantly retards capillary ingrowth and bone callus formation.'
      }
    ]
  },
  {
    id: 'guide-joint-03',
    category: 'joint',
    title: 'Joint Replacement & Arthroscopy (TKA, THA & Sports Medicine)',
    subtitle: 'Primary & revision joint arthroplasty (IBMP Fellowship) and advanced knee arthroscopy (Ganga Hospital & PICASI-APKS)',
    overview: 'Total Joint Arthroplasty and Arthroscopic reconstruction restore natural kinematics and pain-free motion. Certified with Fellowships in Arthroscopy and Arthroplasty (IBMP, India) as well as specialized arthroscopy training at Ganga Hospital and PICASI-APKS, Dr. Faisal performs muscle-sparing Total Knee Arthroplasty (TKA), Total Hip Arthroplasty (THA), and minimally invasive knee arthroscopy for meniscus and ligament injuries.',
    keyIndications: [
      'Severe end-stage osteoarthritis (Grade III & IV) causing persistent rest and night pain',
      'Avascular necrosis (AVN) of femoral head or secondary inflammatory arthritis (Rheumatoid)',
      'ACL/PCL tears, meniscus injuries, and cartilage defects requiring knee arthroscopy',
      'Failed previous joint implants requiring revision reconstruction'
    ],
    surgicalApproach: [
      'Subvastus / Midvastus quadriceps-sparing approach for Total Knee Arthroplasty (TKA)',
      'Minimally invasive keyhole arthroscopy for ACL reconstruction and meniscus repair',
      'Direct anterior or posterior mini-incision for Total Hip Arthroplasty (THA)',
      'Vacuum-mixed antibiotic-loaded bone cement fixation for long-term implant survival',
      'Multimodal periarticular cocktail analgesia infiltration for rapid pain-free ambulation'
    ],
    rehabMilestones: [
      {
        phase: 'Phase 1: Day of Surgery to Day 3',
        timeframe: 'Hospital stay',
        goals: ['Full weight-bearing walker ambulation within 12-24 hours', 'Active knee flexion to 90° for TKA', 'Transfer safely from bed to chair and bathroom'],
        restrictions: ['For hips: avoid hip flexion past 90°, crossing legs, or internal rotation']
      },
      {
        phase: 'Phase 2: Home Ambulation (Weeks 2 - 6)',
        timeframe: 'Weeks 2 to 6',
        goals: ['Transition from walker to single walking stick', 'Knee flexion 110° - 120°', 'Independent stair climbing (up with good leg, down with operated leg)'],
        restrictions: ['No squatting, sitting cross-legged on floor, or soaking incision in tub']
      },
      {
        phase: 'Phase 3: Long-Term Joint Preservation (Month 3+)',
        timeframe: 'Month 3 onwards',
        goals: ['Pain-free independent walking 2-5 kilometers', 'Swimming, cycling, golfing, and low-impact active living'],
        restrictions: ['Avoid high-impact jumping or marathon running to protect polyethylene wear']
      }
    ],
    redFlags: [
      'Sudden localized swelling in the calf with warmth and cramp-like pain (Deep Vein Thrombosis)',
      'Persistent wound discharge or erythema after Day 5',
      'Inability to bear weight or feeling a "pop" in the hip (suspect dislocation)',
      'High fever with chills and sudden joint swelling'
    ],
    faq: [
      {
        question: 'How long will my artificial joint replacement implant last?',
        answer: 'With modern highly cross-linked polyethylene and ceramic surfaces, modern hip and knee replacements have documented survival rates exceeding 95% at 20 to 25 years.'
      },
      {
        question: 'When can I climb stairs at home?',
        answer: 'Our physiotherapy team trains you on stairs before discharge (usually Day 2 or 3). The rule of thumb: "Up with the good leg first, down with the operated leg first."'
      }
    ]
  },
  {
    id: 'guide-post-op-04',
    category: 'post_op',
    title: 'Post-Operative Care, Wound Hygiene & Recovery Protocols',
    subtitle: 'Comprehensive guide for dressings, pain control, DVT prevention, and emergency red flags',
    overview: 'Optimal surgical outcomes depend equally on meticulous post-operative vigilance. This guide details essential instructions for wound hygiene, pain titration, thromboprophylaxis, nutrition, and emergency warning signs.',
    keyIndications: [
      'All patients recovering from spine, trauma, or joint reconstruction surgeries',
      'Families and caregivers managing home dressings and mobilization'
    ],
    surgicalApproach: [
      'Sterile dressing protocol: Waterproof dressings allow sponge bathing. Change only if soaked or loose.',
      'Cryotherapy: 15 minutes ice packing 4 times daily to minimize surgical site edema.',
      'DVT Prophylaxis: Oral anticoagulants (e.g. Rivaroxaban) for 14 to 35 days as prescribed + anti-embolism stockings.'
    ],
    rehabMilestones: [
      {
        phase: 'Days 1 - 7: Critical Healing',
        timeframe: 'First week',
        goals: ['Adequate pain management with multimodal oral analgesics', 'Regular ankle pumps (20 reps every hour while awake)'],
        restrictions: ['Do not touch incision with unwashed hands; keep dressing dry']
      },
      {
        phase: 'Days 10 - 14: Suture/Staple Removal',
        timeframe: 'Second week',
        goals: ['In-clinic or coordinated home nurse stitch removal', 'Evaluation by Dr. Faisal or surgical team'],
        restrictions: ['No swimming or bath tubs until 48 hours post-stitch removal']
      }
    ],
    redFlags: [
      'Temperature above 100.4°F (38°C) that does not come down with paracetamol',
      'Spreading redness (>2cm from wound margin) or purulent yellow/green drainage',
      'New or increasing numbness, tingling, or weakness in legs or toes',
      'Chest tightness, rapid heartbeat, or shortness of breath'
    ],
    faq: [
      {
        question: 'What should I do if my surgical dressing gets wet during a sponge bath?',
        answer: 'Gently peel off the wet dressing, clean the surrounding skin with sterile saline, and apply a fresh sterile dry island dressing. You can upload a photo in our Secure Follow-Up Chat for Dr. Faisal’s team to verify.'
      },
      {
        question: 'Can I take sleeping pills if pain disturbs my sleep?',
        answer: 'Never take unprescribed sleeping medications as they can interact with pain relievers. Message Dr. Faisal directly in the portal to safely adjust your pain regimen.'
      }
    ]
  }
];
