export interface OpenWeatherResponse {
    error: boolean;
    data?: OpenWeatherData;
    errorMessage?: string;
}

/**
 * OpenWeatherResponse
 */
export interface OpenWeatherData {
    /**
     * lon: 緯度
     * lat: 経度
     */
    coord: {
        lon: number;
        lat: number;
    };
    /** 天気 */
    weather: Weather[];
    /** API側内部データ */
    base: string;
    /** 天気情報 */
    main: WeatherInfomation;
    /** 視程（メートル単位） */
    visibility: number;
    /** 風 */
    wind: {
        /** 風速（m/s表記） */
        speed: number;
        /** 風向 */
        deg: number;
        /** 突風（瞬間風速） */
        gust?: number;
    };
    /** 曇り度合い（％表記） */
    clouds?: {
        all: number;
    };
    rain?: {
        /** 過去1時間の降水量 */
        '1h': number;
        /** 過去3時間の降水量 */
        '3h': number;
    };
    snow?: {
        /** 過去1時間の降雪量 */
        '1h': number;
        /** 過去3時間の降雪量 */
        '3h': number;
    };
    /** データ取得時間（unix時間） */
    dt: number;
    sys: {
        /** 内部データ */
        type: number;
        /** 内部データ */
        id: number;
        /** 内部データ */
        message?: string;
        /** 国コード */
        country: string;
        /** 日出時間（UTC） */
        sunrise: number;
        /** 日の入時間（UTC） */
        sunset: number;
    };
    timezone: number;
    id: number;
    /** 都市名 */
    name: string;
    cod: number;
}

/**
 * Weatherインターフェース
 */
export interface Weather {
    /** id: 天気ID */
    id: number;
    /** main: 天気状況グループ */
    main: string;
    /** description: 天気状況グループ内の説明（指定された言語で返却）*/
    description: string;
    /** icon: 天気アイコンID */
    icon: string;
}

/**
 * WeatherInfomationインターフェース
 * 天気情報詳細
 * このモジュールは温度を摂氏で返すようにしている
 */
export interface WeatherInfomation {
    /** temp: 温度（リクエスト時 デフォルトはケルビン、Metric指定で摂氏、Imperialは華氏）*/
    temp: number;
    /** feel_like: 体感温度（リクエスト時 デフォルトはケルビン、Metric指定で摂氏、Imperialは華氏）*/
    feels_like: number;
    /** 最低気温 */
    temp_min: number;
    /** 最高気温 */
    temp_max: number;
    /** 気圧 */
    pressure: number;
    /** 湿度 */
    humidity: number;
}
