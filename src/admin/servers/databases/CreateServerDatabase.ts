import { IRequest, IAdminServerDatabase, IAdminServerDatabaseRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function CreateServerDatabases(request: IRequest, serverID: number | string, databaseArgs: IAdminServerDatabaseRequest, external?: boolean): Promise<IAdminServerDatabase> {
    try {
        const response = await request(external ? `/servers/external/${serverID}/databases` : `/servers/${serverID}/databases`, {
            method: "POST",
            body: JSON.stringify(databaseArgs)
        });
        const json = await response.json();
        return response.status === 200 ? json.attributes : [];
    } catch (e) {
        throw new DactylError(e);
    }
}