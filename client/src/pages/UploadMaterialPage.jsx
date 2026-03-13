import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../components/UploadForm.jsx';
import { materialService } from '../services/materialService.js';
import { aiService } from '../services/aiService.js';
import { setAuthToken } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function UploadMaterialPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="font-heading text-3xl font-bold">Upload study material</h2>
      <p className="mt-2 text-slate-400 text-sm">
        Upload a YouTube link, PDF text, or notes. StudyFlow will generate notes, flashcards, and a quiz.
      </p>

      <div className="mt-8">
        <UploadForm
          loading={loading}
          onSubmit={async ({ title, type, content }) => {
            setError('');
            setLoading(true);
            try {
              const material = await materialService.create({ title, type, content });
              // Kick off AI generation sequentially to keep it simple
              await aiService.generateNotes({ materialId: material._id });
              await aiService.generateFlashcards({ materialId: material._id });
              await aiService.generateQuiz({ materialId: material._id, numQuestions: 8 });
              navigate(`/notes/${material._id}`);
            } catch (err) {
              setError(err?.response?.data?.message || 'Upload failed');
            } finally {
              setLoading(false);
            }
          }}
        />
        {error ? <div className="mt-4 text-sm text-rose-300">{error}</div> : null}
      </div>
    </div>
  );
}

