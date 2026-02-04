import PropTypes from 'prop-types';

function CareerSection({ careers }) {
    return (
        <div className="info-section">
            <div className="info-section-header">
                <h3 className="info-section-title">経歴</h3>
            </div>
            <ul className="career-list">
                {careers.map((career, index) => (
                    <li key={index} className="career-item">
                        <div className="career-year">{career.year}</div>
                        <div className="career-title">{career.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

CareerSection.propTypes = {
    careers: PropTypes.arrayOf(
        PropTypes.shape({
            year: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CareerSection;
