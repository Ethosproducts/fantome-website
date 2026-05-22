import os
from PIL import Image

def main():
    images = [
        "public/original_perfect.png",
        "public/mojito_perfect.png",
        "public/sugarfree_perfect.png",
        "public/sugarfree_center.png",
        "public/sugarfree_front.png",
        "public/sugarfree_straight.png",
        "public/verify_final_Sugar_Free.png"
    ]
    
    for img_path in images:
        if os.path.exists(img_path):
            with Image.open(img_path) as img:
                print(f"{img_path}: size={img.size}, mode={img.mode}")
        else:
            print(f"{img_path} does not exist")

if __name__ == "__main__":
    main()
