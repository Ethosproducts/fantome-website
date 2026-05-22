import numpy as np
from PIL import Image
import os

def process_image(src_path, dest_path):
    print(f"Processing {src_path} -> {dest_path}...")
    img = Image.open(src_path).convert('RGBA')
    arr = np.array(img)
    
    # Bounding box of the can including shadow:
    # y: 67 to 620, x: 405 to 733.
    # We add a 2-pixel margin around it.
    y0, y1 = 65, 622
    x0, x1 = 403, 735
    
    crop = arr[y0:y1, x0:x1].copy()
    h, w, c = crop.shape
    
    # Target background color is [246, 246, 246]
    bg_color = np.array([246, 246, 246])
    
    # Calculate distance to background color
    rgb = crop[:, :, :3]
    diff = np.abs(rgb - bg_color)
    dist = np.max(diff, axis=2) # maximum channel difference
    
    # Create smooth alpha channel
    # Under 4: fully transparent
    # Above 12: fully opaque
    # In between: smooth transition
    alpha = np.ones((h, w), dtype=np.uint8) * 255
    for y in range(h):
        for x in range(w):
            d = dist[y, x]
            if d <= 4:
                alpha[y, x] = 0
            elif d < 12:
                alpha[y, x] = int(((d - 4) / 8.0) * 255)
                
    crop[:, :, 3] = alpha
    
    # Save it
    out_img = Image.fromarray(crop, 'RGBA')
    out_img.save(dest_path)
    print(f"Saved to {dest_path} successfully. Size: {out_img.size}")

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/"
    
    # Red can (Original) - from step 0/1 or step 77
    red_source = os.path.join(brain_dir, "media__1779463379400.png")
    # Green can (Mojito) - from step 205
    green_source = os.path.join(brain_dir, "media__1779466382899.png")
    
    process_image(red_source, "public/original_perfect.png")
    process_image(green_source, "public/mojito_perfect.png")

if __name__ == "__main__":
    main()
