"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _2FA_1 = __importDefault(require("./account/2FA"));
const details_1 = __importDefault(require("./account/details"));
const Enable2FA_1 = __importDefault(require("./account/Enable2FA"));
const UpdateEmail_1 = __importDefault(require("./account/UpdateEmail"));
const UpdatePassword_1 = __importDefault(require("./account/UpdatePassword"));
const GetAllServers_1 = __importDefault(require("./GetAllServers"));
const AssignAllocation_1 = __importDefault(require("./server/network/AssignAllocation"));
const DeleteAllocation_1 = __importDefault(require("./server/network/DeleteAllocation"));
const GetAllocations_1 = __importDefault(require("./server/network/GetAllocations"));
const SetAllocationNote_1 = __importDefault(require("./server/network/SetAllocationNote"));
const SetAsPrimary_1 = __importDefault(require("./server/network/SetAsPrimary"));
const CreateSchedule_1 = __importDefault(require("./server/schedules/CreateSchedule"));
const GetSchedules_1 = __importDefault(require("./server/schedules/GetSchedules"));
const Console_1 = __importDefault(require("./server/Console"));
const GetDetails_1 = __importDefault(require("./server/GetDetails"));
const ShowPermissions_1 = __importDefault(require("./ShowPermissions"));
const GetSchedule_1 = __importDefault(require("./server/schedules/GetSchedule"));
const CreateTask_1 = __importDefault(require("./server/schedules/Tasks/CreateTask"));
const DeleteTask_1 = __importDefault(require("./server/schedules/Tasks/DeleteTask"));
const UpdateTask_1 = __importDefault(require("./server/schedules/Tasks/UpdateTask"));
const GetVariables_1 = __importDefault(require("./server/startup/GetVariables"));
const UpdateVariable_1 = __importDefault(require("./server/startup/UpdateVariable"));
const CreateBackup_1 = __importDefault(require("./server/backups/CreateBackup"));
const GetBackups_1 = __importDefault(require("./server/backups/GetBackups"));
const DeleteBackup_1 = __importDefault(require("./server/backups/DeleteBackup"));
const DownloadBackup_1 = __importDefault(require("./server/backups/DownloadBackup"));
const GetUsers_1 = __importDefault(require("./server/users/GetUsers"));
const CreateUser_1 = __importDefault(require("./server/users/CreateUser"));
const DeleteUser_1 = __importDefault(require("./server/users/DeleteUser"));
const UpdateUser_1 = __importDefault(require("./server/users/UpdateUser"));
const ListDatabases_1 = __importDefault(require("./server/databases/ListDatabases"));
const CreateDatabase_1 = __importDefault(require("./server/databases/CreateDatabase"));
const DeleteDatabase_1 = __importDefault(require("./server/databases/DeleteDatabase"));
const RotateDatabasePassword_1 = __importDefault(require("./server/databases/RotateDatabasePassword"));
const ListFiles_1 = __importDefault(require("./server/files/ListFiles"));
const WriteFile_1 = __importDefault(require("./server/files/WriteFile"));
const CopyFile_1 = __importDefault(require("./server/files/CopyFile"));
const DownloadFile_1 = __importDefault(require("./server/files/DownloadFile"));
const DeleteFile_1 = __importDefault(require("./server/files/DeleteFile"));
const GetFileContents_1 = __importDefault(require("./server/files/GetFileContents"));
const UploadFile_1 = __importDefault(require("./server/files/UploadFile"));
const GetUploadFileUrl_1 = __importDefault(require("./server/files/GetUploadFileUrl"));
const CompressFile_1 = __importDefault(require("./server/files/CompressFile"));
const DecompressFile_1 = __importDefault(require("./server/files/DecompressFile"));
const CreateFolder_1 = __importDefault(require("./server/files/CreateFolder"));
class Client {
    constructor(_request) {
        this._request = _request;
        this.account = new AccountClient(this._request);
        this.showPermissions = () => ShowPermissions_1.default(this._request);
        this.server = new ServerClient(this._request);
    }
}
exports.default = Client;
class AccountClient {
    constructor(_request) {
        this._request = _request;
        /**
         * Retrieves a detail of user's account
         *
         */
        this.getDetails = () => details_1.default(this._request);
        /**
         * Generates a QR Code url for 2FA
         *
         */
        this.twoFactor = () => _2FA_1.default(this._request);
        /**
         * Enables 2FA for user's account.
         *
         * @param otpCode OTP Code from 2FA QR
         * @returns
         */
        this.enableTwoFactor = (otpCode) => Enable2FA_1.default(this._request, otpCode);
        /**
         * Updates user's email
         *
         * @param newMail New Email
         * @param password Your current password account
         * @returns
         */
        this.updateEmail = (newMail, password) => UpdateEmail_1.default(this._request, newMail, password);
        /**
         * Updates user's password
         *
         * @param currentPassword Your current account password
         * @param newPassword New password you want
         */
        this.updatePassword = (currentPassword, newPassword) => UpdatePassword_1.default(this._request, currentPassword, newPassword);
    }
}
class ServerClient {
    constructor(_request) {
        this._request = _request;
        /**
         * Retrieves all server
         *
         */
        this.getAll = () => GetAllServers_1.default(this._request);
        /**
         * Gets a console server information with websocket
         *
         * @param serverID Server Identifier
         */
        this.getConsole = (serverID) => Console_1.default(this._request, serverID);
        /**
         * Retrieves detail from a server
         *
         * @param serverID Server Identifier
         */
        this.getDetails = (serverID) => GetDetails_1.default(this._request, serverID);
        this.schedule = new ServerScheduleClient(this._request);
        this.network = new NetworkClient(this._request);
        this.startup = new StartupClient(this._request);
        this.backup = new BackupsClient(this._request);
        this.users = new UsersClient(this._request);
        this.databases = new DatabaseClient(this._request);
        this.files = new FilesClient(this._request);
    }
}
class ServerScheduleClient {
    constructor(_request) {
        this._request = _request;
        /**
         * Retrieves all schedule from a server
         *
         * @param serverID Server Identifier
         */
        this.getAll = (serverID) => GetSchedules_1.default(this._request, serverID);
        /**
         * Creates a new schedule
         *
         * @param serverID Server Identifier
         * @param args Create schedule arguments want to send
         * @returns
         */
        this.create = (serverID, args) => CreateSchedule_1.default(this._request, serverID, args);
        /**
         * Retrieves specific schedule
         *
         * @param serverID Server Identifier
         * @param scheduleID Schedule ID
         * @returns
         */
        this.get = (serverID, scheduleID) => GetSchedule_1.default(this._request, serverID, scheduleID);
        /**
         * Task handler
         *
         * @param serverID Server Identifier
         * @param scheduleId Schedule ID
         */
        this.task = (serverID, scheduleId) => new ServerScheduleTask(this._request, serverID, scheduleId);
    }
}
class ServerScheduleTask {
    constructor(_request, serverID, scheduleID) {
        this._request = _request;
        this.serverID = serverID;
        this.scheduleID = scheduleID;
        /**
         * Creates a new task on the specified schedule
         *
         * @param args Task arguments request want to send.
         */
        this.create = (args) => CreateTask_1.default(this._request, this.serverID, this.scheduleID, args);
        /**
         * Deletes the specified task
         *
         * @param taskId Task ID
         */
        this.delete = (taskId) => DeleteTask_1.default(this._request, this.serverID, this.scheduleID, taskId);
        /**
         *  Updates the specified schedule
         *
         * @param taskId Task ID
         * @param args Task arguments request want to send.
         * @returns
         */
        this.update = (taskId, args) => UpdateTask_1.default(this._request, this.serverID, this.scheduleID, taskId, args);
    }
}
class NetworkClient {
    constructor(_request) {
        this._request = _request;
        /**
         * Automatically assigns a new allocation if auto-assign is enabled on the instance
         *
         * @param serverID Server Identifier
         */
        this.assign = (serverID) => AssignAllocation_1.default(this._request, serverID);
        /**
         *
         * Deletes the specified non-primary allocation
         *
         * @param serverID Server Identifier
         * @param allocation Allocation Identifier
         * @returns
         */
        this.delete = (serverID, allocationID) => DeleteAllocation_1.default(this._request, serverID, allocationID);
        /**
         *
         * Retrieves the allocations information for the specified server
         *
         * @param serverID Server Identifier
         */
        this.getAll = (serverID) => GetAllocations_1.default(this._request, serverID);
        /**
         *
         * Sets the primary allocation
         *
         * @param serverID Server Identifier
         * @param allocationID Allocation Identifier
         */
        this.setPrimary = (serverID, allocationID) => SetAsPrimary_1.default(this._request, serverID, allocationID);
        /**
         *
         * Sets a note for the allocation
         *
         * @param serverID Server Identifier
         * @param allocationID Allocation Identifier
         */
        this.setNote = (serverID, allocationID, allocationNotes) => SetAllocationNote_1.default(this._request, serverID, allocationID, allocationNotes);
    }
}
class StartupClient {
    constructor(_request) {
        this._request = _request;
        /**
         * Retrieves the startup variables for the specified server
         *
         *  @param serverID Server Identifier
         */
        this.get = (serverID) => GetVariables_1.default(this._request, serverID);
        /**
         *
         * Updates the specified variable from the specified server
         *
         * @param serverID Server Identifier
         * @param args Variable Arguments
         */
        this.update = (serverID, args) => UpdateVariable_1.default(this._request, serverID, args);
    }
}
class BackupsClient {
    constructor(_request) {
        this._request = _request;
        /**
         * Retrieves all backups for the specified server
         *
         * @param serverID Server Identifier
         */
        this.getAll = (serverID) => GetBackups_1.default(this._request, serverID);
        /**
         * Deletes a backup from the specified server
         *
         * @param serverID Server Identifier
         * @param backupID Your Backup Identifier
         */
        this.delete = (serverID, backupID) => DeleteBackup_1.default(this._request, serverID, backupID);
        /**
         * Creates a new backup for the specified server
         *
         * @param serverID Server Identifier
         * @param backupArgs Backup Arguments want to send for request
         */
        this.create = (serverID, backupArgs) => CreateBackup_1.default(this._request, serverID, backupArgs);
        /**
         * Get backup download url from the specified server
         *
         * @param serverID Server Identifier
         * @param backupID Backup Identifier
         */
        this.getDownloadURL = (serverID, backupID) => DownloadBackup_1.default(this._request, serverID, backupID);
    }
}
class UsersClient {
    constructor(_request) {
        this._request = _request;
        /**
         * Retrieves subusers on specified server
         *
         * @param serverID Server Identifier
         */
        this.getAll = (serverID) => GetUsers_1.default(this._request, serverID);
        /**
         * Create subuser for the specified user.
         *
         * @param serverID Server Identifier
         * @param args Client subusers arguments want to send.
         * @returns
         */
        this.create = (serverID, args) => CreateUser_1.default(this._request, serverID, args);
        /**
         * Updating permissions for the specified subuser from a server.
         *
         * @param serverID Server Identifier
         * @param userUUID Subuser identifier
         * @param permissions Permissions for subuser `Array<String>`
         */
        this.update = (serverID, userUUID, permissions) => UpdateUser_1.default(this._request, serverID, userUUID, permissions);
        /**
         * Delete subuser for the specified server.
         *
         * @param serverID Server Identifier
         * @param userUUID Subuser Identifier
         */
        this.delete = (serverID, userUUID) => DeleteUser_1.default(this._request, serverID, userUUID);
    }
}
class DatabaseClient {
    constructor(_request) {
        this._request = _request;
        /**
         * Lists all schedules added to the server
         *
         * @param serverID Server Identifier
         */
        this.getAll = (serverID) => ListDatabases_1.default(this._request, serverID);
        /**
         * Creates a new database
         *
         * @param serverID Server Identifier
         * @param args Create database arguments
         */
        this.create = (serverID, args) => CreateDatabase_1.default(this._request, serverID, args);
        /**
         * Deletes the specified database
         *
         * @param serverID Server Identifier
         * @param databaseID Database Identifier/ID
         */
        this.delete = (serverID, databaseID) => DeleteDatabase_1.default(this._request, serverID, databaseID);
        /**
         * Changes the password of a specified database
         *
         * @param serverID Server Identifier
         * @param databaseID Database Identifier/ID
         */
        this.rotate = (serverID, databaseID) => RotateDatabasePassword_1.default(this._request, serverID, databaseID);
    }
}
class FilesClient {
    constructor(_request) {
        this._request = _request;
        /**
         * Get an array of file in the provided
         * directory of a server
         *
         * @param serverID Server Identifier
         * @param directory The directory to get the files from
         * @returns An array of {@link IClientServerFile}
         */
        this.getAll = (serverID, directory) => ListFiles_1.default(this._request, serverID, directory);
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
        this.createFolder = (serverID, args) => CreateFolder_1.default(this._request, serverID, args);
        /**
         * Writes a data to the given file and directory
         *
         * @param serverID Identifier
         * @param fileName The file name to write to
         * @return if the operation is successful or not ({@link boolean})
         */
        this.write = (serverID, fileName, content) => WriteFile_1.default(this._request, serverID, fileName, content);
        /**
         * Copy a file from the location
         *
         * @param serverID Server Identifier
         * @param location The location to copy
         * @return if the operation is successful or not ({@link boolean})
         */
        this.copy = (serverID, location) => CopyFile_1.default(this._request, serverID, location);
        /**
         * Get the URL to download the given file
         *
         * @param serverID Server Identifier
         * @param file the file name to get the download link from
         * @return a {@link String} of the download link
         */
        this.getDownloadUri = (serverID, file) => DownloadFile_1.default(this._request, serverID, file);
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
        this.deleteFile = (serverID, args) => DeleteFile_1.default(this._request, serverID, args);
        /**
         * Get the content of the specified file
         *
         * @param serverID Server Identifier
         * @param file The path to the file
         * @return The file content
         */
        this.getContents = (serverID, file) => GetFileContents_1.default(this._request, serverID, file);
        /**
         * Upload a file to the specified directory
         *
         * @param serverID Server Identifier
         * @param files
         * @return true if the operation is successful
         */
        this.uploadFile = (serverID, files, directory) => UploadFile_1.default(this._request, serverID, files, directory);
        /**
         * Get a file URI link to upload to
         * the specified server
         *
         * @param serverID Server Identifier
         * @return the URL
         */
        this.getUploadFileUri = (serverID) => GetUploadFileUrl_1.default(this._request, serverID);
        /**
         * Compress one or more files
         *
         * @param serverID Server Identifier
         * @param args the folder and file names to be compressed
         * @return the compressed file
         */
        this.compressFile = (serverID, args) => CompressFile_1.default(this._request, serverID, args);
        /**
         * Decompress a file from it's compressed form
         *
         * @param serverID Server Identifier
         * @param args the folder and file names to be decompressed
         * @return if the operation is successful or not ({@link boolean})
         */
        this.decompressFile = (serverID, args) => DecompressFile_1.default(this._request, serverID, args);
    }
}
