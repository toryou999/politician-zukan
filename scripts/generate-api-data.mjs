import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { politicians } from '../src/data/politicians.js';
import { cabinetPositions } from '../src/data/cabinetPositions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiDir = path.join(__dirname, '../api');

// 政治家データ抽出 (ID, 名前, 政党)
const miniPoliticians = {};
politicians.forEach(p => {
    miniPoliticians[p.id] = {
        name: p.name,
        party: p.party,
        // 画像はWikimediaのURLを動的に引くのはサーバーレスでは重いので、
        // クライアント側で解決するか、ここでは一旦名前だけにする。
        // もし画像を入れたいなら、wikimediaFileを含める
        wikimediaFile: p.wikimediaFile
    };
});

// ポジションデータ抽出
const miniPositions = {};
cabinetPositions.forEach(p => {
    miniPositions[p.id] = {
        name: p.name,
        shortName: p.shortName,
        row: p.row,
        order: p.order
    };
});

if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir);
}

fs.writeFileSync(path.join(apiDir, 'politicians.json'), JSON.stringify(miniPoliticians, null, 2));
fs.writeFileSync(path.join(apiDir, 'positions.json'), JSON.stringify(miniPositions, null, 2));

console.log('API data generated successfully.');
