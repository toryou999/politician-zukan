import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { updatePassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('パスワードが一致しません');
        }
        if (password.length < 6) {
            return setError('パスワードは6文字以上で入力してください');
        }

        try {
            setError('');
            setLoading(true);
            await updatePassword(password);
            alert('パスワードを更新しました！');
            navigate('/my-cabinet'); // マイページまたはトップへ
        } catch (e) {
            setError('パスワードの更新に失敗しました: ' + e.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>新しいパスワードの設定</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="password"
                    placeholder="新しいパスワード（6文字以上）"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
                />
                <input
                    type="password"
                    placeholder="パスワード（確認用）"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                        backgroundColor: '#2196F3',
                        color: 'white',
                        fontSize: '16px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? '更新する' : 'パスワードを更新'}
                </button>
            </form>
            <div style={{ marginTop: '20px', fontSize: '14px' }}>
                <Link to="/" style={{ color: '#666' }}>トップページに戻る</Link>
            </div>
        </div>
    );
}
