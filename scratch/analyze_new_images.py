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
        h, w, c = arr.shape
        print(f"\nFile: {filename} ({w}x{h})")
        
        # Let's check for red pixels (R > 180, G < 50, B < 50)
        # The front view has prominent red wolf eyes and red "UNSEEN POWER" text.
        red_mask = (arr[:, :, 0] > 180) & (arr[:, :, 1] < 60) & (arr[:, :, 2] < 60)
        red_count = np.sum(red_mask)
        
        # Let's check the middle strip columns to see if there is text vs wolf face
        # We can calculate the standard deviation or textureness of the image content
        # Back view has a lot of small text, while front view has a smooth wolf face gradient.
        # Let's print the red count
        print(f"  Red pixels count: {red_count}")
        
        # Let's inspect some row averages or print out a summary
        # We can also search for barcode or other features by printing the column/row profile
        # But red count is usually a very strong indicator of the front view!
        
if __name__ == "__main__":
    main()
