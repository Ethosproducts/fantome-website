import numpy as np
from PIL import Image

def main():
    img_path = "public/mojito_texture.png"
    img = Image.open(img_path)
    w, h = img.size
    print(f"Texture dimensions: {w}x{h}")
    
    # Convert to numpy array
    arr = np.array(img)
    
    # Look at the bottom 100 rows
    # Print the average brightness for the bottom rows to see if they get very bright
    brightness = np.mean(arr, axis=2) # average R, G, B
    row_brightness = np.mean(brightness, axis=1) # average brightness per row
    
    print("Row brightness at the bottom 50 rows:")
    for r in range(h - 50, h):
        print(f"Row {r}: average brightness = {row_brightness[r]:.2f}")

if __name__ == "__main__":
    main()
