import { IRequest, IAdminServerDatabase } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetServerDatabases(request: IRequest, serverID: number | string, external?: boolean): Promise<IAdminServerDatabase> {
    try {
        const response = await request(external ? `/servers/external/${serverID}/databases` : `/servers/${serverID}/databases`, {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(databases => databases.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}