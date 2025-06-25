export function formatTime(city: string, time: string, zone: string, lang: 'en' | 'zh') {
    return lang === 'zh'
        ? `🕒 ${city}的時間：\n${time}（${zone}）`
        : `🕒 Time in ${city}:\n${time} (${zone})`;
}

export function formatTimeList(timeEntries: { label: string, time: string }[], lang: 'en' | 'zh') {
    const lines = timeEntries.map(e =>
        lang === 'zh' ? `${e.label}：${e.time}` : `${e.label}: ${e.time}`
    );
    return lang === 'zh'
        ? `🕒 世界時鐘：\n${lines.join('\n')}`
        : `🕒 World Clock:\n${lines.join('\n')}`;
}
