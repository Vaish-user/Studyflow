import { useEffect, useState } from 'react';
import { userService } from '../services/userService.js';
import { setAuthToken } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { token, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState('');
  const [studyGoal, setStudyGoal] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => setAuthToken(token), [token]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const p = await userService.getProfile();
      if (!alive) return;
      setProfile(p);
      setName(p.name || '');
      setSubjects((p.subjects || []).join(', '));
      setStudyGoal(p.studyGoal || '');
      setUser({ name: p.name, email: p.email, streak: p.streak, totalXP: p.totalXP });
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="font-heading text-3xl font-bold">Profile</h2>
      <p className="mt-2 text-slate-400 text-sm">Update your learning preferences and goals.</p>

      <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-300">Email</div>
            <div className="mt-2 rounded-xl bg-slate-900/40 border border-white/10 px-3 py-2 text-slate-200">
              {profile?.email}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-300">Streak</div>
            <div className="mt-2 rounded-xl bg-slate-900/40 border border-white/10 px-3 py-2 text-slate-200">
              {profile?.streak ?? 0} days
            </div>
          </div>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setSaving(true);
            try {
              const updated = await userService.updateProfile({
                name,
                subjects: subjects
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
                studyGoal,
              });
              const p = await userService.getProfile();
              setProfile(p);
              setUser({ name: p.name, email: p.email, streak: p.streak, totalXP: p.totalXP });
              return updated;
            } finally {
              setSaving(false);
            }
          }}
        >
          <div>
            <label className="text-sm text-slate-300">Name</label>
            <input
              className="mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Subjects (comma separated)</label>
            <input
              className="mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="Math, Physics, CS"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Study goal</label>
            <textarea
              className="mt-2 w-full min-h-28 rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
              value={studyGoal}
              onChange={(e) => setStudyGoal(e.target.value)}
              placeholder="e.g., 2 hours/day, finish syllabus by May"
            />
          </div>
          <button
            disabled={saving}
            className="px-4 py-2 rounded-xl font-semibold bg-primary disabled:opacity-60 hover:opacity-90 transition"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

