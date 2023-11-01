import cv2
from pathlib import Path
import time
program_time = time.time()

# Fungs untuk menghitung euclidean norm
def euclidean_norm(vector):
    squared_sum = sum(x**2 for x in vector)
    magnitude = squared_sum ** 0.5
    return magnitude

#  dotProduct
def dot_product(vector1, vector2):
    if len(vector1) != len(vector2):
        raise ValueError("Panjang vektor tidak sama.")
    
    # Kalkulasi dot product
    dot = sum(x * y for x, y in zip(vector1, vector2))
    
    return dot

# RGB to HSV
def RGB2HSV(image):
    local_image = image
    feature = []
    height, width = local_image.shape[:2]
    print(f"Image dimensions - Height: {height}, Width: {width}")
    
    for x in range(width):
        for y in range(height):
            # Normalisasi nilai RGB
            changed_r = local_image[y, x][0]/ 255
            changed_g = local_image[y, x][1]/ 255
            changed_b = local_image[y, x][2]/ 255
            
            # Cari variabel cmax,cmin,delta
            cmax = max(changed_r, changed_g, changed_b)
            cmin = min(changed_r, changed_g, changed_b)
            delta = cmax - cmin
            
            # Handler untuk nilai cmin = cmax
            if cmin == cmax:
                feature.append(0)
                feature.append(0)
                feature.append(cmax)
                continue
            
            # Perhitungan H
            if cmax == changed_r:
                h = 60 * (((changed_g - changed_b) / delta) % 6)
            elif cmax == changed_g:
                h = 60 * (((changed_b - changed_r) / delta) + 2)
            elif cmax == changed_b:
                h = 60 * (((changed_r - changed_g) / delta) + 4)
            feature.append(h)
            
            # Perhitungan S
            if cmax == 0:
                s = 0
            else:
                s = delta / cmax
            feature.append(s)
            
            # Perhitungan V
            v = cmax
            feature.append(v)
            
            # Append nilai HSV ke array vektor
    
    # Return array vektor
    return feature


# Changeable constants
OUTPUT_FOLDER = Path("./output")
INPUT_FOLDER = Path("./uploads/search")
DATASET_FOLDER = Path("./uploads/data-set")

# gambar yg dicari
for image_input_path in sorted(INPUT_FOLDER.glob("*.jpg")):
    start_time = time.time()
    
    imginput = cv2.imread(str(image_input_path))
    vector1 = RGB2HSV(imginput)
    
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"compared executed in {execution_time} seconds.")

vectorinput = vector1

# Data set
for image_path in sorted(DATASET_FOLDER.glob("*.jpg")):
    start_time = time.time()
    
    img = cv2.imread(str(image_path))
    vector2 = RGB2HSV(img)

    product = dot_product(vectorinput, vector2)
    magnitude1 = euclidean_norm(vector1)
    magnitude2 = euclidean_norm(vector2)
    
    similarity = (product / (magnitude1 * magnitude2)) * 100

    print(f"Similarity: {similarity}")
    
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"compared executed in {execution_time} seconds.")
    
end_time = time.time()
execution_time = end_time - program_time
print(f"program executed in {execution_time} seconds.")
