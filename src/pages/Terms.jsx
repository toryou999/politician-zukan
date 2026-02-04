import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function Terms() {
    return (
        <div className="container">
            <SEO
                title="利用規約 | 政治家図鑑"
                description="政治家図鑑の利用規約です。当サイトの利用条件、免責事項などを定めています。"
            />

            <div className="card">
                <h1>利用規約</h1>
                <p className="last-updated">最終更新日: 2026年2月5日</p>

                <section className="terms-section">
                    <h2>1. はじめに</h2>
                    <p>この利用規約（以下「本規約」）は、政治家図鑑（以下「当サイト」）の利用条件を定めるものです。ユーザーの皆様には、本規約に従って当サイトをご利用いただきます。</p>
                </section>

                <section className="terms-section">
                    <h2>2. 免責事項</h2>
                    <ul>
                        <li>当サイトに掲載されている情報の正確性については万全を期しておりますが、その内容を保証するものではありません。</li>
                        <li>当サイトの利用によって生じた損害等について、運営者は一切の責任を負いません。</li>
                        <li>政治家の情報は、公表されている資料や報道等に基づき作成していますが、情報の更新が遅れる場合があります。正確な情報は各政治家の公式サイトや公的機関の情報をご確認ください。</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>3. 著作権</h2>
                    <p>当サイトに掲載されている文章、画像、プログラム等のコンテンツの著作権は、運営者または正当な権利者に帰属します。私的利用の範囲を超えて、無断で複製、転載、改変することはできません。</p>
                    <p>ただし、当サイトが提供する「マイベスト内閣」等のシェア機能を用いて、SNS等で共有することは自由に推奨されます。</p>
                </section>

                <section className="terms-section">
                    <h2>4. 禁止事項</h2>
                    <p>ユーザーは、当サイトの利用にあたり、以下の行為をしてはなりません。</p>
                    <ul>
                        <li>法令または公序良俗に違反する行為</li>
                        <li>犯罪行為に関連する行為</li>
                        <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                        <li>当サイトの運営を妨害するおそれのある行為</li>
                        <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>5. 規約の変更</h2>
                    <p>運営者は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。</p>
                </section>

                <div className="terms-footer">
                    <Link to="/" className="back-link">トップページに戻る</Link>
                </div>
            </div>
        </div>
    );
}

export default Terms;
