export function formatWeather(city: string, data: any, lang: 'en' | 'zh') {
    return lang === 'zh'
        ? `🌤️ ${city} 的天氣：\n溫度：${data.temp}°C\n狀況：${data.description}`
        : `🌤️ Weather in ${city}:\nTemp: ${data.temp}°C\nCondition: ${data.description}`;
}
