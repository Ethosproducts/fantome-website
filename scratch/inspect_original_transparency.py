from PIL import Image
import numpy as np

def main():
    img = Image.open("scratch/original_mojito_front.png")
    arr = np.array(img)
    alpha = arr[:, :, 3]
    print("original_mojito_front.png transparency details:")
    print("Opaque pixels (Alpha > 240):", np.sum(alpha > 240))
    print("Transparent pixels (Alpha < 10):", np.sum(alpha < 10))
    print("Total pixels:", alpha.size)

if __name__ == "__main__":
    main()
