import os
import numpy as np
from PIL import Image

def analyze_channels(img_path):
    img = Image.open(img_path).convert('RGB')
    arr = np.array(img)
    # Average color of center region
    h, w, _ = arr.shape
    center = arr[h//4:3*h//4, w//4:3*w//4, :]
    mean_color = center.mean(axis=(0, 1))
    print(f"{os.path.basename(img_path)}: size={img.size}, mean center RGB={mean_color}")

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/"
    for f in sorted(os.listdir(brain_dir)):
        if f.endswith('.png'):
            analyze_channels(os.path.join(brain_dir, f))

if __name__ == "__main__":
    main()
