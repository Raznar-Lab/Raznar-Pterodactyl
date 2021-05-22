import type { IClientServer, IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function GetServerDetails(request: IRequest, serverID: string): Promise<IClientServer> {
    try {
        const response = await request("/servers/" + serverID, {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}