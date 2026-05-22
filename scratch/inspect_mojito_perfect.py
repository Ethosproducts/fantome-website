import os
import numpy as np
from PIL import Image

def main():
    perfect_path = "public/mojito_perfect.png"
    img_perf = Image.open(perfect_path)
    print(f"public/mojito_perfect.png: {img_perf.size}, Mode: {img_perf.mode}")
    
    media_path = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/media__1779465876057.png"
    img_media = Image.open(media_path)
    print(f"media__1779465876057.png: {img_media.size}, Mode: {img_media.mode}")
    
    # Are they the same or different? Let's check.
    arr_perf = np.array(img_perf)
    arr_media = np.array(img_media)
    
    # Let's print unique values or some pixels
    print("Perfect shape:", arr_perf.shape)
    print("Media shape:", arr_media.shape)
    
    # Find active region of perfect
    row_var = np.var(arr_perf[:, :, :3], axis=(1, 2))
    col_var = np.var(arr_perf[:, :, :3], axis=(0, 2))
    active_rows = np.where(row_var > 100)[0]
    active_cols = np.where(col_var > 100)[0]
    if len(active_rows) > 0:
        print(f"Perfect active y: {active_rows[0]} to {active_rows[-1]}, x: {active_cols[0]} to {active_cols[-1]}")

if __name__ == "__main__":
    main()
