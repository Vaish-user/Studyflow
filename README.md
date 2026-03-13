# StudyFlow AI (MERN + OpenAI)

StudyFlow AI helps students convert messy materials (YouTube links, PDFs, notes) into **structured notes**, **flashcards**, **quizzes**, and a **revision schedule**.

## Tech
- **Client**: React + Vite + Tailwind + React Router + Axios + Context API
- **Server**: Node + Express + MongoDB + Mongoose + JWT
- **AI**: OpenAI API

## Folder structure
```
studyflow-ai/
  client/
  server/
```

## Setup (Windows / PowerShell)

### 1) Server env
Copy `server/.env.example` to `server/.env` and set:
- `MONGO_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`

### 2) Client env
Copy `client/.env.example` to `client/.env` (default is fine if server runs on `5000`).

### 3) Install dependencies
From `studyflow-ai/`:

```powershell
cd .\server
npm install

cd ..\client
npm install
```

### 4) Run dev servers
In two terminals:

```powershell
cd .\server
npm run dev
```

```powershell
cd .\client
npm run dev
```

Client: `http://localhost:5173`  
API: `http://localhost:5000/api/health`

## Example API calls

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"pass1234\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"pass1234\"}"
```

### Create material (replace TOKEN)
```bash
curl -X POST http://localhost:5000/api/materials ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer TOKEN" ^
  -d "{\"title\":\"Demo Notes\",\"type\":\"notes\",\"content\":\"Photosynthesis is...\"}"
```

### Generate notes (replace TOKEN + MATERIAL_ID)
```bash
curl -X POST http://localhost:5000/api/ai/generate-notes ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer TOKEN" ^
  -d "{\"materialId\":\"MATERIAL_ID\"}"
```

## Notes
- For PDFs: this starter expects **extracted text** pasted into the upload form (you can add file upload later).
- For YouTube: this starter stores the link; you can add transcript fetching later.

