from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "uploads" / "original"
DST = ROOT / "uploads" / "processed"
DST.mkdir(parents=True, exist_ok=True)

for p in SRC.glob("*"):
    if p.suffix.lower() not in (".jpg",".jpeg",".png"): continue
    im = Image.open(p).convert("RGB").resize((224,224))
    im.save(DST / p.name)
    print("Processed:", p.name)
