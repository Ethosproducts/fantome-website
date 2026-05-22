import os
import numpy as np
from PIL import Image

def find_bottom_boundary(arr, col):
    # Find Y where brightness increases near the bottom (Y=580..620)
    for y in range(580, 620):
        # We check the average color in a small neighborhood to avoid noise
        brightness = np.mean(arr[y, col])
        # If it rises above 100, we've hit the silver rim or white background
        if brightness > 100:
            return y
    return None

def find_top_boundary(arr, col):
    # Find Y where brightness drops below 85 (Y=50..120)
    for y in range(50, 120):
        brightness = np.mean(arr[y, col])
        if brightness < 85:
            return y
    return None

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    img_left_path = os.path.join(brain_dir, "media__1779429955742.png")
    img_back_path = os.path.join(brain_dir, "media__1779429940281.png")
    img_front_path = os.path.join(brain_dir, "media__1779429929712.png")

    X_CENTER = 511.5
    RADIUS = 104.0
    
    cols = np.arange(int(X_CENTER - RADIUS), int(X_CENTER + RADIUS) + 1, 10)
    
    for name, path in [("Left", img_left_path), ("Back", img_back_path), ("Front", img_front_path)]:
        img = Image.open(path)
        arr = np.array(img.convert('RGB'))
        print(f"\nImage {name} Boundary detection:")
        
        # Trace bottom boundary
        bottoms = []
        tops = []
        for col in cols:
            bottom_y = find_bottom_boundary(arr, col)
            top_y = find_top_boundary(arr, col)
            bottoms.append((col, bottom_y))
            tops.append((col, top_y))
            
        print("  Bottom boundary Y by column:")
        for col, y in bottoms:
            print(f"    Col {col:3d}: {y}")
            
        print("  Top boundary Y by column:")
        for col, y in tops:
            print(f"    Col {col:3d}: {y}")

if __name__ == "__main__":
    main()
