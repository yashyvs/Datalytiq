# Datalytiq

Datalytiq is an AI-powered data analysis application that allows users to upload CSV or Excel datasets, explore the data through an interactive dashboard, and ask questions about the dataset using natural language.

The application combines traditional data analysis using Pandas with Large Language Models (LLMs) to generate dataset descriptions, insights, visualizations, and conversational responses.

---

## Features

- Upload CSV and Excel datasets
- AI-generated dataset overview
- Dataset summary (rows, columns, missing values, duplicates)
- Interactive Plotly visualizations
- AI-assisted graph selection
- AI-generated insights
- Chat with the uploaded dataset
- Session-based dataset management

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Plotly.js

### Backend

- FastAPI
- Pandas
- LangChain
- Hugging Face Inference API
- Plotly
- Python

---

## Project Structure

```
Datalytiq
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   └── public
│
├── backend
│   ├── ai
│   ├── tools
│   ├── uploads
│   ├── app.py
│   └── state.py
│
└── README.md
```

---

## How It Works

1. Upload a CSV or Excel file.
2. The backend loads the dataset using Pandas.
3. A dataset summary is generated.
4. AI generates a brief description and key insights.
5. The application recommends and renders suitable visualizations.
6. Users can ask questions about the uploaded dataset through the chat interface.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yash.yvs/Datalytiq.git
cd Datalytiq
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

### Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate it.

**Windows**

```bash
venv\Scripts\activate
```

**Linux/macOS**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
uvicorn app:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```
HUGGINGFACEHUB_API_TOKEN=your_huggingface_api_key
```