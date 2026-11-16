import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Phone, 
  Video 
} from 'lucide-react';

export const ChambersSection: React.FC = () => {
  const { chambers, setShowBookingModal } = useApp();

  return (
    <section id="chambers" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-2">
            Practice Locations &amp; Consultation Hours
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Chambers &amp; Clinical Schedule
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Consultations are arranged with strict slot timing to avoid overcrowding. Please book in advance 
            to secure your appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chambers.map((chamber) => (
            <div
              key={chamber.id}
              className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col justify-between hover:border-sky-300 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            >
              {chamber.image && (
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={chamber.image}
                    alt={chamber.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-white truncate drop-shadow-sm">{chamber.room}</span>
                    <span className="text-xs font-mono font-bold text-sky-300 bg-slate-950/80 px-2 py-0.5 rounded border border-sky-400/30">
                      ৳{chamber.consultationFee} BDT
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {chamber.name}
                  </h3>
                  <div className="text-xs font-medium text-sky-700 mt-0.5">
                    {chamber.hospital}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {chamber.address}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="font-medium">
                      Days: {chamber.days.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Time: <strong className="text-slate-900">{chamber.timing}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Chamber Desk: {chamber.phone}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0b1e33] hover:bg-[#153457] rounded-lg shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4 text-sky-300" />
                  <span>Book at this Chamber</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
