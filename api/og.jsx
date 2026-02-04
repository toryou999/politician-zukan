import { ImageResponse } from '@vercel/og';
import politicians from './politicians.json';
import positions from './positions.json';

export const config = {
    runtime: 'edge',
};

// フォントをCDNから読み込む関数
const font = fetch(
    new URL('https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8_1v4f5l0.woff', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req) {
    const { searchParams } = new URL(req.url);
    const cabinetParam = searchParams.get('cabinet'); // JSON文字列またはカンマ区切り

    if (!cabinetParam) {
        return new Response('No cabinet data', { status: 400 });
    }

    // フォントデータのロード待機
    const fontData = await font;

    // キャビネットデータのパース
    let cabinet = {};
    try {
        // Base64デコード（もしBase64なら）
        cabinet = JSON.parse(decodeURIComponent(cabinetParam));
    } catch (e) {
        // 失敗したらそのまま試す
        try {
            cabinet = JSON.parse(cabinetParam);
        } catch (e2) {
            return new Response('Invalid cabinet data', { status: 400 });
        }
    }

    // 描画データの準備
    // 主要ポジション（総理、官房長官、財務、外務、防衛）をピックアップ
    const keyPositions = [
        'prime_minister',
        'chief_cabinet',
        'finance',
        'foreign',
        'defense',
        'digital' // デジタルも追加
    ];

    const members = keyPositions.map(posId => {
        const polId = cabinet[posId];
        if (!polId) return null;
        return {
            pos: positions[posId],
            pol: politicians[polId]
        };
    }).filter(Boolean);

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a1929',
                    backgroundImage: 'radial-gradient(circle at 25% 25%, #1a2a40 10%, #0a1929 60%)',
                    color: 'white',
                    fontFamily: '"Noto Sans JP"',
                    padding: '40px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: 60, fontWeight: 'bold', background: 'linear-gradient(to right, #ffd700, #ffa500)', backgroundClip: 'text', color: 'transparent' }}>
                        政治家図鑑
                    </div>
                </div>

                <div style={{ fontSize: 30, color: '#90caf9', marginBottom: '40px', letterSpacing: '0.1em' }}>
                    MY BEST CABINET
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '1000px' }}>
                    {members.map((item, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '20px',
                            width: '300px',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <div style={{ fontSize: 18, color: '#aaa', marginBottom: '8px' }}>{item.pos.name}</div>
                            <div style={{ fontSize: 24, fontWeight: 'bold' }}>{item.pol.name}</div>
                            <div style={{ fontSize: 14, color: '#ffd700', marginTop: '4px' }}>{item.pol.party}</div>
                        </div>
                    ))}
                </div>

                <div style={{ position: 'absolute', bottom: 30, right: 30, fontSize: 16, color: '#666' }}>
                    Powered by 政治家図鑑
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Noto Sans JP',
                    data: fontData,
                    style: 'normal',
                },
            ],
        },
    );
}
