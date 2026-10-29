import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context={window:{}};
vm.runInNewContext(fs.readFileSync('js/data.js','utf8'), context);
let count=0;
for(const p of context.window.PORTFOLIO.projects){
 for(const m of [...p.media.films,...p.media.decks]){
  if(m.src?.startsWith('assets/')) {assert.ok(fs.existsSync(m.src),`${p.id}: missing ${m.src}`);count++;}
 }
}
console.log(`PASS: ${count} referenced local media files exist`);
