"""Slice shots/<name>-full.png into readable JPEG strips. usage: slice.py <name> [slice_h] [out_w]"""
import os, sys
from PIL import Image

name = sys.argv[1]
slice_h = int(sys.argv[2]) if len(sys.argv) > 2 else 1300
out_w = int(sys.argv[3]) if len(sys.argv) > 3 else 1100
shots = os.path.join(os.path.dirname(os.path.abspath(__file__)), "shots")
for f in os.listdir(shots):
    if f.startswith(name + "-") and f.endswith(".jpg"): os.remove(os.path.join(shots, f))
im = Image.open(os.path.join(shots, f"{name}-full.png")).convert("RGB")
n = 0
for y in range(0, im.height, slice_h):
    part = im.crop((0, y, im.width, min(im.height, y + slice_h)))
    if part.height < 40: break
    if part.width > out_w: part = part.resize((out_w, round(part.height * out_w / part.width)), Image.LANCZOS)
    part.save(os.path.join(shots, f"{name}-{n:02d}.jpg"), quality=80); n += 1
print(f"{name}: {im.width}x{im.height} -> {n} slices")
