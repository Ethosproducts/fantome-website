import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    img_left_path = os.path.join(brain_dir, "media__1779425758640.png")
    img_back_path = os.path.join(brain_dir, "media__1779425765542.png")
    img_front_path = os.path.join(brain_dir, "media__1779425774136.png")

    X_CENTER = 511.5
    RADIUS = 104.0
    
    # We will sample at a few columns: center, and near the edges
    columns = [
        int(X_CENTER - RADIUS + 5),  # Left edge
        int(X_CENTER - RADIUS/2),    # Mid-left
        int(X_CENTER),               # Center
        int(X_CENTER + RADIUS/2),    # Mid-right
        int(X_CENTER + RADIUS - 5)   # Right edge
    ]

    for name, path in [("Left", img_left_path), ("Back", img_back_path), ("Front", img_front_path)]:
        img = Image.open(path)
        arr = np.array(img.convert('RGB'))
        print(f"\nImage {name}:")
        
        for col in columns:
            print(f"  Col {col}:")
            # Print Y from 570 to 610
            for y in range(570, 611, 5):
                pixel = arr[y, col]
                # brightness as average of RGB
                val = np.mean(pixel)
                print(f"    Y={y}: {pixel} (bright={val:.1f})")

if __name__ == "__main__":
    main()
