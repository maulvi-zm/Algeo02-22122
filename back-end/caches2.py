import xxhash
import ujson

def np_to_list(np_array):
    return np_array.flatten().astype(float).tolist()

def hash_file(file_path):
    with open(file_path, 'rb') as file:
        file_data = file.read()
        return xxhash.xxh32(file_data).hexdigest()

def input_to_json(data, new_entry):
    key, value = new_entry
    data[f"{key}"] = value

def json_to_dict():
    try:
        with open("./caches/data.json", 'r') as file:
            data = ujson.load(file)
    except FileNotFoundError:
        data = {}
    return data

def dict_to_json(data, json_file):
    with open(json_file, 'w') as file:
        ujson.dump(data, file)
