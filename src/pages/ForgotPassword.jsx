import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('パスワードリセット用のメールを送信しました。メール内のリンクを確認してください。');
        } catch (e) {
            setError('リセットメールの送信に失敗しました: ' + e.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>パスワードをお忘れの方</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
            {message && <div style={{ color: 'green', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>{message}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="email"
                    placeholder="登録メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        backgroundColor: '#FF5722',
                        color: 'white',
                        fontSize: '16px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? '送信中...' : 'リセットメールを送信'}
                </button>
            </form>
            <div style={{ marginTop: '20px', fontSize: '14px' }}>
                <Link to="/login" style={{ color: '#2196F3' }}>ログインページに戻る</Link>
            </div>
        </div>
    );
}
