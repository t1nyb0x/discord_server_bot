export interface SpaceInfo {
    spaceId: string;
    state: string;
    participantCount: number;
    title: string;
    speakerUsers: string[];
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
    title?: string;
    host_ids: string[];
    participant_count: number;
    created_at: string;
    creator_id: string;
    state: string;
    id: string;
}

interface IncludeUsers {
    name: string;
    id: string;
    username: string;
}
