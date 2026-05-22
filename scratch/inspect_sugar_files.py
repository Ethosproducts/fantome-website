import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    files = [
        "media__1779428476235.png",
        "media__1779431660693.png",
        "media__1779432352176.png",
        "media__1779432383533.png"
    ]
    
    for f in files:
        path = os.path.join(brain_dir, f)
        if not os.path.exists(path):
            print(f"File {f} does not exist")
            continue
        img = Image.open(path)
        arr = np.array(img.convert('RGB'))
        h, w, c = arr.shape
        print(f"\nFile: {f} ({w}x{h})")
        # Check standard deviation or other features
        # Sugar Free label is white/silver, let's check average color of the center region
        center_region = arr[h//2 - 50:h//2 + 50, w//2 - 50:w//2 + 50, :]
        avg_rgb = np.mean(center_region, axis=(0, 1))
        print(f"  Center region mean RGB: {avg_rgb}")
        # Look for text vs wolf face (wolf eyes/face vs dense warnings)
        # Let's write out some info to identify front vs back vs side

if __name__ == "__main__":
    main()
