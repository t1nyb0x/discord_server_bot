import { GetWeatherData } from '../usecase/getWeatherData.usecase';

export class WeatherController {
    private static instance: WeatherController;

    /**
     * インスタンス取得
     *
     * @returns WeatherController
     */
    static getInstance(): WeatherController {
        if (!WeatherController.instance) {
            WeatherController.instance = new WeatherController();
        }
        return WeatherController.instance;
    }

    /**
     * 天気情報取得
     *
     * @param args >> weather から続く引数
     * @returns 天気情報または、エラーメッセージ
     */
    async searchWeatherData(args: string[]): Promise<string> {
        const getWeatherData = new GetWeatherData(process.env.WEATHER_TOKEN);
        const res = await getWeatherData.getWeatherInfo(args);
        return res;
    }

    /**
     * 引数バリデーション
     * @param weatherArgs 天気情報を取得したい地名が入った配列
     * @returns
     */
    checkWeatherArgs(weatherArgs: string[]): { error: boolean; errorMessage?: string } {
        // 引数チェック
        if (weatherArgs.length === 0) {
            return {
                error: true,
                errorMessage: '引数は1つまでで入力してください。 例: `>> weather 東京` , `>> weather tokyo`',
            };
        } else {
            return {
                error: false,
            };
        }
    }
}
