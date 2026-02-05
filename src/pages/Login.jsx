import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        // 簡易ログイン実行
        login({ name: 'マイ総理' });
        navigate('/mypage');
    };

    return (
        <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <SEO title="ログイン" />

            <h1 className="section-title" style={{ justifyContent: 'center' }}>
                政治アーケードをはじめる
            </h1>

            <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
                    データ保存機能を利用するには<br />
                    アカウントを作成してください。
                </p>

                <button
                    onClick={handleLogin}
                    className="amazon-btn" // スタイル流用
                    style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '1.1rem',
                        background: '#2563eb'
                    }}
                >
                    🚀 今すぐはじめる（無料）
                </button>

                <p style={{ marginTop: '16px', fontSize: '0.8rem', color: '#888' }}>
                    ※ 現在はテストモードのため、ブラウザにデータを保存します。<br />
                    面倒な登録手続きは不要です！
                </p>
            </div>
        </div>
    );
}

export default Login;
