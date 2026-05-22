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
    print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
    
    # Save a small version to print out pixel colors
    small = img.resize((30, 50)).convert('RGB')
    arr = np.array(small)
    for y in range(0, 50, 2):
        row_str = ""
        for x in range(30):
            r, g, b = arr[y, x]
            # Print a character representing the brightness/color
            brightness = (int(r) + int(g) + int(b)) // 3
            if brightness > 220:
                row_str += "#"  # very bright (white bg or white label)
            elif brightness > 150:
                row_str += "%"  # medium light
            elif brightness > 80:
                row_str += "*"  # medium dark
            else:
                row_str += "."  # dark
        print(row_str)

if __name__ == "__main__":
    main()
