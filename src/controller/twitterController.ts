import { User as TwitterUser } from '../api/twitter/user.api';
import { Space as TwitterSpace } from '../api/twitter/space.api';
import { SpaceInfo } from 'modules/space/twitterResponseType.interface';

export class TwitterController {
    private static instance: TwitterController;

    /**
     * インスタンス取得
     * @returns TwitterController
     */
    static getInstance(): TwitterController {
        if (!TwitterController.instance) {
            TwitterController.instance = new TwitterController();
        }
        return TwitterController.instance;
    }

    /**
     * Space検索
     * @param args コマンド引数として渡るユーザーID
     * @returns
     */
    async searchSpaces(args: string[]): Promise<SpaceInfo | undefined> {
        const twitterUser = new TwitterUser(process.env.TWITTER_API_BEARER);
        // 受け取ったscreen nameからuser idを取得する
        const usersId = await Promise.all(
            args.map(async (userName) => {
                const userId = await twitterUser.screenNameToUserId(userName);
                return userId;
            })
        );

        const twitterSpace = new TwitterSpace(process.env.TWITTER_API_BEARER);
        const spaceData = await twitterSpace.searchSpaces(usersId);
        return spaceData;
    }
}
