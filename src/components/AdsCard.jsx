import React, { useEffect } from 'react';

function AdsCard({ slot, style = {} }) {
    // 将来的にはここでAdSenseのスクリプトをロードしたり、
    // slot IDを受け取って特定の広告を表示したりします。

    // まだ広告配信前なので、プレースホルダーは表示しない
    // 将来的にAdSenseコードを入れる際は、ここを復活させる
    return null;

    /*
    return (
        <div className="card ads-card-container" style={style}>
            <div className="ads-placeholder">
                <span className="ads-label">スポンサードリンク</span>
                <div className="ads-content">
                    <div className="ads-mock">
                        広告スペース
                        <br/>
                        <small>（ここに広告が表示されます）</small>
                    </div>
                </div>
            </div>
        </div>
    );
    */
}

export default AdsCard;
