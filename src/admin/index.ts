import type { IRequest, IAdminUserRequest, IAdminNodeRequest } from "../typings";
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

export default class Admin {
    constructor(private _request: IRequest) {} 
    public location = new LocationAdmin(this._request);
    public nests = new NestsAdmin(this._request)
    public users = new UsersAdmin(this._request);
    public nodes = new NodesAdmin(this._request)
}

class LocationAdmin {
    constructor(private _request: IRequest) {}

    public create = (shortCode: string, description: string) => CreateLocation(this._request, shortCode, description);
    public delete = (locationID: number) => DeleteLocation(this._request, locationID);
    public getDetails = (locationID: number) => GetLocationDetails(this._request, locationID);
    public getAll = () => GetLocations(this._request);
    public update = (locationID: number, shortCode: string, description: string) => UpdateLocation(this._request, locationID, shortCode, description);
}

class NestsAdmin {
    constructor(private _request: IRequest) {}

    public getDetails = (nestID: number) => GetNestDetails(this._request, nestID);
    public getAll = () => GetNests(this._request);
    public eggs = new EggsAdmin(this._request);
}

class EggsAdmin {
    constructor(private _request: IRequest) {}
    
    public getDetails = (nestID: number, eggID: number) => GetEggsDetails(this._request, nestID, eggID);
    public getAll = (nestID: number) => GetEggs(this._request, nestID);
}

class UsersAdmin {
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

class AllocationsAdmin {
    constructor(private _request: IRequest) {}
    public create = (nodeID: number, ipAddress: string, ports: number[]) => CreateAllocation(this._request, nodeID, ipAddress, ports);
    public delete = (nodeID: number, allocationID: number) => DeleteAllocation(this._request, nodeID, allocationID);
    public getAll = (nodeID: number) => GetAllocations(this._request, nodeID);
}