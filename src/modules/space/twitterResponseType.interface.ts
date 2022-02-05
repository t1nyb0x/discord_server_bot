export interface SpaceInfo {
    spaceId: string;
    state: string;
    participantCount: number;
    title: string;
    speakerUsers: string[];
    creator: string;
    createdAt: string;
}

export interface LookupUserName {
    data: {
        id: string;
        name: string;
        username: string;
    };
}

export interface MultipleLookupSpacesByCreatedUserId {
    data?: SpaceData[];
    includes?: {
        users: IncludeUsers[];
    };
    meta: {
        result_count: number;
    };
}

interface SpaceData {
    /** スペースのステータス */
    state: string;
    /** 参加者数 */
    participant_count: number;
    /** ホスト */
    host_ids: string[];
    /** スペースID */
    id: string;
    /** 作成日時（UTC） */
    created_at: string;
    /** スペースタイトル */
    title?: string;
    /** 作成者ID */
    creator_id: string;
    /** スピーカーID */
    speaker_ids: string[];
}

export interface IncludeUsers {
    name: string;
    id: string;
    username: string;
}
