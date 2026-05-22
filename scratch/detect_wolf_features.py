import os
import numpy as np
from PIL import Image

def main():
    brain_dir = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/"
    images = [
        "media__1779429929712.png",
        "media__1779429940281.png",
        "media__1779429955742.png"
    ]
    
    for filename in images:
        path = os.path.join(brain_dir, filename)
        img = Image.open(path)
        arr = np.array(img.convert('RGB'))
        
        # Red eyes search: upper half (Y=300 to 420), center columns (X=480 to 540)
        # Red definition: R > 150, G < 60, B < 60
        r = arr[300:420, 480:540, 0].astype(float)
        g = arr[300:420, 480:540, 1].astype(float)
        b = arr[300:420, 480:540, 2].astype(float)
        red_mask = (r > 130) & (r > g * 1.8) & (r > b * 1.8)
        red_eyes_count = np.sum(red_mask)
        
        # Check for barcode on the lower half (Y=400 to 580)
        # Barcode is a series of vertical black/white lines on the back view.
        # Let's count high vertical gradients (horizontal changes) in a strip (Y=420..500)
        gray = np.array(img.convert('L'))
        strip = gray[420:500, 460:560]
        grad_x = np.abs(strip[:, 1:] - strip[:, :-1])
        barcode_score = np.sum(grad_x > 50)
        
        print(f"\nFile: {filename}")
        print(f"  Upper-Center Red Eyes Pixel Count: {red_eyes_count}")
        print(f"  Lower-Center Barcode Score: {barcode_score}")

if __name__ == "__main__":
    main()
