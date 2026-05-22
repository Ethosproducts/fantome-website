import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    img_front_path = os.path.join(brain_dir, "media__1779425774136.png")
    
    img = Image.open(img_front_path)
    arr = np.array(img.convert('RGB'))
    
    # We will print out the row average and max for a rectangle that contains the label text
    # the text "ENERGY" is centered in the front view.
    # The can is between X=408 and X=615. Let's look at the central area X=450 to X=570.
    print("Row analysis of img_front from Y=550 to Y=610 (X=450 to 570):")
    for y in range(550, 611):
        row_slice = arr[y, 450:571]
        mean_val = np.mean(row_slice)
        max_val = np.max(row_slice)
        print(f"Y={y:3d}: mean={mean_val:5.1f}, max={max_val:5.1f}")

if __name__ == "__main__":
    main()
