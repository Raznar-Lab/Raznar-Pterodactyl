import { IRequest, IAdminServerBuildRequest, IAdminServer } from "../../typings";
import DactylError from "../../util/error";

export default async function UpdateServerBuild(request: IRequest, serverID: number | string, serverBuildArgs: IAdminServerBuildRequest, external: boolean): Promise<IAdminServer> {
    try {
        const response = await request(external ? `/servers/external/${serverID}/build` : `/servers/${serverID}/build`, {
            method: "PATCH",
            body: JSON.stringify(serverBuildArgs)
        });
        const json = await response.json();
        return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}