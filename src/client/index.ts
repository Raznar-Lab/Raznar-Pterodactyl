import type { IClientServerScheduleRequest, IClientServerScheduleTaskArgs, IClientServerStartupVariableArgs, IRequest, IClientServerBackupsArgs, IClientServerUserRequest, IClientServerDatabaseRequest } from "../typings";
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
import GetSchedules from "./server/schedules/GetSchedules";
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
import CreateUser from "./server/users/CreateUser";
import DeleteUser from "./server/users/DeleteUser";
import UpdateUser from "./server/users/UpdateUser";
import ListDatabases from "./server/databases/ListDatabases";
import CreateDatabase from "./server/databases/CreateDatabase";
import DeleteDatabase from "./server/databases/DeleteDatabase";
import RotateDatabasePassword from "./server/databases/RotateDatabasePassword";
import ListFiles from "./server/files/ListFiles";
import WriteFile from "./server/files/WriteFile";
import CopyFile from "./server/files/CopyFile";
import DownloadFile from "./server/files/DownloadFile";
import DeleteFile from "./server/files/DeleteFile";
import GetFileContents from "./server/files/GetFileContents";
import UploadFile from "./server/files/UploadFile";
import GetUploadFileUrl from "./server/files/GetUploadFileUrl";
import CompressFile from "./server/files/CompressFile";
import DecompressFile from "./server/files/DecompressFile";
import CreateFolder from "./server/files/CreateFolder";

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
     * Gets a console server information with websocket
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
    public databases = new DatabaseClient(this._request);
    public files = new FilesClient(this._request);
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
     * Retrieves subusers on specified server
     * 
     * @param serverID Server Identifier
     */
    public getAll = (serverID: string) => GetUsers(this._request, serverID);

    /**
     * Create subuser for the specified user.
     * 
     * @param serverID Server Identifier
     * @param args Client subusers arguments want to send.
     * @returns 
     */
    public create = (serverID: string, args: IClientServerUserRequest) => CreateUser(this._request, serverID, args);

    /**
     * Updating permissions for the specified subuser from a server.
     * 
     * @param serverID Server Identifier
     * @param userUUID Subuser identifier
     * @param permissions Permissions for subuser `Array<String>`
     */
    public update = (serverID: string, userUUID: string, permissions: string[]) => UpdateUser(this._request, serverID, userUUID, permissions);

    /**
     * Delete subuser for the specified server.
     * 
     * @param serverID Server Identifier
     * @param userUUID Subuser Identifier
     */
    public delete = (serverID: string, userUUID: string) => DeleteUser(this._request, serverID, userUUID);
}

class DatabaseClient {
    constructor(private _request: IRequest) {}

    /**
     * Lists all schedules added to the server
     * 
     * @param serverID Server Identifier
     */
    public getAll = (serverID: string) => ListDatabases(this._request, serverID)
    /**
     * Creates a new database
     * 
     * @param serverID Server Identifier
     * @param args Create database arguments
     */
    public create = (serverID: string, args: IClientServerDatabaseRequest) => CreateDatabase(this._request, serverID, args);

    /**
     * Deletes the specified database
     * 
     * @param serverID Server Identifier
     * @param databaseID Database Identifier/ID
     */
    public delete = (serverID: string, databaseID: string) => DeleteDatabase(this._request, serverID, databaseID);

    /**
     * Changes the password of a specified database
     * 
     * @param serverID Server Identifier
     * @param databaseID Database Identifier/ID
     */
    public rotate = (serverID: string, databaseID: string) => RotateDatabasePassword(this._request, serverID, databaseID);
}

class FilesClient {
    constructor(private _request: IRequest) {}

    /**
     * Get an array of file in the provided 
     * directory of a server
     * 
     * @param serverID Server Identifier
     * @param directory The directory to get the files from
     * @returns An array of {@link IClientServerFile}
     */
    public getAll = (serverID: string, directory?: string) => ListFiles(this._request, serverID, directory);

    /**
     * Create a folder
     * 
     * @param serverID Server Identifier
     * @param args
     * The arguments:
     *    - root - root directory
     *    - name - the folder name 
     * @return if the operation is successful or not ({@link boolean})
     */
    public createFolder = (serverID: string, args: { root: string; name: string; }) => CreateFolder(this._request, serverID, args);
    /**
     * Writes a data to the given file and directory
     * 
     * @param serverID Identifier
     * @param fileName The file name to write to
     * @return if the operation is successful or not ({@link boolean})
     */
    public write = (serverID: string, fileName: string, content: string) => WriteFile(this._request, serverID, fileName, content);
    
    /**
     * Copy a file from the location
     * 
     * @param serverID Server Identifier 
     * @param location The location to copy
     * @return if the operation is successful or not ({@link boolean})
     */
    public copy = (serverID: string, location: string) => CopyFile(this._request, serverID, location);

    /**
     * Get the URL to download the given file
     * 
     * @param serverID Server Identifier
     * @param file the file name to get the download link from
     * @return a {@link String} of the download link
     */
    public getDownloadUri = (serverID: string, file: string) => DownloadFile(this._request, serverID, file);

    /**
     * Delete the specified file or folder
     * 
     * @param serverID Server Identifier
     * @param args 
     * The arguments:
     *    - root - the folder
     *    - files - an array of file name to delete
     * @return if the operation is successful or not ({@link boolean})
     */
    public deleteFile = (serverID: string, args: { root: string; files: string[]; }) => DeleteFile(this._request, serverID, args);
    
    /**
     * Get the content of the specified file
     * 
     * @param serverID Server Identifier
     * @param file The path to the file
     * @return The file content
     */
    public getContents = (serverID: string, file: string) => GetFileContents(this._request, serverID, file);

    /**
     * Upload a file to the specified directory
     * 
     * @param serverID Server Identifier
     * @param files 
     * @return true if the operation is successful
     */
    public uploadFile = (serverID: string, files: { filename: string; buffer: Buffer; }[], directory?: string) => UploadFile(this._request, serverID, files, directory);
    
    /**
     * Get a file URI link to upload to 
     * the specified server
     * 
     * @param serverID Server Identifier
     * @return the URL
     */
    public getUploadFileUri = (serverID: string) => GetUploadFileUrl(this._request, serverID);

    /**
     * Compress one or more files
     * 
     * @param serverID Server Identifier
     * @param args the folder and file names to be compressed
     * @return the compressed file
     */
    public compressFile = (serverID: string, args: { root: string; files: string[]; }) => CompressFile(this._request, serverID, args);
    
    /**
     * Decompress a file from it's compressed form
     * 
     * @param serverID Server Identifier
     * @param args the folder and file names to be decompressed
     * @return if the operation is successful or not ({@link boolean})
     */
    public decompressFile = (serverID: string, args: { root: string; files: string[]; }) => DecompressFile(this._request, serverID, args);
}