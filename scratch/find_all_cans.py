import os
from PIL import Image
import numpy as np

def scan_dir(dname):
    print(f"\n--- Scanning directory: {dname} ---")
    for f in os.listdir(dname):
        if not f.endswith(".png") and not f.endswith(".jpg"):
            continue
        p = os.path.join(dname, f)
        try:
            img = Image.open(p)
            w, h = img.size
            if w > 100 and h > 100:
                arr = np.array(img.convert('RGB'))
                # print stats
                mean_rgb = np.mean(arr, axis=(0, 1))
                print(f"File: {f} | Size: {w}x{h} | Mean RGB: {mean_rgb.astype(int)}")
        except Exception as e:
            print(f"Error reading {f}: {e}")

def main():
    scan_dir("C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/")
    scan_dir("C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/.tempmediaStorage/")

if __name__ == "__main__":
    main()
