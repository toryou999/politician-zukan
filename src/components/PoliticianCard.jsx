import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getWikimediaImageUrl } from '../utils/wikimedia';
import { getPartyClassName } from '../utils/partyColor';
import { useCabinet } from '../contexts/CabinetContext';

export default function PoliticianCard({ politician }) {
    const [photoUrl, setPhotoUrl] = useState(null);
    const { openPositionSelect, getPoliticianPosition } = useCabinet();

    useEffect(() => {
        if (politician.wikimediaFile) {
            getWikimediaImageUrl(politician.wikimediaFile).then(setPhotoUrl);
        }
    }, [politician.wikimediaFile]);

    const handleAddToCabinet = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openPositionSelect(politician.id);
    };

    const currentPosition = getPoliticianPosition(politician.id);

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
                {currentPosition && (
                    <div className="card-cabinet-badge" title="内閣メンバー">👑</div>
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
            <button
                className="card-add-cabinet-btn"
                onClick={handleAddToCabinet}
                title={currentPosition ? "ポジション変更" : "内閣に追加"}
            >
                {currentPosition ? "👑" : "+"}
            </button>
        </Link>
    );
}
