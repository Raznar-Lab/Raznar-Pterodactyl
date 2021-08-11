import { IRequest, IAdminServer } from "../../typings";
import DactylError from "../../util/error";

export default async function GetServers(request: IRequest): Promise<IAdminServer> {
    try {
        const response = await request("/servers?per_page=90000", {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(servers => servers.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}
