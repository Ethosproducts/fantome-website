import numpy as np
from PIL import Image

def process_mojito():
    # Path to the user's latest green can image
    path = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/media__1779466382899.png"
    img = Image.open(path).convert('RGBA')
    arr = np.array(img)
    
    # Bounding box of the can including shadow:
    # y: 67 to 620 (height 553), x: 405 to 733 (width 328)
    # Let's add a small margin of 2 pixels around it to not cut anything
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
                # Interpolate alpha between 0 and 255
                alpha[y, x] = int(((d - 4) / 8.0) * 255)
                
    crop[:, :, 3] = alpha
    
    # Let's save it
    out_img = Image.fromarray(crop, 'RGBA')
    out_img.save("public/mojito_perfect.png")
    print("Processed and saved public/mojito_perfect.png successfully!")
    print(f"Output size: {out_img.size}")

if __name__ == "__main__":
    process_mojito()
