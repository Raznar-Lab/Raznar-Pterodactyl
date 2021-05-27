import { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function DeleteServer(request: IRequest, serverID: number | string, external: boolean, force?: boolean): Promise<boolean> {
    try {
        const response = await request(external ? `/servers/external/${serverID}` : `/servers/${serverID}` + force ? "/force" : "", {
            method: "DELETE"
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}