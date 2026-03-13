import { useEffect, useMemo, useState } from 'react';
import DashboardStats from '../components/DashboardStats.jsx';
import XPLevelCard from '../components/XPLevelCard.jsx';
import StudyProgressBar from '../components/StudyProgressBar.jsx';
import MaterialCard from '../components/MaterialCard.jsx';
import { userService } from '../services/userService.js';
import { materialService } from '../services/materialService.js';
import { setAuthToken } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function DashboardPage() {
  const { token, user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const [p, m] = await Promise.all([userService.getProfile(), materialService.list()]);
        if (!alive) return;
        setProfile(p);
        setMaterials(m);
        setUser({ ...(user || {}), name: p.name, email: p.email, streak: p.streak, totalXP: p.totalXP });
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const stats = useMemo(() => {
    const aiOutputs = 0; // computed per-material when loaded by id; keep lightweight here
    return {
      streak: profile?.streak ?? 0,
      totalXP: profile?.totalXP ?? 0,
      materials: materials.length,
      aiOutputs,
    };
  }, [materials.length, profile]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <h2 className="font-heading text-3xl font-bold">Dashboard</h2>
          <p className="mt-2 text-slate-400 text-sm">Your study progress, materials, and momentum.</p>
        </div>
        <div className="w-full md:w-auto">
          <XPLevelCard totalXP={profile?.totalXP ?? 0} level={profile?.level} />
        </div>
      </div>

      <div className="mt-8">
        <DashboardStats stats={stats} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StudyProgressBar label="Weekly goal progress" value={(profile?.streak ?? 0) * 10} max={70} />
        <StudyProgressBar label="XP to next milestone" value={profile?.totalXP ?? 0} max={1000} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h3 className="font-heading text-xl font-semibold">Your materials</h3>
        {loading ? <div className="text-sm text-slate-400">Loading…</div> : null}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((mat) => (
          <MaterialCard
            key={mat._id}
            material={mat}
            onDelete={async (id) => {
              await materialService.remove(id);
              setMaterials((prev) => prev.filter((x) => x._id !== id));
            }}
          />
        ))}
        {!materials.length && !loading ? (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-slate-400">
            No materials yet. Upload your first lecture or notes to generate AI study packs.
          </div>
        ) : null}
      </div>
    </div>
  );
}

