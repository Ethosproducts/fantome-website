import os
from PIL import Image
import numpy as np

# Define file paths
brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
img_left_path = os.path.join(brain_dir, "media__1779429955742.png")
img_back_path = os.path.join(brain_dir, "media__1779429940281.png")
img_front_path = os.path.join(brain_dir, "media__1779429929712.png")

output_path = "public/original_texture.png"

X_CENTER = 511.5
RADIUS = 104.0

def main():
    print("Loading source images for Original (sugar) flavor...")
    img_left = np.array(Image.open(img_left_path).convert('RGB'), dtype=np.float32)
    img_back = np.array(Image.open(img_back_path).convert('RGB'), dtype=np.float32)
    img_front = np.array(Image.open(img_front_path).convert('RGB'), dtype=np.float32)
    
    # Target texture resolution (2048x2048 for Ultra HD clarity)
    tw, th = 2048, 2048
    
    # Create coordinate grids
    U, V = np.meshgrid(np.arange(tw), np.arange(th))
    
    # Map coordinates to angle theta in [0, 2*pi]
    theta = (U / tw) * 2.0 * np.pi
    
    # We define the center angle of each view:
    views = [
        {"arr": img_front, "center_angle": np.pi},
        {"arr": img_left, "center_angle": 1.5 * np.pi},
        {"arr": img_back, "center_angle": 0.0}
    ]
    
    # Stretch factor for weight function to allow smooth blending overlap at boundaries
    overlap_factor = 90.0 / 100.0
    
    accum_color = np.zeros((th, tw, 3), dtype=np.float32)
    accum_weight = np.zeros((th, tw), dtype=np.float32)
    
    print("Generating 2048x2048 HD cylinder texture for Original flavor using vectorized math with curvature correction...")
    for view in views:
        # Relative angle from center of this view
        d_theta = theta - view["center_angle"]
        d_theta = (d_theta + np.pi) % (2.0 * np.pi) - np.pi
        
        # Calculate visibility mask and weights
        visible = np.abs(d_theta) < np.pi / 2.0
        weight = np.cos(d_theta * overlap_factor)
        weight[~visible] = 0.0
        weight = np.maximum(0.0, weight)
        
        # Project angle to perspective cylinder coordinates
        x = X_CENTER + RADIUS * np.sin(d_theta)
        
        # Calculate dynamic y_start and y_end for each column to correct for label perspective curvature.
        # This keeps the sampling area strictly within the printed black/red label boundaries.
        y_start = 82.0 + 12.0 * ((x - X_CENTER) / RADIUS)**2
        y_end = 594.0 - 15.0 * ((x - X_CENTER) / RADIUS)**2
        
        # Map V coordinate (from 0 to th-1) to the dynamic y range
        y = y_start + (V / (th - 1.0)) * (y_end - y_start)
        y = np.clip(y, 0.0, 681.0)
        
        # Bilinear interpolation index grids
        x0 = np.floor(x).astype(np.int32)
        x1 = np.minimum(x0 + 1, 1023)
        y0 = np.floor(y).astype(np.int32)
        y1 = np.minimum(y0 + 1, 681)
        
        x0 = np.maximum(0, x0)
        y0 = np.maximum(0, y0)
        
        # Interpolation weight parameters
        wa = (x1 - x) * (y1 - y)
        wb = (x - x0) * (y1 - y)
        wc = (x1 - x) * (y - y0)
        wd = (x - x0) * (y - y0)
        
        # Index into original image arrays
        c_a = view["arr"][y0, x0]
        c_b = view["arr"][y0, x1]
        c_c = view["arr"][y1, x0]
        c_d = view["arr"][y1, x1]
        
        # Sampled pixel colors mapped to cylinder space
        color = (c_a * wa[:, :, np.newaxis] + 
                 c_b * wb[:, :, np.newaxis] + 
                 c_c * wc[:, :, np.newaxis] + 
                 c_d * wd[:, :, np.newaxis])
        
        # Accumulate weighted color and weight
        accum_color += color * weight[:, :, np.newaxis]
        accum_weight += weight
        
    # Normalize output array
    output_arr = np.zeros_like(accum_color)
    valid = accum_weight > 0
    output_arr[valid] = accum_color[valid] / accum_weight[valid][:, np.newaxis]
    output_arr[~valid] = [15.0, 15.0, 15.0] # Matte dark background for missing weights
    
    # Save the resulting HD texture
    print(f"Saving output texture to {output_path}...")
    out_img = Image.fromarray(np.clip(output_arr, 0, 255).astype(np.uint8))
    out_img.save(output_path)
    print("Original HD Texture generated successfully!")

if __name__ == "__main__":
    main()
