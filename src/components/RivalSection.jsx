import PropTypes from 'prop-types';

function RivalSection({ rivals }) {
    return (
        <div className="rival-section">
            <h3 className="rival-section-title">
                <span className="rival-icon">⚔️</span>
                対立・論争のある議員・人物
            </h3>
            <ul className="rival-list">
                {rivals.map((rival, index) => (
                    <li key={index} className="rival-item">
                        <div className="rival-header">
                            <span className="rival-name">{rival.name}</span>
                            {rival.party && (
                                <span className="rival-party">{rival.party}</span>
                            )}
                        </div>
                        <p className="rival-reason">{rival.reason}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

RivalSection.propTypes = {
    rivals: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            party: PropTypes.string,
            reason: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default RivalSection;
