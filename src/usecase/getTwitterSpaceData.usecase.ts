import { Space } from '../api/twitter/space.api';
import { ConvertTimezone } from '../modules/timezone/convertTimezone';
import { MultipleLookupSpacesByCreatedUserId, SpaceInfo } from '../modules/space/twitterResponseType.interface';

export class GetTwitterSpaceData {
    protected convertTimezone = new ConvertTimezone();

    async startGetTwitterSpace(args: string[]): Promise<string | undefined> {
        const twitterSpace = new Space(process.env.TWITTER_API_BEARER);
        // ユーザー名を指定して、スペースの検索を行う
        const res = await twitterSpace.searchSpaces(args);

        if (res === undefined) return;

        const ctxText = `スペースが現在開催中です。
            
        タイトル：${res.title}
        https://twitter.com/i/spaces/${res.spaceId}
        
        開始時間： ${res.createdAt}
        現在${String(res.participantCount)}人が参加中です
        スピーカー
        \`\`\`
        ${res.speakerUsers.join('\n')}
        \`\`\`
            `;

        return ctxText;
    }

    /**
     * Discordへ送信するスペース情報を作成する
     * @param spaceSearchResponse
     * @returns
     */
    parseSpaceSearchRes(spaceSearchResponse: MultipleLookupSpacesByCreatedUserId): SpaceInfo[] | undefined {
        if (spaceSearchResponse.data === undefined || spaceSearchResponse.includes === undefined) return;

        // スピーカーの名前とURLのリストを作成
        const speakerUsers: string[] = [];
        for (const speaker of spaceSearchResponse.includes.users) {
            speakerUsers.push(speaker.name + ' https://twitter.com/' + speaker.username);
        }

        const spaceInfo = spaceSearchResponse.data.map((spaceData) => {
            const spaceInfo = {
                spaceId: spaceData.id,
                state: spaceData.state,
                participantCount: spaceData.participant_count,
                title: spaceData.title !== undefined ? spaceData.title : '無題',
                speakerUsers: speakerUsers,
                createdAt: this.convertTimezone.isoGmttoJst(spaceData.created_at),
            };
            return spaceInfo;
        });

        // // TODO: 0指定であること前提の作りになっているため、安全性に欠ける
        // const spaceInfo = {
        //     spaceId: spaceSearchResponse.data[0].id,
        //     state: spaceSearchResponse.data[0].state,
        //     participantCount: spaceSearchResponse.data[0].participant_count,
        //     title: spaceSearchResponse.data[0].title !== undefined ? spaceSearchResponse.data[0].title : '無題',
        //     speakerUsers: speakerUsers,
        //     createdAt: this.convertTimezone.isoGmttoJst(spaceSearchResponse.data[0].created_at),
        // };
        return spaceInfo;
    }
}
