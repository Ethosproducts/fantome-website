import numpy as np
from PIL import Image

def main():
    img_path = "public/mojito_texture.png"
    img = Image.open(img_path)
    w, h = img.size
    arr = np.array(img)
    
    # Analyze the bottom 400 rows
    start_row = h - 400
    row_max = np.max(arr[start_row:, :, :], axis=(1, 2))
    row_mean = np.mean(arr[start_row:, :, :], axis=(1, 2))
    
    # Print rows with high brightness
    print("Checking bottom rows for high brightness peaks...")
    for idx, r in enumerate(range(start_row, h)):
        if row_max[idx] > 200:
            print(f"Row {r}: max={row_max[idx]:.1f}, mean={row_mean[idx]:.1f}")
            
if __name__ == "__main__":
    main()
