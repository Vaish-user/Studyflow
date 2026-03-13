import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition ${
    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
  }`;

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent shadow-soft" />
          <div className="leading-tight">
            <div className="font-heading font-semibold">StudyFlow AI</div>
            <div className="text-xs text-slate-400">Learn smarter, retain longer</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          {token ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/upload" className={navLinkClass}>
                Upload
              </NavLink>
              <NavLink to="/study-plan" className={navLinkClass}>
                Study Plan
              </NavLink>
              <NavLink to="/leaderboard" className={navLinkClass}>
                Leaderboard
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <div className="hidden sm:block text-right">
                <div className="text-sm text-slate-200">{user?.name || 'Student'}</div>
                <div className="text-xs text-slate-400">{user?.email}</div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-3 py-2 rounded-lg text-sm font-semibold bg-white/10 hover:bg-white/15 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="px-3 py-2 rounded-lg text-sm font-semibold bg-primary hover:opacity-90 transition"
            >
              Get started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

