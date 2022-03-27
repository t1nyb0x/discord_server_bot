import { ConvertTimezone } from '../modules/timezone/convertTimezone';
import { Weather as OpenWeather } from '../api/weather/openWeather.api';
import { OpenWeatherData } from '../modules/weather/openweatherResponseType.interface';
import { WeatherData } from '../modules/weather/weatherResponseType.interface';

export class GetWeatherData {
    protected convertTimeZone: ConvertTimezone = new ConvertTimezone();

    constructor(private weatherToken?: string) {}

    /**
     * 天気情報取得
     *
     * @param args 都市名が入る前提の引数
     * @returns
     */
    async getWeatherInfo(args: string[]): Promise<string> {
        const weather = new OpenWeather(this.weatherToken);
        const res = await weather.search(args[0]);
        if (res.error === false && res.data) {
            const parsedData = this.parseWeatherData(res.data);
            return this.getWeatherMessage(parsedData);
        } else if (res.error === true && res.errorMessage) {
            return res.errorMessage;
        } else {
            return '天気予報に取得失敗しました';
        }
    }

    getWeatherMessage(res: WeatherData): string {
        const weatherMessage = `\`\`\`
現在の${res.name}の天気情報
現在の天気: ${res.weatherName}
現在の気温: ${res.currentTemp}℃
体感気温: ${res.feelsTemp}℃
今日の最高気温: ${res.tempMax}℃
今日の最低気温: ${res.tempMin}℃
現在の湿度: ${res.humidity}%
視程: ${res.visibility / 1000}km
現在の気圧: ${res.pressure}hPa
風速: ${res.windSpeed}m/s
風向: ${res.windDirection}
雲量: ${res.clouds}%
${this.getWindGust(res.windGust)}
日の出: ${res.sunrise}
日の入: ${res.sunset}\`\`\``;

        return weatherMessage;
    }

    /**
     * APIから受け取ったAPIレスポンスをDiscordで使えるものに加工する
     * @param weatherData
     */
    parseWeatherData(weatherData: OpenWeatherData): WeatherData {
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
            sunrise: this.convertTimeZone.unixtimeToJst(weatherData.sys.sunrise).trim(),
            sunset: this.convertTimeZone.unixtimeToJst(weatherData.sys.sunset).trim(),
            updatedTime: this.convertTimeZone.unixtimeToJst(weatherData.dt).trim(),
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

    getWindGust(windGust?: number): string {
        if (windGust) {
            return `瞬間風速: ${String(windGust)}m/s`;
        } else {
            return '';
        }
    }
}
