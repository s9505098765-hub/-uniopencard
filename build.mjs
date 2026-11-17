import {readFileSync,writeFileSync} from 'node:fs';
const asset=readFileSync(new URL('./node_modules/jsqr/dist/jsQR.js',import.meta.url),'utf8');
if(asset.length<10000 || !asset.includes('jsQR'))throw Error('Invalid jsQR dependency');
const src=new URL('./worker.mjs',import.meta.url),s=readFileSync(src,'utf8'),mark='const qrAsset=null; // BUILD_QR_ASSET';
if(!s.includes(mark) && !/^const qrAsset=".+";$/m.test(s))throw Error('Missing QR build marker');
const line=`const qrAsset=${JSON.stringify(asset)};`;
writeFileSync(src,s.includes(mark)?s.replace(mark,()=>line):s.replace(/^const qrAsset=".+";$/m,()=>line));
console.log(`QR scanner embedded: ${Buffer.byteLength(asset)} bytes`);
