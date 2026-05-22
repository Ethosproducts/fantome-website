import os
import sys
import time

# Import take_screenshot from capture_3d_can
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from capture_3d_can import take_screenshot

def main():
    out_dir = "c:\\Users\\prave\\Desktop\\fantome"
    
    flavors = ["Original", "Sugar Free", "Mojito"]
    
    for flavor in flavors:
        url = f"http://localhost:5173/?flavor={flavor}"
        out_path = os.path.join(out_dir, f"verify_final_{flavor.replace(' ', '_')}.png")
        print(f"\n--- VERIFYING {flavor} ---", flush=True)
        take_screenshot(url, out_path)

if __name__ == "__main__":
    main()
