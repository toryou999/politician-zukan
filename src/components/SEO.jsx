import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, type = 'website', path = '' }) {
    const siteTitle = '政治家図鑑 - あなたの推し議員で作る最強内閣';
    const siteDescription = '政治家のスタンスや経歴が一目でわかる！お気に入りの政治家を集めて自分だけの「マイ内閣」を作ろう！';
    const siteUrl = 'https://politician-zukan.vercel.app';
    const defaultImage = `${siteUrl}/ogp-default.png`;

    const metaTitle = title ? `${title} | 政治家図鑑` : siteTitle;
    const metaDescription = description || siteDescription;
    const metaImage = image || defaultImage;
    const metaUrl = `${siteUrl}${path}`;

    return (
        <Helmet>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* OGP */}
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:site_name" content="政治家図鑑" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
}
