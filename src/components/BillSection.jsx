import PropTypes from 'prop-types';

function BillSection({ supportBills, opposeBills }) {
    return (
        <div className="bills-container">
            {/* 賛成法案セクション */}
            <div className="bill-category support-category">
                <h3 className="bill-category-title support-title">
                    <span className="bill-icon">👍</span>
                    賛成した法案
                </h3>
                <ul className="bill-list">
                    {supportBills.map((bill, index) => (
                        <li key={index} className="bill-item support">
                            {bill}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 反対法案セクション */}
            <div className="bill-category oppose-category">
                <h3 className="bill-category-title oppose-title">
                    <span className="bill-icon">👎</span>
                    反対した法案
                </h3>
                <ul className="bill-list">
                    {opposeBills.map((bill, index) => (
                        <li key={index} className="bill-item oppose">
                            {bill}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

BillSection.propTypes = {
    supportBills: PropTypes.arrayOf(PropTypes.string).isRequired,
    opposeBills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BillSection;
