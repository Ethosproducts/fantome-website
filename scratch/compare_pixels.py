import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    img1_path = os.path.join(brain_dir, "media__1779429929712.png")
    img2_path = os.path.join(brain_dir, "media__1779432383533.png")
    
    if os.path.exists(img1_path) and os.path.exists(img2_path):
        img1 = np.array(Image.open(img1_path).convert('RGB'))
        img2 = np.array(Image.open(img2_path).convert('RGB'))
        diff = np.abs(img1.astype(float) - img2.astype(float))
        max_diff = np.max(diff)
        mean_diff = np.mean(diff)
        print(f"Comparison: max diff = {max_diff}, mean diff = {mean_diff}")
    else:
        print("One or both images do not exist")

if __name__ == "__main__":
    main()
