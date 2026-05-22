import subprocess
from PIL import Image
import io

def main():
    # Run git show as binary
    res = subprocess.run(["git", "show", "8cfa5821:public/mojito_front.png"], capture_output=True)
    if res.returncode == 0:
        img = Image.open(io.BytesIO(res.stdout))
        print("Original mojito_front.png size:", img.size, img.mode)
        img.save("scratch/original_mojito_front.png")
    else:
        print("Error running git show:", res.stderr)

if __name__ == "__main__":
    main()
