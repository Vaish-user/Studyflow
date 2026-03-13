import { getOpenAIClient } from '../config/openai.js';
import Notes from '../models/Notes.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import StudyMaterial from '../models/StudyMaterial.js';

const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

const ensureMaterialOwnership = async (materialId, userId) => {
  const material = await StudyMaterial.findOne({ _id: materialId, userId });
  if (!material) {
    const err = new Error('Material not found');
    err.statusCode = 404;
    throw err;
  }
  return material;
};

export const generateNotes = async (req, res, next) => {
  try {
    const { materialId } = req.body;
    const material = await ensureMaterialOwnership(materialId, req.user._id);
    const client = getOpenAIClient();

    const prompt = `You are an AI study assistant. Convert the following study material into structured, concise notes for a college student.

Return clear sections with headings, bullet points, and key formulas if relevant.

Material type: ${material.type}
Title: ${material.title}
Content:
${material.content}`;

    const completion = await client.responses.create({
      model: MODEL,
      input: prompt,
    });

    const content =
      completion.output[0]?.content?.[0]?.text?.value ||
      completion.output_text ||
      'Generated notes unavailable.';

    const notes = await Notes.findOneAndUpdate(
      { materialId },
      { content, summary: `AI generated notes for ${material.title}` },
      { upsert: true, new: true }
    );

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

export const generateFlashcards = async (req, res, next) => {
  try {
    const { materialId } = req.body;
    const material = await ensureMaterialOwnership(materialId, req.user._id);
    const client = getOpenAIClient();

    const prompt = `Create 10 flashcards from the following study material.
Return JSON array with objects of shape: { "question": string, "answer": string, "difficulty": "easy" | "medium" | "hard" }.
Only return valid JSON.

Title: ${material.title}
Content:
${material.content}`;

    const completion = await client.responses.create({
      model: MODEL,
      input: prompt,
      response_format: { type: 'json_schema', json_schema: { name: 'flashcards', schema: { type: 'array', items: { type: 'object', properties: { question: { type: 'string' }, answer: { type: 'string' }, difficulty: { type: 'string' } }, required: ['question', 'answer'] } } } },
    });

    let data;
    try {
      const raw =
        completion.output[0]?.content?.[0]?.text?.value || completion.output_text || '[]';
      data = JSON.parse(raw);
    } catch {
      data = [];
    }

    await Flashcard.deleteMany({ materialId });
    const flashcards = await Flashcard.insertMany(
      data.map((fc) => ({
        question: fc.question,
        answer: fc.answer,
        difficulty: fc.difficulty || 'medium',
        materialId,
      }))
    );

    res.json(flashcards);
  } catch (error) {
    next(error);
  }
};

export const generateQuiz = async (req, res, next) => {
  try {
    const { materialId, numQuestions = 8 } = req.body;
    const material = await ensureMaterialOwnership(materialId, req.user._id);
    const client = getOpenAIClient();

    const prompt = `Create a multiple-choice quiz with ${numQuestions} questions from the following study material.
Return JSON with: { "questions": [ { "question": string, "options": string[], "correctAnswer": string, "explanation": string } ] }.
Only return valid JSON.

Title: ${material.title}
Content:
${material.content}`;

    const completion = await client.responses.create({
      model: MODEL,
      input: prompt,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'quiz',
          schema: {
            type: 'object',
            properties: {
              questions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    question: { type: 'string' },
                    options: { type: 'array', items: { type: 'string' } },
                    correctAnswer: { type: 'string' },
                    explanation: { type: 'string' },
                  },
                  required: ['question', 'options', 'correctAnswer'],
                },
              },
            },
            required: ['questions'],
          },
        },
      },
    });

    let payload;
    try {
      const raw =
        completion.output[0]?.content?.[0]?.text?.value || completion.output_text || '{}';
      payload = JSON.parse(raw);
    } catch {
      payload = { questions: [] };
    }

    await Quiz.deleteMany({ materialId });
    const quiz = await Quiz.create({
      materialId,
      questions: payload.questions || [],
      score: 0,
    });

    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

