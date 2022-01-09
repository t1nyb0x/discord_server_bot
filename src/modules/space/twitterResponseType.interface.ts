export interface lookupUserName {
    data: {
        id: string;
        name: string;
        username: string;
    };
}

export interface lookupSpacesByCreatedUserId {
    data?: spaceData[];
    includes?: {
        users: includeUsers[];
    };
    meta: {
        result_count: number;
    };
}

interface spaceData {
    title?: string;
    host_ids: string[];
    participant_count: number;
    created_at: string;
    creator_id: string;
    state: string;
    id: string;
}

interface includeUsers {
    name: string;
    id: string;
    username: string;
}
