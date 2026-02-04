import { Link, useParams } from 'react-router-dom';
import { getPoliticiansByParty } from '../data/politicians';
import { getPartyById } from '../data/partyData';
import { useState, useMemo } from 'react';
import PoliticianCard from '../components/PoliticianCard';
import SEO from '../components/SEO';

function PartyMemberList() {
    const { partyId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');

    const targetParty = getPartyById(partyId);

    // 政党IDが無効な場合や、全表示の場合のハンドリングが必要であればここで行う
    // 今回は基本的に政党IDが渡される前提

    const partyPoliticians = useMemo(() => {
        if (!targetParty) return [];
        // getPoliticiansByPartyは自動的にformerPartyも考慮する
        return getPoliticiansByParty(targetParty.name);
    }, [targetParty]);

    // 検索でフィルタリング
    const filteredPoliticians = useMemo(() => {
        if (!searchQuery.trim()) {
            return partyPoliticians;
        }
        const query = searchQuery.toLowerCase().replace(/\s+/g, '');
        return partyPoliticians.filter(p => {
            const nameNoSpace = p.name.toLowerCase().replace(/\s+/g, '');
            const nameKanaNoSpace = p.nameKana?.toLowerCase().replace(/\s+/g, '') || '';
            const normalSearch =
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.nameKana?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.constituency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.chamber.toLowerCase().includes(searchQuery.toLowerCase());
            const noSpaceSearch =
                nameNoSpace.includes(query) ||
                nameKanaNoSpace.includes(query);
            return normalSearch || noSpaceSearch;
        });
    }, [searchQuery, partyPoliticians]);

    if (!targetParty) {
        return (
            <div className="container">
                <h2>政党が見つかりません</h2>
                <Link to="/" className="back-link">トップに戻る</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <SEO
                title={`${targetParty.name} 議員一覧`}
                description={`${targetParty.name}（${targetParty.shortName}）の所属議員一覧です。${targetParty.description}`}
            />
            <Link to="/" className="back-link">← 政党一覧に戻る</Link>

            <header className="party-header-section" style={{ borderBottomColor: targetParty.color }}>
                <h1 style={{ color: targetParty.color }}>{targetParty.name}</h1>
                <p>{targetParty.description}</p>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={`${targetParty.name}のメンバーを検索...`}
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
            </header>

            {filteredPoliticians.length === 0 ? (
                <div className="no-results">
                    <p>該当する議員が見つかりませんでした。</p>
                </div>
            ) : (
                <div className="politician-grid">
                    {filteredPoliticians.map(politician => (
                        <PoliticianCard key={politician.id} politician={politician} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PartyMemberList;
