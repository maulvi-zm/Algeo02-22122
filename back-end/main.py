from fastapi import FastAPI, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi.staticfiles import StaticFiles
import requests
from bs4 import BeautifulSoup
import caches
import os
from ExportPDF import export_pdf
from urllib.parse import urljoin
from CBIR_Multiprocess import Cbir_Color2
from CBIR_NonMultiprocess import Cbir_Color1
import caches2
from multiprocessing import Lock
from texture import Texture

UPLOAD_DIR_SEARCH = Path() / "uploads/search"
UPLOAD_DIR_DATA= Path() / "uploads/data-set"

app = FastAPI()

data_set_directory = Path(__file__).parent / "uploads/data-set"
app.mount("/uploads/data-set", StaticFiles(directory=data_set_directory), name="data-set")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cache2 = caches2.json_to_dict()
cache_lock = Lock()
cache1 = caches.csv_to_array()


@app.post("/uploadfile/")
async def create_upload_file(file_upload: UploadFile):
    delete_search()
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
    delete_search()
    content = await file.read()
    save_path = UPLOAD_DIR_SEARCH / "received_image.jpg"
    with open(save_path, "wb") as f:
        f.write(content)
        
    return {"message": "Image received and processed"}


@app.get("/scrape")
async def scrape_images(link: str):
    delete_dataset()
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36","Accept-Language": "en-US,en;q=0.5",}
    response = requests.get(url=link, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        image_tags = soup.find_all('img')
        os.makedirs(UPLOAD_DIR_DATA, exist_ok=True)
        
        for index, img in enumerate(soup.find_all('img')):
            img_link = img.get('src')
            if img_link:
                if not img_link.startswith(('http://', 'https://')):
                    complete_url = urljoin(link, img_link)
                else:
                    complete_url = img_link
                
                img_response = requests.get(complete_url)
                
                if img_response.status_code == 200:
                    with open(os.path.join(UPLOAD_DIR_DATA, f"{index}.jpg"), 'wb') as f:
                        f.write(img_response.content)
    else:
        return {"message": "failed to scrape images"}

    return {"message": "Images scraped and saved to uploads/data-set"}


@app.get("/get-result-color")
async def send_result():
    
    if len(os.listdir(UPLOAD_DIR_DATA)) > 500:
        similarity_arr, time = Cbir_Color2(cache=cache2,cache_lock=cache_lock)
    else :
        similarity_arr, time = Cbir_Color1(cache=cache1)
    
    
    image_objects = []
    for item in similarity_arr:
        image_objects.append({
            "url": f"http://localhost:8000/uploads/data-set/{item['url']}",
            "percentage": item["percentage"]
        })
    
    return {
        "data": image_objects,
        "time": time,
    }
@app.get("/get-result-texture")
async def send_result():
    
    similarity_arr, time = Texture()

    image_objects = []
    for item in similarity_arr:
        image_objects.append({
            "url": f"http://localhost:8000/uploads/data-set/{item['url']}",
            "percentage": item["percentage"]
        })
    
    return {
        "data": image_objects,
        "time": time,
    }

@app.get("/download_pdf")
async def download_pdf(response: Response):
    
    if len(os.listdir(UPLOAD_DIR_SEARCH)) > 500:
        similarity_arr, time = Cbir_Color2(cache=cache2,cache_lock=cache_lock)
    else :
        similarity_arr, time = Cbir_Color1(cache=cache1)
        
    export_pdf(similarity_arr=similarity_arr, time=time)
    
    response.headers["Content-Disposition"] = "attachment; filename=template-output.pdf"
    response.headers["Content-Type"] = "application/pdf"

    with open("template-output.pdf", "rb") as file:
        pdf = file.read()
        return Response(content=pdf, media_type="application/pdf")
    

def delete_dataset():
    for file in os.listdir(UPLOAD_DIR_DATA):
        os.remove(UPLOAD_DIR_DATA / file)
        
    return {"message": "Data-set deleted"}

def delete_search():
    for file in os.listdir(UPLOAD_DIR_SEARCH):
        os.remove(UPLOAD_DIR_SEARCH / file)
        
    return {"message": "Search deleted"}