from PIL import Image
import time
import caches2
import os
import cv2
import numpy as np
import pstats
import cProfile
from multiprocessing import Lock
from functools import partial
import pstats
from numba import jit
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor


def process_single_image(image_path, cache):
    if cache.get(caches2.hash_file(image_path)) is not None:
        return image_path, cache.get(caches2.hash_file(image_path))
    
    img = np.array(Image.open(image_path))
    hist = np.zeros(14 * 9)
    hists = histogram_array(img)
    
    return image_path, caches2.np_to_list(np.array(hists))

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
        
    return hist

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

def process_image(args):
    image_path = args
    img = cv2.imread(image_path)
    hists = histogram_array(img)
    return caches2.hash_file(image_path), caches2.np_to_list(np.array(hists))

def histogram_array_parallel(image_paths, cache, cache_lock):
    with ProcessPoolExecutor(max_workers=6) as executor:
        partial_process_single_image = partial(process_single_image, cache=cache)
        results = list(executor.map(partial_process_single_image, image_paths))

    histograms = np.zeros((len(image_paths), 14*9), dtype=np.float64)
    cache_updates = {}
    for index, (hash_val, histogram) in enumerate(results):
        cache_updates[f"{caches2.hash_file(hash_val)}"] = histogram

    cache_lock.acquire()
    cache.update(cache_updates)
    cache_lock.release()

    for index, (_, histogram) in enumerate(results):
        histograms[index] = histogram

    return histograms.tolist(), cache

    

def histogram_array(img):
    hists = np.zeros(14 * 9)
    for i in range(3):
        for j in range(3):
            height, width, _ = img.shape
            grid_height = height // 3
            grid_width = width // 3

            start_h = i * grid_height
            end_h = (i + 1) * grid_height
            start_w = j * grid_width
            end_w = (j + 1) * grid_width

            grid = img[start_h:end_h, start_w:end_w]
            r, g, b = grid[:, :, 0], grid[:, :, 1], grid[:, :, 2]
            h, s, v = RGB2HSV(r, g, b)
            hists = color_quantization(h, s, v, hists, iteration = i * 3 + j)
    return hists


def Cbir_Color2(cache, cache_lock):
    program_time = time.perf_counter()
    similarity_arr = []
    image_files = []
    for folder in [INPUT_FOLDER, DATASET_FOLDER]:
        for dirpath, dirnames, filenames in os.walk(folder):
            for filename in filenames:
                if filename.endswith('.jpg'):
                    image_files.append(os.path.join(dirpath, filename))

    histograms, cache = histogram_array_parallel(image_paths=image_files, cache=cache, cache_lock=cache_lock)
    reference_histogram = histograms[0]
    cache_updates = {} 
    for idx, histogram in enumerate(histograms[1:]):
        similarity = calculate_similarity(reference_histogram, histogram)
        if similarity > 60:
            similarity_arr.append({
                "url": os.path.basename(image_files[idx + 1]),
                "percentage": similarity
            })
        cache_updates[f'{caches2.hash_file(image_files[idx + 1])}'] = histogram

    # Batch cache updates
    cache_lock.acquire()
    for hash_val, histogram in cache_updates.items():
        cache[hash_val] = histogram
    cache_lock.release()

    caches2.dict_to_json(cache, './caches/data.json')
    similarity_arr = sorted(similarity_arr, key=lambda k: -k['percentage'])
    execution_time = time.perf_counter() - program_time
    return similarity_arr, execution_time


OUTPUT_FOLDER = "./output"
INPUT_FOLDER = "./uploads/search"
DATASET_FOLDER = "./uploads/data-set"
cache = caches2.json_to_dict("./caches/data.json")
cache_lock = Lock()

if __name__ == "__main__":
    cProfile.run("Cbir_Color2(cache, cache_lock)", "my_func_stats")
    p = pstats.Stats("my_func_stats")
    p.sort_stats(1).print_stats()