# scripts/grade_and_sort.py
import shutil
from pathlib import Path
import random

ROOT = Path(__file__).resolve().parents[1]
UPLOAD_DIR = ROOT / "uploads" / "processed"
DATA_DIR = ROOT / "data" / "images"

def grade_image(image_path, crop="wheat"):
    """
    Placeholder grading function.
    Abhi ke liye random grade assign karta hai (A/B/C).
    Future me ML model yaha use hoga.
    """
    grade = random.choice(["A", "B", "C"])
    target_dir = DATA_DIR / crop / f"grade{grade}"
    target_dir.mkdir(parents=True, exist_ok=True)

    shutil.move(str(image_path), target_dir / image_path.name)
    print(f"✅ {image_path.name} moved to {target_dir}")
    return grade

if __name__ == "__main__":
    # example run
    for img in UPLOAD_DIR.glob("*.jpg"):
        grade_image(img, crop="wheat")
