import os
import numpy as np
from PIL import Image

def analyze_and_extract():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/"
    images = [f for f in os.listdir(brain_dir) if f.endswith('.png')]
    images.sort()
    
    os.makedirs("scratch/extracted", exist_ok=True)
    
    for filename in images:
        path = os.path.join(brain_dir, filename)
        img = Image.open(path)
        arr = np.array(img.convert('RGBA'))
        h, w, c = arr.shape
        
        # Print general info
        print(f"\nProcessing {filename} ({w}x{h})...")
        
        # Let's find the bounding box of non-white/non-background pixels.
        # Often the background is white (255,255,255) or very light.
        # Let's define background as pixels where R, G, B are all > 240 or all close to each other (gray).
        # Or let's just find non-white pixels:
        is_bg = (arr[:, :, 0] > 240) & (arr[:, :, 1] > 240) & (arr[:, :, 2] > 240)
        # If it's a screenshot with dark background or different UI, let's just crop any non-constant area
        # Find rows/columns with variance
        row_var = np.var(arr[:, :, :3], axis=(1, 2))
        col_var = np.var(arr[:, :, :3], axis=(0, 2))
        
        active_rows = np.where(row_var > 100)[0]
        active_cols = np.where(col_var > 100)[0]
        
        if len(active_rows) > 0 and len(active_cols) > 0:
            y0, y1 = active_rows[0], active_rows[-1]
            x0, x1 = active_cols[0], active_cols[-1]
            print(f"  Active bbox: y:({y0} to {y1}), x:({x0} to {x1})")
            
            # Let's also search for any distinct green bottle in the image.
            # Green can has R < 100, G > 100, B < 100.
            rgb = arr[:, :, :3]
            green_pixels = (rgb[:, :, 1] > 80) & (rgb[:, :, 0] < 120) & (rgb[:, :, 2] < 120)
            green_y, green_x = np.where(green_pixels)
            if len(green_y) > 0:
                gy0, gy1 = green_y.min(), green_y.max()
                gx0, gx1 = green_x.min(), green_x.max()
                print(f"  Green bottle bbox: y:({gy0} to {gy1}), x:({gx0} to {gx1})")
                
                # Save the green region with some padding
                pad = 20
                gy0_p = max(0, gy0 - pad)
                gy1_p = min(h, gy1 + pad)
                gx0_p = max(0, gx0 - pad)
                gx1_p = min(w, gx1 + pad)
                
                green_crop = Image.fromarray(arr[gy0_p:gy1_p, gx0_p:gx1_p])
                green_crop.save(f"scratch/extracted/green_crop_{filename}")
                print(f"  Saved green crop to scratch/extracted/green_crop_{filename}")
            
            # Save the full active bbox crop
            crop_img = Image.fromarray(arr[y0:y1, x0:x1])
            crop_img.save(f"scratch/extracted/active_crop_{filename}")
            print(f"  Saved active crop to scratch/extracted/active_crop_{filename}")
        else:
            print("  No active area found")

if __name__ == "__main__":
    analyze_and_extract()
