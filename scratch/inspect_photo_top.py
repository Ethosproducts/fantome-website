import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    img_front_path = os.path.join(brain_dir, "media__1779425774136.png")
    
    img = Image.open(img_front_path)
    arr = np.array(img.convert('RGB'))
    h, w, c = arr.shape
    
    print("Analyzing top rows of img_front from Y=0 to Y=120:")
    # We will sample columns across the can width (X=450 to 570)
    for y in range(0, 121, 10):
        row_slice = arr[y, 450:571]
        mean_val = np.mean(row_slice, axis=0) # average R, G, B
        max_val = np.max(row_slice, axis=0) # max R, G, B
        print(f"Y={y:3d}: mean RGB={mean_val.astype(int)}, max RGB={max_val.astype(int)}")

if __name__ == "__main__":
    main()
