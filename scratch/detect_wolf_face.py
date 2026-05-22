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
        arr = np.array(img.convert('RGB'))
        h, w, c = arr.shape
        
        # Sample the center of the can: X from 460 to 560, Y from 200 to 350
        center_area = arr[200:350, 460:560, :]
        mean_val = np.mean(center_area)
        max_val = np.max(center_area)
        
        # Also sample the left-of-center region (X=420..460, Y=250..400) where the text on side views starts
        side_area = arr[250:400, 420:460, :]
        side_mean = np.mean(side_area)
        
        # Let's count bright pixels in center area (>120)
        bright_pixels = np.sum(center_area > 120)
        
        print(f"\nFile: {filename}")
        print(f"  Center Mean: {mean_val:.1f}, Max: {max_val:.1f}")
        print(f"  Side Mean: {side_mean:.1f}")
        print(f"  Center Bright pixels count: {bright_pixels}")

if __name__ == "__main__":
    main()
