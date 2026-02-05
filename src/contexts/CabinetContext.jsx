import { createContext, useContext, useState, useEffect } from 'react';
import { cabinetPositions } from '../data/cabinetPositions';

const CabinetContext = createContext(null);

const STORAGE_KEY = 'my-best-cabinet';

export function CabinetProvider({ children }) {
    // { positionId: politicianId } の形式で保存
    const [cabinet, setCabinet] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    // 選択モーダルの状態
    const [selectingPolitician, setSelectingPolitician] = useState(null);

    // localStorageに保存
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cabinet));
    }, [cabinet]);

    // 内閣にメンバーを追加
    const addToCabinet = (positionId, politicianId) => {
        setCabinet(prev => ({
            ...prev,
            [positionId]: politicianId,
        }));
    };

    // 内閣からメンバーを削除
    const removeFromCabinet = (positionId) => {
        setCabinet(prev => {
            const next = { ...prev };
            delete next[positionId];
            return next;
        });
    };

    // 内閣をリセット
    const resetCabinet = () => {
        setCabinet({});
    };

    // 特定の議員がどのポジションにいるか取得
    const getPoliticianPosition = (politicianId) => {
        for (const [positionId, pId] of Object.entries(cabinet)) {
            if (pId === politicianId) {
                return positionId;
            }
        }
        return null;
    };

    // 埋まっているポジション数
    const filledCount = Object.keys(cabinet).length;
    const totalPositions = cabinetPositions.length;

    // ポジション選択モーダルを開く（議員IDを渡す）
    const openPositionSelect = (politicianId) => {
        setSelectingPolitician(politicianId);
    };

    const closePositionSelect = () => {
        setSelectingPolitician(null);
    };

    return (
        <CabinetContext.Provider value={{
            cabinet,
            addToCabinet,
            removeFromCabinet,
            resetCabinet,
            getPoliticianPosition,
            filledCount,
            totalPositions,
            selectingPolitician,
            openPositionSelect,
            closePositionSelect,
            setCabinet, // 追加
        }}>
            {children}
        </CabinetContext.Provider>
    );
}

export function useCabinet() {
    const context = useContext(CabinetContext);
    if (!context) {
        throw new Error('useCabinet must be used within a CabinetProvider');
    }
    return context;
}
