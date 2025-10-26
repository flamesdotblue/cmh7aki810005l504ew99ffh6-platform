import { motion } from 'framer-motion';
import { Calendar, Clock, Sparkles, ChevronRight } from 'lucide-react';

export default function SummaryCard({ meeting, onViewNotes }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-emerald-400/10" />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">{meeting.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {meeting.date}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {meeting.time}</span>
            </div>
          </div>
          <div className="hidden sm:flex -space-x-2">
            {meeting.attendees.slice(0,4).map((name) => (
              <div key={name} className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 grid place-items-center text-[10px] text-slate-200 border border-white/10">
                {name[0]}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200 text-xs">
            <Sparkles className="h-3.5 w-3.5" /> AI Summary
          </div>
          <p className="mt-3 text-slate-200/90 leading-relaxed">
            {meeting.summary}
          </p>
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-2">
          {meeting.tags.map((t) => (
            <span key={t} className="text-xs rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-slate-300">{t}</span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onViewNotes}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] px-4 py-2 text-sm text-slate-200 transition"
          >
            View Notes
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
            Share Summary
          </button>
        </div>
      </div>
    </div>
  );
}
