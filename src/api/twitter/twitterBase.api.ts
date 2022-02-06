import axios, { AxiosInstance } from 'axios';

/**
 * TwitterAPIリクエスト基底クラス
 */
export class TwitterBase {
    private bearer: string;
    protected axiosRequestBase: AxiosInstance;

    constructor(bearer?: string) {
        if (bearer === undefined) throw new Error('TwitterAPIBearerが見つかりません');
        this.bearer = bearer;
        this.axiosRequestBase = axios.create({
            baseURL: 'https://api.twitter.com',
            headers: {
                Authorization: this.bearer,
            },
            responseType: 'json',
        });
    }
}
