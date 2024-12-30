# image_processing/utils.py
from PIL import Image

def open_image(image_path):
    img = Image.open(image_path)
    return img, img.size

def save_image(img, output_path):
    img.save(output_path, optimize=True)