import numpy as np
from PIL import Image
import sys

def render_cylinder(texture_path, output_path, width=200, height=600):
    texture = np.array(Image.open(texture_path).convert('RGB'))
    th, tw, _ = texture.shape
    out = np.zeros((height, width, 4), dtype=np.uint8)
    radius = width / 2.0
    curve_amount = width * 0.08
    
    for y in range(height):
        for x in range(width):
            dx = x - radius
            if dx < -radius + 0.1: dx = -radius + 0.1
            if dx > radius - 0.1: dx = radius - 0.1
            theta = np.arcsin(dx / radius)
            u = int(tw / 2 + (theta / (np.pi / 2)) * (tw / 4))
            u = np.clip(u, 0, tw - 1)
            y_offset = curve_amount * (1 - np.cos(theta))
            v = int((y - y_offset) / (height - curve_amount) * th)
            if 0 <= v < th:
                color = texture[v, u]
                shading = 0.6 + 0.4 * np.cos(theta)
                highlight = np.exp(-((theta + 0.4)**2) / 0.08) * 0.35
                highlight2 = np.exp(-((theta - 0.8)**2) / 0.1) * 0.15
                rim = np.exp(-((abs(theta) - 1.45)**2) / 0.05) * 0.25
                final_color = color * shading + np.array([255, 255, 255]) * (highlight + highlight2 + rim)
                out[y, x, :3] = np.clip(final_color, 0, 255)
                out[y, x, 3] = 255
    return out

def extreme_crop(texture_path, output_path, is_sugarfree=False):
    # Render fresh cylinder
    arr = render_cylinder(texture_path, output_path)
    
    # We will aggressively crop the top 18% and bottom 22% of the image.
    # This guarantees the silver rims are completely cut off, leaving only the colored label.
    h, w, _ = arr.shape
    top_crop = int(h * 0.18)
    bottom_crop = int(h * 0.80)  # Crop bottom 20%
    
    arr_cropped = arr[top_crop:bottom_crop, :, :]
    
    # Save
    Image.fromarray(arr_cropped).save(output_path)
    print(f"Aggressively cropped {output_path} to {bottom_crop - top_crop} height.")

if __name__ == "__main__":
    extreme_crop("public/mojito_texture.png", "public/mojito_front.png")
    extreme_crop("public/original_texture.png", "public/original_front.png")
    extreme_crop("public/sugarfree_texture.png", "public/sugarfree_front.png", is_sugarfree=True)
