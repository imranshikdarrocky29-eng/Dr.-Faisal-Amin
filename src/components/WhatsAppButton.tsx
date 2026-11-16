import React from 'react';

export const WhatsAppButton: React.FC = () => {
  const phoneDisplay = '01712640048';
  const whatsappNumber = '8801712640048';
  const defaultMessage = encodeURIComponent(
    'Assalamu Alaikum, I would like to book or inquire about a consultation with Assistant Professor Dr. Faisal Amin Ahmed.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-5 right-5 z-30 flex items-center gap-3 group">
      {/* Hover/Desktop Quick Info Tooltip */}
      <div className="hidden sm:flex flex-col items-end bg-slate-900/95 text-white px-3.5 py-2 rounded-xl shadow-lg border border-slate-700/80 backdrop-blur-md opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        <span className="text-[11px] font-bold text-emerald-400 tracking-wide uppercase">
          WhatsApp Appointment Desk
        </span>
        <span className="text-xs font-mono font-semibold text-slate-100">
          {phoneDisplay}
        </span>
      </div>

      {/* Floating WhatsApp Logo Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp (${phoneDisplay})`}
        title={`WhatsApp: ${phoneDisplay}`}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_28px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 ring-2 ring-white/90"
      >
        {/* Subtle ambient ping ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"
          style={{ animationDuration: '2.6s' }}
        />

        {/* Official WhatsApp SVG Logo */}
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-7 h-7 relative z-10"
          aria-hidden="true"
        >
          <path d="M16.004 3.2c-7.058 0-12.8 5.742-12.8 12.8 0 2.256.592 4.458 1.714 6.398L3.2 28.8l6.566-1.69A12.748 12.748 0 0 0 16.004 28.8c7.058 0 12.8-5.742 12.8-12.8s-5.742-12.8-12.8-12.8Zm0 23.438a10.61 10.61 0 0 1-5.414-1.482l-.388-.23-3.896 1.004 1.04-3.796-.252-.402a10.598 10.598 0 0 1-1.624-5.732c0-5.862 4.776-10.638 10.638-10.638 5.862 0 10.638 4.776 10.638 10.638 0 5.862-4.776 10.638-10.638 10.638h-.104Zm5.834-7.968c-.32-.16-1.89-.932-2.184-1.038-.292-.106-.506-.16-.72.16-.212.32-.824 1.038-1.01 1.252-.186.214-.372.24-.692.08-.32-.16-1.35-.498-2.572-1.586-.95-.848-1.592-1.894-1.778-2.214-.186-.32-.02-.492.14-.652.144-.144.32-.372.48-.558.16-.186.212-.32.32-.532.106-.214.054-.4-.026-.56-.08-.16-.72-1.73-.986-2.37-.26-.624-.524-.54-.72-.55-.186-.01-.4-.01-.612-.01-.214 0-.56.08-.852.4-.294.32-1.12 1.094-1.12 2.668 0 1.574 1.146 3.094 1.306 3.308.16.214 2.256 3.444 5.466 4.828.764.33 1.36.526 1.824.674.766.244 1.464.21 2.016.126.616-.092 1.89-.772 2.156-1.518.266-.746.266-1.384.186-1.518-.08-.134-.292-.214-.612-.374Z" />
        </svg>
      </a>
    </div>
  );
};
