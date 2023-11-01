import cv2
import time
from pathlib import Path

def RGB2HSV(image):
    local_image = image
    feature = []
    height, width = local_image.shape[:2]
    print(f"Image dimensions - Height: {height}, Width: {width}")
    
    for y in range(height):
        for x in range(width):
            # Normalisasi nilai RGB
            changed_r = local_image[x, y][0]/ 255
            changed_g = local_image[x, y][1]/ 255
            changed_b = local_image[x, y][2]/ 255
            
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

def euclidean_norm(vector):
    return sum(x**2 for x in vector) ** 0.5

def calculate_color_code(img):
    histogram = [0] * 65
    height, width = img.shape[:2]
    histogram[0] = width * height

    for x in range(width):
        for y in range(height):
            red = img[y, x, 0] // 64
            green = img[y, x, 1] // 64
            blue = img[y, x, 2] // 64
            color_code = (red * 16) + (green * 4) + blue
            histogram[color_code + 1] += 1

    return histogram

def dot_product(vector1, vector2):
    if len(vector1) != len(vector2):
        raise ValueError("Panjang vektor tidak sama.")
    
    # Kalkulasi dot product
    dot = sum(x * y for x, y in zip(vector1, vector2))
    
    return dot

def compare_images(method, input_folder, dataset_folder):
    start_time = time.time()

    for image_input_path in sorted(input_folder.glob("*.jpg")):
        imginput = cv2.imread(str(image_input_path))
        
        if method == 1:  # HSV
            vector1 = RGB2HSV(imginput)
        else:  # Color Histogram
            histogram_result1 = calculate_color_code(imginput)

    for image_path in sorted(dataset_folder.glob("*.jpg")):
        img = cv2.imread(str(image_path))
        
        if method == 1:  # HSV
            vector2 = RGB2HSV(img)
            product = dot_product(vector1, vector2)
            magnitude1 = euclidean_norm(vector1)
            magnitude2 = euclidean_norm(vector2)
        else:  # Color Histogram
            histogram_result2 = calculate_color_code(img)
            product = dot_product(histogram_result1, histogram_result2)
            magnitude1 = euclidean_norm(histogram_result1)
            magnitude2 = euclidean_norm(histogram_result2)

        similarity = (product / (magnitude1 * magnitude2)) * 100
        print(f"Similarity: {similarity}")

    end_time = time.time()
    execution_time = end_time - start_time
    print(f"program executed in {execution_time} seconds.")

# Changeable constants
OUTPUT_FOLDER = Path("./output")
INPUT_FOLDER = Path("./uploads/search")
DATASET_FOLDER = Path("./uploads/data-set")

input = int(input("1. HSV\n2. Color Histogram\nPilih metode: "))
compare_images(input, INPUT_FOLDER, DATASET_FOLDER)

