from PIL import Image
import numpy as np

# Load the image
img_path = 'public/sugarfree_perfect.png'
img = Image.open(img_path).convert("RGBA")
data = np.array(img)

# The white/gray block is at the bottom. Let's find its height.
# We can look at the alpha channel.
alpha = data[:, :, 3]

# Find the lowest row that has a non-transparent pixel
non_transparent_rows = np.where(np.any(alpha > 0, axis=1))[0]
if len(non_transparent_rows) > 0:
    bottom_row = non_transparent_rows[-1]
    # Let's just crop out the bottom 25 pixels of the visible image to be safe
    # Or just make the bottom 25 pixels fully transparent
    
    # Let's inspect the bottom 50 rows of the visible part
    print(f"Bottom row of image is at index: {bottom_row}, image height is {data.shape[0]}")
    
    # We will just trim the bottom 15 rows of the visible content
    trim_amount = 20
    data[bottom_row - trim_amount + 1:, :, 3] = 0

    new_img = Image.fromarray(data)
    new_img.save('public/sugarfree_perfect.png')
    print(f"Trimmed {trim_amount} pixels from the bottom.")
else:
    print("No non-transparent pixels found.")
