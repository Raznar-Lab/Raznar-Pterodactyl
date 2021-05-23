import type { IClientAllocations, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function AssignAllocation(request: IRequest, serverID: string): Promise<IClientAllocations[]> {
    try {
        const response = await request(`/servers/${serverID}/network/allocations`, {
            method: "POST"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();      
        return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}