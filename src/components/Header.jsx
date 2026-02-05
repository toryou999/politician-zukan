import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { user } = useAuth();

    return (
        <header className="site-header">
            <div className="header-content">
                <Link to="/" className="site-logo">
                    🏛️ 政治アーケード
                </Link>

                <nav className="header-nav">
                    {user ? (
                        <Link to="/mypage" className="user-menu">
                            <span className="user-icon">👤</span>
                            {user.name}
                        </Link>
                    ) : (
                        <Link to="/login" className="login-btn">
                            ログイン
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
