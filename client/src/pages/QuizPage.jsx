import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizCard from '../components/QuizCard.jsx';
import { materialService } from '../services/materialService.js';
import { aiService } from '../services/aiService.js';
import { setAuthToken } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function QuizPage() {
  const { token } = useAuth();
  const { materialId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => setAuthToken(token), [token]);

  const reload = async () => {
    const d = await materialService.getById(materialId);
    setData(d);
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const d = await materialService.getById(materialId);
        if (!alive) return;
        setData(d);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [materialId]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold">Quiz</h2>
          <p className="mt-2 text-slate-400 text-sm">{data?.material?.title}</p>
        </div>
        <button
          className="px-4 py-2 rounded-xl font-semibold bg-accent hover:opacity-90 transition"
          onClick={async () => {
            await aiService.generateQuiz({ materialId, numQuestions: 8 });
            await reload();
          }}
        >
          Regenerate
        </button>
      </div>

      <div className="mt-8">
        {loading ? <div className="text-slate-400">Loading…</div> : <QuizCard quiz={data?.quiz} />}
      </div>
    </div>
  );
}

