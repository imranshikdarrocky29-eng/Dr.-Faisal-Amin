import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SURGICAL_GUIDES } from '../data/initialData';
import { SurgicalGuide } from '../types';
import { 
  HeartPulse, 
  Layers, 
  Activity, 
  Bone, 
  AlertTriangle, 
  Search, 
  Calendar, 
  HelpCircle, 
  ArrowLeft 
} from 'lucide-react';

export const SurgicalGuidesView: React.FC = () => {
  const { setActiveView, setShowBookingModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGuide, setSelectedGuide] = useState<SurgicalGuide>(SURGICAL_GUIDES[0]);

  const filteredGuides = SURGICAL_GUIDES.filter((guide) => {
    const matchesCat = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'spine': return <Layers className="w-4 h-4 text-sky-600" />;
      case 'trauma': return <Activity className="w-4 h-4 text-rose-600" />;
      case 'joint': return <Bone className="w-4 h-4 text-teal-600" />;
      default: return <HeartPulse className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => setActiveView('portfolio')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Portfolio</span>
          </button>

          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg shadow-xs transition-all whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-sky-300" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* View Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-2">
            Clinical Patient Education &amp; Post-Op Protocols
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Orthopedic Surgical Topics &amp; Recovery Guides
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Evidence-based recovery pathways authored by Assistant Professor Dr. Faisal Amin Ahmed. 
            Review your surgical procedure, rehabilitation milestones, wound hygiene, and safety warning signs.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'spine', label: 'Spine Surgery' },
              { id: 'trauma', label: 'Trauma & Fractures' },
              { id: 'joint', label: 'Joint Replacement' },
              { id: 'post_op', label: 'Post-Op Care' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search surgery or recovery guide..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>

        {/* 2-Column Split: Topic List Sidebar & Detailed Article View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Guide Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
              Available Protocols ({filteredGuides.length})
            </div>
            {filteredGuides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedGuide.id === guide.id
                    ? 'bg-white border-sky-500 shadow-sm ring-1 ring-sky-500/20'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {getCategoryIcon(guide.category)}
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {guide.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 leading-snug">
                  {guide.title}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {guide.subtitle}
                </div>
              </button>
            ))}
          </div>

          {/* Right Detailed Article Viewer */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            {/* Guide Header */}
            <div className="border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold uppercase tracking-wider mb-2">
                {getCategoryIcon(selectedGuide.category)}
                <span>Clinical Care Protocol</span>
                <span aria-hidden="true">·</span>
                <span>Author: Assistant Professor Dr. Faisal Amin Ahmed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {selectedGuide.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {selectedGuide.subtitle}
              </p>
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">1. Clinical Overview</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedGuide.overview}
              </p>
            </div>

            {/* Indications & Surgical Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Primary Indications
                </h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  {selectedGuide.keyIndications.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold mt-0.5">•</span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Surgical Approach &amp; Technique
                </h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  {selectedGuide.surgicalApproach.map((app, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold mt-0.5">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rehabilitation Phases Timeline */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                2. Phased Recovery Milestones &amp; Restrictions
              </h3>
              <div className="space-y-4">
                {selectedGuide.rehabMilestones.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-slate-900">
                        {phase.phase}
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {phase.timeframe}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1">
                      <div><strong className="text-slate-900">Key Recovery Goals:</strong> {phase.goals.join('; ')}</div>
                      <div className="text-rose-700"><strong className="text-rose-800">Important Restrictions:</strong> {phase.restrictions.join('; ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Red Flags Notice */}
            <div className="p-5 rounded-xl bg-rose-50 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Emergency Red Flags — When to Seek Immediate Attention</span>
              </div>
              <ul className="text-xs text-rose-800 space-y-1.5 pl-1">
                {selectedGuide.redFlags.map((flag, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>Frequently Asked Clinical Questions</span>
              </h3>
              <div className="space-y-3">
                {selectedGuide.faq.map((faq, fIdx) => (
                  <div key={fIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900">
                      Q: {faq.question}
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
