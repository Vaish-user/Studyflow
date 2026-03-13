import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService.js';
import { setAuthToken } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h2 className="font-heading text-3xl font-bold">Create your account</h2>
      <p className="mt-2 text-slate-400 text-sm">Start building your study system in minutes.</p>

      <form
        className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError('');
          setLoading(true);
          try {
            const data = await authService.register({ name, email, password });
            login(data);
            setAuthToken(data.token);
            navigate('/dashboard');
          } catch (err) {
            setError(err?.response?.data?.message || 'Registration failed');
          } finally {
            setLoading(false);
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
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            className="mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            className="mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? <div className="text-sm text-rose-300">{error}</div> : null}
        <button
          disabled={loading}
          className="w-full px-4 py-2 rounded-xl font-semibold bg-primary disabled:opacity-60 hover:opacity-90 transition"
          type="submit"
        >
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>

      <div className="mt-4 text-sm text-slate-400">
        Already have an account?{' '}
        <Link className="text-slate-200 hover:underline" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

