import glob
import os
from PIL import Image
import numpy as np
import math, time
import cProfile, pstats
import caches2

def DisplayMatrix(matrix):
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            print(matrix[i][j], end=" ")
        print()

def save_matrix_as_txt(matrix, file_path):
    with open(file_path, 'w') as file:
        for row in matrix:
            row_str = ' '.join(map(str, row)) 
            file.write(row_str + '\n')

def ImageToGrayscale(image_path):
    image = Image.open(image_path)

    # Convert the image to grayscale using the formula Y = 0.29 × R + 0.587 × G + 0.114 × B
    grayscale_image = image.convert("L", matrix=(0.29, 0.587, 0.114,0))

    # Get the grayscale matrix and convert it to a NumPy array
    grayscale_matrix = np.array(grayscale_image)

    return grayscale_matrix


def GLCM(grayscale_matrix, angle=0):
    # Convert the grayscale matrix to a NumPy array
    grayscale_array = np.array(grayscale_matrix, dtype=np.uint8)

    height = width = 256

    # Initialize the GLCM matrix
    glcm = np.zeros((height, width), dtype=np.uint32)

    # Calculate the indices of the current pixels and the neighbor pixels
    current_indices = (np.arange(height), np.arange(width))
    neighbor_indices = (np.arange(height) + 0, np.arange(width) + 1)

    # Get the current pixels and the neighbor pixels
    current_pixels = grayscale_array[current_indices]
    neighbor_pixels = grayscale_array[neighbor_indices]

    # Increment the corresponding GLCM elements
    np.add.at(glcm, (current_pixels, neighbor_pixels), 1)

    return glcm

def Transpose(matrix):
    return np.transpose(matrix)

def Symmetrix(matrix):
    transpose_matrix = Transpose(matrix)
    result_matrix = matrix + transpose_matrix
    return result_matrix

def GLCMNorm(glcm_sym):
    glcm_norm = np.array(glcm_sym, dtype=np.float32)
    glcm_norm = glcm_norm / np.sum(glcm_norm)
    return glcm_norm

def ExtractContrast(glcm_matrix):
    dimension = 256
    indices = np.arange(dimension)
    contrast = np.sum((indices[:, None] - indices[None, :]) ** 2 * glcm_matrix)
    return contrast

def ExtractHomogeneity(glcm_matrix):
    dimension = 256
    indices = np.arange(dimension)
    homogeneity = np.sum(glcm_matrix / (1 + (indices[:, None] - indices[None, :]) ** 2))
    return homogeneity

def ExtractDissimilarity(glcm_matrix):
    dimension = 256
    indices = np.arange(dimension)
    homogeneity = np.sum(glcm_matrix * abs(indices[:, None] - indices[None, :]))
    return homogeneity

def ExtractEntropy(glcm_matrix):
    epsilon = 1e-8  #avoid log 0 
    masked_glcm = np.where(glcm_matrix == 0, epsilon, glcm_matrix)
    entropy = -np.sum(masked_glcm * np.log10(masked_glcm))
    return entropy

def Vector(image_path, angle):
    grayscale_matrix = ImageToGrayscale(image_path)
    glcm = GLCM(grayscale_matrix, angle=angle)
    glcm_sym = Symmetrix(glcm)
    glcm_norm = GLCMNorm(glcm_sym)

    vector = [ExtractContrast(glcm_norm), ExtractHomogeneity(glcm_norm), ExtractEntropy(glcm_norm), ExtractDissimilarity(glcm_norm)]

    return vector

def Cosine(vector1, vector2):
    dot_product = np.dot(vector1, vector2)
    norm_vector1 = np.linalg.norm(vector1)
    norm_vector2 = np.linalg.norm(vector2)

    if norm_vector1 == 0 or norm_vector2 == 0:
        raise ValueError("One of the vectors has zero norm.")

    cosine_similarity = dot_product / (norm_vector1 * norm_vector2)
    return cosine_similarity * 100

def Procedure(image_path1, image_path2, cache):

    cosineTotal = 0
    
    temp = cache.get(image_path1)
    if temp is None:
        vector1 = Vector(image_path1, 0)
        cache[f"{caches2.hash_file(image_path2)}"] = vector1
    else:
        vector1 = temp
    
    temp = cache.get(image_path2)
    if temp is None:
        vector2 = Vector(image_path2, 0)
        cache[f"{caches2.hash_file(image_path2)}"] = vector2
    else:
        vector2 = temp
    
    cosineTotal += Cosine(vector1, vector2)

    return cosineTotal

def Texture(caches):
    start = time.time()
    similarity_arr = []

    for folder in [DATASET_FOLDER]:
        image_files = glob.glob(os.path.join(folder, '*.jpg'))
        for image_path in sorted(image_files):
            if os.path.isfile(image_path):
                similarity = Procedure(INPUT_FILE, image_path, caches)
                if similarity > 60:
                        similarity_arr.append({
                            "url": os.path.basename(image_path),
                            "percentage": similarity
                        })
    caches2.dict_to_json(caches, "./caches/texture.json")
    similarity_arr = sorted(similarity_arr, key=lambda k: -k['percentage'])
    end = time.time()
    return similarity_arr, end-start
    

INPUT_FILE = "./uploads/search/received_image.jpg"
DATASET_FOLDER = "./uploads/data-set"

if __name__ == "__main__":
    caches = caches2.json_to_dict("./caches/texture.json")
    cProfile.run("Texture(caches)", "my_func_stats")
    p = pstats.Stats("my_func_stats")
    p.sort_stats(1).print_stats()