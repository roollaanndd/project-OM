export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-20 w-20">
          {/* CSS-only pulsing rings */}
          <div
            className="absolute inset-0 rounded-full border-2 border-pink-400/40"
            style={{
              animation: "pwa-ping 1.8s ease-out infinite",
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-pink-400/40"
            style={{ animation: "pwa-ping 1.8s ease-out 0.5s infinite" }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-pink-400/40"
            style={{ animation: "pwa-ping 1.8s ease-out 1s infinite" }}
          />
          <svg viewBox="0 0 96 96" className="h-20 w-20 drop-shadow-[0_8px_16px_rgba(236,72,153,0.4)]">
            <defs>
              <linearGradient id="loading-shield" x1="0" y1="0" x2="96" y2="96">
                <stop stopColor="#9D174D" />
                <stop offset="0.5" stopColor="#DB2777" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path d="M48 4l36 12v28c0 24-16 40-36 48C28 84 12 68 12 44V16L48 4z" fill="url(#loading-shield)" />
            <path d="M48 24c-7 0-10 2.8-15 2.8-4 0-8 2-8 9.2 0 8 2.8 12 5 18.8 1.6 5.2 2.8 14.8 7.2 14.8 4 0 4.4-7 6-12 1.2-3.6 2.2-5.6 7-5.6s5.8 2 7 5.6c1.6 5 2 12 6 12 4.4 0 5.6-9.6 7.2-14.8C67 48 69.8 44 69.8 36c0-7.2-4-9.2-8-9.2-5 0-8-2.8-15-2.8z" fill="#FFFFFF" />
          </svg>
        </div>
        <div className="text-center">
          <div className="font-display text-2xl font-extrabold">
            <span className="text-gradient-pink">OMDC</span>
          </div>
          <p
            className="mt-1 text-xs font-medium text-pink-700"
            style={{ animation: "pwa-fade 1.6s ease-in-out infinite" }}
          >
            Memuat senyum terbaik untuk Anda…
          </p>
        </div>
      </div>
      <style>{`
        @keyframes pwa-ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes pwa-fade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
