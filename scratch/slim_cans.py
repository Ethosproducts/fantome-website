from PIL import Image

def make_slim(filepath):
    try:
        img = Image.open(filepath)
        w, h = img.size
        # A standard slim 250ml can has an aspect ratio of roughly 1:2.8
        new_w = int(h / 2.8)
        img_slim = img.resize((new_w, h), Image.Resampling.LANCZOS)
        img_slim.save(filepath)
        print(f"Resized {filepath} from {w}x{h} to {new_w}x{h}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    make_slim("public/mojito_front.png")
    make_slim("public/original_front.png")
    make_slim("public/sugarfree_front.png")
