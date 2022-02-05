import { TwitterBase } from './twitterBase.api';
import { MultipleLookupSpacesByCreatedUserId } from '../../modules/space/twitterResponseType.interface';

export class Space extends TwitterBase {
    private endpoint = '/2/spaces/by/creator_ids?';
    private spaceFields = 'id,state,participant_count,title,created_at';
    private expansions = 'invited_user_ids,speaker_ids,creator_id,host_ids';
    private userFields = 'name,username,withheld';

    /**
     * userIdが開催しているスペース情報を取得する
     * @param usersId userId
     * @returns
     */
    async searchSpaces(usersId: string[]): Promise<MultipleLookupSpacesByCreatedUserId | undefined> {
        const usersIdStr = usersId.toString();
        try {
            const res = await this.axiosRequestBase.get(
                this.endpoint +
                    'user_ids=' +
                    usersIdStr +
                    '&space.fields=' +
                    this.spaceFields +
                    '&expansions=' +
                    this.expansions +
                    '&user.fields=' +
                    this.userFields
            );
            if (res.status === 200) {
                return res.data;
            } else {
                throw new Error('Twitter API通信エラー');
            }
        } catch (e) {
            throw new Error('Twitter API通信エラー');
        }
    }
}
