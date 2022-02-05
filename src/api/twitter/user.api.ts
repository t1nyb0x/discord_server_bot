import { TwitterBase } from './twitterBase.api';
import { LookupUserName } from '../../modules/space/twitterResponseType.interface';

export class User extends TwitterBase {
    /**
     * screen nameを、User IDにして返却する
     * @param screenName ユーザーID
     * @returns Promise<string>
     */
    async screenNameToUserId(screenName: string): Promise<string> {
        try {
            const res = await this.axiosRequestBase.get('/2/users/by/username/' + screenName);
            if (res.status === 200) {
                const response: LookupUserName = res.data;
                return response.data.id;
            } else {
                throw new Error('API実行エラーまたは、ユーザーIDが不正です。 HTTPステータス: ' + String(res.status));
            }
        } catch (e) {
            return 'API実行エラーです at User.screenNameToUserId';
        }
    }
}
