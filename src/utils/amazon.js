// Amazonアソシエイト設定
// ユーザー自身のタグに変更してください（今は仮のIDを入れています）
export const AMAZON_ASSOCIATE_TAG = 'politician-zukan-22';

export const getAmazonProductUrl = (asin) => {
    return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}&linkCode=ogi&th=1&psc=1`;
};

export const getAmazonSearchUrl = (keyword) => {
    return `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=${AMAZON_ASSOCIATE_TAG}`;
};
