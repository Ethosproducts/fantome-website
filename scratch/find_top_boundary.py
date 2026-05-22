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
    
    cols = np.arange(int(X_CENTER - RADIUS), int(X_CENTER + RADIUS) + 1, 10)
    
    for name, path in [("Left", img_left_path), ("Back", img_back_path), ("Front", img_front_path)]:
        img = Image.open(path)
        arr = np.array(img.convert('RGB'))
        print(f"\nImage {name} Top Boundary detection:")
        
        for col in cols:
            # Let's search from Y=120 down to Y=60 to find the last Y where brightness is high,
            # or search from Y=50 to Y=120 to find the first Y where brightness drops below a threshold (say, 85)
            boundary_y = None
            for y in range(50, 120):
                brightness = np.mean(arr[y, col])
                if brightness < 85:
                    boundary_y = y
                    break
            
            print(f"  Col {col:3d}: boundary Y = {str(boundary_y):4s}")

if __name__ == "__main__":
    main()
