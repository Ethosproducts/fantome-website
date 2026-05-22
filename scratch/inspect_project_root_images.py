import os
from PIL import Image
import numpy as np

def main():
    root_dir = "c:/Users/prave/Desktop/fantome"
    files = [
        "verify_final_Original.png",
        "verify_final_Mojito.png",
        "verify_final_Sugar_Free.png"
    ]
    for f in files:
        p = os.path.join(root_dir, f)
        if os.path.exists(p):
            img = Image.open(p)
            print(f"{f}: size={img.size}, mode={img.mode}")
        else:
            print(f"{f} does not exist")

if __name__ == "__main__":
    main()
