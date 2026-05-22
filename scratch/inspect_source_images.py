import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    img_left_path = os.path.join(brain_dir, "media__1779425758640.png")
    img_back_path = os.path.join(brain_dir, "media__1779425765542.png")
    img_front_path = os.path.join(brain_dir, "media__1779425774136.png")

    for name, path in [("Left", img_left_path), ("Back", img_back_path), ("Front", img_front_path)]:
        img = Image.open(path)
        arr = np.array(img.convert('RGB'))
        h, w, c = arr.shape
        print(f"\nImage {name} shape: {w}x{h}")
        
        # Check a central strip of width 100 pixels
        strip = arr[570:620, w//2 - 50 : w//2 + 50, :]
        row_means = np.mean(strip, axis=(1, 2))
        row_maxs = np.max(strip, axis=(1, 2))
        
        print(f"Y coordinates 570 to 619 in {name}:")
        for y_idx, y in enumerate(range(570, 620)):
            # Print every 2nd row for brevity
            if y % 2 == 0:
                print(f"  Y={y}: mean={row_means[y_idx]:.1f}, max={row_maxs[y_idx]:.1f}")

if __name__ == "__main__":
    main()
