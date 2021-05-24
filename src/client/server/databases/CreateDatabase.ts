import type { IRequest, IClientServerDatabaseRequest, IClientServerDatabase } from "../../../typings";
import { stringify } from "query-string";
import DactylError from "../../../util/error";

export default async function CreateDatabase(request: IRequest, serverID: string, database: IClientServerDatabaseRequest): Promise<IClientServerDatabase> {
    try {
        const response = await request(`/servers/${serverID}/databases`, {
            method: "POST",
            body: stringify(database)
        });
        const json = await response.json();
        if(response.status !== 200) throw new DactylError(response.statusText);
        else return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}