import os
import numpy as np
from PIL import Image

def get_hash(img_path):
    img = Image.open(img_path).convert('RGB')
    return np.array(img).mean()

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/"
    perfects = ["public/mojito_perfect.png", "public/original_perfect.png", "public/sugarfree_perfect.png"]
    
    for p in perfects:
        p_img = Image.open(p)
        print(f"{p}: size={p_img.size}")
        
    print("\nBrain images:")
    for f in os.listdir(brain_dir):
        if f.endswith('.png'):
            f_path = os.path.join(brain_dir, f)
            img = Image.open(f_path)
            print(f"  {f}: size={img.size}")

if __name__ == "__main__":
    main()
