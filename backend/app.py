from fastapi import FastAPI,UploadFile
from tools.file_loader import save_file

app=FastAPI()

@app.get("/")
def home():

    return{
        "message":"Welcome to Datalytiq API"
    }


@app.post("/upload")
async def upload_file(
    file:UploadFile
):

    path=save_file(file)

    return{

        "filename":file.filename,
        "path":path,
        "status":"uploaded"

    }