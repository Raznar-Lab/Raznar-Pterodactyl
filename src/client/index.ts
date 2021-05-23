import type { IClientServerScheduleRequest, IClientServerScheduleTaskArgs, IClientServerStartupVariableArgs, IRequest, IClientServerBackupsArgs } from "../typings";
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
import GetSchedule from "./server/schedules/GetSchedule";
import CreateTask from "./server/schedules/Tasks/CreateTask";
import DeleteTask from "./server/schedules/Tasks/DeleteTask";
import UpdateTask from "./server/schedules/Tasks/UpdateTask";
import GetVariables from "./server/startup/GetVariables";
import UpdateVariable from "./server/startup/UpdateVariable";
import CreateBackup from "./server/backups/CreateBackup";
import GetBackups from "./server/backups/GetBackups";
import DeleteBackup from "./server/backups/DeleteBackup";
import DownloadBackup from "./server/backups/DownloadBackup";
import GetUsers from "./server/users/GetUsers";

export default class Client {
    constructor(private _request: IRequest) {}

    public account = new AccountClient(this._request);
    public showPermissions = () => ShowPermissions(this._request);
    public server = new ServerClient(this._request);

}

class AccountClient {
    constructor(private _request: IRequest) {}
    /**
     * Retrieves a detail of user's account
     * 
     */
    public getDetails = () => AccountDetails(this._request);
    /**
     * Generates a QR Code url for 2FA
     * 
     */
    public twoFactor = () => TwoFactorAuthentication(this._request);
    /**
     * Enables 2FA for user's account.
     * 
     * @param otpCode OTP Code from 2FA QR
     * @returns 
     */
    public enableTwoFactor = (otpCode: string) => EnableTwoFactorAuthentication(this._request, otpCode);
    /**
     * Updates user's email
     * 
     * @param newMail New Email 
     * @param password Your current password account
     * @returns 
     */
    public updateEmail = (newMail: string, password: string) => UpdateEmail(this._request, newMail, password);
    /**
     * Updates user's password
     * 
     * @param currentPassword Your current account password
     * @param newPassword New password you want
     */
    public updatePassword = (currentPassword: string, newPassword: string) => UpdatePassword(this._request, currentPassword, newPassword);
}
class ServerClient {
    constructor(private _request: IRequest) {}
    /**
     * Retrieves all server
     * 
     */
    public getAll = () => GetAllServers(this._request);
    /**
     * Getting console information with websocket
     * 
     * @param serverID Server Identifier
     */
    public getConsole = (serverID: string) => ConsoleServer(this._request, serverID);
    /**
     * Retrieves detail from a server
     * 
     * @param serverID Server Identifier
     */
    public getDetails = (serverID: string) => GetServerDetails(this._request, serverID);
    public schedule = new ServerScheduleClient(this._request);
    public network = new NetworkClient(this._request);
    public startup = new StartupClient(this._request);
    public backup = new BackupsClient(this._request);
    public users = new UsersClient(this._request);
}

class ServerScheduleClient {
    constructor(private _request: IRequest) {}
    /**
     * Retrieves all schedule from a server
     * 
     * @param serverID Server Identifier
     */
    public getAll = (serverID: string) => GetSchedules(this._request, serverID);
    /**
     * Creates a new schedule
     * 
     * @param serverID Server Identifier
     * @param args Create schedule arguments want to send
     * @returns 
     */
    public create = (serverID: string, args: IClientServerScheduleRequest) => createSchedule(this._request, serverID, args);
    /**
     * Retrieves specific schedule
     * 
     * @param serverID Server Identifier
     * @param scheduleID Schedule ID
     * @returns 
     */
    public get = (serverID: string, scheduleID: number) => GetSchedule(this._request, serverID, scheduleID);
    /**
     * Task handler
     * 
     * @param serverID Server Identifier
     * @param scheduleId Schedule ID
     */
    public task = (serverID: string, scheduleId: number) => new ServerScheduleTask(this._request, serverID, scheduleId);
}

class ServerScheduleTask {
    constructor(private _request: IRequest, private serverID: string, private scheduleID: number) {}

    /**
     * Creates a new task on the specified schedule
     * 
     * @param args Task arguments request want to send.
     */
    public create = (args: IClientServerScheduleTaskArgs) => CreateTask(this._request, this.serverID, this.scheduleID, args);
    
    /**
     * Deletes the specified task
     * 
     * @param taskId Task ID
     */
    public delete = (taskId: number) => DeleteTask(this._request, this.serverID, this.scheduleID, taskId);
    
    /**
     *  Updates the specified schedule
     * 
     * @param taskId Task ID
     * @param args Task arguments request want to send.
     * @returns 
     */
    public update = (taskId: number, args: IClientServerScheduleTaskArgs) => UpdateTask(this._request, this.serverID, this.scheduleID, taskId, args);
}

class NetworkClient {
    constructor(private _request: IRequest) {}
    /**
     * Automatically assigns a new allocation if auto-assign is enabled on the instance
     * 
     * @param serverID Server Identifier
     */
    public assign = (serverID: string) => AssignAllocation(this._request, serverID);

    /**
     * 
     * Deletes the specified non-primary allocation
     * 
     * @param serverID Server Identifier
     * @param allocation Allocation Identifier
     * @returns 
     */
    public delete = (serverID: string, allocationID: number) => DeleteAllocation(this._request, serverID, allocationID);
    /**
     * 
     * Retrieves the allocations information for the specified server
     * 
     * @param serverID Server Identifier
     */
    public getAll = (serverID: string) => GetAllocations(this._request, serverID);
    /**
     * 
     * Sets the primary allocation
     * 
     * @param serverID Server Identifier
     * @param allocationID Allocation Identifier
     */
    public setPrimary = (serverID: string, allocationID: number) => SetAsPrimary(this._request, serverID, allocationID);
    /**
     * 
     * Sets a note for the allocation
     * 
     * @param serverID Server Identifier
     * @param allocationID Allocation Identifier
     */
    public setNote = (serverID: string, allocationID: number, allocationNotes: string) => SetAllocationNote(this._request, serverID, allocationID, allocationNotes);
}

class StartupClient {
    constructor(private _request: IRequest) {}
    /**
     * Retrieves the startup variables for the specified server
     * 
     *  @param serverID Server Identifier
     */
    public get = (serverID: string) => GetVariables(this._request, serverID);
    /**
     * 
     * Updates the specified variable from the specified server
     * 
     * @param serverID Server Identifier
     * @param args Variable Arguments
     */
    public update = (serverID: string, args: IClientServerStartupVariableArgs) => UpdateVariable(this._request, serverID, args);
}

class BackupsClient {
    constructor(private _request: IRequest) {}
    
    /**
     * Retrieves all backups for the specified server
     * 
     * @param serverID Server Identifier
     */
    public getAll = (serverID: string) => GetBackups(this._request, serverID);

    /**
     * Deletes a backup from the specified server
     * 
     * @param serverID Server Identifier
     * @param backupID Your Backup Identifier
     */
    public delete = (serverID: string, backupID: string) => DeleteBackup(this._request, serverID, backupID);
    
    /**
     * Creates a new backup for the specified server
     * 
     * @param serverID Server Identifier
     * @param backupArgs Backup Arguments want to send for request
     */
    public create = (serverID: string, backupArgs: IClientServerBackupsArgs) => CreateBackup(this._request, serverID, backupArgs);

    /**
     * Get backup download url from the specified server
     * 
     * @param serverID Server Identifier
     * @param backupID Backup Identifier
     */
    public getDownloadURL = (serverID: string, backupID: string) => DownloadBackup(this._request, serverID, backupID);
}

class UsersClient {
    constructor(private _request: IRequest) {}

    /**
     * Retrieves subusers from a server
     * 
     * @param serverID Server Identifier
     */
    public getAll = (serverID: string) => GetUsers(this._request, serverID);
}