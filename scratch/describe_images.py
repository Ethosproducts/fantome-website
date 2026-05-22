import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/"
    images = [
        "media__1779463343135.png",
        "media__1779463379400.png",
        "media__1779464997084.png",
        "media__1779465272964.png",
        "media__1779465876057.png",
        "media__1779466061428.png",
        "media__1779466212689.png",
        "media__1779466382899.png",
        "media__1779466595461.png"
    ]
    
    for filename in images:
        path = os.path.join(brain_dir, filename)
        if not os.path.exists(path):
            continue
        img = Image.open(path)
        arr = np.array(img)
        h, w = arr.shape[:2]
        
        # Check border colors
        top_row = arr[0, :, :3]
        bottom_row = arr[-1, :, :3]
        left_col = arr[:, 0, :3]
        right_col = arr[:, -1, :3]
        
        print(f"\nImage {filename}: {w}x{h}")
        print(f"  Top row mean: {np.mean(top_row, axis=0)}")
        print(f"  Bottom row mean: {np.mean(bottom_row, axis=0)}")
        print(f"  Left col mean: {np.mean(left_col, axis=0)}")
        print(f"  Right col mean: {np.mean(right_col, axis=0)}")
        
        # Let's count colors
        # Count green: R < 100, G > 100, B < 100
        rgb = arr[:, :, :3]
        green_mask = (rgb[:, :, 1] > 100) & (rgb[:, :, 0] < 100) & (rgb[:, :, 2] < 100)
        # Count red: R > 150, G < 100, B < 100
        red_mask = (rgb[:, :, 0] > 150) & (rgb[:, :, 1] < 100) & (rgb[:, :, 2] < 100)
        # Count dark: R < 50, G < 50, B < 50
        dark_mask = (rgb[:, :, 0] < 50) & (rgb[:, :, 1] < 50) & (rgb[:, :, 2] < 50)
        
        print(f"  Green pixels: {np.sum(green_mask)}")
        print(f"  Red pixels: {np.sum(red_mask)}")
        print(f"  Dark pixels: {np.sum(dark_mask)}")

if __name__ == "__main__":
    main()
