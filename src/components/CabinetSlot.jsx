import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCabinet } from '../contexts/CabinetContext';
import { getPoliticianById } from '../data/politicians';
import { getWikimediaImageUrl } from '../utils/wikimedia';

export default function CabinetSlot({ position, size = 'normal', onEmptyClick }) {
    const { cabinet, removeFromCabinet } = useCabinet();
    const politicianId = cabinet[position.id];
    const politician = politicianId ? getPoliticianById(politicianId) : null;
    const [photoUrl, setPhotoUrl] = useState(null);
    const [showFullName, setShowFullName] = useState(false);

    useEffect(() => {
        if (politician?.wikimediaFile) {
            getWikimediaImageUrl(politician.wikimediaFile).then(setPhotoUrl);
        } else {
            setPhotoUrl(null);
        }
    }, [politician]);

    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeFromCabinet(position.id);
    };

    const handleEmptyClick = () => {
        if (onEmptyClick) {
            onEmptyClick();
        }
    };

    const toggleFullName = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowFullName(!showFullName);
    };

    if (!politician) {
        return (
            <div
                className={`cabinet-slot empty ${size}`}
                onClick={handleEmptyClick}
                role="button"
                tabIndex={0}
            >
                <div
                    className="slot-position-name clickable"
                    onClick={toggleFullName}
                >
                    {showFullName ? position.name : position.shortName}
                </div>
                <div className="slot-empty-icon">+</div>
                <span className="slot-hint">タップして選択</span>
            </div>
        );
    }

    return (
        <Link to={`/politician/${politician.id}`} className={`cabinet-slot filled ${size}`}>
            <button className="slot-remove-btn" onClick={handleRemove} title="外す">✕</button>
            <div
                className="slot-position-name clickable"
                onClick={toggleFullName}
            >
                {showFullName ? position.name : position.shortName}
            </div>
            <div className="slot-photo">
                {photoUrl ? (
                    <img src={photoUrl} alt={politician.name} />
                ) : (
                    <div className="slot-photo-placeholder">
                        {politician.name[0]}
                    </div>
                )}
            </div>
            <div className="slot-politician-name">{politician.name}</div>
        </Link>
    );
}
