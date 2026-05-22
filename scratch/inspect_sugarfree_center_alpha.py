import os
from PIL import Image
import numpy as np

def main():
    p = "public/sugarfree_center.png"
    if os.path.exists(p):
        img = Image.open(p)
        arr = np.array(img)
        h, w, c = arr.shape
        print(f"File: {p} | Size: {w}x{h} | Mode: {img.mode}")
        if c == 4:
            alpha = arr[:, :, 3]
            total_pixels = alpha.size
            zero_alpha = np.sum(alpha == 0)
            full_alpha = np.sum(alpha == 255)
            partial_alpha = total_pixels - zero_alpha - full_alpha
            print(f"  Alpha stats: transparent (0)={zero_alpha} ({zero_alpha/total_pixels:.1%}), opaque (255)={full_alpha} ({full_alpha/total_pixels:.1%}), partial={partial_alpha} ({partial_alpha/total_pixels:.1%})")
            
            # Check corners
            print("  Corner alpha values:")
            print(f"    Top-Left: {alpha[0, 0]}")
            print(f"    Top-Right: {alpha[0, w-1]}")
            print(f"    Bottom-Left: {alpha[h-1, 0]}")
            print(f"    Bottom-Right: {alpha[h-1, w-1]}")
        else:
            print("  No alpha channel")
    else:
        print(f"{p} does not exist")

if __name__ == "__main__":
    main()
