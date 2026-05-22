import os
import numpy as np
from PIL import Image

def to_ascii(arr, cols=80, rows=30):
    # Resize image to low res
    img = Image.fromarray(arr)
    img_small = img.resize((cols, rows))
    arr_small = np.array(img_small.convert('L')) # convert to grayscale
    
    # ASCII characters from dark to light
    chars = " .:-=+*#%@"
    num_chars = len(chars)
    
    ascii_rows = []
    for r in range(rows):
        ascii_row = ""
        for c in range(cols):
            val = arr_small[r, c]
            char_idx = int(val / 256.0 * num_chars)
            ascii_row += chars[char_idx]
        ascii_rows.append(ascii_row)
    return "\n".join(ascii_rows)

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
        arr = np.array(img)
        print(f"\n========================================\nFile: {filename}\n========================================")
        print(to_ascii(arr, cols=60, rows=25))

if __name__ == "__main__":
    main()
