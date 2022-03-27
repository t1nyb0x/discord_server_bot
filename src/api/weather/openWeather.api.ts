import axios from 'axios';
import { OpenWeatherResponse } from '../../modules/weather/openweatherResponseType.interface';

export class Weather {
    private api: string;

    constructor(token?: string) {
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
    async search(cityName: string): Promise<OpenWeatherResponse> {
        const requestUrl = this.api + '&lang=ja' + '&q=' + cityName;
        try {
            const res = await axios.get(encodeURI(requestUrl));

            return {
                error: false,
                data: res.data,
            };
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return {
                    error: true,
                    errorMessage: 'Error Code: ' + e.response.data.cod + '\n' + e.response.data.message,
                };
            } else {
                return {
                    error: true,
                    errorMessage: '不明なエラーです at Weather.search()',
                };
            }
        }
    }
}
