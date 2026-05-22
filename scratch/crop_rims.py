import numpy as np
from PIL import Image

def crop_rims(filepath):
    print(f"Cropping rims from {filepath}...")
    img = Image.open(filepath).convert('RGBA')
    arr = np.array(img)
    h, w, c = arr.shape
    
    # We want to crop out the top and bottom silver parts.
    # The silver part is roughly the top 35 pixels and bottom 50 pixels of the 600px tall image.
    top_crop = 40
    bottom_crop = h - 60
    
    cropped_arr = arr[top_crop:bottom_crop, :]
    
    Image.fromarray(cropped_arr).save(filepath)
    print(f"Saved {filepath} (cropped from {h} to {bottom_crop - top_crop})")

if __name__ == "__main__":
    crop_rims("public/mojito_front.png")
    crop_rims("public/original_front.png")
    crop_rims("public/sugarfree_front.png")
