export default function DashboardStats({ stats }) {
  const items = [
    { label: 'Study streak', value: `${stats?.streak ?? 0} days` },
    { label: 'Total XP', value: stats?.totalXP ?? 0 },
    { label: 'Materials', value: stats?.materials ?? 0 },
    { label: 'AI outputs', value: stats?.aiOutputs ?? 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <div className="text-xs text-slate-400">{it.label}</div>
          <div className="mt-1 text-2xl font-heading font-semibold">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

