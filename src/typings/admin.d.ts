export interface IAdminLocation {
    id: number;
    short: string;
    long: string;
    created_at: string;
    updated_at: string;
}

export interface IAdminNest {
    id: number;
    uuid: string;
    author: string;
    name: string;
    description: string;
    created_at: string,
    updated_at: string;
}
export interface IAdminServer {
    id: number;
    external_id: number;
    uuid: string;
    identifier: string;
    name: string;
    description: string;
    suspended: boolean;
    limits: {
          memory: number;
          swap: number;
          disk: number;
          io: number;
          cpu: number;
          threads?: number;
    }
    feature_limits: {
        databases: number;
        allocations: number;
        backups: number;
    }
    user: number;
    node: number;
    allocation: number;
    nest: number;
    egg: number;
    pack?: string;
    container: {
        startup_command: string;
        image: string;
        installed: true,
        environment: {
        SERVER_JARFILE: string;
            VANILLA_VERSION: string;
            STARTUP: string;
            P_SERVER_LOCATION: string;
            P_SERVER_UUID: string;
        }
    }
    updated_at: string;
    created_at: string;
}
export interface IAdminEgg {
    id: number;
    uuid: string;
    name: string;
    nest: number;
    author: string;
    description: string;
    docker_image: string;
    config: {
        files: {
            [fileName: string]: {
                parser: string;
                find: Record<string, any>;
                startup: Record<string, any>;
                stop: string;
                logs: Record<string, any>;
                extends: null;
            }
        }
        startup: Record<string, any>;
        stop: string;
        logs: Record<string, any>;
        extends?: string;
    }
    startup: string;
    script: {
        privileged: boolean;
        install: string;
        entry: string;
        container: string;
        extends?: string;
    }
    created_at: string;
    updated_at: string;
}

export interface IAdminUser {
    
}