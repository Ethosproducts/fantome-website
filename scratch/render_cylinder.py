import numpy as np
from PIL import Image

def render_cylinder(texture_path, output_path, width=200, height=600):
    print(f"Rendering {texture_path}...")
    texture = np.array(Image.open(texture_path).convert('RGB'))
    th, tw, _ = texture.shape
    
    out = np.zeros((height, width, 4), dtype=np.uint8)
    radius = width / 2.0
    curve_amount = width * 0.08  # 8% curve for top/bottom perspective
    
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
                color = texture[v, u]
                
                # Base shading (darker at edges)
                shading = 0.6 + 0.4 * np.cos(theta)
                
                # Specular highlight (bright vertical reflection)
                highlight = np.exp(-((theta + 0.4)**2) / 0.08) * 0.35
                
                # Secondary subtle highlight
                highlight2 = np.exp(-((theta - 0.8)**2) / 0.1) * 0.15
                
                # Edge rim lighting
                rim = np.exp(-((abs(theta) - 1.45)**2) / 0.05) * 0.25
                
                # Combine
                final_color = color * shading + np.array([255, 255, 255]) * (highlight + highlight2 + rim)
                
                out[y, x, :3] = np.clip(final_color, 0, 255)
                out[y, x, 3] = 255
                
    Image.fromarray(out).save(output_path)
    print(f"Saved {output_path}")

if __name__ == "__main__":
    render_cylinder("public/mojito_texture.png", "public/mojito_front.png")
    render_cylinder("public/original_texture.png", "public/original_front.png")
    render_cylinder("public/sugarfree_texture.png", "public/sugarfree_front.png")
