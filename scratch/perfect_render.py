import numpy as np
from PIL import Image

def render_perfect_cylinder(texture_path, output_path, width=200, height=600):
    print(f"Rendering {texture_path}...")
    texture = np.array(Image.open(texture_path).convert('RGB'))
    
    # We discovered the actual printed label is EXACTLY between Y=663 and Y=1620 in the 2048x2048 texture.
    # Everything above 663 and below 1620 is the silver metal caps.
    # We crop the texture to just the label before rendering.
    texture_label = texture[663:1621, :, :]
    th, tw, _ = texture_label.shape
    
    out = np.zeros((height, width, 4), dtype=np.uint8)
    radius = width / 2.0
    curve_amount = width * 0.08  # slight perspective curve
    
    for y in range(height):
        for x in range(width):
            dx = x - radius
            # Prevent domain error for arcsin
            if dx < -radius + 0.1: dx = -radius + 0.1
            if dx > radius - 0.1: dx = radius - 0.1
            
            theta = np.arcsin(dx / radius)
            
            # Map theta to texture u coordinate
            u = int(tw / 2 + (theta / (np.pi / 2)) * (tw / 4))
            u = np.clip(u, 0, tw - 1)
            
            # Add perspective curve to y
            y_offset = curve_amount * (1 - np.cos(theta))
            v = int((y - y_offset) / (height - curve_amount) * th)
            
            if 0 <= v < th:
                color = texture_label[v, u]
                
                # Shading
                shading = 0.6 + 0.4 * np.cos(theta)
                highlight = np.exp(-((theta + 0.4)**2) / 0.08) * 0.35
                highlight2 = np.exp(-((theta - 0.8)**2) / 0.1) * 0.15
                rim = np.exp(-((abs(theta) - 1.45)**2) / 0.05) * 0.25
                
                final_color = color * shading + np.array([255, 255, 255]) * (highlight + highlight2 + rim)
                
                out[y, x, :3] = np.clip(final_color, 0, 255)
                out[y, x, 3] = 255
                
    Image.fromarray(out).save(output_path)
    print(f"Saved perfectly cropped label to {output_path}")

if __name__ == "__main__":
    render_perfect_cylinder("public/mojito_texture.png", "public/mojito_front.png")
    render_perfect_cylinder("public/original_texture.png", "public/original_front.png")
    render_perfect_cylinder("public/sugarfree_texture.png", "public/sugarfree_front.png")
