import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function Reinstall(request: IRequest, serverID: string): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/settings/reinstall`, {
            method: "POST",
        })
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}