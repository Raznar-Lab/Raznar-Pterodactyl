import type { IClientAllocations, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function SetAllocationAsPrimary(request: IRequest, serverID: string, allocationID: number): Promise<IClientAllocations> {
    try {
        const response = await request(`/servers/${serverID}/network/allocations/${allocationID}/primary`, {
            method: "POST"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (error) {
        throw new DactylError(error);
        
    }
}