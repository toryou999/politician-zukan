import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCabinet } from '../contexts/CabinetContext';
import { cabinetPositions, getPositionsByRow, getPositionById } from '../data/cabinetPositions';
import { politicians, getPoliticianById } from '../data/politicians';
import { getWikimediaImageUrl } from '../utils/wikimedia';
import CabinetSlot from '../components/CabinetSlot';
import SEO from '../components/SEO';

// 議員選択モーダル
function PoliticianSelectModal({ position, onClose, onSelect }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [photoUrls, setPhotoUrls] = useState({});
    const inputRef = useRef(null);

    // マウント時にフォーカス
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const filteredPoliticians = useMemo(() => {
        if (!searchQuery.trim()) {
            return politicians.slice(0, 30); // 初期表示は30人
        }
        const query = searchQuery.toLowerCase().replace(/\s+/g, '');
        return politicians.filter(p => {
            const nameNoSpace = p.name.toLowerCase().replace(/\s+/g, '');
            const nameKanaNoSpace = p.nameKana?.toLowerCase().replace(/\s+/g, '') || '';
            return nameNoSpace.includes(query) ||
                nameKanaNoSpace.includes(query) ||
                p.party.includes(searchQuery);
        }).slice(0, 50);
    }, [searchQuery]);

    // 写真を取得
    useEffect(() => {
        filteredPoliticians.forEach(p => {
            if (p.wikimediaFile && !photoUrls[p.id]) {
                getWikimediaImageUrl(p.wikimediaFile).then(url => {
                    setPhotoUrls(prev => ({ ...prev, [p.id]: url }));
                });
            }
        });
    }, [filteredPoliticians]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="politician-select-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h2>{position.name}</h2>
                        <p className="modal-subtitle">議員を選択してください</p>
                    </div>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-search">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="名前・政党で検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="politician-scroll-list">
                    {filteredPoliticians.map(p => (
                        <button
                            key={p.id}
                            className="politician-scroll-item"
                            onClick={() => onSelect(p.id)}
                        >
                            <div className="scroll-item-photo">
                                {photoUrls[p.id] ? (
                                    <img src={photoUrls[p.id]} alt={p.name} />
                                ) : (
                                    <div className="scroll-item-placeholder">{p.name[0]}</div>
                                )}
                            </div>
                            <div className="scroll-item-info">
                                <span className="scroll-item-name">{p.name}</span>
                                <span className="scroll-item-party">{p.party}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { useAuth } from '../contexts/AuthContext'; // 追加

import { supabase } from '../lib/supabase'; // 追加

// ... (PoliticianSelectModalなどは変更なし)

export default function MyCabinet() {
    const { filledCount, totalPositions, resetCabinet, cabinet, addToCabinet, setCabinet } = useCabinet(); // setCabinetが必要（Contextに追加要）
    const { user } = useAuth(); // 追加
    const [selectingPosition, setSelectingPosition] = useState(null);
    const [showCopied, setShowCopied] = useState(false);
    const [saveMessage, setSaveMessage] = useState(''); // 保存完了メッセージ
    const [shareId, setShareId] = useState(null); // シェア用ID
    const [loading, setLoading] = useState(false); // 読み込み中フラグ

    // マウント時に保存された内閣を読み込む
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const shareIdParam = searchParams.get('id');

        if (shareIdParam) {
            // シェアされた内閣を読み込む
            setLoading(true); // MyCabinetコンポーネント内にloading状態を追加する必要あり
            supabase
                .from('cabinets')
                .select('data, share_id') // share_idも取得
                .eq('share_id', shareIdParam)
                .single()
                .then(({ data, error }) => {
                    if (data && data.data) {
                        setCabinet(data.data);
                        setShareId(data.share_id); // 読み込んだshare_idをセット
                        setSaveMessage('シェアされた内閣を読み込みました');
                    } else if (error) {
                        console.error('Error loading shared cabinet:', error);
                    }
                    setLoading(false);
                });
        } else {
            // ローカル保存または自分の最新内閣を読み込む（現状維持+Supabase読み込み）
            // 簡易的にローカルストレージ優先、なければSupabaseから自分の最新を取得などのロジックが良いが
            // いったんローカルストレージ互換を維持
            const savedCabinet = localStorage.getItem('my_saved_cabinet');
            if (savedCabinet && typeof setCabinet === 'function') {
                try {
                    const parsed = JSON.parse(savedCabinet);
                    setCabinet(parsed);
                } catch (e) {
                    console.error('Failed to load cabinet', e);
                }
            }
        }
    }, [user, setCabinet]); // setCabinetを依存配列に追加

    const handleSave = async () => {
<<<<<<< HEAD
        if (!user) {
            if (window.confirm('保存するにはログイン（無料）が必要です。ログインページへ移動しますか？')) {
                // login({ name: 'ゲスト' }); // 簡易ログインフローへ（後で実装）
                alert('すみません、ログイン画面はまだありません！このまま保存します（ローカル保存のみ）。');
                // 一旦ローカル保存
                localStorage.setItem('my_saved_cabinet', JSON.stringify(cabinet));
                setSaveMessage('（一時保存）内閣を保存しました！');
                setTimeout(() => setSaveMessage(''), 3000);
=======
        // ゲストユーザー（匿名）または未ログインの場合は登録を促す
        if (!user || user.isGuest) {
            if (window.confirm('保存するにはアカウント登録（無料）が必要です。登録ページへ移動しますか？')) {
                // 現在の内閣データを一時保存して、登録後に復元できるようにする（今回は簡易的にlocalStorageのみ）
                localStorage.setItem('my_saved_cabinet', JSON.stringify(cabinet));
                window.location.href = '/signup';
>>>>>>> develop
            }
            return;
        }

        try {
            const { data, error } = await supabase
                .from('cabinets')
                .upsert({
                    user_id: user.id,
                    data: cabinet,
<<<<<<< HEAD
                    // share_idは自動生成されるが、既存の更新なら維持したい（今回は毎回新規作成または最新1件更新などの設計次第）
                    // シンプルに毎回新規作成（履歴として残る）にするか、user_idで1つにするか。
                    // 今回は「履歴に残す」方針でinsertにする。
                }, { onConflict: 'user_id' }) // user_idが同じ場合は更新
=======
                }, { onConflict: 'user_id' })
>>>>>>> develop
                .select()
                .single();

            if (error) throw error;

            // シェア用IDを保持
            setShareId(data.share_id);

            // ローカルにも一応
            localStorage.setItem('my_saved_cabinet', JSON.stringify(cabinet));
            setSaveMessage('クラウドに保存しました！');
            setTimeout(() => setSaveMessage(''), 3000);

        } catch (e) {
            console.error('Save failed', e);
            alert('保存に失敗しました');
        }
    };

    const handleReset = () => {
        if (window.confirm('内閣をリセットしてもよろしいですか？')) {
            resetCabinet();
            setShareId(null); // リセット時にシェアIDもクリア
        }
    };

    const handleSlotClick = (position) => {
        setSelectingPosition(position);
    };

    const handleSelectPolitician = (politicianId) => {
        if (selectingPosition) {
            addToCabinet(selectingPosition.id, politicianId);
            setSelectingPosition(null);
        }
    };

    const handleShareX = () => {
        const text = `私の最強の内閣が完成しました！ #政治家図鑑 #マイベスト内閣`;
        // shareIdがあればそれを使う、なければ現在のURL
        const url = shareId ? `${window.location.origin}/my-cabinet?id=${shareId}` : window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
    };

    const handleCopyUrl = () => {
        const url = shareId ? `${window.location.origin}/my-cabinet?id=${shareId}` : window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        });
    };

    // ... (rows definitions)

    const row1 = getPositionsByRow(1);
    const row2 = getPositionsByRow(2);
    const row3 = getPositionsByRow(3);
    const row4 = getPositionsByRow(4);
    const row5 = getPositionsByRow(5);

    return (
        <div className="container my-cabinet-page">
            <SEO
                title="マイベスト内閣 - 政治アーケード"
                description="あなただけの理想の内閣を組閣しよう！総理大臣から特命担当大臣まで、推し議員を選んでシェア！"
            />
            <Link to="/" className="back-link">← 政党一覧に戻る</Link>

            <header className="cabinet-header">
                <h1>👑 マイベスト内閣</h1>
                <p className="cabinet-subtitle">自分だけの理想の内閣を組閣しよう</p>
                <div className="cabinet-stats">
                    <span className="cabinet-count">{filledCount} / {totalPositions} ポジション</span>
                    {filledCount > 0 && (
                        <button className="cabinet-reset-btn" onClick={handleReset}>
                            リセット
                        </button>
                    )}
                </div>
                {/* 保存ボタン */}
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <button
                        onClick={handleSave}
                        className="amazon-btn" // スタイル流用
                        style={{ padding: '8px 24px', fontSize: '1rem' }}
                    >
                        💾 この内閣を保存する
                    </button>
                    {saveMessage && <p style={{ color: '#2e7d32', fontWeight: 'bold', marginTop: '5px' }}>{saveMessage}</p>}
                </div>
            </header>

            {/* SNSシェアボタン */}
            <div className="cabinet-share">
                <button className="share-btn share-x" onClick={handleShareX}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Xでシェア
                </button>
                <button className="share-btn share-copy" onClick={handleCopyUrl}>
                    📋 URLコピー
                    {showCopied && <span className="copied-toast">コピーしました！</span>}
                </button>
            </div>

            <div className="cabinet-formation">
                <div className="formation-label">タップして議員を選択</div>

                {/* 1行目: 総理大臣 */}
                <div className="formation-row row-1">
                    {row1.map(pos => (
                        <CabinetSlot
                            key={pos.id}
                            position={pos}
                            size="large"
                            onEmptyClick={() => handleSlotClick(pos)}
                        />
                    ))}
                </div>

                <div className="formation-connector"></div>

                {/* 2行目: 副総理・官房長官・デジタル */}
                <div className="formation-row row-2">
                    {row2.map(pos => (
                        <CabinetSlot
                            key={pos.id}
                            position={pos}
                            size="medium"
                            onEmptyClick={() => handleSlotClick(pos)}
                        />
                    ))}
                </div>

                <div className="formation-connector"></div>

                {/* 3行目: 財務・外務・防衛・法務 */}
                <div className="formation-row row-3">
                    {row3.map(pos => (
                        <CabinetSlot
                            key={pos.id}
                            position={pos}
                            onEmptyClick={() => handleSlotClick(pos)}
                        />
                    ))}
                </div>

                <div className="formation-connector"></div>

                {/* 4行目: 厚労・文科・経産・農水 */}
                <div className="formation-row row-4">
                    {row4.map(pos => (
                        <CabinetSlot
                            key={pos.id}
                            position={pos}
                            onEmptyClick={() => handleSlotClick(pos)}
                        />
                    ))}
                </div>

                <div className="formation-connector"></div>

                {/* 5行目: 国交・環境・復興・特命 */}
                <div className="formation-row row-5">
                    {row5.map(pos => (
                        <CabinetSlot
                            key={pos.id}
                            position={pos}
                            onEmptyClick={() => handleSlotClick(pos)}
                        />
                    ))}
                </div>
            </div>

            <div className="cabinet-help">
                <p>💡 スロットをタップして議員を選択、または一覧から「＋」で追加</p>
            </div>

            {/* 議員選択モーダル */}
            {selectingPosition && (
                <PoliticianSelectModal
                    position={selectingPosition}
                    onClose={() => setSelectingPosition(null)}
                    onSelect={handleSelectPolitician}
                />
            )}
        </div>
    );
}
