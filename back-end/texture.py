from PIL import Image
import numpy as np
import math, time

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

    # Get the grayscale matrix
    grayscale_matrix = list(grayscale_image.getdata())

    # Reshape the matrix to the dimensions of the original image
    width, height = grayscale_image.size
    grayscale_matrix = [grayscale_matrix[i * width:(i + 1) * width] for i in range(height)]

    return grayscale_matrix


def GLCM(grayscale_matrix, angle=0):
    # Convert the grayscale matrix to a NumPy array
    grayscale_array = np.array(grayscale_matrix, dtype=np.uint8)

    height = width = 256

    # Initialize the GLCM matrix
    glcm = np.zeros((height, width), dtype=np.uint32)

    # Define the displacement based on the angle (0, 45, 90, 135 degrees)
    if angle == 0:
        displacement = (0, 1)
    elif angle == 45:
        displacement = (-1, 1)
    elif angle == 90:
        displacement = (-1, 0)
    elif angle == 135:
        displacement = (-1, -1)
    else:
        raise ValueError("Input derajat salah")

    for i in range(height):
        for j in range(width - 1):
            # Get the current pixel value and the value at the displaced position
            current_pixel = grayscale_array[i, j]
            neighbor_pixel = grayscale_array[i + displacement[0], j + displacement[1]]

            # Increment the corresponding GLCM element
            glcm[current_pixel, neighbor_pixel] += 1

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

def Procedure(image_path1, image_path2):
    start_time = time.time()

    angle = [0]
    cosineTotal = 0

    for i in angle:
        vector1 = Vector(image_path1, i)
        vector2 = Vector(image_path2, i)
        cosineTotal += Cosine(vector1, vector2)

    duration = time.time() - start_time

    return [cosineTotal, duration]
