from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import cv2
import time

UPLOAD_DIR_SEARCH = Path() / "uploads/search"
UPLOAD_DIR_DATA= Path() / "uploads/data-set"

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
    save_path = UPLOAD_DIR_SEARCH / "received_image.jpg"
    with open(save_path, "wb") as f:
        f.write(contents)
        
    return {"filename": file_upload.filename}

@app.post("/uploaddata/")
async def create_upload_file(file_uploads: list[UploadFile]):

    for file_upload in file_uploads:
        contents = await file_upload.read()
        save_path = UPLOAD_DIR_DATA / file_upload.filename
        with open(save_path, "wb") as f:
            f.write(contents)
        
    return {"filenames": [f.filename for f in file_uploads]}

@app.post("/capture_frame")
async def receive_image(file: UploadFile = File(...)):
    content = await file.read()
    save_path = UPLOAD_DIR_SEARCH / "received_image.jpg"
    # Write the received image content to a file
    with open(save_path, "wb") as f:
        f.write(content)

    return {"message": "Image received and processed"}