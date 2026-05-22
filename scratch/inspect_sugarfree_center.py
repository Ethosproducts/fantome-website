from PIL import Image
import numpy as np

def main():
    img = Image.open("public/sugarfree_center.png")
    print("sugarfree_center.png size:", img.size, "mode:", img.mode)
    arr = np.array(img)
    if arr.shape[2] == 4:
        alpha = arr[:, :, 3]
        opaque_mask = alpha > 0
        y_idx, x_idx = np.where(opaque_mask)
        if len(y_idx) > 0:
            print(f"Opaque region: y:({y_idx.min()} to {y_idx.max()}), x:({x_idx.min()} to {x_idx.max()})")
        else:
            print("No opaque pixels")
    else:
        print("No alpha channel")

if __name__ == "__main__":
    main()
