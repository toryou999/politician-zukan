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
        positionReason: '伝統的な価値観を重視する保守政党でありながら、経済政策では市場競争を促進する立場をとっています。',
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
        positionReason: '個人の権利や多様性を尊重（リベラル）し、政府による再分配機能を強化する「大きな政府」を志向しています。',
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
        positionReason: '福祉政策を重視し、中道的な立ち位置を維持していますが、自民党との連立により保守寄りの政策にも協調します。',
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
        positionReason: '規制緩和や競争力強化（市場重視）を掲げつつ、地方分権や統治機構改革など急進的な改革を志向しています。',
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
        positionReason: '現実的な安全保障政策（保守寄り）と、家計支援など積極財政による分配政策を組み合わせています。',
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
        positionReason: '企業への規制強化や富の再分配を最も強く主張し、日米安保廃棄など現状変革を掲げる革新政党です。',
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
        positionReason: '消費税廃止など極めて積極的な財政出動（分配）と、社会的弱者の権利擁護（リベラル）を前面に掲げています。',
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
        positionReason: 'ナショナリズムを基調とした伝統回帰（保守・共同体）を掲げ、グローバリズムへの対抗姿勢を鮮明にしています。',
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
        positionReason: '伝統的な国体や歴史認識を重視する強い保守思想を持ち、リベラル的な価値観と対対立する立場をとっています。',
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
        positionReason: '特定のイデオロギーよりもデータとエビデンスを重視し、テクノロジーによる社会課題解決を目指す実用主義的な立場。',
    },
    {
        id: 'genzei',
        name: '減税日本・ゆうこく連合',
        shortName: '減税',
        leaderId: 'ishihama-tetsunobu', // 石濱哲信
        color: '#FFB84D',
        description: '減税と国守りを掲げる。',
        className: 'genzei',
        position: { x: 90, y: -80 },
        positionReason: '徹底した減税（市場重視）と、自衛隊出身者による強い国防意識（保守・国家観）を組み合わせた独自路線です。',
    },
    {
        id: 'japan-first',
        name: '日本第一党',
        shortName: '日本一',
        leaderId: 'sakurai-makoto', // 桜井誠
        color: '#000000',
        description: '日本第一主義を掲げる。',
        className: 'japan-first',
        position: { x: 95, y: -95 },
        positionReason: '「日本第一主義」を掲げ、外国人参政権反対や移民規制など、極めて強いナショナリズム（国益重視）を主張しています。',
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
