import { IRequest, IClientServerBackupsArgs } from "../../../typings";
import DactylError from "../../../util/error";

export default async function CreateBackup(request: IRequest, serverID: string, backupArgs: IClientServerBackupsArgs): Promise<IClientServerBackupsArgs[]> {
    try {
        const response = await request(`/server/${serverID}/backups`, {
            method: "POST",
            body: JSON.stringify(backupArgs)
        });
        const json = await response.json();
        if(response.status !== 200) throw new DactylError(response.statusText);
        else return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}