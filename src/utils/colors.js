export function getContrastColor(hexColor) {
    if (!hexColor) return '#ffffff';

    // 短縮形 (#fff) を #ffffff に変換
    let color = hexColor.substring(1);
    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }

    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // 比視感度による輝度計算
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // 閾値を調整（128より少し高めも見やすくする）
    return (yiq >= 140) ? '#1a1a2e' : '#ffffff';
}

// 特定の明るい政党カラーリスト（強制的に黒にする場合など）
export const LIGHT_PARTY_COLORS = ['#fbc02d', '#FFB84D', '#ff9800', '#FDD835', '#FF6F00'];
export const LIGHT_PARTY_IDS = ['genzei', 'dpp', 'sanseito'];

export function getPartytextColor(partyColor, partyId) {
    if (LIGHT_PARTY_IDS.includes(partyId) || LIGHT_PARTY_COLORS.includes(partyColor?.toUpperCase())) {
        return '#1a1a2e'; // Dark
    }
    return getContrastColor(partyColor);
}
