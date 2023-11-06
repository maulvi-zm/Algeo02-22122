from PIL import Image
import numpy as np
import math

def ImageToGrayscale(image_path):
    image = Image.open(image_path)

    # Convert the image to grayscale using the formula Y = 0.29 × R + 0.587 × G + 0.114 × B
    grayscale_image = image.convert("L", matrix=(0.29, 0.587, 0.114, 0))

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
        for j in range(width):
            # Get the current pixel value and the value at the displaced position
            current_pixel = grayscale_array[i, j]
            neighbor_pixel = grayscale_array[i + displacement[0], j + displacement[1]]

            # Increment the corresponding GLCM element
            glcm[current_pixel, neighbor_pixel] += 1

    # Normalize the GLCM matrix
    glcm = glcm.astype(float) / glcm.sum()

    return glcm

def Transpose(matrix): #DONE
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    transposed_matrix = [[0 for i in range(num_rows)] for i in range(num_cols)]

    for i in range(num_rows):
        for j in range(num_cols):
            transposed_matrix[j][i] = matrix[i][j]

    return transposed_matrix

def Symmetrix(matrix):
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    result_matrix = [[0 for i in range(num_rows)] for i in range(num_cols)]

    transpose_matrix = Transpose(matrix)

    for i in range (num_rows):
        for j in range(num_cols):
            result_matrix[i][j] = (matrix[i][j] + transpose_matrix[i][j])
    
    return result_matrix

def GLCMNorm(glcm_sym):
    glcm_norm = np.array(glcm_sym, dtype=np.float32)

    glcm_norm = glcm_norm / glcm_norm.sum()

    return glcm_norm

def ExtractContrast(glcm_matrix):
    contrast = 0
    dimension = 256

    for i in range(dimension):
        for j in range(dimension):
            contrast += (i - j) ** 2 * glcm_matrix[i, j]

    return contrast

def ExtractHomogeneity(glcm_matrix):
    homogeneity = 0
    dimesion = 256

    for i in range(dimesion):
        for j in range(dimesion):
            homogeneity += glcm_matrix[i, j] / (1 + (i - j) ** 2)

    return homogeneity

def extract_entropy_from_glcm(glcm_matrix):
    entropy = 0
    dimension = 256

    for i in range(dimension):
        for j in range(dimension):
            if glcm_matrix[i, j] != 0:
                entropy += -glcm_matrix[i, j] * math.log10(glcm_matrix[i, j])

    return entropy


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

def Procedure(image_path):
    grayscale_matrix = ImageToGrayscale(image_path)
    glcm = GLCM(grayscale_matrix, angle=0)
    glcm_sym = Symmetrix(glcm)
    glcm_norm = GLCMNorm(glcm_sym)

    save_matrix_as_txt(glcm_norm, "glcm_norm.txt")

def compute_cosine_similarity(vector1, vector2):
    dot_product = np.dot(vector1, vector2)
    norm_vector1 = np.linalg.norm(vector1)
    norm_vector2 = np.linalg.norm(vector2)

    if norm_vector1 == 0 or norm_vector2 == 0:
        raise ValueError("One of the vectors has zero norm.")

    cosine_similarity = dot_product / (norm_vector1 * norm_vector2)
    return cosine_similarity
