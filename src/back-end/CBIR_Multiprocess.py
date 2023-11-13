import glob
import time
import caches2
import os
import cv2
import numpy as np
import pstats
import cProfile
from multiprocessing import Pool, Lock
from numba import jit
from functools import lru_cache
from concurrent.futures import ProcessPoolExecutor


@jit(nopython=True)
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

@jit(nopython=True)
def RGB2HSV(r, g, b):
    r, g, b = r.flatten() / 255.0, g.flatten() / 255.0, b.flatten() / 255.0

    cmax = np.maximum(r, np.maximum(g, b))
    cmin = np.minimum(r, np.minimum(g, b))
    delta = cmax - cmin

    h = np.zeros_like(r)
    s = np.zeros_like(r)
    v = cmax

    r_indices = np.where(cmax == r)
    g_indices = np.where(cmax == g)
    b_indices = np.where(cmax == b)

    h[r_indices] = 60 * ((g[r_indices] - b[r_indices]) / delta[r_indices] % 6)
    h[g_indices] = 60 * ((b[g_indices] - r[g_indices]) / delta[g_indices] + 2)
    h[b_indices] = 60 * ((r[b_indices] - g[b_indices]) / delta[b_indices] + 4)

    s[cmax != 0] = delta[cmax != 0] / cmax[cmax != 0]

    return h, s, v

def calculate_similarity(hist1, hist2):
    return np.dot(hist1, hist2) / (np.linalg.norm(hist1) * np.linalg.norm(hist2)) * 100

@lru_cache(maxsize=None)
def process_image(args):
    image_path = args
    img = cv2.imread(image_path)
    hist = np.zeros(14 * 9)
    hists = histogram_array(img, hist)
    return caches2.hash_file(image_path), caches2.np_to_list(np.array(hists))

def histogram_array_parallel(image_paths, cache):
    histograms = np.zeros((len(image_paths), 14 * 9), dtype=np.float64)
    image_to_process = []
    image_path_to_index = {image_path: index for index, image_path in enumerate(image_paths)}

    for image_path in image_paths:
        hash_val = caches2.hash_file(image_path)
        if cache.get(hash_val):
            histograms[image_path_to_index[image_path]] = cache[hash_val]
        else:
            image_to_process.append(image_path)

    with ProcessPoolExecutor(max_workers=6) as executor:
        results = executor.map(process_image, image_to_process)

    for (hash_val, histogram), image_path in zip(results, image_to_process):
        idx = image_path_to_index[image_path]
        histograms[idx] = histogram

    return histograms.tolist()

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


def Cbir_Color(cache):
    
    program_time = time.time()
    similarity_arr = []
    image_files = glob.glob(os.path.join(INPUT_FOLDER, '*.jpg')) + glob.glob(os.path.join(DATASET_FOLDER, '*.jpg'))
    histograms = histogram_array_parallel(image_paths=image_files,cache=cache)
    cache_updates = {} 
    for idx, histogram in enumerate(histograms[1:]):
        similarity = calculate_similarity(histograms[0], histogram)
        if similarity > 60:
            similarity_arr.append({
                "url": image_files[idx].replace("./uploads", ""),
                "percentage": similarity
            })
        cache_updates[f'{caches2.hash_file(image_files[idx + 1])}'] = histogram
        
        
    similarity_arr = sorted(similarity_arr, key=lambda k: k['percentage'], reverse=True)
    cache_lock.acquire()
    cache.update(cache_updates)
    cache_lock.release()
    caches2.dict_to_json(cache, "./caches/data.json")
    execution_time = time.time() - program_time
    return similarity_arr, execution_time

if __name__ == "__main__":
    cache_lock = Lock()
    cache = caches2.json_to_dict("./caches/data.json")
    cProfile.run("Cbir_Color(cache)", "my_func_stats")
    p = pstats.Stats("my_func_stats")
    p.sort_stats(1).print_stats()