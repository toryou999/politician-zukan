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
             // WikimediaのSpecial:FilePathなどを使って直接画像URLを取得
             // encodeURIComponentはファイル名のみにかける
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
                backgroundColor: '#fff',
                backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                fontFamily: '"Noto Sans JP", sans-serif',
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '40px 80px',
                borderRadius: '30px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                maxWidth: '900px',
            }}>
                <div style={{ fontSize: 32, fontWeight: 'bold', color: '#64748b', marginBottom: 10, letterSpacing: '0.1em' }}>MY BEST CABINET</div>
                <div style={{ fontSize: 72, fontWeight: 900, color: '#0f172a', marginBottom: 20, lineHeight: 1 }}>最強の内閣、完成。</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginTop: 20 }}>
                    {pm && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{
                                width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden',
                                border: '8px solid #f59e0b', display: 'flex',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            }}>
                                {pmPhoto ? (
                                    <img src={pmPhoto} width="200" height="200" style={{ objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, color: '#fff' }}>{pm.name[0]}</div>
                                )}
                            </div>
                            <div style={{
                                backgroundColor: '#0f172a', color: 'white', padding: '5px 20px', borderRadius: '20px',
                                fontSize: 20, marginTop: -20, zIndex: 10, fontWeight: 'bold'
                            }}>
                                内閣総理大臣
                            </div>
                            <div style={{ fontSize: 36, fontWeight: 800, marginTop: 15, color: '#334155' }}>{pm.name}</div>
                        </div>
                    )}
                    {!pm && (
                        <div style={{ fontSize: 24, color: '#ef4444' }}>総理大臣が未選出です</div>
                    )}
                </div>

                <div style={{ fontSize: 28, marginTop: 30, color: '#64748b', fontWeight: 500 }}>
                    他 {Object.keys(cabinet).length - (pm ? 1 : 0)} 名の閣僚を選出済み
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: 40, right: 50, fontSize: 24, fontWeight: 'bold', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 10 }}>🏛️</span> 政治家図鑑
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
                    backgroundImage: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                }}
            >
                <div style={{
                    fontSize: 80, fontWeight: 900, color: '#1e3a8a',
                    marginBottom: 20, letterSpacing: '-0.02em'
                }}>
                    マイベスト内閣
                </div>
                <div style={{ fontSize: 40, color: '#64748b', fontWeight: 600 }}>
                    あなただけの最強内閣を組閣しよう
                </div>
                <div style={{ position: 'absolute', bottom: 40, fontSize: 24, color: '#94a3b8' }}>
                    political-arcade.com
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
```
