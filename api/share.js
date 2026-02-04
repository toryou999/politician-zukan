export default function handler(req, res) {
    const { cabinet } = req.query;

    // アプリのベースURL (Vercel環境変数または固定)
    const baseUrl = 'https://politician-zukan.vercel.app';
    const appUrl = `${baseUrl}/my-cabinet?cabinet=${encodeURIComponent(cabinet)}`;

    // 画像生成APIのURL
    // cabinetパラメータをそのまま渡す
    const imageUrl = `${baseUrl}/api/og?cabinet=${encodeURIComponent(cabinet)}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>私の最強内閣 | 政治家図鑑</title>
    <meta name="description" content="私が選んだ最強の内閣メンバーを見てください！ #政治家図鑑">
    
    <!-- OGP -->
    <meta property="og:title" content="私の最強内閣 | 政治家図鑑">
    <meta property="og:description" content="私が選んだ最強の内閣メンバーを見てください！">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:url" content="${appUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="政治家図鑑">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="私の最強内閣 | 政治家図鑑">
    <meta name="twitter:description" content="私が選んだ最強の内閣メンバーを見てください！">
    <meta name="twitter:image" content="${imageUrl}">
    
    <!-- Redirect -->
    <script>
        window.location.href = "${appUrl}";
    </script>
</head>
<body>
    <p>Redirecting to <a href="${appUrl}">政治家図鑑</a>...</p>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate'); // キャッシュ短め
    res.send(html);
}
