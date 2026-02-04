/**
 * Wikimedia Commons API ユーティリティ
 * 画像ファイル名からURL、作者、ライセンス情報を取得する
 */

const WIKIMEDIA_API_BASE = 'https://commons.wikimedia.org/w/api.php';

/**
 * HTMLタグを除去してプレーンテキストを返す
 * @param {string} html - HTMLを含む可能性のある文字列
 * @returns {string} - プレーンテキスト
 */
function stripHtml(html) {
    if (!html) return '';
    // シンプルなHTMLタグ除去
    return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Wikimedia Commonsのファイル名から画像情報を取得
 * @param {string} fileName - ファイル名 (例: "Sohei_Kamiya_2023-2-19(1)_(cropped).jpg")
 * @returns {Promise<Object|null>} - 画像情報オブジェクト、取得失敗時はnull
 */
export async function getWikimediaImageInfo(fileName) {
    // ファイル名に "File:" プレフィックスがなければ追加
    const fullFileName = fileName.startsWith('File:') ? fileName : `File:${fileName}`;

    const params = new URLSearchParams({
        action: 'query',
        titles: fullFileName,
        prop: 'imageinfo',
        iiprop: 'url|extmetadata',
        iiextmetadatafilter: 'Artist|LicenseShortName|LicenseUrl|Attribution|Credit',
        format: 'json',
        origin: '*', // CORS対応
    });

    try {
        const response = await fetch(`${WIKIMEDIA_API_BASE}?${params}`);
        const data = await response.json();

        // レスポンスから情報を抽出
        const pages = data.query?.pages;
        if (!pages) return null;

        const pageId = Object.keys(pages)[0];
        if (pageId === '-1') return null; // ファイルが見つからない

        const imageInfo = pages[pageId]?.imageinfo?.[0];
        if (!imageInfo) return null;

        const extmetadata = imageInfo.extmetadata || {};

        return {
            url: imageInfo.url,
            artist: stripHtml(extmetadata.Artist?.value) || '不明',
            license: extmetadata.LicenseShortName?.value || '不明',
            licenseUrl: extmetadata.LicenseUrl?.value || null,
            attribution: stripHtml(extmetadata.Attribution?.value) || null,
            credit: stripHtml(extmetadata.Credit?.value) || null,
            fileName: fileName,
            commonsUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName)}`,
        };
    } catch (error) {
        console.error('Wikimedia API error:', error);
        return null;
    }
}

/**
 * 後方互換性のためのラッパー（URLのみを返す）
 * @param {string} fileName 
 * @returns {Promise<string|null>}
 */
export async function getWikimediaImageUrl(fileName) {
    const info = await getWikimediaImageInfo(fileName);
    return info?.url || null;
}
