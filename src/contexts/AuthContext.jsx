import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Supabaseのセッションチェック
        const checkSession = async () => {
            // セッション取得
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                // 既にログイン済み
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || 'ゲスト',
                    email: session.user.email,
                    isGuest: session.user.is_anonymous
                });
            } else {
                // セッションがない場合、自動的に匿名ログインを試みる（Supabase設定が必要）
                try {
                    const { data, error } = await supabase.auth.signInAnonymously();
                    if (!error && data?.user) {
                        setUser({
                            id: data.user.id,
                            name: 'ゲスト',
                            email: null,
                            isGuest: true
                        });
                    } else {
                        // 匿名ログイン失敗（設定OFFの場合など）→ ローカルフォールバック
                        const storedUser = localStorage.getItem('politician_arcade_user');
                        if (storedUser) {
                            setUser(JSON.parse(storedUser));
                        }
                    }
                } catch (e) {
                    console.log('Anonymous auth failed', e);
                    // フォールバック
                    const storedUser = localStorage.getItem('politician_arcade_user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                }
            }
            setLoading(false);
        };

        checkSession();

        // 認証状態の変更リスナー
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || 'ゲスト',
                    email: session.user.email,
                    isGuest: session.user.is_anonymous
                });
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // 擬似ログイン（今は使わないが互換性のため残す）
    const login = async (userData) => {
        // 手動で名前などを設定したい場合用
        if (user) {
            // 既に匿名ログイン済みならメタデータを更新するなど（今回は省略）
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        localStorage.removeItem('politician_arcade_user');
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
