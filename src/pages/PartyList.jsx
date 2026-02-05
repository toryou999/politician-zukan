import { Link } from 'react-router-dom';
import { partyData } from '../data/partyData';
import { getPoliticianById, politicians } from '../data/politicians';
import { useState, useEffect, useMemo } from 'react';
import { getWikimediaImageUrl } from '../utils/wikimedia';
import PoliticianCard from '../components/PoliticianCard';
import SEO from '../components/SEO';
import AdsCard from '../components/AdsCard';

function PartyCard({ party }) {
    const leader = party.leaderId ? getPoliticianById(party.leaderId) : null;
    const [leaderPhotoUrl, setLeaderPhotoUrl] = useState(null);

    useEffect(() => {
        if (leader?.wikimediaFile) {
            getWikimediaImageUrl(leader.wikimediaFile).then(setLeaderPhotoUrl);
        }
    }, [leader]);

    return (
        <Link to={`/party/${party.id}`} className={`party-card ${party.className}`} style={{ '--party-color': party.color }}>
            <div className="party-card-header">
                <h2 className="party-card-name">{party.name}</h2>
                <span className="party-card-short">{party.shortName}</span>
            </div>

            <div className="party-card-body">
                <div className="party-leader-image">
                    {leaderPhotoUrl ? (
                        <img src={leaderPhotoUrl} alt={`${party.name}代表`} />
                    ) : (
                        <div className="leader-placeholder" style={{ backgroundColor: party.color }}>
                            <span>{leader ? leader.name[0] : party.shortName[0]}</span>
                        </div>
                    )}
                </div>
                <div className="party-info">
                    <p className="party-description">{party.description}</p>
                    {leader && <p className="party-leader-name">代表: {leader.name}</p>}
                </div>
            </div>
            <div className="party-card-footer">
                <span className="party-link-text">メンバーを見る →</span>
            </div>
        </Link>
    );
}

import PartyPositionMap from '../components/PartyPositionMap';

function PartyList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'

    const filteredPoliticians = useMemo(() => {
        if (!searchQuery.trim()) {
            return [];
        }
        const query = searchQuery.toLowerCase().replace(/\s+/g, '');
        return politicians.filter(p => {
            const nameNoSpace = p.name.toLowerCase().replace(/\s+/g, '');
            const nameKanaNoSpace = p.nameKana?.toLowerCase().replace(/\s+/g, '') || '';
            const normalSearch =
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.nameKana?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.constituency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.chamber.toLowerCase().includes(searchQuery.toLowerCase());
            const noSpaceSearch =
                nameNoSpace.includes(query) ||
                nameKanaNoSpace.includes(query);
            return normalSearch || noSpaceSearch;
        });
    }, [searchQuery]);

    return (
        <div className="party-list-page">
            <SEO />
            <header className="list-header">
                <h1>政治アーケード</h1>
                <p className="list-subtitle">政治家の立ち位置が一瞬でわかる</p>
                <p className="update-notice">※ 掲載メンバーは随時更新中です！</p>
            </header>

            <AdsCard slot="top-page" />

            <div className="container">
                {/* タブ切り替え */}
                <div className="view-tabs">
                    <button
                        className={`view-tab ${viewMode === 'map' ? 'active' : ''}`}
                        onClick={() => setViewMode('map')}
                    >
                        🗾 立ち位置マップ
                    </button>
                    <button
                        className={`view-tab ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        📋 政党リスト
                    </button>
                </div>


                {/* 検索ボックス */}
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

                {/* タブ切り替え（検索時以外に表示） */}
                {!searchQuery && (
                    <div className="view-tabs">
                        <button
                            className={`view-tab ${viewMode === 'map' ? 'active' : ''}`}
                            onClick={() => setViewMode('map')}
                        >
                            🗺️ 立ち位置マップ
                        </button>
                        <button
                            className={`view-tab ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            📋 政党リスト
                        </button>
                    </div>
                )}

                {searchQuery ? (
                    <div className="search-results">
                        {filteredPoliticians.length === 0 ? (
                            <div className="no-results">
                                <p>「{searchQuery}」に一致する政治家が見つかりませんでした。</p>
                            </div>
                        ) : (
                            <div className="politician-grid">
                                {filteredPoliticians.map(politician => (
                                    <PoliticianCard key={politician.id} politician={politician} />
                                ))}
                            </div>
                        )}
                    </div>
                ) : viewMode === 'map' ? (
                    <div className="fade-in">
                        <PartyPositionMap parties={partyData} />
                        <p style={{ textAlign: 'center', marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
                            ※各党のアイコンをタップすると詳細が見れます
                        </p>
                    </div>
                ) : (
                    <div className="party-grid fade-in">
                        {partyData.map(party => (
                            <PartyCard key={party.id} party={party} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default PartyList;
