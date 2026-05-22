from PIL import Image
import numpy as np

def main():
    img = Image.open("public/sugarfree_center.png")
    arr = np.array(img)
    print("sugarfree_center.png details:")
    # Check four corners
    print("Top-left pixel:", arr[0, 0])
    print("Top-right pixel:", arr[0, -1])
    print("Bottom-left pixel:", arr[-1, 0])
    print("Bottom-right pixel:", arr[-1, -1])
    
    # Check color variance across rows and cols
    row_var = np.var(arr[:, :, :3], axis=(1, 2))
    col_var = np.var(arr[:, :, :3], axis=(0, 2))
    active_rows = np.where(row_var > 100)[0]
    active_cols = np.where(col_var > 100)[0]
    print(f"Active rows: {active_rows[0]} to {active_rows[-1]}")
    print(f"Active cols: {active_cols[0]} to {active_cols[-1]}")

if __name__ == "__main__":
    main()
