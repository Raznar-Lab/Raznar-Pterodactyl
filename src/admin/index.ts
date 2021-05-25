import type { IRequest } from "../typings";
import CreateLocation from "./locations/CreateLocation";
import DeleteLocation from "./locations/DeleteLocation";
import GetLocationDetails from "./locations/GetLocationDetails";
import UpdateLocation from "./locations/UpdateLocation";

export default class Admin {
    constructor(public _request: IRequest) {} 

    public createLocation = (shortCode: string, description: string) => CreateLocation(this._request, shortCode, description);
    public deleteLocation = (locationID: number) => DeleteLocation(this._request, locationID);
    public getLocationDetails = (locationID: number) => GetLocationDetails(this._request, locationID);
    public updateLocation = (locationID: number, shortCode: string, description: string) => UpdateLocation(this._request, locationID, shortCode, description);
}