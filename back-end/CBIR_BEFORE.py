import glob
import time
import caches2
import os
import cv2
import numpy as np
import pstats
import cProfile
from multiprocessing import Pool



def color_quantization(h, s, v, hist, iteration):
    h_ranges = np.array([(316, 360), (0, 25), (26, 40), (41, 120), (121, 190), (191, 270), (271, 295), (296, 315)])
    s_ranges = np.array([(0, 0.2), (0.21, 0.7), (0.71, 1)])
    v_ranges = np.array([(0, 0.2), (0.2, 0.7), (0.7, 1)])

    for i, (start, end) in enumerate(h_ranges):
        hist[iteration * 14 + i] += np.sum(np.logical_and(h >= start, h <= end))
                
    for i, (start, end) in enumerate(s_ranges):
        hist[iteration * 14 + i + 8] += np.sum(np.logical_and(s >= start, s <= end))

    for i, (start, end) in enumerate(v_ranges):
        hist[iteration * 14 + i + 11] += np.sum(np.logical_and(v >= start, v <= end))

def RGB2HSV(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0

    cmax = np.maximum(r, np.maximum(g, b))
    cmin = np.minimum(r, np.minimum(g, b))
    delta = cmax - cmin

    h = np.zeros(r.shape)
    s = np.zeros(r.shape)
    v = np.zeros(r.shape)

    # Hue calculation
    nonzero_indices = delta != 0
    h_temp = np.zeros_like(r)
    division = np.zeros_like(r)
    
    h_temp[cmax == cmin] = 0

    division = (g - b) / np.where(nonzero_indices, delta, 1) 
    h_temp[cmax == r] = 60 * (division[cmax == r] % 6)

    division = (b - r) / np.where(nonzero_indices, delta, 1)  
    h_temp[cmax == g] = 60 * (division[cmax == g] + 2)

    division = (r - g) / np.where(nonzero_indices, delta, 1) 
    h_temp[cmax == b] = 60 * (division[cmax == b] + 4)

    h = h_temp

    # Saturation calculation
    s = np.where(cmax != 0, delta / cmax, 0)
    s[~np.isfinite(s)] = 0

    # Value calculation
    v = cmax

    return h, s, v



def calculate_similarity(hist1, hist2):
    product = np.dot(hist1, hist2)
    norm1 = np.linalg.norm(hist1)
    norm2 = np.linalg.norm(hist2)
    similarity = (product / (norm1 * norm2)) * 100
    return similarity

def histogram_array(img,hists):
    height, width, _ = img.shape

    grid_height = height // 3
    grid_width = width // 3

    for i in range(3):
        for j in range(3):
            start_h = i * grid_height
            end_h = (i + 1) * grid_height
            start_w = j * grid_width
            end_w = (j + 1) * grid_width

            grid = img[start_h:end_h, start_w:end_w]

            r, g, b = grid[:, :, 0], grid[:, :, 1], grid[:, :, 2]

            h, s, v = RGB2HSV(r, g, b)

            color_quantization(h, s, v, hists, iteration = i * 3 + j)

    return hists  


    
OUTPUT_FOLDER = "./output"
INPUT_FOLDER = "./uploads/search"
DATASET_FOLDER = "./uploads/data-set"


def Cbir_Color():
    program_time = time.time()
    cache = caches2.json_to_dict()
    similarity_arr = []

    for folder in [INPUT_FOLDER, DATASET_FOLDER]:
        image_files = glob.glob(os.path.join(folder, '*.jpg'))
        for image_path in sorted(image_files):
            if os.path.isfile(image_path):
                
                # Check Caches
                found, index = caches2.cek_cache(cache, image_path)
                
                if found:
                    if folder == INPUT_FOLDER:
                        histogram1 = index
                    else:
                        histogram2 = index
                else:
                    img = cv2.imread(str(image_path))

                    hist = np.zeros(14*9)
                    hists = histogram_array(img,hist)

                    histogram = np.array(hists)
                        
                    if folder == INPUT_FOLDER:
                        histogram1 = histogram
                    else:
                        histogram2 = histogram

                    caches2.input_to_json(cache, [caches2.hash_file(image_path), caches2.np_to_list(histogram)])
                
                if folder == DATASET_FOLDER:
                    if type(histogram1) != list:
                        histogram1 = caches2.np_to_list(histogram1)
                    if type(histogram2) != list:
                        histogram2 = caches2.np_to_list(histogram2)
                        
                    similarity = calculate_similarity(histogram1, histogram2)
                    similarity_arr.append({
                        "url": os.path.basename(image_path),
                        "percentage": similarity
                    })
                    
    similarity_arr = sorted(similarity_arr, key=lambda k: k['percentage'], reverse=True)
    caches2.dict_to_json(cache, "./caches/data.json")
    execution_time = time.time() - program_time
    return similarity_arr, execution_time

if __name__ == "__main__":
    cProfile.run("Cbir_Color()", "my_func_stats")
    p = pstats.Stats("my_func_stats")
    p.sort_stats("cumulative").print_stats()