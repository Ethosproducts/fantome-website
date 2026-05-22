import os
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    img1_path = os.path.join(brain_dir, "media__1779429929712.png")
    img2_path = os.path.join(brain_dir, "media__1779432383533.png")
    
    for name, p in [("Older Original Front", img1_path), ("Newer Given Photo", img2_path)]:
        if os.path.exists(p):
            img = Image.open(p)
            print(f"{name}: size={img.size}, mode={img.mode}")
        else:
            print(f"{name} does not exist at {p}")

if __name__ == "__main__":
    main()
