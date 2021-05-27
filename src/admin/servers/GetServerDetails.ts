import { IRequest, IAdminServer } from "../../typings";
import DactylError from "../../util/error";

export default async function GetServerDetails(request: IRequest, serverID: number | string, external?: boolean): Promise<IAdminServer> {
    try {
        const response = await request(external? `/servers/external/${serverID}` : `/servers/${serverID}`, {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(servers => servers.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}