import os
import sys
import time

# Import the take_screenshot function from capture_3d_can
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from capture_3d_can import take_screenshot

def main():
    out_dir = "c:\\Users\\prave\\Desktop\\fantome"
    
    # Original angles to test
    orig_angles = [55, 60, 65, 70, 75]
    
    # Sugar Free angles to test
    sf_angles = [210, 225, 240, 255]
    
    print("Capturing Original angles...", flush=True)
    for angle in orig_angles:
        angle_rad = angle * 3.141592653589793 / 180.0
        url = f"http://localhost:5173/?flavor=Original&angle={angle_rad:.4f}"
        out_path = os.path.join(out_dir, f"critical_Original_{angle}.png")
        print(f"\n--- CAPTURING Original AT {angle} DEG ---", flush=True)
        take_screenshot(url, out_path)
        
    print("\nCapturing Sugar Free angles...", flush=True)
    for angle in sf_angles:
        angle_rad = angle * 3.141592653589793 / 180.0
        url = f"http://localhost:5173/?flavor=Sugar Free&angle={angle_rad:.4f}"
        out_path = os.path.join(out_dir, f"critical_Sugar_Free_{angle}.png")
        print(f"\n--- CAPTURING Sugar Free AT {angle} DEG ---", flush=True)
        take_screenshot(url, out_path)

if __name__ == "__main__":
    main()
