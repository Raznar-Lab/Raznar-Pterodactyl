import type { IRequest, IClientServerUser } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetUsers(request: IRequest, serverID: string): Promise<IClientServerUser[]> {
    try {
        const response = await request(`/servers/${serverID}/users`, {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(user => user.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}