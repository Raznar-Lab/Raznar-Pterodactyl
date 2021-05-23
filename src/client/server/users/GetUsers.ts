import { IRequest, IClientServerUser } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetUsers(request: IRequest, serverID: string): Promise<IClientServerUser[]> {
    try {
        const response = await request(`/servers/${serverID}/users`, {
            method: "GET"
        });
        const json = await response.json();
        if(json.length > 0) return json.attributes.map(user => user.attributes)
        else return [];
    } catch (e) {
        throw new DactylError(e);
    }
}