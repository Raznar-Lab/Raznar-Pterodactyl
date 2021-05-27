import { IRequest, IAdminServerDatabase } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetServerDatabaseDetails(request: IRequest, databaseID: number, serverID: number | string, external?: boolean): Promise<IAdminServerDatabase> {
    try {
        const response = await request(external ? `/servers/external/${serverID}` : `/servers/${serverID}` + `/databases/${databaseID}` + "?include=password", {
            method: "GET"
        });
        const json = await response.json();
        return response.status === 200 ? json.attributes : [];
    } catch (e) {
        throw new DactylError(e);
    }
}