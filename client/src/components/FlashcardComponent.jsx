import { useState } from 'react';

export default function FlashcardComponent({ cards }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards?.[idx];

  if (!cards?.length) {
    return <div className="text-slate-400">No flashcards yet.</div>;
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <div>
          Card {idx + 1}/{cards.length}
        </div>
        <div className="uppercase tracking-wider">{card.difficulty || 'medium'}</div>
      </div>

      <button
        className="mt-4 w-full rounded-2xl bg-slate-900/60 border border-white/10 p-8 text-left hover:bg-slate-900/80 transition"
        onClick={() => setFlipped((v) => !v)}
      >
        <div className="text-xs text-slate-500">{flipped ? 'Answer' : 'Question'}</div>
        <div className="mt-2 text-xl font-heading font-semibold">
          {flipped ? card.answer : card.question}
        </div>
      </button>

      <div className="mt-5 flex items-center justify-between">
        <button
          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
          onClick={() => {
            setIdx((v) => (v === 0 ? cards.length - 1 : v - 1));
            setFlipped(false);
          }}
        >
          Prev
        </button>
        <button
          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
          onClick={() => setFlipped((v) => !v)}
        >
          Flip
        </button>
        <button
          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
          onClick={() => {
            setIdx((v) => (v === cards.length - 1 ? 0 : v + 1));
            setFlipped(false);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

