import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/"
    images = [f for f in os.listdir(brain_dir) if f.endswith('.png')]
    images.sort()
    
    for filename in images:
        path = os.path.join(brain_dir, filename)
        img = Image.open(path)
        arr = np.array(img)
        h, w = arr.shape[:2]
        print(f"\nFile: {filename} ({w}x{h}), Mode: {img.mode}")
        # Print color details
        # Let's count some green pixels (R < 100, G > 100, B < 100)
        rgb = arr[:, :, :3]
        green_mask = (rgb[:, :, 1] > 100) & (rgb[:, :, 0] < 100) & (rgb[:, :, 2] < 100)
        green_count = np.sum(green_mask)
        print(f"  Green pixels count: {green_count}")
        # Check if there is transparency (alpha channel)
        if arr.shape[2] == 4:
            alpha = arr[:, :, 3]
            opaque = np.sum(alpha > 200)
            transparent = np.sum(alpha <= 200)
            print(f"  Opaque pixels: {opaque}, Transparent: {transparent}")
        else:
            print("  No Alpha channel")

if __name__ == "__main__":
    main()
