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
    // 擬似ログイン（今は使わないが互換性のため残す・匿名ユーザー情報の更新用）
    const login = async (userData) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
        }
    };

    // ログイン（メールアドレス）
    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    // パスワードリセット（メール送信）
    const resetPassword = async (email) => {
        // 開発環境と本番環境でリダイレクト先を振り分ける（VercelのURLなどが環境変数にあればそれを使うが、今回はwindow.location.originで簡易対応）
        const redirectTo = `${window.location.origin}/update-password`;
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectTo,
        });
        if (error) throw error;
        return data;
    };

    // パスワード更新（ログイン中、またはリセットリンクから飛んできた後）
    const updatePassword = async (newPassword) => {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error) throw error;
        return data;
    };

    // 新規登録（メールアドレス）
    const signUp = async (email, password, name) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name,
                },
            },
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        localStorage.removeItem('politician_arcade_user');
    };

    const value = {
        user,
        login,
        signIn,
        signUp,
        resetPassword,
        updatePassword,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
