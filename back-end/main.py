from fastapi import FastAPI, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi.responses import StreamingResponse
from io import BytesIO
from fastapi.staticfiles import StaticFiles
import requests
from bs4 import BeautifulSoup
import os
from ExportPDF import export_pdf

UPLOAD_DIR_SEARCH = Path() / "uploads/search"
UPLOAD_DIR_DATA= Path() / "uploads/data-set"

app = FastAPI()

data_set_directory = Path(__file__).parent / "uploads/data-set"

# Mount the 'uploads/data-set' directory at '/uploads/data-set' for serving static files
app.mount("/uploads/data-set", StaticFiles(directory=data_set_directory), name="data-set")

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
    delete_dataset()
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
    with open(save_path, "wb") as f:
        f.write(content)
        
    return {"message": "Image received and processed"}


@app.get("/scrape")
async def scrape_images(link: str):
    delete_dataset()
    response = requests.get(link)
    if response.status_code == 200:
        
        soup = BeautifulSoup(response.content, 'html.parser')
        image_tags = soup.find_all('img')
        os.makedirs(UPLOAD_DIR_DATA, exist_ok=True)
        
        for index, img in enumerate(image_tags):
            img_link = img.get('src')
            
            if img_link:
                img_response = requests.get(img_link)
                
                if img_response.status_code == 200:
                    with open(os.path.join(UPLOAD_DIR_DATA, f"{index}.jpg"), 'wb') as f:
                        f.write(img_response.content)
    else:
        print("Failed to fetch the webpage")

    return {"message": "Images scraped and saved to uploads/data-set"}

@app.get("/download_pdf")
async def download_pdf(response: Response):
    export_pdf()
    
    response.headers["Content-Disposition"] = "attachment; filename=template-output.pdf"
    response.headers["Content-Type"] = "application/pdf"

    with open("template-output.pdf", "rb") as file:
        pdf = file.read()
        return Response(content=pdf, media_type="application/pdf")
    

def delete_dataset():
    for file in os.listdir(UPLOAD_DIR_DATA):
        os.remove(UPLOAD_DIR_DATA / file)
        
    return {"message": "Data-set deleted"}