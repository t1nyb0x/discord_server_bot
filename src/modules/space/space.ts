import axios from 'axios';
import { ConvertTimezone } from 'service/convertTimezone';
import { lookupUserName, lookupSpacesByCreatedUserId } from './twitterResponseType.interface';

interface spaceInfo {
    spaceId: string;
    state: string;
    participantCount: number;
    title: string;
    speakerUsers: string[];
    createdAt: string;
}

/**
 * TwitterSpace取得クラス
 *
 * @field endpoint TwitterAPIエンドポイント
 */
export class TwitterSpace {
    private endpoint = '/2/spaces/by/creator_ids?';
    private spaceFields = 'id,state,participant_count,title,created_at';
    private expansions = 'invited_user_ids,speaker_ids,creator_id,host_ids';
    private userFields = 'name,username,withheld';
    private bearer: string;
    private twitterRequest;
    protected convertTimezone = new ConvertTimezone();

    constructor(bearer: string | undefined) {
        if (bearer === undefined) throw new Error('TwitterAPIBearerが見つかりません');
        this.bearer = bearer;
        this.twitterRequest = axios.create({
            baseURL: 'https://api.twitter.com',
            headers: {
                Authorization: this.bearer,
            },
            responseType: 'json',
        });
    }

    /**
     * 指定されたユーザーのスペース情報を探す
     * @param userName
     */
    async search(userName: string): Promise<spaceInfo | undefined> {
        const userId = await this.userNameToUserId(userName);
        const res = await this.twitterRequest.get(
            this.endpoint +
                'user_ids=' +
                userId +
                '&space.fields=' +
                this.spaceFields +
                '&expansions=' +
                this.expansions +
                '&user.fields=' +
                this.userFields
        );
        if (res.status === 200) {
            return this.parseSpaceSearchRes(res.data);
        }
    }

    /**
     * Discordへ送信するスペース情報を作成する
     * @param spaceSearchResponse
     * @returns
     */
    parseSpaceSearchRes(spaceSearchResponse: lookupSpacesByCreatedUserId): spaceInfo | undefined {
        if (spaceSearchResponse.data === undefined || spaceSearchResponse.includes === undefined) return;

        // スピーカーの名前とURLのリストを作成
        const speakerUsers: string[] = [];
        for (const speaker of spaceSearchResponse.includes.users) {
            speakerUsers.push(speaker.name + ' https://twitter.com/' + speaker.username);
        }

        // TODO: 0指定であること前提の作りになっているため、安全性に欠ける
        const spaceInfo = {
            spaceId: spaceSearchResponse.data[0].id,
            state: spaceSearchResponse.data[0].state,
            participantCount: spaceSearchResponse.data[0].participant_count,
            title: spaceSearchResponse.data[0].title !== undefined ? spaceSearchResponse.data[0].title : '無題',
            speakerUsers: speakerUsers,
            createdAt: this.convertTimezone.isoGmttoJst(spaceSearchResponse.data[0].created_at),
        };
        return spaceInfo;
    }

    /**
     * ユーザーIDを、ユーザー固有のIDにして返却する
     * @param userName ユーザーID
     * @returns
     */
    async userNameToUserId(userName: string): Promise<string> {
        const res = await this.twitterRequest.get('/2/users/by/username/' + userName);
        if (res.status === 200) {
            const response: lookupUserName = res.data;
            return response.data.id;
        } else {
            throw new Error('API実行エラー');
        }
    }
}
