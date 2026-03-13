import { Link } from 'react-router-dom';

function Feature({ title, desc }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
      <div className="font-heading font-semibold">{title}</div>
      <div className="mt-2 text-sm text-slate-400">{desc}</div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            AI notes • flashcards • quizzes • revision plan
          </div>
          <h1 className="mt-5 font-heading text-4xl sm:text-5xl font-bold leading-tight">
            Turn messy study material into a <span className="text-primary">clear study system</span>.
          </h1>
          <p className="mt-5 text-slate-300 leading-relaxed">
            StudyFlow AI converts YouTube lectures, PDFs, and notes into structured notes, flashcards,
            quizzes, and a daily revision plan—so you retain more in less time.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              to="/register"
              className="px-5 py-3 rounded-xl bg-primary font-semibold hover:opacity-90 transition text-center"
            >
              Create free account
            </Link>
            <Link
              to="/login"
              className="px-5 py-3 rounded-xl bg-white/10 font-semibold hover:bg-white/15 transition text-center"
            >
              Login
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="font-heading font-semibold">Structured</div>
              <div className="text-xs text-slate-400 mt-1">Notes & summaries</div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="font-heading font-semibold">Active recall</div>
              <div className="text-xs text-slate-400 mt-1">Flashcards & quiz</div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="font-heading font-semibold">Spaced review</div>
              <div className="text-xs text-slate-400 mt-1">Smart schedule</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-soft">
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
            <div className="text-xs text-slate-500">Example output</div>
            <div className="mt-2 font-heading font-semibold text-lg">Lecture: Neural Networks</div>
            <div className="mt-3 text-sm text-slate-300">
              - Key ideas: perceptrons, activation functions, backpropagation
              <br />- Flashcards: “What is gradient descent?”
              <br />- Quiz: 8 MCQs with explanations
              <br />- Plan: review Day 1, 3, 7, 14
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Feature
          title="Upload anything"
          desc="YouTube links, PDF text, or quick notes—StudyFlow turns it into a study pack."
        />
        <Feature
          title="Gamified progress"
          desc="Streaks, XP, and levels keep momentum high when the semester gets tough."
        />
        <Feature
          title="Daily planner"
          desc="A focused schedule that nudges you at the right time for retention."
        />
      </div>
    </div>
  );
}

