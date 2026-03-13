export default function XPLevelCard({ totalXP = 0, level }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 border border-white/10 p-5 shadow-soft">
      <div className="text-sm text-slate-200">Level</div>
      <div className="mt-1 text-3xl font-heading font-semibold">
        {level?.level ?? 1} <span className="text-slate-300 text-base">— {level?.label ?? 'Beginner'}</span>
      </div>
      <div className="mt-3 text-sm text-slate-300">Total XP: <span className="font-semibold text-white">{totalXP}</span></div>
    </div>
  );
}

