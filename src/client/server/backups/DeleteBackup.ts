import { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function DeleteBackup(request: IRequest, serverID: string, backupID: string): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/backups/${backupID}`, {
            method: "DELETE"
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}