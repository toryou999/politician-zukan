import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function Privacy() {
    return (
        <div className="container">
            <SEO
                title="プライバシーポリシー | 政治家図鑑"
                description="政治家図鑑のプライバシーポリシーです。個人情報の取り扱い、Cookieの利用、広告配信について説明しています。"
            />

            <div className="card">
                <h1>プライバシーポリシー</h1>
                <p className="last-updated">最終更新日: 2026年2月5日</p>

                <section className="terms-section">
                    <h2>1. 個人情報の利用目的</h2>
                    <p>当サイトでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報をご入力いただく場合がございます。</p>
                    <p>取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。</p>
                </section>

                <section className="terms-section">
                    <h2>2. 広告について</h2>
                    <p>当サイトでは、第三者配信の広告サービス（Google AdSense等）を利用する予定です。</p>
                    <p>このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」（氏名、住所、メールアドレス、電話番号は含まれません）を使用することがあります。</p>
                    <p>またGoogle AdSenseに関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">Googleのポリシーと規約</a>をご覧ください。</p>
                </section>

                <section className="terms-section">
                    <h2>Amazonアソシエイト・プログラムについて</h2>
                    <p>
                        当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
                    </p>
                </section>

                <section className="terms-section">
                    <h2>3. アクセス解析ツールについて</h2>
                    <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。</p>
                    <p>このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。</p>
                </section>

                <div className="terms-footer">
                    <Link to="/" className="back-link">トップページに戻る</Link>
                </div>
            </div>
        </div>
    );
}

export default Privacy;
