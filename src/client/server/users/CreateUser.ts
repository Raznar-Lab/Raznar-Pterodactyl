import type { IClientServerUser, IClientServerUserRequest, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function CreateUser(request: IRequest, serverID: string, args: IClientServerUserRequest): Promise<IClientServerUser> {
    try {
        const response = await request(`/servers/${serverID}/users`, {
            method: "POST",
            body: JSON.stringify(args)
        });
        if (response.status !== 204) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}