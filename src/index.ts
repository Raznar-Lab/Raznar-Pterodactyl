import type { RequestInit, Response } from "node-fetch";
import TwoFactorAuthentication from "./client/account/2FA";
import AccountDetails from "./client/account/details";
import EnableTwoFactorAuthentication from "./client/account/Enable2FA";
import UpdateEmail from "./client/account/UpdateEmail";
import UpdatePassword from "./client/account/UpdatePassword";
import GetAllServers from "./client/GetAllServers";
import ConsoleServer from "./client/server/Console";
import GetServerDetails from "./client/server/GetDetails";
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
    public getServerDetails = (serverID: string) => GetServerDetails(this._request, serverID);
    public consoleServer = (serverID: string) => ConsoleServer(this._request, serverID);
}

class AccountClient {
    constructor(private _request: IRequest) {}

    public getDetails = () => AccountDetails(this._request);
    public twoFactor = () => TwoFactorAuthentication(this._request);
    public enableTwoFactor = (otpCode: string) => EnableTwoFactorAuthentication(this._request, otpCode);
    public updateEmail = (newMail: string, password: string) => UpdateEmail(this._request, newMail, password);
    public updatePassword = (currentPassword: string, newPassword: string) => UpdatePassword(this._request, currentPassword, newPassword);
}