import type { IClientServerResources, IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function (request: IRequest, serverID: string): Promise<IClientServerResources> {
    try {
        const response = await request(`/servers/${serverID}/resources`, {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (error) {
        throw new DactylError(error);
    }
}