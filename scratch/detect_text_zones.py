import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    images = [
        "media__1779429929712.png",
        "media__1779429940281.png",
        "media__1779429955742.png"
    ]
    
    for filename in images:
        path = os.path.join(brain_dir, filename)
        img = Image.open(path)
        arr = np.array(img.convert('L')) # convert to grayscale
        h, w = arr.shape
        
        # Crop the center: X=450..570, Y=150..400
        crop = arr[150:400, 450:571]
        
        # Calculate horizontal gradient (differences between columns)
        grad = np.abs(crop[:, 1:] - crop[:, :-1])
        high_grad_count = np.sum(grad > 40)
        
        print(f"\nFile: {filename}")
        print(f"  High horizontal gradient pixels: {high_grad_count}")

if __name__ == "__main__":
    main()
