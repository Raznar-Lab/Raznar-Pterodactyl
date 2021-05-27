import { IRequest, IAdminServerStartupRequest, IAdminServer } from "../../typings";
import DactylError from "../../util/error";

export default async function UpdateServerStartup(request: IRequest, serverID: number | string, serverStartupArgs: IAdminServerStartupRequest, external?: boolean): Promise<IAdminServer> {
    try {
        const response = await request(external ? `/servers/external/${serverID}/startup` : `/servers/${serverID}/startup`, {
            method: "PATCH",
            body: JSON.stringify(serverStartupArgs)
        });
        const json = await response.json();
        return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}