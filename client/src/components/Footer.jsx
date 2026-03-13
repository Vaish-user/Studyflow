export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-heading font-semibold">StudyFlow AI</div>
          <div className="text-sm text-slate-400">Turn messy materials into mastery.</div>
        </div>
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} StudyFlow AI. Built with MERN + OpenAI.
        </div>
      </div>
    </footer>
  );
}

