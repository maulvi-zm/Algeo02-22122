from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

UPLOAD_DIR = Path() / "uploads"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/uploadfile/")
async def create_upload_file(file_upload: UploadFile):
    
    contents = await file_upload.read()
    save_path = UPLOAD_DIR / file_upload.filename
    with open(save_path, "wb") as f:
        f.write(contents)
        
    return {"filename": file_upload.filename}