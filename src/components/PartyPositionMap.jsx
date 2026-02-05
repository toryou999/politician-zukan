import { Link } from 'react-router-dom';

function PartyPositionMap({ parties }) {
    // 座標の範囲（中心0から+/-100）を想定
    // SVGのビューボックスは 0 0 400 300 くらいにする
    // x: -100 -> 0, 100 -> 400
    // y: 100 -> 0, -100 -> 300 (SVGは上が0)

    const mapToSvg = (pos) => {
        // x: -100〜100 => 20〜380 (padding 20)
        // y: -100〜100 => 280〜20 (SVGはY軸が逆、上が0)
        const x = ((pos.x + 100) / 200) * 360 + 20;
        const y = ((100 - pos.y) / 200) * 260 + 20;
        return { x, y };
    };

    return (
        <div className="party-position-map-container">
            <svg viewBox="0 0 400 300" className="chart-svg">
                {/* 背景エリア */}
                <rect x="20" y="20" width="360" height="260" fill="#fff9c4" rx="10" opacity="0.3" />

                {/* 軸ラベル */}
                <text x="200" y="15" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">リベラル・個人主義</text>
                <text x="200" y="295" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">共同体主義</text>

                {/* 縦書きラベルの位置を微調整（矢印との被りを避ける） */}
                <text x="30" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333" writingMode="tb">分配・介入</text>
                <text x="370" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333" writingMode="tb">市場重視</text>

                {/* 軸線（矢印の位置を少し内側に） */}
                <line x1="40" y1="150" x2="360" y2="150" stroke="#0d47a1" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
                <line x1="200" y1="25" x2="200" y2="275" stroke="#0d47a1" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />

                {/* 矢印定義 */}
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10" fill="#0d47a1" />
                    </marker>
                </defs>

                {/* 政党プロット */}
                {parties.map(party => {
                    if (!party.position) return null;
                    const { x, y } = mapToSvg(party.position);
                    const isLightColor = ['#fbc02d', '#FFB84D', '#ff9800', '#FDD835'].includes(party.color.toUpperCase()) || party.id === 'genzei' || party.id === 'dpp' || party.id === 'sanseito';
                    const textColor = isLightColor ? '#333' : '#fff';

                    return (
                        <Link to={`/party/${party.id}`} key={party.id} style={{ textDecoration: 'none' }}>
                            <g transform={`translate(${x}, ${y})`} className="party-plot" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
                                <circle r="20" fill={party.color} stroke="white" strokeWidth="2" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }} />
                                <text
                                    x="0"
                                    y="5"
                                    textAnchor="middle"
                                    fontSize="11"
                                    fontWeight="bold"
                                    fill={textColor}
                                >
                                    {party.shortName.substring(0, 2)}
                                </text>
                            </g>
                        </Link>
                    );
                })}
            </svg>
            <div className="map-help-text">
                <small>※ 各政党のアイコンをタップするとメンバー一覧が見れます</small>
            </div>
        </div>
    );
}

export default PartyPositionMap;
