import { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function DownloadBackup(request: IRequest, serverID: string, backupID: string): Promise<string> {
    try {
        const response = await request(`/servers/${serverID}/backups/${backupID}/downnload`, {
            method: "GET"
        });
        const json = await response.json();
        if(response.status !== 200) throw new DactylError(response.statusText);else
        return json.attributes.url;
    } catch (e) {
        throw new DactylError(e);
    }
}