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
export interface IAdminServerRequest {
    name: string;
    user: number;
    egg: number;
    docker_image: string;
    startup: string;
    environment: Record<string, any>;
    limits: {
      memory: number;
      swap: number;
      disk: number;
      io: number;
      cpu: number;
    }
    feature_limits: {
      databases: number;
      backups: number;
    }
    allocation: {
      default: number;
    }
}
export interface IAdminServerDetailsRequest {
    name: string;
    user: number;
    external_id: string;
    description: string;
}
export interface IAdminServerBuildRequest {
    allocation: number;
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
    threads?: number;
    feature_limits: {
      databases: number;
      allocations: number;
      backups: number;
    }
}
export interface IAdminServerStartupRequest {
    startup: string;
    environment?: Record<string, any>;
    egg: number;
    image: string;
    skip_scripts: boolean;
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
    id: number;
    external_id: string;
    uuid: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
    root_admin: boolean;
    "2fa": boolean;
    created_at: string;
    updated_at: string;
}

export interface IAdminUserRequest {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    language?: string;
    password?: string;
}

export interface IAdminNode {
    id: number;
    uuid: string;
    public: boolean;
    name: string;
    description: string;
    location_id: number;
    fqdn: string;
    scheme: string;
    behind_proxy: boolean;
    maintenance_mode: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    upload_size: number;
    daemon_listen: number;
    daemon_sftp: number;
    daemon_base: string;
    created_at: string;
    updated_at: string;
}

export interface IAdminNodeConfiguration {
    debug: boolean;
    uuid: string;
    token_id: string;
    token: string;
    api: {
      host: string;
      port: number;
      ssl: {
        enabled: boolean;
        cert: string;
        key: string;
      }
      upload_limit: number;
    }
    system: {
      data: string;
      sftp: {
        bind_port: number;
      }
    }
    remote: string;
}

export interface IAdminNodeRequest {
  name: string;
  description?: string;
  location_id: number;
  fqdn: string;
  scheme: string;
  behind_proxy: boolean;
  maintenance_mode: boolean;
  memory: number;
  memory_overallocate: number;
  disk: number;
  disk_overallocate: number;
  upload_size: number;
  daemon_sftp: number;
  daemon_listen: number;

}

export interface IAdminAllocation {
    id: number;
    ip: string;
    alias?: string;
    port: number;
    notes?: string;
    assigned: boolean;
}

export interface IAdminServerDatabase {
    id: number;
    server: number;
    host: number;
    database: string;
    username: string;
    remote: string;
    max_connections?: number;
    created_at: string;
    updated_at: string;
    relationships?: {
        password: {
          object: string;
          attributes: {
            password: string;
          }
        }
    }
}

export interface IAdminServerDatabaseRequest {
    database: string;
    remote?: string;
    host?: number;
}