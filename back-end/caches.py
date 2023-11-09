import hashlib
import csv
import os


csv.field_size_limit(100000000)  # Set a larger limit for the CSV field size

def np_to_list(np_array):
    temp = np_array.tolist()
    for i in range(len(temp)):
        temp[i] = float(temp[i])
    return temp


def hash_file(file_path):
    with open(file_path, 'rb') as file:
        file_data = file.read()
        return hashlib.md5(file_data).hexdigest()

def search_index(data, key):
    
    if len(data) == 0:
        return False, 0

    left, right = 0, len(data) - 1

    while left <= right:
        mid = (left + right) // 2
        mid_key = data[mid][0]

        if mid_key == key:
            return True, mid
        elif mid_key < key:
            left = mid + 1
        else:
            right = mid - 1

    return False, left


def input_to_csv(data, new_entry):
    key = new_entry[0]
    found , insert_index = search_index(data, key)
    data.insert(insert_index, new_entry)

def csv_to_array():
    if not os.path.exists('./caches/data.csv'):
        return []
    
    with open('./caches/data.csv', 'r') as file:
        reader = csv.reader(file, delimiter=',')
        data = list(reader)
        for x in data:
            x[1] = x[1].strip('[').strip(']').split(', ')
            for i in range(len(x[1])):
                x[1][i] = float(x[1][i])
                
        return data

def array_to_csv(data):
    with open('./caches/data.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)

def cek_cache(data,path):
    md5 = hash_file(path)
    found, index = search_index(data, md5)
    
    # Collision handler
    if found:
        found = False
        while not found and data[index][0] == md5 and index < len(data):
            if data[index][0] == md5:
                found = True
            else:
                index += 1
                
    return found, index
    


