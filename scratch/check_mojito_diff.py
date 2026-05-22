import os
import numpy as np
from PIL import Image

def main():
    mojito_path = "public/mojito_perfect.png"
    original_path = "public/original_perfect.png"
    
    img_moj = Image.open(mojito_path)
    img_orig = Image.open(original_path)
    
    print("mojito_perfect:", img_moj.size, img_moj.mode)
    print("original_perfect:", img_orig.size, img_orig.mode)
    
    # Check if we can find a matching cropped image for Mojito
    # mojito active crop is scratch/extracted/active_crop_media__1779465876057.png (328x553)
    crop_mojito_path = "scratch/extracted/active_crop_media__1779465876057.png"
    if os.path.exists(crop_mojito_path):
        img_crop = Image.open(crop_mojito_path)
        print("Crop mojito:", img_crop.size, img_crop.mode)
        
        # Check standard deviation or difference after resizing crop to 332x557
        img_crop_resized = img_crop.resize((332, 557), Image.Resampling.LANCZOS)
        diff = np.abs(np.array(img_moj.convert('RGB')) - np.array(img_crop_resized.convert('RGB')))
        print("Diff Mojito mean absolute error:", diff.mean())

if __name__ == "__main__":
    main()
