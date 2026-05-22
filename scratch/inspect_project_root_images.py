import os
import glob
import numpy as np
from PIL import Image

def analyze_img(path):
    try:
        with Image.open(path) as img:
            arr = np.array(img.convert('RGB'))
            # Check channels std dev to determine if it's grayscale/silver
            channel_std = np.std(arr, axis=2).mean()
            # Check dominant colors
            r_mean = arr[:, :, 0].mean()
            g_mean = arr[:, :, 1].mean()
            b_mean = arr[:, :, 2].mean()
            
            # Simple color classifier
            color_desc = "unknown"
            if channel_std < 5.0:
                color_desc = "grayscale / silver"
            else:
                if r_mean > g_mean * 1.2 and r_mean > b_mean * 1.2:
                    color_desc = "red-ish"
                elif g_mean > r_mean * 1.2 and g_mean > b_mean * 1.2:
                    color_desc = "green-ish"
                elif b_mean > r_mean * 1.2 and b_mean > g_mean * 1.2:
                    color_desc = "blue-ish"
            
            print(f"{os.path.basename(path)}: size={img.size}, mode={img.mode}, color_type={color_desc} (R={r_mean:.1f}, G={g_mean:.1f}, B={b_mean:.1f}, std={channel_std:.2f})")
    except Exception as e:
        print(f"Error reading {path}: {e}")

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/"
    files = glob.glob(os.path.join(brain_dir, "*.png"))
    for f in sorted(files):
        analyze_img(f)

if __name__ == "__main__":
    main()
