from PIL import Image, ImageOps
import os
src="_source/img"; dst="assets/img"
for f in sorted(os.listdir(src)):
    im=ImageOps.exif_transpose(Image.open(os.path.join(src,f)))
    w,h=im.size
    im=im.convert("RGB")
    name=os.path.splitext(f)[0]
    for suffix,maxw,q in (("",2000,82),("-sm",900,78)):
        t=im.copy()
        if w>maxw: t=t.resize((maxw,round(h*maxw/w)),Image.LANCZOS)
        out=os.path.join(dst,name+suffix+".webp"); t.save(out,"WEBP",quality=q,method=6)
    print(f"{name}: {w}x{h} -> {os.path.getsize(os.path.join(dst,name+'.webp'))//1024}KB")
