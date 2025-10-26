import { motion } from 'framer-motion';
import { Mic, Pause } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function HeroListening({ listening, onStop }) {
  return (
    <div className="relative h-[56vh] sm:h-[62vh] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      {/* Spline Scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b1020]/30 via-transparent to-[#0b1020]/60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(56,189,248,0.25),rgba(16,185,129,0.05)_60%,transparent_80%)]" />

      {/* Center Mic with pulse */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          className="relative"
          animate={listening ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: listening ? Infinity : 0, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute -inset-8 rounded-full"
            animate={listening ? { boxShadow: ['0 0 0 0 rgba(34,211,238,0.25)', '0 0 0 24px rgba(34,211,238,0)', '0 0 0 0 rgba(34,211,238,0.25)'] } : {}}
            transition={{ duration: 2.2, repeat: listening ? Infinity : 0 }}
          />
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-emerald-400 p-[2px] shadow-[0_10px_60px_-10px] shadow-cyan-400/50">
            <div className="h-full w-full rounded-2xl bg-[#0b1020] grid place-items-center">
              <Mic className="h-9 w-9 text-cyan-300" />
            </div>
          </div>
        </motion.div>

        <motion.p
          className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-300"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {listening ? 'Listening…' : 'Paused'}
        </motion.p>

        {/* Animated bars to visualize audio */}
        <div className="mt-4 flex items-end gap-1 h-10">
          {[...Array(24)].map((_, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-gradient-to-b from-cyan-300 to-blue-400/80"
              animate={{ height: listening ? [8, 24 + (i % 5) * 6, 10] : 10 }}
              transition={{ duration: 1 + (i % 5) * 0.12, repeat: listening ? Infinity : 0, ease: 'easeInOut' }}
              style={{ height: 10 }}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={onStop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur px-4 py-2 text-sm text-slate-200 transition"
          >
            <Pause className="h-4 w-4 text-slate-300 group-hover:text-white" />
            Stop & Summarize
          </button>
          <span className="text-xs text-slate-400">Realtime mode (mock)</span>
        </div>
      </div>
    </div>
  );
}
