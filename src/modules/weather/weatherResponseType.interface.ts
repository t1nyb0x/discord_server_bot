export interface WeatherData {
    /** 都市名 */
    name: string;
    /** 天気名 */
    weatherName: string;
    /** 天気アイコン */
    weatherIcon: string;
    /** 現在の気温 */
    currentTemp: number;
    /** 体感気温 */
    feelsTemp: number;
    /** 最低気温 */
    tempMin: number;
    /** 最高気温 */
    tempMax: number;
    /** 湿度 */
    humidity: number;
    /** 気圧 */
    pressure: number;
    /** 視程 */
    visibility: number;
    /** 風向 */
    windDirection: string;
    /** 風速（m/s） */
    windSpeed: number;
    /** 瞬間風速（m/s） */
    windGust?: number;
    /** 曇度合い */
    clouds?: number;
    /** 過去の降水量 */
    rain?: Rain;
    /** 過去の降雪量 */
    snow?: Snow;
    /** 日の出 */
    sunrise: string;
    /** 日の入 */
    sunset: string;
    /** データ取得時間 */
    updatedTime: string;
}

export interface Rain {
    '1h': number;
    '3h': number;
}

export interface Snow {
    '1h': number;
    '3h': number;
}
