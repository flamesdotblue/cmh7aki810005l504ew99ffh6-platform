import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, History as HistoryIcon, FileText, Sparkles } from 'lucide-react';
import HeroListening from './components/HeroListening';
import SummaryCard from './components/SummaryCard';
import NotesDetail from './components/NotesDetail';
import HistoryList from './components/HistoryList';

const mockMeeting = {
  id: 'mtg-001',
  title: 'Product Strategy Sync',
  date: 'Oct 26, 2025',
  time: '10:00–10:45 AM',
  attendees: ['Ava', 'Noah', 'Maya', 'Liam'],
  summary:
    'The team aligned on the Q1 product roadmap with focus on onboarding improvements and AI-powered meeting summaries. Marketing will support a phased launch with targeted cohorts. Engineering will prioritize stability before new features.',
  actionItems: [
    'Maya: Draft onboarding walkthrough v2 by Friday',
    'Noah: Define analytics events for activation funnel',
    'Ava: Prepare messaging for beta cohort announcement',
  ],
  decisions: [
    'Move AI summaries to public beta in two waves',
    'Defer calendar integration to next sprint',
  ],
  highlights: [
    'Consensus on roadmap and success metrics',
    'Strong early interest from design partners',
  ],
  tags: ['Roadmap', 'AI', 'Onboarding', 'Marketing'],
};

const mockHistory = [
  {
    id: 'mtg-001',
    title: 'Product Strategy Sync',
    date: 'Oct 26, 2025',
    length: '45m',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'mtg-002',
    title: 'Design Crit — Signup Flow',
    date: 'Oct 24, 2025',
    length: '30m',
    color: 'from-purple-400 to-fuchsia-500',
  },
  {
    id: 'mtg-003',
    title: 'Sprint Planning',
    date: 'Oct 22, 2025',
    length: '60m',
    color: 'from-emerald-400 to-teal-500',
  },
];

export default function App() {
  const [view, setView] = useState('listen');
  const [listening, setListening] = useState(true);
  const [currentMeeting, setCurrentMeeting] = useState(mockMeeting);

  const handleFakeStop = () => {
    setListening(false);
    setTimeout(() => setView('summary'), 400);
  };

  const handleSelectHistory = (id) => {
    // For MVP, load same mock data with minor changes
    setCurrentMeeting({
      ...mockMeeting,
      id,
      title: mockHistory.find((h) => h.id === id)?.title || mockMeeting.title,
      date: mockHistory.find((h) => h.id === id)?.date || mockMeeting.date,
    });
    setView('summary');
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-slate-100 font-inter selection:bg-cyan-400/30 selection:text-white">
      {/* Top Bar / Brand */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0b1020]/60 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-emerald-400 shadow-[0_0_40px_-10px] shadow-cyan-400/60" />
            <div>
              <div className="text-lg font-semibold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300">EchoNote</span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5">Your intelligent meeting companion</p>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-2 text-sm">
            <button onClick={() => setView('listen')} className={`px-3 py-1.5 rounded-full hover:bg-white/5 transition ${view === 'listen' ? 'bg-white/10' : ''}`}>Listen</button>
            <button onClick={() => setView('summary')} className={`px-3 py-1.5 rounded-full hover:bg-white/5 transition ${view === 'summary' ? 'bg-white/10' : ''}`}>Summary</button>
            <button onClick={() => setView('notes')} className={`px-3 py-1.5 rounded-full hover:bg-white/5 transition ${view === 'notes' ? 'bg-white/10' : ''}`}>Notes</button>
            <button onClick={() => setView('history')} className={`px-3 py-1.5 rounded-full hover:bg-white/5 transition ${view === 'history' ? 'bg-white/10' : ''}`}>History</button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 pt-6 pb-28">
        <AnimatePresence mode="wait">
          {view === 'listen' && (
            <motion.section
              key="listen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <HeroListening listening={listening} onStop={handleFakeStop} />

              <div className="grid sm:grid-cols-3 gap-4">
                <StatCard label="Clarity" value="98%" accent="from-cyan-400 to-blue-500" />
                <StatCard label="Noise Filter" value="On" accent="from-emerald-400 to-teal-500" />
                <StatCard label="Latency" value="120ms" accent="from-indigo-400 to-purple-500" />
              </div>
            </motion.section>
          )}

          {view === 'summary' && (
            <motion.section
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <SummaryCard meeting={currentMeeting} onViewNotes={() => setView('notes')} />
            </motion.section>
          )}

          {view === 'notes' && (
            <motion.section
              key="notes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <NotesDetail meeting={currentMeeting} />
            </motion.section>
          )}

          {view === 'history' && (
            <motion.section
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <HistoryList items={mockHistory} onSelect={handleSelectHistory} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Floating Controls */}
      <div className="fixed bottom-4 left-0 right-0 px-4 sm:px-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-2">
            <button
              onClick={() => setView('listen')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition ${view === 'listen' ? 'bg-white/10' : ''}`}
            >
              <Mic className="h-4 w-4 text-cyan-300" />
              <span className="text-sm">Listen</span>
            </button>
            <button
              onClick={() => setView('summary')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition ${view === 'summary' ? 'bg-white/10' : ''}`}
            >
              <Sparkles className="h-4 w-4 text-emerald-300" />
              <span className="text-sm">Summary</span>
            </button>
            <button
              onClick={() => setView('notes')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition ${view === 'notes' ? 'bg-white/10' : ''}`}
            >
              <FileText className="h-4 w-4 text-blue-300" />
              <span className="text-sm">Notes</span>
            </button>
            <button
              onClick={() => setView('history')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition ${view === 'history' ? 'bg-white/10' : ''}`}
            >
              <HistoryIcon className="h-4 w-4 text-violet-300" />
              <span className="text-sm">History</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent = 'from-cyan-400 to-blue-500' }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-10 pointer-events-none`} />
      <div className="relative p-4">
        <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-2xl font-semibold mt-1 text-slate-50">{value}</p>
      </div>
    </div>
  );
}
