import { ChevronRight, Clock } from 'lucide-react';

export default function HistoryList({ items, onSelect }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className="w-full text-left group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.07] transition"
        >
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${item.color} opacity-10`} />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <p className="text-slate-100 font-medium">{item.title}</p>
              <p className="text-xs text-slate-400 mt-0.5 inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> {item.date} • {item.length}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-0.5 transition" />
          </div>
        </button>
      ))}
    </div>
  );
}
