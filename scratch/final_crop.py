import numpy as np
from PIL import Image

def final_crop(filepath):
    print(f"Final crop for {filepath}...")
    img = Image.open(filepath).convert('RGBA')
    arr = np.array(img)
    
    h, w, c = arr.shape
    # Current image is 600px tall.
    # We will chop off the top 60 pixels and bottom 60 pixels.
    top_crop = 60
    bottom_crop = h - 60
    
    arr_cropped = arr[top_crop:bottom_crop, :, :]
    
    # Save it back
    Image.fromarray(arr_cropped).save(filepath)
    print(f"Cropped {filepath} to {bottom_crop - top_crop}px tall.")

if __name__ == "__main__":
    final_crop("public/mojito_front.png")
    final_crop("public/original_front.png")
    final_crop("public/sugarfree_front.png")
