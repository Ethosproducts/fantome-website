import os
from PIL import Image

def main():
    root_dir = "c:/Users/prave/Desktop/fantome"
    files = [f for f in os.listdir(root_dir) if "sugarfree" in f.lower() and f.endswith(".png")]
    for f in files:
        p = os.path.join(root_dir, f)
        img = Image.open(p)
        print(f"File: {f} | Size: {img.size} | Mode: {img.mode}")

if __name__ == "__main__":
    main()
