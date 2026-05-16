import uuid
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import state
from tools.file_loader import save_file, load_dataframe
from tools.summary_tool import generate_summary
from tools.graph_tool import generate_graph
from tools.insight_tool import generate_insights
from tools.chat_tool import ask_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_EXTENSIONS = {".csv", ".xlsx"}
MAX_FILE_SIZE_MB = 50


class ChatRequest(BaseModel):
    session_id: str
    question: str


@app.get("/")
def home():
    return {"message": "Welcome to Datalytiq API"}


@app.post("/upload")
async def upload_file(file: UploadFile):

    # --- Validate file extension ---
    import os
    ext = os.path.splitext(file.filename)[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{ext}'. Upload a CSV or XLSX file.",
        )

    # --- Validate file size ---
    contents = await file.read()
    size_mb = len(contents) / (1024 * 1024)
    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(
            status_code=400,
            detail=f"File too large ({size_mb:.1f} MB). Max allowed is {MAX_FILE_SIZE_MB} MB.",
        )
    await file.seek(0)  # reset after reading

    path = save_file(file)
    df = load_dataframe(path)

    # --- Create session ---
    session_id = str(uuid.uuid4())
    state.sessions[session_id] = {
        "df": df,
        "history": [],
    }

    summary = generate_summary(df)
    graph = generate_graph(df)
    insights = generate_insights(df)

    return {
        "session_id": session_id,
        "filename": file.filename,
        "summary": summary,
        "graph": graph,
        "insights": insights,
    }


@app.post("/chat")
def chat(data: ChatRequest):

    if data.session_id not in state.sessions:
        raise HTTPException(
            status_code=404,
            detail="Session not found. Please upload a file first.",
        )

    answer = ask_data(data.session_id, data.question)
    return {"answer": answer}