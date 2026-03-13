import { useMemo, useState } from 'react';

export default function QuizCard({ quiz }) {
  const questions = quiz?.questions || [];
  const [answers, setAnswers] = useState({});
  const score = useMemo(() => {
    let s = 0;
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (answers[i] && answers[i] === q.correctAnswer) s += 1;
    }
    return s;
  }, [answers, questions]);

  if (!questions.length) {
    return <div className="text-slate-400">No quiz yet.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-sm text-slate-300">Score</div>
        <div className="mt-1 text-2xl font-heading font-semibold">
          {score}/{questions.length}
        </div>
      </div>

      {questions.map((q, idx) => (
        <div key={idx} className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <div className="text-xs text-slate-500">Question {idx + 1}</div>
          <div className="mt-1 font-heading font-semibold text-lg">{q.question}</div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {(q.options || []).map((opt) => {
              const selected = answers[idx] === opt;
              const correct = q.correctAnswer === opt;
              const show = answers[idx] != null;
              const cls = show
                ? correct
                  ? 'bg-emerald-500/15 border-emerald-500/40'
                  : selected
                    ? 'bg-rose-500/15 border-rose-500/40'
                    : 'bg-slate-900/40 border-white/10'
                : selected
                  ? 'bg-primary/15 border-primary/40'
                  : 'bg-slate-900/40 border-white/10 hover:bg-slate-900/70';

              return (
                <button
                  key={opt}
                  disabled={show}
                  onClick={() => setAnswers((a) => ({ ...a, [idx]: opt }))}
                  className={`text-left rounded-xl border px-3 py-2 transition ${cls}`}
                >
                  <div className="text-sm">{opt}</div>
                </button>
              );
            })}
          </div>
          {answers[idx] != null && q.explanation ? (
            <div className="mt-4 text-sm text-slate-300">
              <span className="text-slate-400">Explanation:</span> {q.explanation}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

