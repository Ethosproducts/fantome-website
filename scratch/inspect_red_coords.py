import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    images = [
        "media__1779429929712.png",
        "media__1779429955742.png"
    ]
    
    for filename in images:
        path = os.path.join(brain_dir, filename)
        img = Image.open(path)
        arr = np.array(img.convert('RGB'))
        
        r = arr[:, :, 0].astype(float)
        g = arr[:, :, 1].astype(float)
        b = arr[:, :, 2].astype(float)
        
        red_mask = (r > 100) & (r > g * 1.5) & (r > b * 1.5) & (np.arange(682)[:, None] < 500)
        indices = np.argwhere(red_mask)
        
        print(f"\nFile: {filename} - upper red pixels count: {len(indices)}")
        if len(indices) > 0:
            print("  First 20 red pixels (Y, X) and their RGB values:")
            for i in range(min(20, len(indices))):
                y, x = indices[i]
                print(f"    Y={y}, X={x}: RGB={arr[y, x]}")

if __name__ == "__main__":
    main()
