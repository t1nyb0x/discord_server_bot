import { GetTwitterSpaceData } from '../usecase/getTwitterSpaceData.usecase';

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
    async searchSpaces(args: string[]): Promise<string> {
        const getTwitterSpaceData = new GetTwitterSpaceData(process.env.TWITTER_API_BEARER);
        const result = getTwitterSpaceData.getTwitterSpace(args);
        return result;
    }

    /**
     * 引数が不正ではないかチェックする
     * @param screenNames
     */
    checkScreenName(screenNames: string[]): { error: boolean; errorMessage?: string } {
        // 引数が入っているか
        if (!screenNames.length) {
            return {
                error: true,
                errorMessage: 'ユーザー名を入力してください',
            };
        }

        // 引数であるscreenNameが、Twitterの定める条件となっているか
        const resultArr = screenNames.map((screenName) => {
            return /^[A-Za-z0-9_]{1,15}$/.test(screenName);
        });

        if (resultArr.some((result) => result === false)) {
            return {
                error: true,
                errorMessage: 'ユーザー名が不正です',
            };
        } else {
            return {
                error: false,
            };
        }
    }
}
