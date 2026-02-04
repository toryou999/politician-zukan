// 内閣ポジション定義
export const cabinetPositions = [
    // 1行目: トップ
    { id: 'prime_minister', name: '内閣総理大臣', shortName: '総理', row: 1, order: 1 },

    // 2行目: 3ポジション
    { id: 'deputy_pm', name: '副総理', shortName: '副総理', row: 2, order: 1 },
    { id: 'chief_cabinet', name: '内閣官房長官', shortName: '官房長官', row: 2, order: 2 },
    { id: 'digital', name: 'デジタル大臣', shortName: 'デジタル', row: 2, order: 3 },

    // 3行目: 4ポジション
    { id: 'finance', name: '財務大臣', shortName: '財務', row: 3, order: 1 },
    { id: 'foreign', name: '外務大臣', shortName: '外務', row: 3, order: 2 },
    { id: 'defense', name: '防衛大臣', shortName: '防衛', row: 3, order: 3 },
    { id: 'justice', name: '法務大臣', shortName: '法務', row: 3, order: 4 },

    // 4行目: 4ポジション
    { id: 'health', name: '厚生労働大臣', shortName: '厚労', row: 4, order: 1 },
    { id: 'education', name: '文部科学大臣', shortName: '文科', row: 4, order: 2 },
    { id: 'economy', name: '経済産業大臣', shortName: '経産', row: 4, order: 3 },
    { id: 'agriculture', name: '農林水産大臣', shortName: '農水', row: 4, order: 4 },

    // 5行目: 4ポジション
    { id: 'land', name: '国土交通大臣', shortName: '国交', row: 5, order: 1 },
    { id: 'environment', name: '環境大臣', shortName: '環境', row: 5, order: 2 },
    { id: 'reconstruction', name: '復興大臣', shortName: '復興', row: 5, order: 3 },
    { id: 'okinawa', name: '内閣府特命担当大臣', shortName: '特命', row: 5, order: 4 },
];

export function getPositionById(id) {
    return cabinetPositions.find(p => p.id === id);
}

export function getPositionsByRow(row) {
    return cabinetPositions.filter(p => p.row === row).sort((a, b) => a.order - b.order);
}
