import { useEffect, useState } from 'react';
import { userService } from '../services/userService.js';
import { setAuthToken } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function LeaderboardPage() {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => setAuthToken(token), [token]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await userService.getLeaderboard();
        if (!alive) return;
        setRows(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h2 className="font-heading text-3xl font-bold">Leaderboard</h2>
      <p className="mt-2 text-slate-400 text-sm">Top learners by XP.</p>

      <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-3 text-xs text-slate-400 border-b border-white/10">
          <div className="col-span-2">Rank</div>
          <div className="col-span-6">Name</div>
          <div className="col-span-2 text-right">XP</div>
          <div className="col-span-2 text-right">Streak</div>
        </div>
        {loading ? (
          <div className="px-4 py-6 text-slate-400">Loading…</div>
        ) : (
          rows.map((r, idx) => (
            <div
              key={r._id || idx}
              className="grid grid-cols-12 px-4 py-3 border-b border-white/5"
            >
              <div className="col-span-2 text-slate-300">#{idx + 1}</div>
              <div className="col-span-6 font-semibold">{r.name}</div>
              <div className="col-span-2 text-right text-slate-200">{r.totalXP}</div>
              <div className="col-span-2 text-right text-slate-300">{r.streak}d</div>
            </div>
          ))
        )}
        {!loading && !rows.length ? (
          <div className="px-4 py-6 text-slate-400">No leaderboard data yet.</div>
        ) : null}
      </div>
    </div>
  );
}

