import os
from PIL import Image

def main():
    paths = [
        "public/sugarfree_center.png",
        "public/sugarfree_texture.png",
        "public/mojito_texture.png",
        "public/original_texture.png"
    ]
    for p in paths:
        if os.path.exists(p):
            img = Image.open(p)
            print(f"{p}: size={img.size}, mode={img.mode}")
        else:
            print(f"{p} does not exist")

if __name__ == "__main__":
    main()
