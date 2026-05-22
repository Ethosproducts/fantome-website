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
    
    # We will find the boundary for x in [X_CENTER - RADIUS, X_CENTER + RADIUS]
    # The boundary is where the brightness increases as we go from Y=570 down to Y=620.
    # Let's search columns in steps of 10
    cols = np.arange(int(X_CENTER - RADIUS), int(X_CENTER + RADIUS) + 1, 10)
    
    for name, path in [("Left", img_left_path), ("Back", img_back_path), ("Front", img_front_path)]:
        img = Image.open(path)
        arr = np.array(img.convert('RGB'))
        print(f"\nImage {name} Boundary detection:")
        
        for col in cols:
            # Let's find the first Y (from 570 to 620) where brightness exceeds 90
            boundary_y = None
            for y in range(570, 620):
                brightness = np.mean(arr[y, col])
                if brightness > 90:
                    boundary_y = y
                    break
            
            # Also find the minimum brightness in Y=570..590 to make sure we know the label's dark color
            label_brightness = np.mean(arr[570:590, col])
            print(f"  Col {col:3d}: boundary Y = {str(boundary_y):4s} (label avg={label_brightness:.1f})")

if __name__ == "__main__":
    main()
