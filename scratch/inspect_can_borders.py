from PIL import Image
import numpy as np

def main():
    path = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/media__1779465876057.png"
    img = Image.open(path)
    arr = np.array(img.convert('RGBA'))
    
    # Active bounding box
    y0, y1 = 67, 620
    x0, x1 = 405, 733
    
    crop = arr[y0:y1, x0:x1]
    h, w, _ = crop.shape
    print(f"Crop shape: {h}x{w}")
    
    # Check top rows
    print("Top 5 rows middle pixels:")
    for i in range(5):
        print(f"Row {i}:", crop[i, w//2])
        
    # Check bottom rows
    print("Bottom 5 rows middle pixels:")
    for i in range(5):
        print(f"Row {h - 1 - i}:", crop[h - 1 - i, w//2])

if __name__ == "__main__":
    main()
