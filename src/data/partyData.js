export const partyData = [
    {
        id: 'ldp',
        name: '自由民主党',
        shortName: '自民',
        leaderId: 'takaichi-sanae', // 高市早苗
        color: '#d32f2f',
        description: '伝統と創造、責任ある政治。',
        className: 'ldp',
        position: { x: 40, y: -10 },
    },
    {
        id: 'cdp',
        name: '立憲民主党',
        shortName: '立憲',
        leaderId: 'noda-yoshihiko', // 野田佳彦
        color: '#1976d2',
        description: '人へ 未来へ まっとうな政治。',
        className: 'cdp',
        position: { x: -40, y: 40 },
    },
    {
        id: 'komeito',
        name: '公明党',
        shortName: '公明',
        leaderId: 'saito-tetsuo', // 斉藤鉄夫
        color: '#f06292',
        description: '小さな声を、聴く力。',
        className: 'komeito',
        position: { x: 0, y: 0 },
    },
    {
        id: 'ishin',
        name: '日本維新の会',
        shortName: '維新',
        leaderId: 'yoshimura-hirofumi', // 吉村洋文
        color: '#4caf50',
        description: '身を切る改革、実のある改革。',
        className: 'ishin',
        position: { x: 80, y: 60 },
    },
    {
        id: 'dpp',
        name: '国民民主党',
        shortName: '国民',
        leaderId: 'tamaki-yuichiro', // 玉木雄一郎
        color: '#fbc02d',
        description: '対決より解決。手取りを増やす。',
        className: 'dpp',
        position: { x: 40, y: 30 },
    },
    {
        id: 'jcp',
        name: '日本共産党',
        shortName: '共産',
        leaderId: 'tamura-tomoko', // 田村智子
        color: '#7b1fa2',
        description: '国民が主人公。',
        className: 'jcp',
        position: { x: -80, y: 80 },
    },
    {
        id: 'reiwa',
        name: 'れいわ新選組',
        shortName: 'れ新',
        leaderId: 'yamamoto-taro', // 山本太郎
        color: '#e91e63',
        description: '何があっても心配するな。',
        className: 'reiwa',
        position: { x: -50, y: 50 },
    },
    {
        id: 'sanseito',
        name: '参政党',
        shortName: '参政',
        leaderId: 'kamiya-sohei', // 神谷宗幣
        color: '#ff9800',
        description: '日本をなめるな。',
        className: 'sanseito',
        position: { x: -10, y: -70 },
    },
    {
        id: 'hoshuto',
        name: '日本保守党',
        shortName: '保守',
        leaderId: 'hyakuta-naoki', // 百田尚樹
        color: '#0d47a1',
        description: '日本を豊かに、強く。',
        className: 'hoshuto',
        position: { x: 30, y: -80 },
    },
    {
        id: 'mirai',
        name: 'チームみらい',
        shortName: 'チみ',
        leaderId: 'anno-takahiro', // 安野貴博
        color: '#00bcd4',
        description: 'テクノロジーで民主主義をアップデート。',
        className: 'mirai',
        position: { x: 20, y: 40 },
    },
    {
        id: 'chudo',
        name: '中道改革連合',
        shortName: '中道',
        leaderId: 'noda-yoshihiko', // 野田佳彦（共同代表）
        color: '#009688',
        description: '穏健な改革と対話。',
        className: 'chudo',
        position: { x: -40, y: 80 },
    },
    {
        id: 'sdp',
        name: '社民党',
        shortName: '社民',
        leaderId: 'fukushima-mizuho', // 福島瑞穂
        color: '#03a9f4',
        description: 'がんこに平和、くらし一番。',
        className: 'sdp',
        position: { x: -60, y: 80 },
    },
    {
        id: 'genzei',
        name: '減税日本・ゆうこく連合',
        shortName: '減ゆ',
        leaderId: 'kawamura-takashi', // 河村たかし
        color: '#FF6F00',
        description: '減税こそ最大の経済対策。',
        className: 'genzei',
        position: { x: -10, y: -20 },
    },
    {
        id: 'japan-first',
        name: '日本第一党',
        shortName: '第一',
        leaderId: 'sakurai-makoto', // 桜井誠（初代党首・実質的リーダーとして扱う）
        color: '#b71c1c',
        description: '日本第一主義を掲げる。',
        className: 'japan-first',
        position: { x: 90, y: -90 },
    },
    {
        id: 'independent',
        name: '無所属',
        shortName: '無所',
        leaderId: null,
        color: '#757575',
        description: 'しがらみのない政治。',
        className: 'independent',
    },
];

export function getPartyById(id) {
    return partyData.find(p => p.id === id);
}

// 政党名からIDを取得するヘルパー（逆引き）
export function getPartyIdByName(name) {
    const map = {
        '自由民主党': 'ldp',
        '自民党': 'ldp',
        '立憲民主党': 'cdp',
        '公明党': 'komeito',
        '日本維新の会': 'ishin',
        '国民民主党': 'dpp',
        '日本共産党': 'jcp',
        'れいわ新選組': 'reiwa',
        '参政党': 'sanseito',
        '日本保守党': 'hoshuto',
        'チームみらい': 'mirai',
        '中道改革連合': 'chudo',
        '社民党': 'sdp',
        '社会民主党': 'sdp',
        '減税日本・ゆうこく連合': 'genzei',
        '減税日本': 'genzei',
        '日本第一党': 'japan-first',
        '無所属': 'independent',
    };
    return map[name] || 'independent';
}
