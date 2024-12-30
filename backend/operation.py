# image_processing/operations.py
from PIL import Image, ImageFilter

def convert_to_grayscale(img):
    return img.convert('L')

def apply_gaussian_blur(img, radius=1):
    return img.filter(ImageFilter.GaussianBlur(radius=radius))

def apply_threshold(img, threshold):
    bin = img.point(lambda x: 0 if x < threshold else 255, 'L')
    return bin.convert('1')

def resize_image(img, percentage=100):
    new_size = tuple(int(dim * (percentage / 100)) for dim in img.size)
    return img.resize(new_size, Image.Resampling.LANCZOS)