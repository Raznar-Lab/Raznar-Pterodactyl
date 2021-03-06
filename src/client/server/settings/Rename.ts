import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function Rename(request: IRequest, serverID: string, serverName: string): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/settings/rename`, {
            method: "POST",
            body: JSON.stringify({
                name: serverName
            })
        })
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}