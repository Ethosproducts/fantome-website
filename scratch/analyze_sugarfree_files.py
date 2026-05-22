import os
import numpy as np
from PIL import Image

def analyze_image(path):
    if not os.path.exists(path):
        print(f"{path} does not exist")
        return
    img = Image.open(path)
    print(f"\nAnalyzing {path}: size={img.size}, mode={img.mode}")
    arr = np.array(img.convert('RGBA'))
    alpha = arr[:, :, 3]
    opaque_mask = alpha > 10
    y_idx, x_idx = np.where(opaque_mask)
    if len(y_idx) > 0:
        print(f"  Opaque region: y:({y_idx.min()} to {y_idx.max()}), x:({x_idx.min()} to {x_idx.max()})")
    else:
        print("  No opaque pixels")

def main():
    files = [
        "public/sugarfree_perfect.png",
        "public/sugarfree_front.png",
        "public/sugarfree_straight.png",
        "public/verify_final_Sugar_Free.png",
        "public/original_perfect.png"
    ]
    for f in files:
        analyze_image(f)

if __name__ == "__main__":
    main()
