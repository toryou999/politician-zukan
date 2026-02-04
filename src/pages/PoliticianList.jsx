import { Link } from 'react-router-dom';
import { politicians } from '../data/politicians';
import { useState, useEffect, useMemo } from 'react';
import { getWikimediaImageUrl } from '../utils/wikimedia';
import { getPartyClassName } from '../utils/partyColor';

function PoliticianCard({ politician }) {
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        if (politician.wikimediaFile) {
            getWikimediaImageUrl(politician.wikimediaFile).then(setPhotoUrl);
        }
    }, [politician.wikimediaFile]);

    return (
        <Link to={`/politician/${politician.id}`} className="politician-card">
            <div className="card-photo">
                {photoUrl ? (
                    <img src={photoUrl} alt={politician.name} />
                ) : (
                    <div className="card-photo-placeholder">
                        <span>{politician.name[0]}</span>
                    </div>
                )}
            </div>
            <div className="card-content">
                <h3 className="card-name">{politician.name}</h3>
                <div className="card-meta">
                    <span className={`party-badge ${getPartyClassName(politician.party)}`}>
                        {politician.party}
                    </span>
                    <span className="card-chamber">{politician.chamber}</span>
                </div>
                <p className="card-constituency">{politician.constituency}</p>
            </div>
        </Link>
    );
}

function PoliticianList() {
    const [searchQuery, setSearchQuery] = useState('');

    // 検索でフィルタリング（スペースを無視して検索可能）
    const filteredPoliticians = useMemo(() => {
        if (!searchQuery.trim()) {
            return politicians;
        }
        // クエリからスペースを除去して検索
        const query = searchQuery.toLowerCase().replace(/\s+/g, '');
        return politicians.filter(p => {
            // 名前からスペースを除去して比較
            const nameNoSpace = p.name.toLowerCase().replace(/\s+/g, '');
            const nameKanaNoSpace = p.nameKana?.toLowerCase().replace(/\s+/g, '') || '';
            // 通常検索（スペースあり）
            const normalSearch =
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.nameKana?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.constituency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.chamber.toLowerCase().includes(searchQuery.toLowerCase());
            // スペースなし検索
            const noSpaceSearch =
                nameNoSpace.includes(query) ||
                nameKanaNoSpace.includes(query);
            return normalSearch || noSpaceSearch;
        });
    }, [searchQuery]);

    // 政党でグループ化
    const parties = [...new Set(filteredPoliticians.map(p => p.party))];

    return (
        <div className="container">
            <header className="list-header">
                <h1>政治家図鑑</h1>
                <p className="list-subtitle">政治家の立ち位置が一瞬でわかる</p>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="名前・政党・選挙区で検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="search-clear"
                            onClick={() => setSearchQuery('')}
                            aria-label="検索をクリア"
                        >
                            ✕
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <p className="search-result-count">
                        {filteredPoliticians.length}件の結果
                    </p>
                )}
            </header>

            {parties.length === 0 ? (
                <div className="no-results">
                    <p>「{searchQuery}」に一致する政治家が見つかりませんでした。</p>
                </div>
            ) : (
                parties.map(party => (
                    <section key={party} className="party-section">
                        <h2 className="party-heading">{party}</h2>
                        <div className="politician-grid">
                            {filteredPoliticians
                                .filter(p => p.party === party)
                                .map(politician => (
                                    <PoliticianCard key={politician.id} politician={politician} />
                                ))}
                        </div>
                    </section>
                ))
            )}
        </div>
    );
}

export default PoliticianList;

