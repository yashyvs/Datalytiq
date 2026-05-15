from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

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

    df = load_dataframe(path)

    summary = generate_summary(df)

    graph = generate_graph(df)
    print(df.dtypes)

    return {

        "filename": file.filename,

        "summary": summary,

        "graph": graph

    }