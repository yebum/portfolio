"""Headless-Edge screenshot → sliced JPEGs for review.
usage: python shoot.py <name> <width> <height> <url> [slice_h] [out_w]
"""
import os, subprocess, sys
from PIL import Image

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
name, w, h, url = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
slice_h = int(sys.argv[5]) if len(sys.argv) > 5 else 1100
out_w = int(sys.argv[6]) if len(sys.argv) > 6 else 1100
here = os.path.dirname(os.path.abspath(__file__))
shots = os.path.join(here, "shots"); os.makedirs(shots, exist_ok=True)
full = os.path.join(shots, f"{name}-full.png")
mobile = ["--user-agent=Mozilla/5.0 (Linux; Android 14) Mobile"] if w < 700 else []
subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-prefers-reduced-motion",
                f"--user-data-dir={os.path.join(here, 'edge-profile')}",
                f"--screenshot={full}", f"--window-size={w},{h}", "--virtual-time-budget=9000", *mobile, url],
               capture_output=True, timeout=120)
im = Image.open(full).convert("RGB")
for f in os.listdir(shots):
    if f.startswith(name + "-") and f.endswith(".jpg"): os.remove(os.path.join(shots, f))
n = 0
for y in range(0, im.height, slice_h):
    part = im.crop((0, y, im.width, min(im.height, y + slice_h)))
    if part.height < 40: break
    scale = out_w / part.width
    if scale < 1: part = part.resize((out_w, round(part.height * scale)), Image.LANCZOS)
    part.save(os.path.join(shots, f"{name}-{n:02d}.jpg"), quality=80); n += 1
print(f"{name}: {im.width}x{im.height} → {n} slices")
