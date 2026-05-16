import os
import shutil
import pandas as pd
from fastapi import UploadFile

UPLOAD_DIR = "uploads"
ALLOWED_EXTENSIONS = {".csv", ".xlsx"}


def save_file(file: UploadFile) -> str:

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # Sanitize filename — strip any path components
    safe_name = os.path.basename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, safe_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path


def load_dataframe(path: str) -> pd.DataFrame:

    ext = os.path.splitext(path)[-1].lower()

    if ext == ".csv":
        df = pd.read_csv(path)

    elif ext == ".xlsx":
        df = pd.read_excel(path, engine="openpyxl")

    else:
        raise ValueError(
            f"Unsupported file type '{ext}'. Only CSV and XLSX are supported."
        )

    return df