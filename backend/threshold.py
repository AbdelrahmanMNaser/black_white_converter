from PIL import Image, ImageFilter

def open_image(image_path):
  img = Image.open(image_path)
  return img, img.size

def resize_image(img, percentage=100):
    new_size = tuple(int(dim * (percentage / 100)) for dim in img.size)
    return img.resize(new_size, Image.Resampling.LANCZOS)

def convert_to_grayscale(img):
  return img.convert('L')

def apply_gaussian_blur(img, radius=1):
  return img.filter(ImageFilter.GaussianBlur(radius=radius))

def apply_threshold(img, threshold):
  bin = img.point(lambda x: 0 if x < threshold else 255, 'L')
  return bin.convert('1')

def save_image(img, output_path):
  img.save(output_path, optimize=True)

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


