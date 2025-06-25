export function formatStock(
    name: string,
    symbol: string,
    price: number,
    change: number,
    percent: number,
    closed: boolean,
    lang: 'en' | 'zh'
    ) {
    const arrow = change >= 0 ? '🔼' : '🔽';
    const sign = change >= 0 ? '+' : '';
    const changeStr = `${arrow} ${sign}${change.toFixed(2)} (${sign}${percent.toFixed(2)}%)`;

    if (lang === 'zh') {
        return `📈 ${name}（${symbol}）\n價格：$${price.toFixed(2)}\n變動：${changeStr}\n${closed ? '（已收盤）' : ''}`;
    } else {
        return `📈 ${name} (${symbol})\nPrice: $${price.toFixed(2)}\nChange: ${changeStr}\n${closed ? '(Market Closed)' : ''}`;
    }
}
