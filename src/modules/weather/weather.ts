import axios from 'axios';
import { OpenWeatherResponse } from './openweatherResponseType.interface';
import { WeatherResponse } from './weatherResponseType.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment-timezone');

export class Weather {
    private api: string;

    constructor(token: string | undefined) {
        if (token === undefined) {
            throw new Error('Failed get openweather token.');
        }
        this.api = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + token;
    }

    /**
     * 天気予報情報検索API
     *
     * @param cityName 都市名
     * @returns
     */
    async search(cityName: string): Promise<WeatherResponse> {
        const requestUrl = this.api + '&q=' + cityName + '&lang=ja';

        // TODO: エラー時を考慮した処理を作成すること
        const res = this.parseWeatherData((await axios.get(encodeURI(requestUrl))).data);

        return res;
    }

    /**
     * APIから受け取ったAPIレスポンスをDiscordで使えるものに加工する
     * @param weatherData
     */
    parseWeatherData(weatherData: OpenWeatherResponse): WeatherResponse {
        const parsedWeatherData = {
            name: weatherData.name.trim(),
            weatherName: weatherData.weather[0].description.trim(),
            weatherIcon: 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon.trim() + '.png',
            currentTemp: weatherData.main.temp,
            feelsTemp: weatherData.main.feels_like,
            tempMin: weatherData.main.temp_min,
            tempMax: weatherData.main.temp_max,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            visibility: weatherData.visibility,
            windDirection: this.convertDeg(weatherData.wind.deg).trim(),
            windSpeed: weatherData.wind.speed,
            windGust: weatherData.wind.gust ? weatherData.wind.gust : undefined,
            clouds: weatherData.clouds ? weatherData.clouds.all : undefined,
            rain: weatherData.rain ? weatherData.rain : undefined,
            snow: weatherData.snow ? weatherData.snow : undefined,
            sunrise: this.convertUTCtoJST(weatherData.sys.sunrise).trim(),
            sunset: this.convertUTCtoJST(weatherData.sys.sunset).trim(),
            updatedTime: this.convertUTCtoJST(weatherData.dt).trim(),
        };

        return parsedWeatherData;
    }

    /**
     * 風向の値を変換する
     * @param deg
     * @returns
     */
    convertDeg(deg: number): string {
        const dname = [
            '北',
            '北北東',
            '北東',
            '東北東',
            '東',
            '東南東',
            '南東',
            '南南東',
            '南',
            '南南西',
            '南西',
            '西南西',
            '西',
            '西北西',
            '北西',
            '北北西',
        ];

        let index = Math.floor(deg / 22.5);
        if (index > 16) index = 0;

        return dname[index];
    }

    /**
     * UTCをJSTへ変換する
     */
    convertUTCtoJST(unixtime: number): string {
        moment.tz.setDefault('Asia/Tokyo');
        const date = moment(unixtime, 'X').format('YYYY-MM-DD HH:mm:ss');
        return date;
    }
}
