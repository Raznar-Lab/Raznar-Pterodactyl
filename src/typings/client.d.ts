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

export interface IClientAllocations {
    id: number;
    ip: number;
    ip_alias: string | number;
    port: number;
    notes: string;
    is_default: boolean;
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
export interface IClientServerResources {
    current_state: string;
    is_suspended: boolean;
    resources: {
        memory_bytes: number;
        cpu_absolute: number;
        disk_bytes: number;
        network_rx_bytes: number;
        network_tx_bytes: number;
    }
}


export interface IClientServerSchedule {
    id: number;
    name: string;
    cron: {
        day_of_week: string;
        day_of_month: string;
        hour: string;
        minute: string;
    };
    is_active?: boolean;
    is_processing: boolean;
    last_run_at?: string;
    next_run_at?: string;
    created_at: string;
    updated_at: string;
    relationships: IClientServer["relationships"];
}


export interface IClientServerScheduleRequest {
    name: string;
    day_of_week: string;
    day_of_month: string;
    hour: string;
    minute: string;
    is_active?: boolean;
}

export interface IClientServerScheduleTask {
    id: number;
    sequence_id: number;
    action: string;
    payload: string;
    time_offset: number;
    is_queued: boolean;
    created_at: string;
    updated_at: string;
}

export type IClientServerScheduleTaskAction = "command" | "power" | "backup";

export interface IClientServerScheduleTaskArgs {
    action: IClientServerScheduleTaskAction;
    payload: string;
    time_offset: number;
}

export interface IClientServerBackups {
    uuid: string;
    name: string;
    ignored_files: string[];
    sha256_hash: string;
    bytes: number;
    created_at: string;
    completed_at: string;
}

export interface IClientServerBackupsArgs {
    name: string;
    ignored_files: string[];
}

export interface IClientServerVariable {
    name: string;
    description: string;
    env_variable: string;
    default_value: string;
    server_value: string;
    is_editable: boolean;
    rules: string;
}

export interface IClientServerStartupVariableArgs {
    key: string;
    value: string;
}

export interface IClientServerUser {
    uuid: string;
    username: string;
    email: string;
    image: string;
    created_at: string;
    "2fa_enabled": boolean;
    permissions: string[];
}

export interface IClientServerUserRequest {
    uuid: string;
    email: string;
    permissions: string[];
}

export interface IClientServerDatabase {
    id: string;
    host: {
      address: number;
      port: number;
    }
    name: string;
    username: string;
    connections_from: string;
    max_connections: number,
    relationships: {
      password: {
        object: string;
        attributes: {
          password: string;
        }
      }
    }
}

export interface IClientServerDatabaseRequest {
    database: string;
    remote: string;
}

export interface IClientServerFile {
    name: string;
    mode: string;
    size: number;
    is_file: boolean;
    is_symlink: boolean;
    is_editable: boolean;
    mimetype: string;
    created_at: string;
    modified_at: string;
}

export interface IClientServerRenameFileRequest {
    root: string;
    files: {
        from: string,
        to: string;
    }[];
} 