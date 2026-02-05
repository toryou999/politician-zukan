```javascript
import { ImageResponse } from '@vercel/og';
import { createClient } from '@supabase/supabase-js';
import { politicians } from '../src/data/politicians'; // Edgeで読めるか確認必要だが、データファイルならいけるはず
import { getWikimediaImageUrl } from '../src/utils/wikimedia'; // これも流用

export const config = {
  runtime: 'edge',
};

// Edge Function用のSupabaseクライアント
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
// 念のためフォールバック
const sbUrl = supabaseUrl || '';
const sbKey = supabaseAnonKey || '';

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const shareId = searchParams.get('id');

    if (!shareId || !sbUrl || !sbKey) {
        return defaultImage();
    }

    const supabase = createClient(sbUrl, sbKey);
    
    // Supabaseからデータ取得
    const { data: cabinetData, error } = await supabase
        .from('cabinets')
        .select('data')
        .eq('share_id', shareId)
        .single();

    if (error || !cabinetData || !cabinetData.data) {
        return defaultImage();
    }

    const cabinet = cabinetData.data;
    
    // 総理・官房長官などの主要閣僚を取得
    // ※データ構造: { "1-1": "politicianId", "2-2": "politicianId", ... }
    // 本来はIDから政治家データを検索する
    
    const getPol = (posId) => {
        const polId = cabinet[posId];
        if (!polId) return null;
        return politicians.find(p => p.id === polId) || null;
    };

    const pm = getPol('1-1'); // 総理大臣
    const cm = getPol('2-2'); // 官房長官
    const fm = getPol('3-1'); // 財務大臣
    const fmn = getPol('3-2'); // 外務大臣

    // 簡略化して総理と官房長官だけ大きく表示、他はリスト的になど
    // 画像URLの解決（非同期）が必要だが、ImageResponse内でasyncは使えないので先に解決する
    
    // 解決用ヘルパー
    const getPhoto = async (pol) => {
        if (!pol) return null;
        if (pol.image) return pol.image;
        if (pol.wikimediaFile) {
             // getWikimediaImageUrlロジックを簡易的に再実装（import依存を減らすため）
             // MD5ハッシュ化などが必要なのでimportした方が無難だが、Edgeで動くか？
             // URLエンコードだけでいけるパターンのみ対応、またはデフォルト画像
             return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(pol.wikimediaFile)}?width=300`;
        }
return null;
    };

const pmPhoto = await getPhoto(pm);

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
                backgroundColor: '#f0f9ff',
                backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                fontFamily: '"Noto Sans JP", sans-serif',
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '40px 80px',
                borderRadius: '20px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                border: '4px solid #fbbf24'
            }}>
                <div style={{ fontSize: 32, fontWeight: 'bold', color: '#64748b', marginBottom: 10 }}>MY BEST CABINET</div>
                <div style={{ fontSize: 64, fontWeight: 900, color: '#1e293b', marginBottom: 30 }}>最強の内閣、完成。</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    {pm && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{
                                width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden',
                                border: '6px solid #fbbf24', display: 'flex'
                            }}>
                                <img src={pmPhoto} width="180" height="180" style={{ objectFit: 'cover' }} />
                            </div>
                            <div style={{ fontSize: 24, marginTop: 15, fontWeight: 'bold' }}>内閣総理大臣</div>
                            <div style={{ fontSize: 32, fontWeight: 900 }}>{pm.name}</div>
                        </div>
                    )}
                    {/* 官房長官とかも表示したいがスペース次第 */}
                </div>

                <div style={{ fontSize: 24, marginTop: 40, color: '#475569' }}>
                    他 {Object.keys(cabinet).length - 1} 名の閣僚を選出済み
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: 30, right: 30, fontSize: 20, color: '#94a3b8' }}>
                政治家図鑑
            </div>
        </div>
    ),
    {
        width: 1200,
        height: 630,
    },
);
  } catch (e) {
    console.error(e);
    return defaultImage();
}
}

function defaultImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                }}
            >
                <div style={{ fontSize: 60, fontWeight: 900, color: '#0f172a' }}>マイベスト内閣</div>
                <div style={{ fontSize: 30, marginTop: 20, color: '#64748b' }}>あなただけの理想の内閣を作ろう</div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
```
