import { useEffect, useMemo, useState } from 'react';
import { studyPlanService } from '../services/studyPlanService.js';
import { setAuthToken } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function StudyPlanPage() {
  const { token } = useAuth();
  const [plans, setPlans] = useState([]);
  const [topic, setTopic] = useState('');
  const [revisionDate, setRevisionDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => setAuthToken(token), [token]);

  const reload = async () => {
    const data = await studyPlanService.list();
    setPlans(data);
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await studyPlanService.list();
        if (!alive) return;
        setPlans(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="font-heading text-3xl font-bold">Study plan</h2>
      <p className="mt-2 text-slate-400 text-sm">Your daily revision schedule (spaced repetition friendly).</p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 rounded-2xl bg-white/5 border border-white/10 p-5">
          <div className="font-heading font-semibold">Add revision</div>
          <form
            className="mt-4 space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              await studyPlanService.create({ topic, revisionDate });
              setTopic('');
              setRevisionDate('');
              await reload();
            }}
          >
            <div>
              <label className="text-sm text-slate-300">Topic</label>
              <input
                className="mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Derivatives practice"
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Revision date</label>
              <input
                type="date"
                min={today}
                className="mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
                value={revisionDate}
                onChange={(e) => setRevisionDate(e.target.value)}
                required
              />
            </div>
            <button className="w-full px-4 py-2 rounded-xl font-semibold bg-primary hover:opacity-90 transition">
              Add
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <div className="flex items-center justify-between">
              <div className="font-heading font-semibold">Upcoming</div>
              {loading ? <div className="text-sm text-slate-400">Loading…</div> : null}
            </div>
            <div className="mt-4 space-y-3">
              {plans.map((p) => (
                <div
                  key={p._id}
                  className="rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-semibold">{p.topic}</div>
                    <div className="text-xs text-slate-400">
                      {new Date(p.revisionDate).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                      p.completed ? 'bg-emerald-500/20' : 'bg-white/10 hover:bg-white/15'
                    }`}
                    onClick={async () => {
                      await studyPlanService.update(p._id, { completed: !p.completed });
                      await reload();
                    }}
                  >
                    {p.completed ? 'Completed' : 'Mark done'}
                  </button>
                </div>
              ))}
              {!plans.length && !loading ? (
                <div className="text-slate-400">No revisions scheduled yet.</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

