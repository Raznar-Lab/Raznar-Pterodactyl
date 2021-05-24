import { IRequest, IClientServerDatabase } from "../../../typings";
import DactylError from "../../../util/error";

export default async function RotateDatabasePassword(request: IRequest, serverID: string, databaseID: string): Promise<IClientServerDatabase> {
    try {
        const response = await request(`/servers/${serverID}/databases/${databaseID}/rotate-password`, {
            method: "POST"
        });
        const json = await response.json();
        if(response.status !== 200) return json.attributes;
        else throw new DactylError(response.statusText);
    } catch (e) {
        throw new DactylError(e);
    }
}