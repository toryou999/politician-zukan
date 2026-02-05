import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function MyPage() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
                <p>ログインしてください</p>
                <Link to="/login" className="amazon-btn">ログイン画面へ</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <SEO title="マイページ" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 className="section-title" style={{ margin: 0 }}>マイページ</h1>
                <button onClick={logout} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'underline', cursor: 'pointer' }}>
                    ログアウト
                </button>
            </div>

            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        👤
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{user.name}</h2>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>一般ユーザー</p>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

                <h3>📁 保存した内閣</h3>
                <div style={{ padding: '30px 0', textAlign: 'center', color: '#999' }}>
                    <p>まだ保存した内閣はありません。</p>
                    <Link to="/my-cabinet" style={{ display: 'inline-block', marginTop: '10px', color: '#2563eb', fontWeight: 'bold' }}>
                        最強の内閣を作りに行く →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
