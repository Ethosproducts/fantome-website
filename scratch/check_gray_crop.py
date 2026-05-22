import os
import numpy as np
from PIL import Image

def main():
    crop_path = "scratch/extracted/active_crop_media__1779463379400.png"
    if os.path.exists(crop_path):
        img = Image.open(crop_path)
        print(f"File {crop_path} exists. Size: {img.size}")
        # Check standard deviation of RGB channels to verify it's grayscale (silver)
        arr = np.array(img.convert('RGB'))
        # Standard deviation between channels (should be very low for grayscale)
        channel_std = np.std(arr, axis=2).mean()
        print(f"Channel standard deviation (lower = more grayscale): {channel_std}")
        # Mean brightness
        mean_brightness = arr.mean()
        print(f"Mean brightness: {mean_brightness}")
    else:
        print("File does not exist")

if __name__ == "__main__":
    main()
