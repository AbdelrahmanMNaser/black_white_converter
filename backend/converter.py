import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), "converter"))
from operation import convert_to_grayscale, apply_gaussian_blur, apply_threshold, resize_image
from utils import open_image, save_image

def convert_to_bw_soft(image_path, threshold, output_path, optimize_percentage=100):
    img, original_size = open_image(image_path)
    print(f"Original image resolution: {original_size[0]}x{original_size[1]}")
    
    img = convert_to_grayscale(img)
    img = apply_gaussian_blur(img)
    binary_img = apply_threshold(img, threshold)
    
    if optimize_percentage < 100:
        binary_img = resize_image(binary_img, optimize_percentage)
        
    final_size = binary_img.size
    print(f"Final image resolution: {final_size[0]}x{final_size[1]}")
    
    if output_path:
        save_image(binary_img, output_path)
    
    return binary_img