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
        
        # Look for red pixels: R is high, G and B are low.
        # Let's count pixels where R > 130 and R > G * 1.8 and R > B * 1.8
        r = arr[:, :, 0].astype(float)
        g = arr[:, :, 1].astype(float)
        b = arr[:, :, 2].astype(float)
        
        red_mask = (r > 100) & (r > g * 1.5) & (r > b * 1.5)
        red_indices = np.argwhere(red_mask)
        
        print(f"\nFile: {filename}")
        print(f"  Count of red pixels: {len(red_indices)}")
        if len(red_indices) > 0:
            # Print the average position of red pixels (should be near center for wolf eyes)
            mean_pos = np.mean(red_indices, axis=0)
            print(f"  Mean position of red pixels: Y={mean_pos[0]:.1f}, X={mean_pos[1]:.1f}")
            # Also print the max/min coords
            min_pos = np.min(red_indices, axis=0)
            max_pos = np.max(red_indices, axis=0)
            print(f"  Red pixel box: Y=[{min_pos[0]}, {max_pos[0]}], X=[{min_pos[1]}, {max_pos[1]}]")

if __name__ == "__main__":
    main()
