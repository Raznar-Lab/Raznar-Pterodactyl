import type { IClientServerScheduleRequest, IRequest } from "../typings";
import TwoFactorAuthentication from "./account/2FA";
import AccountDetails from "./account/details";
import EnableTwoFactorAuthentication from "./account/Enable2FA";
import UpdateEmail from "./account/UpdateEmail";
import UpdatePassword from "./account/UpdatePassword";
import GetAllServers from "./GetAllServers";
import AssignAllocation from "./server/network/AssignAllocation";
import DeleteAllocation from "./server/network/DeleteAllocation";
import GetAllocations from "./server/network/GetAllocations";
import SetAllocationNote from "./server/network/SetAllocationNote";
import SetAsPrimary from "./server/network/SetAsPrimary";
import createSchedule from "./server/schedules/CreateSchedule";
import { GetSchedules } from "./server/schedules/GetSchedules";
import ConsoleServer from "./server/Console";
import GetServerDetails from "./server/GetDetails";
import ShowPermissions from "./ShowPermissions";

export default class Client {
    constructor(private _request: IRequest) {}

    public account = new AccountClient(this._request);
    public showPermissions = () => ShowPermissions(this._request);
    public getAllServers = () => GetAllServers(this._request);
    public server = (serverID: string) => new ServerClient(this._request, serverID);
    public network = (serverID: string) => new NetworkClient(this._request, serverID);

}

class AccountClient {
    constructor(private _request: IRequest) {}
    public getDetails = () => AccountDetails(this._request);
    public twoFactor = () => TwoFactorAuthentication(this._request);
    public enableTwoFactor = (otpCode: string) => EnableTwoFactorAuthentication(this._request, otpCode);
    public updateEmail = (newMail: string, password: string) => UpdateEmail(this._request, newMail, password);
    public updatePassword = (currentPassword: string, newPassword: string) => UpdatePassword(this._request, currentPassword, newPassword);
}
class ServerClient {
    constructor(private _request: IRequest, public serverID: string) {}
    public getConsole = () => ConsoleServer(this._request, this.serverID);
    public getDetails = () => GetServerDetails(this._request, this.serverID);
    public schedule = new ServerScheduleClient(this._request, this.serverID);
    
}

class ServerScheduleClient {
    constructor(private _request: IRequest, public serverID: string) {}
    
    public getAll = () => GetSchedules(this._request, this.serverID);
    public create = (args: IClientServerScheduleRequest) => createSchedule(this._request, this.serverID, args);
}

class NetworkClient {
    constructor(private _request: IRequest, private serverID: string) {}
    public assignAllocation = () => AssignAllocation(this._request, this.serverID);
    public deleteAllocation = (allocation: number) => DeleteAllocation(this._request, this.serverID, allocation);
    public getAllocations = () => GetAllocations(this._request, this.serverID);
    public setAsPrimary = (allocation: number) => SetAsPrimary(this._request, this.serverID, allocation);
    public setAllocationNote = (allocation: number, allocationNotes: string) => SetAllocationNote(this._request, this.serverID, allocation, allocationNotes);
}