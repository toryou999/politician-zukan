import { Link } from 'react-router-dom';
import { useCabinet } from '../contexts/CabinetContext';

export default function CabinetFab() {
    const { filledCount, totalPositions } = useCabinet();

    return (
        <Link to="/my-cabinet" className="cabinet-fab">
            <span className="cabinet-fab-icon">👑</span>
            <span className="cabinet-fab-text">マイ内閣</span>
            {filledCount > 0 && (
                <span className="cabinet-fab-badge">{filledCount}/{totalPositions}</span>
            )}
        </Link>
    );
}
