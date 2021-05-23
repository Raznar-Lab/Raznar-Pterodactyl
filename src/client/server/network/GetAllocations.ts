import type { IClientAllocations, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetAllocations(request: IRequest, serverID: string): Promise<IClientAllocations[]> {
    try {
        const response = await request(`/servers/${serverID}/network/allocations`, {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        if(json.data.length > 0)
            return json.data.map(jsonAllocations => jsonAllocations.attributes);
        else
            return [];
    } catch (e) {
        throw new DactylError(e);
    }
}