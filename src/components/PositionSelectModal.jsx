import { useCabinet } from '../contexts/CabinetContext';
import { cabinetPositions, getPositionById } from '../data/cabinetPositions';
import { getPoliticianById } from '../data/politicians';

export default function PositionSelectModal() {
    const {
        selectingPolitician,
        closePositionSelect,
        addToCabinet,
        removeFromCabinet,
        cabinet,
        getPoliticianPosition
    } = useCabinet();

    if (!selectingPolitician) return null;

    const politician = getPoliticianById(selectingPolitician);
    const currentPosition = getPoliticianPosition(selectingPolitician);

    const handleSelectPosition = (positionId) => {
        addToCabinet(positionId, selectingPolitician);
        closePositionSelect();
    };

    const handleRemove = () => {
        if (currentPosition) {
            removeFromCabinet(currentPosition);
        }
        closePositionSelect();
    };

    return (
        <div className="modal-overlay" onClick={closePositionSelect}>
            <div className="position-select-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{politician?.name} をどのポジションに？</h2>
                    <button className="modal-close" onClick={closePositionSelect}>✕</button>
                </div>

                {currentPosition && (
                    <div className="current-position-notice">
                        現在: {getPositionById(currentPosition)?.name}
                    </div>
                )}

                <div className="position-grid">
                    {cabinetPositions.map(position => {
                        const currentHolder = cabinet[position.id];
                        const holderPolitician = currentHolder ? getPoliticianById(currentHolder) : null;
                        const isCurrentPosition = currentPosition === position.id;

                        return (
                            <button
                                key={position.id}
                                className={`position-option ${isCurrentPosition ? 'current' : ''} ${currentHolder && !isCurrentPosition ? 'occupied' : ''}`}
                                onClick={() => handleSelectPosition(position.id)}
                            >
                                <span className="position-name">{position.name}</span>
                                {holderPolitician && !isCurrentPosition && (
                                    <span className="position-holder">
                                        現: {holderPolitician.name}
                                    </span>
                                )}
                                {isCurrentPosition && (
                                    <span className="position-current-badge">★現在</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {currentPosition && (
                    <button className="remove-from-cabinet-btn" onClick={handleRemove}>
                        内閣から外す
                    </button>
                )}
            </div>
        </div>
    );
}
