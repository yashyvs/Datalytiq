from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tools.chat_tool import ask_data
from pydantic import BaseModel
import state

from tools.graph_tool import generate_graph

from tools.file_loader import (
    save_file,
    load_dataframe
)

from tools.summary_tool import (
    generate_summary
)

app = FastAPI()


# Allow frontend access
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

class ChatRequest(BaseModel):

    question:str


@app.get("/")
def home():

    return {
        "message":
        "Welcome to Datalytiq API"
    }


@app.post("/upload")
async def upload_file(
    file: UploadFile
):

    path = save_file(file)

    df=load_dataframe(path)

    state.current_df=df

    summary = generate_summary(df)

    graph = generate_graph(df)
    print(df.dtypes)

    return {

        "filename": file.filename,

        "summary": summary,

        "graph": graph

    }
@app.post("/chat")
def chat(data:ChatRequest):

    answer=ask_data(
        data.question
    )

    return{

        "answer":answer

    }