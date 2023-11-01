import cv2
from pathlib import Path
import time

program_time = time.time()

def euclidean_norm(vector):
    squared_sum = sum(x**2 for x in vector)
    magnitude = squared_sum ** 0.5
    return magnitude

def dot_product(vector1, vector2):
    if len(vector1) != len(vector2):
        raise ValueError("Vector lengths are not equal.")
    dot = sum(x * y for x, y in zip(vector1, vector2))
    return dot

def RGB2HSV(image):
    feature = []
    height, width = len(image), len(image[0])
    for x in range(width):
        for y in range(height):
            r, g, b = image[y][x][0] / 255, image[y][x][1] / 255, image[y][x][2] / 255
            cmax = max(r, g, b)
            cmin = min(r, g, b)
            delta = cmax - cmin
            
            if cmin == cmax:
                feature.extend([0, 0, cmax])
                continue
            
            if cmax == r:
                h = 60 * (((g - b) / delta) % 6)
            elif cmax == g:
                h = 60 * (((b - r) / delta) + 2)
            else:
                h = 60 * (((r - g) / delta) + 4)
            feature.append(h)
            
            s = 0 if cmax == 0 else delta / cmax
            feature.extend([s, cmax])
            
    return feature

OUTPUT_FOLDER = Path("./output")
INPUT_FOLDER = Path("./uploads/search")
DATASET_FOLDER = Path("./uploads/data-set")

for image_input_path in sorted(INPUT_FOLDER.glob("*.jpg")):
    start_time = time.time()
    
    imginput = cv2.imread(str(image_input_path))
    vectorinput = RGB2HSV(imginput)
    
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"compared executed in {execution_time} seconds.")
    

for image_path in sorted(DATASET_FOLDER.glob("*.jpg")):
    start_time = time.time()
    img = cv2.imread(str(image_path))
    vector2 = RGB2HSV(img)

    product = dot_product(vectorinput, vector2)
    magnitude1 = euclidean_norm(vectorinput)
    magnitude2 = euclidean_norm(vector2)
    
    similarity = (product / (magnitude1 * magnitude2)) * 100
    print(f"Similarity: {similarity}")

    end_time = time.time()
    execution_time = end_time - start_time
    print(f"compared executed in {execution_time} seconds.")
    
end_time = time.time()
execution_time = end_time - program_time
print(f"program executed in {execution_time} seconds.")
