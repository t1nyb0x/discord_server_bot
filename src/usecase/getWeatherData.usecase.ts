import { WeatherResponse } from 'modules/weather/weatherResponseType.interface';
import { Weather } from '../modules/weather/weather';

export class GetWeatherData {
    constructor(private weatherToken?: string) {}

    /**
     * 天気予報情報取得
     *
     * @param args 都市名が入る前提の引数
     * @returns
     */
    async getWeatherInfo(args: string[]): Promise<string> {
        if (args.length > 1) {
            return '引数は1つまでで入力してください。 例: `>> weather 東京`';
        }
        const weather = new Weather(this.weatherToken);
        // TODO: 200前提の処理になっているため、weatherモジュールからエラーが返ってきたときの処理を作成すること
        const res = await weather.search(args[0]);
        return this.getWeatherMessage(res);
    }

    getWeatherMessage(res: WeatherResponse): string {
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

    getWindGust(windGust?: number): string {
        if (windGust) {
            return `瞬間風速: ${String(windGust)}m/s`;
        } else {
            return '';
        }
    }
}
