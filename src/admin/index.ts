import type { IRequest, IAdminUserRequest, IAdminNodeRequest, IAdminServerRequest, IAdminServerBuildRequest, IAdminServerDetailsRequest, IAdminServerStartupRequest, IAdminServerDatabaseRequest } from "../typings";
import CreateLocation from "./locations/CreateLocation";
import DeleteLocation from "./locations/DeleteLocation";
import GetLocationDetails from "./locations/GetLocationDetails";
import GetLocations from "./locations/GetLocations"
import UpdateLocation from "./locations/UpdateLocation";
import GetNestDetails from "./nests/GetNestDetails";
import GetNests from "./nests/GetNests";
import GetEggsDetails from "./nests/eggs/GetEggDetails";
import GetEggs from "./nests/eggs/GetEggs";
import CreateUser from "../admin/users/CreateUser";
import DeleteUser from "../admin/users/DeleteUser";
import GetUserDetails from "../admin/users/GetUserDetails";
import GetUsers from "../admin/users/GetUsers";
import UpdateUser from "../admin/users/UpdateUser";
import CreateNode from "../admin/nodes/CreateNode";
import DeleteNode from "../admin/nodes/DeleteNode";
import GetNodeConfiguration from "../admin/nodes/GetNodeConfiguration";
import GetNodeDetails from "../admin/nodes/GetNodeDetails";
import GetNodes from "../admin/nodes/GetNodes";
import UpdateNode from "../admin/nodes/UpdateNode";
import CreateAllocation from "../admin/nodes/allocations/CreateAllocation";
import DeleteAllocation from "../admin/nodes/allocations/DeleteAllocation";
import GetAllocations from "../admin/nodes/allocations/GetAllocations";
import CreateServer from "../admin/servers/CreateServer";
import DeleteServer from "../admin/servers/DeleteServer";
import GetServerDetails from "../admin/servers/GetServerDetails";
import GetServers from "../admin/servers/GetServers";
import ReinstallServer from "../admin/servers/ReinstallServer";
import SuspendServer from "../admin/servers/SuspendServer";
import UnsuspendServer from "../admin/servers/UnsuspendServer";
import UpdateServerBuild from "../admin/servers/UpdateServerBuild";
import UpdateServerDetails from "../admin/servers/UpdateServerDetails";
import UpdateServerStartup from "../admin/servers/UpdateServerStartup";
import CreateServerDatabase from "./servers/databases/CreateServerDatabase";
import DeleteServerDatabase from "./servers/databases/DeleteServerDatabase";
import GetServerDatabaseDetails from "./servers/databases/GetServerDatabaseDetails";
import GetServerDatabases from "./servers/databases/GetServerDatabases";
import ResetServerDatabasePassword from "./servers/databases/ResetServerDatabasePassword";

export default class Admin {
    constructor(private _request: IRequest) {} 
    public location = new LocationAdmin(this._request);
    public nests = new NestsAdmin(this._request)
    public users = new UsersAdmin(this._request);
    public nodes = new NodesAdmin(this._request)
    public servers = new ServersAdmin(this._request);
    public allocations = new AllocationsAdmin(this._request);
}

export class LocationAdmin {
    constructor(private _request: IRequest) {}

    public create = (shortCode: string, description: string) => CreateLocation(this._request, shortCode, description);
    public delete = (locationID: number) => DeleteLocation(this._request, locationID);
    public getDetails = (locationID: number) => GetLocationDetails(this._request, locationID);
    public getAll = () => GetLocations(this._request);
    public update = (locationID: number, shortCode: string, description: string) => UpdateLocation(this._request, locationID, shortCode, description);
}

export class NestsAdmin {
    constructor(private _request: IRequest) {}

    public getDetails = (nestID: number) => GetNestDetails(this._request, nestID);
    public getAll = () => GetNests(this._request);
    public eggs = new EggsAdmin(this._request);
}

export class EggsAdmin {
    constructor(private _request: IRequest) {}
    
    public getDetails = (nestID: number, eggID: number) => GetEggsDetails(this._request, nestID, eggID);
    public getAll = (nestID: number) => GetEggs(this._request, nestID);
}

export class UsersAdmin {
    constructor(private _request: IRequest) {}
    public create = (userArgs: IAdminUserRequest) => CreateUser(this._request, userArgs);
    public delete = (userID: number, externalID?: string) => DeleteUser(this._request, userID, externalID);
    public getDetails = (userID: number, externalID?: string) => GetUserDetails(this._request, userID, externalID);
    public getAll = () => GetUsers(this._request);
    public updateUser = (userArgs: IAdminUserRequest, userID: number, externalID?: string) => UpdateUser(this._request, userArgs, userID, externalID);
}

class NodesAdmin {
    constructor(private _request: IRequest) {}
    public create = (nodeArgs: IAdminNodeRequest) => CreateNode(this._request, nodeArgs);
    public delete = (nodeID: number) => DeleteNode(this._request, nodeID);
    public getConfiguration = (nodeID: number) => GetNodeConfiguration(this._request, nodeID);
    public getDetails = (nodeID: number) => GetNodeDetails(this._request, nodeID);
    public getAll = () => GetNodes(this._request);
    public update = (nodeID: number, nodeArgs: IAdminNodeRequest) => UpdateNode(this._request, nodeID, nodeArgs);
    public allocation = new AllocationsAdmin(this._request);
}

export class AllocationsAdmin {
    constructor(private _request: IRequest) {}
    public create = (nodeID: number, ipAddress: string, ports: number[]) => CreateAllocation(this._request, nodeID, ipAddress, ports);
    public delete = (nodeID: number, allocationID: number) => DeleteAllocation(this._request, nodeID, allocationID);
    public getAll = (nodeID: number) => GetAllocations(this._request, nodeID);
}
export class ServersAdmin {
    constructor(private _request: IRequest) {}
    public create = (serverArgs: IAdminServerRequest) => CreateServer(this._request, serverArgs);
    public delete = (serverID: string | number, external: boolean, force?: boolean) => DeleteServer(this._request, serverID, external, force);
    public getDetails = (serverID: string | number, external?: boolean) => GetServerDetails(this._request, serverID, external);
    public getAll = () => GetServers(this._request);
    public reinstall = (serverID: string | number, external?: boolean) => ReinstallServer(this._request, serverID, external);
    public suspend = (serverID: string | number, external?: boolean) => SuspendServer(this._request, serverID, external);
    public unsuspend = (serverID: string | number, external?: boolean) => UnsuspendServer(this._request, serverID, external);
    public updateBuild = (serverID: number | string, serverBuildArgs: IAdminServerBuildRequest, external: boolean) => UpdateServerBuild(this._request, serverID, serverBuildArgs, external);
    public updateDetails = (serverID: number | string, serverDetailsArgs: IAdminServerDetailsRequest, external: boolean) => UpdateServerDetails(this._request, serverID, serverDetailsArgs, external);
    public updateStartup = (serverID: number | string, serverStartupArgs: IAdminServerStartupRequest, external: boolean) => UpdateServerStartup(this._request, serverID, serverStartupArgs, external);
    public databases = new ServersDatabasesAdmin(this._request);
}

export class ServersDatabasesAdmin {
    constructor(private _request: IRequest) {}
    public create = (serverID: string | number, databaseArgs: IAdminServerDatabaseRequest, external?: boolean) => CreateServerDatabase(this._request, serverID, databaseArgs, external);
    public delete = (serverID: string | number, databaseID: number, external?: boolean) => DeleteServerDatabase(this._request, serverID, databaseID, external);
    public getDetails = (databaseID: number, serverID: string | number, external?: boolean) => GetServerDatabaseDetails(this._request, databaseID, serverID, external);
    public getAll = (serverID: string | number, external?: boolean) => GetServerDatabases(this._request, serverID, external);
    public resetPassword = (serverID: string | number, databaseID: number, external?: boolean) => ResetServerDatabasePassword(this._request, serverID, databaseID, external);
}
