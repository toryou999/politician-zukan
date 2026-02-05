import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default function handler(req) {
    try {
        const { searchParams } = new URL(req.url);
        const hasCabinet = searchParams.get('id');

        // 本来はここでSupabaseからCabinet情報を取得する
        // 今はデモとして固定テキストを表示

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
                        flexWrap: 'nowrap',
                        backgroundColor: 'white',
                        backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            justifyItems: 'center',
                        }}
                    >
                        <div style={{ fontSize: 60, fontWeight: 900, color: '#1a1a2e' }}>
                            マイベスト内閣
                        </div>
                    </div>
                    <div style={{ fontSize: 40, marginTop: 30, color: '#666' }}>
                        あなただけの最強内閣を作ろう
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
