import PropTypes from 'prop-types';

function SocialLinks({ links }) {
    const iconMap = {
        twitter: '𝕏',
        youtube: '▶',
        website: '🌐',
        facebook: 'f',
        instagram: '📷',
    };

    const labelMap = {
        twitter: 'X (Twitter)',
        youtube: 'YouTube',
        website: '公式サイト',
        facebook: 'Facebook',
        instagram: 'Instagram',
    };

    return (
        <div className="social-links">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${link.type}`}
                    title={labelMap[link.type] || link.type}
                >
                    <span className="social-icon">{iconMap[link.type] || '🔗'}</span>
                    <span className="social-label">{labelMap[link.type] || link.type}</span>
                </a>
            ))}
        </div>
    );
}

SocialLinks.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default SocialLinks;
