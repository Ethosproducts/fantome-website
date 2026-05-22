import numpy as np
from PIL import Image

def flawless_render(texture_path, output_path, width=240, height=672):
    print(f"Flawless rendering {texture_path}...")
    # Load texture
    texture = np.array(Image.open(texture_path).convert('RGB'))
    
    # EXACT crop of the texture.
    # The red line/colored label ends before 1580.
    # Everything from 1580 downwards is the silver metal rim.
    # The top of the label starts around 663.
    # By strictly using 663 to 1580, we guarantee ZERO silver pixels are included.
    texture_label = texture[663:1580, :, :]
    th, tw, _ = texture_label.shape
    
    out = np.zeros((height, width, 4), dtype=np.uint8)
    radius = width / 2.0
    curve_amount = width * 0.04  # VERY subtle curve, so it doesn't look cut or jagged
    
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
                color = texture_label[v, u]
                
                # Subtle photorealistic shading
                shading = 0.7 + 0.3 * np.cos(theta)
                highlight = np.exp(-((theta + 0.4)**2) / 0.1) * 0.3
                rim = np.exp(-((abs(theta) - 1.45)**2) / 0.03) * 0.2
                
                final_color = color * shading + np.array([255, 255, 255]) * (highlight + rim)
                
                out[y, x, :3] = np.clip(final_color, 0, 255)
                out[y, x, 3] = 255
                
    Image.fromarray(out).save(output_path)
    print(f"Saved flawless cylinder to {output_path}")

if __name__ == "__main__":
    flawless_render("public/mojito_texture.png", "public/mojito_straight.png")
    flawless_render("public/original_texture.png", "public/original_straight.png")
    flawless_render("public/sugarfree_texture.png", "public/sugarfree_straight.png")
