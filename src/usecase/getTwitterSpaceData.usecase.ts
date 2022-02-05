import { User as TwitterUser } from '../api/twitter/user.api';
import { Space as TwitterSpace } from '../api/twitter/space.api';
import { ConvertTimezone } from '../modules/timezone/convertTimezone';
import {
    MultipleLookupSpacesByCreatedUserId,
    SpaceInfo,
    IncludeUsers,
} from '../modules/space/twitterResponseType.interface';

export class GetTwitterSpaceData {
    private twitterApiBearer: string;
    protected convertTimezone = new ConvertTimezone();

    constructor(bearer?: string) {
        if (bearer === undefined) {
            throw new Error('Twitter API Bearerが見つかりません');
        }
        this.twitterApiBearer = bearer;
    }

    /**
     * TwitterSpace情報を取得する
     * @param args - screen_name
     * @returns Discordで表示する文字列
     */
    async getTwitterSpace(args: string[]): Promise<string> {
        const twitterUser = new TwitterUser(this.twitterApiBearer);
        // 受け取ったscreen nameからuser idを取得する
        const usersId = await Promise.all(
            args.map(async (userName) => {
                const userId = await twitterUser.screenNameToUserId(userName);
                return userId;
            })
        );
        const twitterSpace = new TwitterSpace(this.twitterApiBearer);
        // ユーザー名を指定して、スペースの検索を行う
        const spaceDataResponse = await twitterSpace.searchSpaces(usersId);

        if (spaceDataResponse === undefined) {
            throw new Error('スペース情報取得に失敗しました');
        }
        const res = this.parseSpaceSearchRes(spaceDataResponse);
        return this.makeDiscordMessage(res);
    }

    /**
     * Discordへ送信する内容を作成する
     * @param spaceInfo
     * @returns
     */
    makeDiscordMessage(spaceInfo?: SpaceInfo[]): string {
        if (spaceInfo === undefined) {
            return 'スペースは開催されていません。';
        }

        const discordMsgArray = spaceInfo.map((space) => {
            return `${space.creator}は、スペースを開催中です。

タイトル：${space.title}
https://twitter.com/i/spaces/${space.spaceId}

開始時間： ${space.createdAt}
現在${String(space.participantCount)}人が参加中です
スピーカー
\`\`\`${space.speakerUsers.join('\n')}\`\`\`
        `;
        });

        const discordMsg = discordMsgArray.join('\n');

        return discordMsg;
    }

    /**
     * Discordへ送信するスペース情報を作成する
     * @param spaceSearchResponse
     * @returns
     */
    parseSpaceSearchRes(spaceSearchResponse: MultipleLookupSpacesByCreatedUserId): SpaceInfo[] | undefined {
        if (spaceSearchResponse.data === undefined) return;

        const spaceInfo = spaceSearchResponse.data.map((spaceData) => {
            const speakerUsers: string[] = [];
            let createUser: IncludeUsers | undefined;
            if (spaceSearchResponse.includes !== undefined) {
                // スペースに参加しているスピーカーIDから、ユーザー情報を取得する
                const attendanceSpakers = spaceSearchResponse.includes.users.filter((user) => {
                    return spaceData.speaker_ids.find((speaker_id) => speaker_id === user.id);
                });

                for (const speaker of attendanceSpakers) {
                    speakerUsers.push(speaker.name + ' http://twitter.com' + speaker.username);
                }

                // スペース作成者のscreen_nameを取得
                createUser = spaceSearchResponse.includes.users.find((user) => user.id === spaceData.creator_id);
            }
            return {
                spaceId: spaceData.id,
                state: spaceData.state,
                participantCount: spaceData.participant_count,
                title: spaceData.title !== undefined ? spaceData.title : '無題',
                speakerUsers: speakerUsers,
                creator: createUser !== undefined ? createUser.name + '(@' + createUser.username + ')' : '',
                createdAt: this.convertTimezone.isoGmttoJst(spaceData.created_at),
            };
        });
        return spaceInfo;
    }
}
