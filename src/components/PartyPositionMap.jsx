import { useState } from 'react';
import { Link } from 'react-router-dom';

function PartyPositionMap({ parties }) {
    const [selectedParty, setSelectedParty] = useState(null);

    // 座標の範囲（中心0から+/-100）を想定
    // SVGのビューボックスは 0 0 400 300
    const mapToSvg = (pos) => {
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
                <text x="200" y="15" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#333">リベラル・個人主義</text>
                <text x="200" y="295" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#333">共同体主義・保守</text>

                {/* 横軸ラベル（縦書き） */}
                <text x="25" y="150" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#333" writingMode="tb">分配・介入</text>
                <text x="375" y="150" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#333" writingMode="tb">市場重視</text>

                {/* 軸線（矢印が文字に被らないよう短くする） */}
                {/* 横軸: 45〜355 */}
                <line x1="45" y1="150" x2="355" y2="150" stroke="#0d47a1" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow-reverse)" />
                {/* 縦軸: 25〜275 */}
                <line x1="200" y1="25" x2="200" y2="275" stroke="#0d47a1" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow-reverse)" />

                {/* 矢印定義 */}
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10" fill="#0d47a1" />
                    </marker>
                    {/* 逆向き矢印（始点用） */}
                    <marker id="arrow-reverse" markerWidth="10" markerHeight="10" refX="1" refY="5" orient="auto">
                        <path d="M10,0 L0,5 L10,10" fill="#0d47a1" />
                    </marker>
                </defs>

                {/* 政党プロット */}
                {parties.map(party => {
                    if (!party.position) return null;
                    const { x, y } = mapToSvg(party.position);
                    // 黄色っぽい色や明るい色の場合は黒文字にする
                    const isLightColor = ['#fbc02d', '#FFB84D', '#ff9800', '#FDD835'].includes(party.color.toUpperCase()) || party.id === 'genzei' || party.id === 'dpp' || party.id === 'sanseito';
                    const textColor = isLightColor ? '#333' : '#fff';
                    const isSelected = selectedParty?.id === party.id;

                    return (
                        <g
                            key={party.id}
                            transform={`translate(${x}, ${y})`}
                            className="party-plot"
                            onClick={() => setSelectedParty(party)}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                        >
                            {/* 選択時は少し大きく、と枠線強調 */}
                            <circle
                                r={isSelected ? 24 : 20}
                                fill={party.color}
                                stroke={isSelected ? "#333" : "white"}
                                strokeWidth={isSelected ? 3 : 2}
                                style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }}
                            />
                            <text
                                x="0"
                                y="5"
                                textAnchor="middle"
                                fontSize={isSelected ? "14" : "11"}
                                fontWeight="bold"
                                fill={textColor}
                                style={{ pointerEvents: 'none', userSelect: 'none' }}
                            >
                                {party.shortName.substring(0, 2)}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* 理由表示・詳細リンクエリア */}
            <div className="map-reason-area" style={{
                minHeight: '100px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '12px',
                marginTop: '10px',
                border: '1px solid #e9ecef'
            }}>
                {selectedParty ? (
                    <div className="fade-in">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: selectedParty.color
                            }}></span>
                            <h3 style={{ margin: 0, fontSize: '1rem' }}>{selectedParty.name}</h3>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '12px', lineHeight: '1.5' }}>
                            {selectedParty.positionReason || selectedParty.description}
                        </p>
                        <Link
                            to={`/party/${selectedParty.id}`}
                            className="detail-link-btn"
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                backgroundColor: selectedParty.color,
                                color: ['details', '#fbc02d', '#FFB84D', '#ff9800', '#FDD835'].includes(selectedParty.color) || selectedParty.id === 'genzei' || selectedParty.id === 'dpp' || selectedParty.id === 'sanseito' ? '#333' : '#fff',
                                padding: '8px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                fontSize: '0.9rem'
                            }}
                        >
                            メンバーを見る →
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', fontSize: '0.9rem' }}>
                        <p>アイコン・矢印をタップで理由を表示</p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default PartyPositionMap;
