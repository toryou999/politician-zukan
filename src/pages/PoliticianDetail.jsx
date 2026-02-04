import { useParams, Link } from 'react-router-dom';
import { politicians } from '../data/politicians';
import PositionMap from '../components/PositionMap';
import { useState, useEffect } from 'react';
import { getWikimediaImageUrl } from '../utils/wikimedia';
import { getPartyClassName } from '../utils/partyColor';
import { getPartyIdByName } from '../data/partyData';
import { useCabinet } from '../contexts/CabinetContext';
import { getPositionById } from '../data/cabinetPositions';
import BillSection from '../components/BillSection';
import CareerSection from '../components/CareerSection';
import SocialLinks from '../components/SocialLinks';
import RivalSection from '../components/RivalSection';
import SEO from '../components/SEO';
import AdsCard from '../components/AdsCard';
import BookSection from '../components/BookSection';


function PoliticianDetail() {
    const { id } = useParams();
    const politician = politicians.find(p => p.id === id);
    const [photoUrl, setPhotoUrl] = useState(null);
    const { openPositionSelect, getPoliticianPosition } = useCabinet();

    useEffect(() => {
        if (politician?.wikimediaFile) {
            getWikimediaImageUrl(politician.wikimediaFile).then(setPhotoUrl);
        }
    }, [politician]);

    const currentPosition = politician ? getPoliticianPosition(politician.id) : null;
    const positionInfo = currentPosition ? getPositionById(currentPosition) : null;

    const handleAddToCabinet = () => {
        if (politician) {
            openPositionSelect(politician.id);
        }
    };

    if (!politician) {
        return (
            <div className="container">
                <div className="card">
                    <h1>政治家が見つかりません</h1>
                    <p>指定されたIDの政治家は登録されていません。</p>
                    <Link to="/" className="back-link">← 政党一覧に戻る</Link>
                </div>
            </div>
        );
    }

    const hasDetailedData = politician.careers.length > 0;

    return (
        <div className="container">
            <SEO
                title={`${politician.name}（${politician.party}）のスタンス・経歴`}
                description={`${politician.name}（${politician.party}）のプロフィール、政策スタンス、経歴、ライバル関係をチェック！政治家図鑑で詳細な分析を見よう。`}
                image={photoUrl}
            />
            <div className="breadcrumb">
                <Link to="/" className="back-link">トップ</Link>
                <span className="breadcrumb-separator">›</span>
                <Link to={`/party/${getPartyIdByName(politician.party)}`} className="back-link">{politician.party}</Link>
            </div>

            <div className="card">
                <div className="politician-header">
                    <div className="politician-photo-container">
                        {photoUrl ? (
                            <img src={photoUrl} alt={politician.name} className="politician-photo" />
                        ) : (
                            <div className="politician-photo placeholder">
                                <span>No Photo</span>
                            </div>
                        )}
                        {photoUrl && (
                            <div className="photo-credit">
                                <span className="credit-label">出典:</span>
                                <span className="credit-source">Wikimedia Commons</span>
                            </div>
                        )}
                    </div>
                    <div className="politician-info">
                        <h1 className="politician-name">
                            {politician.name}
                            <span className="politician-name-kana">{politician.nameKana}</span>
                        </h1>
                        <div className="politician-meta">
                            <div className="meta-item">
                                <Link to={`/party/${getPartyIdByName(politician.party)}`} className={`party-badge ${getPartyClassName(politician.party)}`}>
                                    {politician.party}
                                </Link>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">議院:</span>
                                {politician.chamber}
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">選挙区:</span>
                                {politician.constituency}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card cabinet-add-card">
                <button className="detail-add-cabinet-btn" onClick={handleAddToCabinet}>
                    {currentPosition ? (
                        <>
                            <span className="btn-icon">👑</span>
                            <span className="btn-text">
                                マイ内閣: {positionInfo?.name}
                                <small>タップして変更</small>
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="btn-icon">+</span>
                            <span className="btn-text">マイベスト内閣に追加</span>
                        </>
                    )}
                </button>
            </div>

            <AdsCard slot="detail-middle" />

            {politician.books && politician.books.length > 0 && (
                <div className="card">
                    <h2 className="section-title">📚 この政治家の著書</h2>
                    <BookSection books={politician.books} />
                </div>
            )}

            {politician.socialLinks && politician.socialLinks.length > 0 && (
                <div className="card">
                    <h2 className="section-title">SNS・公式サイト</h2>
                    <SocialLinks links={politician.socialLinks} />
                </div>
            )}

            {politician.position && (
                <PositionMap
                    x={politician.position.x}
                    y={politician.position.y}
                />
            )}


            {(politician.supportBills && politician.supportBills.length > 0 || politician.opposeBills && politician.opposeBills.length > 0) && (
                <div className="card">
                    <h2 className="section-title">主要法案への態度</h2>
                    <BillSection
                        supportBills={politician.supportBills || []}
                        opposeBills={politician.opposeBills || []}
                    />
                </div>
            )}

            {politician.rivals && politician.rivals.length > 0 && (
                <div className="card rival-card">
                    <h2 className="section-title">🔥 対立・論争</h2>
                    <RivalSection rivals={politician.rivals} />
                </div>
            )}

            {politician.careers && politician.careers.length > 0 && (
                <div className="card">
                    <CareerSection careers={politician.careers} />
                </div>
            )}

            {!hasDetailedData && (
                <div className="card coming-soon">
                    <h2>📝 詳細データ準備中</h2>
                    <p>この政治家の詳細情報は現在追加中です。</p>
                </div>
            )}
        </div>
    );
}

export default PoliticianDetail;
