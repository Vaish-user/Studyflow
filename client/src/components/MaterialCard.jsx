import { Link } from 'react-router-dom';

export default function MaterialCard({ material, onDelete }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/[0.07] transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">{material.type}</div>
          <div className="mt-1 font-heading font-semibold text-lg">{material.title}</div>
          <div className="mt-2 text-sm text-slate-400 line-clamp-2">
            {material.content?.slice(0, 160)}
          </div>
        </div>
        <button
          onClick={() => onDelete?.(material._id)}
          className="px-3 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/15 transition"
        >
          Delete
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to={`/notes/${material._id}`}
          className="px-3 py-2 rounded-lg text-sm bg-primary hover:opacity-90 transition"
        >
          Notes
        </Link>
        <Link
          to={`/flashcards/${material._id}`}
          className="px-3 py-2 rounded-lg text-sm bg-secondary hover:opacity-90 transition"
        >
          Flashcards
        </Link>
        <Link
          to={`/quiz/${material._id}`}
          className="px-3 py-2 rounded-lg text-sm bg-accent hover:opacity-90 transition"
        >
          Quiz
        </Link>
      </div>
    </div>
  );
}

