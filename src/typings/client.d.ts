export interface IClientPermissions {
    [permission: string]: {
        description: string;
        keys: {
            [key: string]: string;
        }
    }
}

export interface IClientServer {
    server_owner: boolean;
    identifier: string;
    uuid: string;
    name: string;
    node: string;
    sftp_details: {
        ip: string;
        port: number;
    };
    description: string;
    limits: {
        memory: number;
        swap: number;
        io: number;
        disk: number;
        cpu: number;
    };
    feature_limits: {
        databases: number;
        backups: number;
        allocations: number;
    };
    is_suspended: boolean;
    is_installing: boolean;
    relationships: {
        [relation: string]: {
            object: "list";
            data: {
                object: string;
                attributes: unknown;
            }[];
        }
    } 
}

export interface IAccountDetails {
    id: number;
    admin: boolean;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
}

export interface IWebSocketDetail {
    data: {
        token: string;
        socket: string;
    }
}