import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-links">
                    <Link to="/terms">利用規約</Link>
                    <span className="separator">|</span>
                    <Link to="/privacy">プライバシーポリシー</Link>
                </div>
                <p className="copyright">© 2026 政治家図鑑 All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
