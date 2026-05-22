import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    img_path = os.path.join(brain_dir, "media__1779431660693.png")
    
    if not os.path.exists(img_path):
        print("Image not found")
        return
        
    img = Image.open(img_path)
    arr = np.array(img)
    h, w, c = arr.shape
    print(f"Shape: {arr.shape}")
    
    if c == 4:
        # Check alpha channel statistics
        alpha = arr[:, :, 3]
        total_pixels = alpha.size
        zero_alpha = np.sum(alpha == 0)
        full_alpha = np.sum(alpha == 255)
        print(f"Alpha channel stats: transparent (0) = {zero_alpha} ({zero_alpha/total_pixels:.1%}), fully opaque (255) = {full_alpha} ({full_alpha/total_pixels:.1%})")
        # Check center region color
        center_rgb = arr[h//2-10:h//2+10, w//2-10:w//2+10, :3]
        print(f"Center region average RGB: {np.mean(center_rgb, axis=(0, 1))}")
    else:
        print("Image does not have an alpha channel")

if __name__ == "__main__":
    main()
