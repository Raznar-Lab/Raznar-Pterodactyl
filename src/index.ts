import type { RequestInit, Response } from "node-fetch";
import AccountDetails from "./client/account/details";
import GetAllServers from "./client/GetAllServers";
import ShowPermissions from "./client/ShowPermissions";
import type { IRequest } from "./typings";
import http from "./util/http";

export default class Pterodactyl {
    public clientRequest = (apiEndpoint: string, options?: RequestInit): Promise<Response> => http(this.hostURL, true, this.apiKey, apiEndpoint, options);
    public adminRequest = (apiEndpoint: string, options?: RequestInit): Promise<Response> => http(this.hostURL, false, this.apiKey, apiEndpoint, options);
    constructor(public hostURL: string, private apiKey: string) {}

    public client = new Client(this.clientRequest);
}

class Client {
    constructor(private _request: IRequest) {}

    public account = new AccountClient(this._request);
    public showPermissions = () => ShowPermissions(this._request);
    public getAllServers = () => GetAllServers(this._request);
}

class AccountClient {
    constructor(private _request: IRequest) {}

    public getDetails = () => AccountDetails(this._request);
}