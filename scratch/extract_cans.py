import os
import numpy as np
from PIL import Image

def extract_can(input_path, output_path, bg_type='light'):
    print(f"Processing {os.path.basename(input_path)}...")
    img = Image.open(input_path).convert('RGB')
    arr = np.array(img)
    h, w, c = arr.shape
    
    # Create output RGBA array
    out_arr = np.zeros((h, w, 4), dtype=np.uint8)
    out_arr[:, :, :3] = arr
    out_arr[:, :, 3] = 255 # default opaque
    
    # Determine background color reference from corners
    corner_colors = [
        arr[0, 0], arr[0, w-1], arr[h-1, 0], arr[h-1, w-1]
    ]
    ref_bg = np.mean(corner_colors, axis=0)
    print(f"  Reference background RGB: {ref_bg}")
    
    # Threshold for matching background color
    # For light background, we look for pixels close to ref_bg or very bright
    # For dark background, we look for pixels close to ref_bg or very dark
    def is_bg(pixel):
        diff = np.abs(pixel - ref_bg)
        if bg_type == 'light':
            # close to background color or very bright white
            return np.max(diff) < 20 or np.all(pixel > 240)
        else:
            # close to background color or very dark black
            return np.max(diff) < 20 or np.all(pixel < 25)

    left_bounds = []
    right_bounds = []
    
    for y in range(h):
        # Scan from left
        left = 0
        while left < w and is_bg(arr[y, left]):
            left += 1
            
        # Scan from right
        right = w - 1
        while right >= 0 and is_bg(arr[y, right]):
            right -= 1
            
        if left <= right:
            left_bounds.append(left)
            right_bounds.append(right)
            # Make pixels outside bounds transparent
            out_arr[y, :left, 3] = 0
            out_arr[y, right+1:, 3] = 0
        else:
            # Entire row is background
            left_bounds.append(w)
            right_bounds.append(-1)
            out_arr[y, :, 3] = 0
            
    # Find bounding box of the non-transparent area
    y_indices = np.where(np.any(out_arr[:, :, 3] > 0, axis=1))[0]
    if len(y_indices) == 0:
        print("  Error: No can detected!")
        return
        
    y_min, y_max = y_indices[0], y_indices[-1]
    
    # Find left and right bounds across the detected rows
    x_lefts = [left_bounds[y] for y in range(y_min, y_max+1) if left_bounds[y] < w]
    x_rights = [right_bounds[y] for y in range(y_min, y_max+1) if right_bounds[y] >= 0]
    
    if len(x_lefts) == 0 or len(x_rights) == 0:
        print("  Error: No bounding box coordinates found!")
        return
        
    x_min = min(x_lefts)
    x_max = max(x_rights)
    
    # Add a small padding of 2 pixels if possible
    y_min = max(0, y_min - 2)
    y_max = min(h - 1, y_max + 2)
    x_min = max(0, x_min - 2)
    x_max = min(w - 1, x_max + 2)
    
    # Crop the image to the bounding box
    cropped_arr = out_arr[y_min:y_max+1, x_min:x_max+1]
    
    # Save the output image
    out_img = Image.fromarray(cropped_arr, 'RGBA')
    out_img.save(output_path)
    print(f"  Saved cropped transparent can to {output_path} (size: {out_img.size})")

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    
    # Mojito
    mojito_in = os.path.join(brain_dir, "media__1779425774136.png")
    mojito_out = "public/mojito_front.png"
    extract_can(mojito_in, mojito_out, bg_type='light')
    
    # Original
    original_in = os.path.join(brain_dir, "media__1779432383533.png")
    original_out = "public/original_front.png"
    extract_can(original_in, original_out, bg_type='light')
    
    # Sugar Free
    sugarfree_in = os.path.join(brain_dir, "media__1779431660693.png")
    sugarfree_out = "public/sugarfree_front.png"
    extract_can(sugarfree_in, sugarfree_out, bg_type='dark')

if __name__ == "__main__":
    main()
