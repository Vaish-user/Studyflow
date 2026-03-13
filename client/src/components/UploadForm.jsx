import { useState } from 'react';

const TYPE_OPTIONS = [
  { value: 'youtube', label: 'YouTube link' },
  { value: 'pdf', label: 'PDF text (paste extracted)' },
  { value: 'notes', label: 'Text notes' },
];

export default function UploadForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('youtube');
  const [content, setContent] = useState('');

  return (
    <form
      className="rounded-2xl bg-white/5 border border-white/10 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ title, type, content });
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-300">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
            placeholder="e.g., Calculus — Derivatives Lecture 1"
            required
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Material type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-slate-300">
          {type === 'youtube' ? 'YouTube URL' : 'Content'}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2 w-full min-h-40 rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
          placeholder={
            type === 'youtube'
              ? 'https://www.youtube.com/watch?v=...'
              : 'Paste your notes or extracted PDF text here...'
          }
          required
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Tip: For PDFs, extract text first (copy/paste) for now.
        </div>
        <button
          disabled={loading}
          className="px-4 py-2 rounded-xl font-semibold bg-primary disabled:opacity-60 hover:opacity-90 transition"
          type="submit"
        >
          {loading ? 'Uploading...' : 'Upload material'}
        </button>
      </div>
    </form>
  );
}

