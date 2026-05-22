import os
from PIL import Image
import numpy as np

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    files = [
        "media__1779425774136.png", # Mojito
        "media__1779432383533.png", # Original
        "media__1779431660693.png"  # Sugar Free
    ]
    for f in files:
        p = os.path.join(brain_dir, f)
        if os.path.exists(p):
            img = Image.open(p)
            arr = np.array(img.convert('RGB'))
            h, w, c = arr.shape
            print(f"\nFile: {f} ({w}x{h})")
            # print corner pixel colors
            corners = [
                ("Top-Left", arr[0, 0]),
                ("Top-Right", arr[0, w-1]),
                ("Bottom-Left", arr[h-1, 0]),
                ("Bottom-Right", arr[h-1, w-1])
            ]
            for name, col in corners:
                print(f"  {name}: {col}")
        else:
            print(f"File {f} does not exist")

if __name__ == "__main__":
    main()
