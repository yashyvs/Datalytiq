from fastapi import FastAPI,UploadFile
from tools.graph_tool import generate_graph

from tools.file_loader import (
    save_file,
    load_dataframe
)

from tools.summary_tool import (
    generate_summary
)

app=FastAPI()

@app.get("/")
def home():

    return{
        "message":
        "Welcome to Datalytiq API"
    }


@app.post("/upload")
async def upload_file(
    file:UploadFile
):

    path=save_file(file)

    df=load_dataframe(path)

    summary=generate_summary(df)

    graph=generate_graph(df)

    return{

        "filename":file.filename,

        "summary":summary,

        "graph":graph

    }