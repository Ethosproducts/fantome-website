import numpy as np
from PIL import Image

def crop_until_red(filepath):
    print(f"Dynamically cropping {filepath} from the bottom until we hit the red/colored label...")
    img = Image.open(filepath).convert('RGBA')
    arr = np.array(img)
    
    h, w, c = arr.shape
    
    # We want to crop from the bottom until we hit a pixel that is either dark (black label) or colored (red/green)
    # The silver rim is mostly gray (R=G=B).
    # Let's search from the bottom up.
    bottom_crop = h
    for y in range(h-1, -1, -1):
        row = arr[y, :, :]
        # Check if the row has any non-gray pixels or dark pixels
        # Gray means r,g,b are similar and > 50
        r, g, b = row[:, 0], row[:, 1], row[:, 2]
        
        # Calculate color difference (max - min) to detect saturation
        color_diff = np.max(row[:, :3], axis=1) - np.min(row[:, :3], axis=1)
        
        # Check if row is dark (mean < 30) or saturated (diff > 30)
        is_dark = np.mean(row[:, :3], axis=1) < 40
        is_colored = color_diff > 30
        
        if np.any(is_dark) or np.any(is_colored):
            bottom_crop = y + 1  # Add a little buffer so we don't cut into it
            break
            
    print(f"Found label bottom at y={bottom_crop}. Cropping everything below.")
    
    arr_cropped = arr[:bottom_crop, :, :]
    
    # Let's also do the same from the top to be safe
    top_crop = 0
    for y in range(bottom_crop):
        row = arr[y, :, :]
        color_diff = np.max(row[:, :3], axis=1) - np.min(row[:, :3], axis=1)
        is_dark = np.mean(row[:, :3], axis=1) < 40
        is_colored = color_diff > 30
        if np.any(is_dark) or np.any(is_colored):
            top_crop = max(0, y - 1)
            break
            
    print(f"Found label top at y={top_crop}. Cropping everything above.")
    
    arr_cropped = arr[top_crop:bottom_crop, :, :]
    
    Image.fromarray(arr_cropped).save(filepath)
    print(f"Final shape for {filepath}: {arr_cropped.shape}")

if __name__ == "__main__":
    crop_until_red("public/mojito_front.png")
    crop_until_red("public/original_front.png")
    crop_until_red("public/sugarfree_front.png")
