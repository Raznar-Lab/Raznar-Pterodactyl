import type { IRequest } from "../typings";
import CreateLocation from "./locations/CreateLocation";
import DeleteLocation from "./locations/DeleteLocation";
import GetLocationDetails from "./locations/GetLocationDetails";
import GetLocations from "./locations/GetLocations"
import UpdateLocation from "./locations/UpdateLocation";
import GetNestDetails from "./nests/GetNestDetails";
import GetNests from "./nests/GetNests";
import GetEggsDetails from "./nests/eggs/GetEggDetails";
import GetEggs from "./nests/eggs/GetEggs";

export default class Admin {
    constructor(private _request: IRequest) {} 
    public location = new LocationAdmin(this._request);
    public nests = new NestsAdmin(this._request)
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