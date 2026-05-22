import os
import numpy as np
from PIL import Image

def extract_can(input_path, output_path):
    print(f"Extracting can from {input_path}...")
    img = Image.open(input_path).convert('RGBA')
    arr = np.array(img)
    h, w, c = arr.shape
    
    # Background is mostly white
    # Let's find columns that are not entirely white
    non_white = np.any(arr[:, :, :3] < 240, axis=2)
    
    # Find bounding box
    y_indices = np.where(np.any(non_white, axis=1))[0]
    x_indices = np.where(np.any(non_white, axis=0))[0]
    
    if len(y_indices) == 0 or len(x_indices) == 0:
        print("No can found!")
        return None
        
    y_min, y_max = y_indices[0], y_indices[-1]
    x_min, x_max = x_indices[0], x_indices[-1]
    
    # Crop
    arr_cropped = arr[y_min:y_max+1, x_min:x_max+1]
    
    # Make white pixels transparent
    h_c, w_c, _ = arr_cropped.shape
    for y in range(h_c):
        for x in range(w_c):
            if np.all(arr_cropped[y, x, :3] > 240):
                arr_cropped[y, x, 3] = 0
                
    out_img = Image.fromarray(arr_cropped, 'RGBA')
    out_img.save(output_path)
    print(f"Saved {output_path}")
    return arr_cropped

def color_swap(arr, output_path, target_color):
    # arr is RGBA
    h, w, c = arr.shape
    out_arr = arr.copy()
    
    # Red is roughly R > 150, G < 100, B < 100
    is_red = (arr[:, :, 0] > 100) & (arr[:, :, 1] < 80) & (arr[:, :, 2] < 80) & (arr[:, :, 3] > 0)
    
    if target_color == 'green':
        # Swap R and G channels for red pixels
        out_arr[is_red, 0] = arr[is_red, 1]  # R gets old G
        out_arr[is_red, 1] = arr[is_red, 0]  # G gets old R
        # Boost green
        out_arr[is_red, 1] = np.clip(out_arr[is_red, 1] * 1.5, 0, 255)
    elif target_color == 'white':
        # Make red pixels white/grey
        gray = np.mean(arr[is_red, :3], axis=1)
        out_arr[is_red, 0] = gray + 100
        out_arr[is_red, 1] = gray + 100
        out_arr[is_red, 2] = gray + 100
        out_arr[is_red, :3] = np.clip(out_arr[is_red, :3], 0, 255)
        
    out_img = Image.fromarray(out_arr, 'RGBA')
    out_img.save(output_path)
    print(f"Saved {output_path}")

def main():
    in_file = "C:/Users/prave/.gemini/antigravity/brain/994200fe-5c52-4630-8eb4-7a9cde8098fe/media__1779448397127.png"
    arr = extract_can(in_file, "public/original_front.png")
    if arr is not None:
        color_swap(arr, "public/mojito_front.png", "green")
        color_swap(arr, "public/sugarfree_front.png", "white")

if __name__ == "__main__":
    main()
