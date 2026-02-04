import PropTypes from 'prop-types';

function PositionMap({ x, y }) {
    // x: -1 (リベラル) to 1 (保守)
    // y: -1 (大きな政府) to 1 (小さな政府)

    // Convert to percentage (0-100) for positioning within the grid area
    // The grid has 40px padding on each side, so we use calc() to position within that
    const xPercent = ((x + 1) / 2) * 100; // 0 to 100
    const yPercent = ((1 - y) / 2) * 100; // Invert Y: 小さな政府(top) = 0%, 大きな政府(bottom) = 100%

    const markerStyle = {
        left: `calc(40px + (100% - 80px) * ${xPercent / 100})`,
        top: `calc(40px + (100% - 80px) * ${yPercent / 100})`,
    };

    return (
        <div className="card position-map-container">
            <h2 className="section-title">政策ポジション</h2>
            <div className="position-map">
                {/* Grid background */}
                <div className="position-map-grid"></div>

                {/* Axes */}
                <div className="position-map-axis horizontal"></div>
                <div className="position-map-axis vertical"></div>

                {/* Labels */}
                <span className="position-map-label top">小さな政府</span>
                <span className="position-map-label bottom">大きな政府</span>
                <span className="position-map-label left">リベラル</span>
                <span className="position-map-label right">保守</span>

                {/* Position marker */}
                <div className="position-marker" style={markerStyle}></div>
            </div>

            {/* Position description */}
            <div className="position-description">
                <span>横軸: {x > 0 ? '保守' : 'リベラル'}寄り ({x > 0 ? '+' : ''}{x.toFixed(2)})</span>
                <span>縦軸: {y > 0 ? '小さな政府' : '大きな政府'}派 ({y > 0 ? '+' : ''}{y.toFixed(2)})</span>
            </div>
        </div>
    );
}

PositionMap.propTypes = {
    x: PropTypes.number.isRequired, // -1 to 1 (liberal to conservative)
    y: PropTypes.number.isRequired, // -1 to 1 (distribution to growth)
};

export default PositionMap;

