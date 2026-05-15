import os
import shutil
import pandas as pd
from fastapi import UploadFile

UPLOAD_DIR="uploads"

def save_file(file:UploadFile):

    os.makedirs(
        UPLOAD_DIR,
        exist_ok=True
    )

    file_path=os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    return file_path


def load_dataframe(path):

    if path.endswith(".csv"):

        df=pd.read_csv(path)

    elif path.endswith(".xlsx"):

        df=pd.read_excel(path)

    else:

        raise Exception(
            "unsupported file"
        )

    return df