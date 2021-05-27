import { IRequest, IAdminServerDetailsRequest, IAdminServer } from "../../typings";
import DactylError from "../../util/error";

export default async function UpdateServerDetails(request: IRequest, serverID: number | string, serverDetailsArgs: IAdminServerDetailsRequest, external?: boolean): Promise<IAdminServer> {
    try {
        const response = await request(external ? `/servers/external/${serverID}/details` : `/servers/${serverID}/details`, {
            method: "PATCH",
            body: JSON.stringify(serverDetailsArgs)
        });
        const json = await response.json();
        return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}