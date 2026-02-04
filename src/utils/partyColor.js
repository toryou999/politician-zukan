// 政党名からCSSクラス名を取得するユーティリティ

export const getPartyClassName = (partyName) => {
    if (!partyName) return 'independent';

    const partyMap = {
        '自由民主党': 'ldp',
        '自民党': 'ldp',
        '自民': 'ldp',

        '公明党': 'komeito',
        '公明': 'komeito',

        '立憲民主党': 'cdp',
        '立憲': 'cdp',

        '日本維新の会': 'ishin',
        '維新': 'ishin',

        '国民民主党': 'dpp',
        '国民': 'dpp',

        '日本共産党': 'jcp',
        '共産党': 'jcp',
        '共産': 'jcp',

        'れいわ新選組': 'reiwa',
        'れいわ': 'reiwa',

        '社会民主党': 'sdp',
        '社民党': 'sdp',
        '社民': 'sdp',

        '参政党': 'sanseito',

        '日本保守党': 'hoshuto',
        '保守党': 'hoshuto',

        'チームみらい': 'mirai',

        '中道改革連合': 'chudo',

        '減税日本・ゆうこく連合': 'genzei',
        '減税日本': 'genzei',

        '教育無償化を実現する会': 'education',

        '無所属': 'independent'
    };

    return partyMap[partyName] || 'independent';
};
