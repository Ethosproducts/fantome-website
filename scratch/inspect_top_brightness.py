import numpy as np
from PIL import Image

def main():
    img_path = "public/mojito_texture.png"
    img = Image.open(img_path)
    w, h = img.size
    arr = np.array(img)
    
    # Look at the top 50 rows
    brightness = np.mean(arr[:50, :, :], axis=2) # average R, G, B
    row_max = np.max(arr[:50, :, :], axis=(1, 2))
    row_mean = np.mean(brightness, axis=1) # average brightness per row
    
    print("Row brightness at the top 50 rows:")
    for r in range(50):
        print(f"Row {r:2d}: mean={row_mean[r]:.2f}, max={row_max[r]:.2f}")

if __name__ == "__main__":
    main()
