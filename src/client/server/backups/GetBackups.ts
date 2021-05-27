import { IRequest, IClientServerBackups } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetBackups(request: IRequest, serverID: string): Promise<IClientServerBackups[]> {
    try {
        const response = await request(`/servers/${serverID}/backups`, {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(jsonBackups => jsonBackups.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}