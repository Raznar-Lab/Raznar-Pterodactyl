import type { IClientServerUser, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetUserDetails(request: IRequest, serverID: string, userUUID: string): Promise<IClientServerUser> {
    try {
        const response = await request(`/servers/${serverID}/users/${userUUID}`, {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (error) {
        throw new DactylError(error);
    }
}