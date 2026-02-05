// Amazonアソシエイト設定
// ユーザー自身のタグに変更してください（今は仮のIDを入れています）
export const AMAZON_ASSOCIATE_TAG = 'bassarijpgo-22';

export const getAmazonProductUrl = (asin) => {
    // シンプルな形式に変更
    return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
};

export const getAmazonSearchUrl = (keyword) => {
    return `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=${AMAZON_ASSOCIATE_TAG}`;
};
