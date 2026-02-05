import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            return setError('パスワードは6文字以上で入力してください');
        }
        try {
            setError('');
            setLoading(true);
            await signUp(email, password, name);
            // 本来はメール確認画面などを挟むのが丁寧だが、簡略化してログインページまたはホームへ
            // Supabaseの設定次第では自動ログインされないこともあるため、一旦ログイン画面へ誘導が無難
            alert('登録ありがとうございます！ログインページへ移動します。');
            navigate('/login');
        } catch (e) {
            setError('登録に失敗しました: ' + e.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>新規アカウント登録</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="お名前（ニックネーム可）"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
                />
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
                />
                <input
                    type="password"
                    placeholder="パスワード（6文字以上）"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '12px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#FF9800',
                        color: 'white',
                        fontSize: '16px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? '登録中...' : '登録する'}
                </button>
            </form>
            <div style={{ marginTop: '20px', fontSize: '14px' }}>
                すでにアカウントをお持ちですか？ <Link to="/login" style={{ color: '#2196F3' }}>ログイン</Link>
            </div>
            <div style={{ marginTop: '10px', fontSize: '14px' }}>
                <Link to="/" style={{ color: '#666' }}>トップページに戻る</Link>
            </div>
        </div>
    );
}
