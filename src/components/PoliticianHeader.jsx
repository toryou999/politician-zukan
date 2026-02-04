import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getWikimediaImageInfo } from '../utils/wikimedia';

function PoliticianHeader({ data }) {
    const { name, nameKana, party, partyType, constituency, wikimediaFile } = data;
    const [imageInfo, setImageInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPhoto() {
            if (wikimediaFile) {
                setIsLoading(true);
                const info = await getWikimediaImageInfo(wikimediaFile);
                setImageInfo(info);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }
        fetchPhoto();
    }, [wikimediaFile]);

    return (
        <div className="card">
            <div className="politician-header">
                <div className="politician-photo-container">
                    {isLoading ? (
                        <div className="politician-photo placeholder">
                            <span>読込中...</span>
                        </div>
                    ) : imageInfo?.url ? (
                        <img
                            src={imageInfo.url}
                            alt={`${name}の顔写真`}
                            className="politician-photo"
                        />
                    ) : (
                        <div className="politician-photo placeholder">
                            <span>写真なし</span>
                        </div>
                    )}
                </div>
                <div className="politician-info">
                    <h1 className="politician-name">
                        {name}
                        <span className="politician-name-kana">{nameKana}</span>
                    </h1>
                    <div className="politician-meta">
                        <span className={`party-badge ${partyType}`}>
                            {party}
                        </span>
                        <span className="meta-item">
                            <span className="meta-label">選挙区:</span>
                            {constituency}
                        </span>
                    </div>

                    {/* ライセンス・著作権表示 */}
                    {imageInfo && (
                        <div className="photo-credit">
                            <span className="credit-label">📷 写真: </span>
                            <span className="credit-author">{imageInfo.artist}</span>
                            {imageInfo.licenseUrl ? (
                                <a
                                    href={imageInfo.licenseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="credit-license"
                                >
                                    ({imageInfo.license})
                                </a>
                            ) : (
                                <span className="credit-license">({imageInfo.license})</span>
                            )}
                            <a
                                href={imageInfo.commonsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="credit-source"
                            >
                                via Wikimedia Commons
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

PoliticianHeader.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        nameKana: PropTypes.string.isRequired,
        party: PropTypes.string.isRequired,
        partyType: PropTypes.oneOf(['ruling', 'opposition']).isRequired,
        constituency: PropTypes.string.isRequired,
        wikimediaFile: PropTypes.string, // Wikimedia Commonsのファイル名
    }).isRequired,
};

export default PoliticianHeader;
