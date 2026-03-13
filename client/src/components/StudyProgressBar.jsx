export default function StudyProgressBar({ label, value, max = 100 }) {
  const pct = Math.min(100, Math.round((Number(value || 0) / Number(max || 1)) * 100));
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-center justify-between text-sm">
        <div className="text-slate-200">{label}</div>
        <div className="text-slate-400">{pct}%</div>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-secondary to-accent"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

