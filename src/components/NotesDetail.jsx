import { CheckCircle2, ListChecks, Sparkles } from 'lucide-react';

export default function NotesDetail({ meeting }) {
  return (
    <div className="space-y-6">
      <Section title="Action Items" icon={<ListChecks className="h-4 w-4 text-emerald-300" />}> 
        <ul className="mt-3 space-y-2">
          {meeting.actionItems.map((a) => (
            <li key={a} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-300 mt-0.5" />
              <p className="text-slate-200">{a}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Decisions" icon={<Sparkles className="h-4 w-4 text-cyan-300" />}> 
        <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
          {meeting.decisions.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </Section>

      <Section title="Highlights" icon={<Sparkles className="h-4 w-4 text-blue-300" />}> 
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {meeting.highlights.map((h) => (
            <div key={h} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-slate-200">
              {h}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm uppercase tracking-wider text-slate-300">{title}</h3>
      </div>
      {children}
    </section>
  );
}
