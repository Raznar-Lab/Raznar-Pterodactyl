import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function SetAllocationNote(request: IRequest, serverID: string, allocationID: number, allocationNotes: string) {
    try {
        const response = await request(`/servers/${serverID}/network/allocations/${allocationID}`, {
            method: "POST",
            body: JSON.stringify({
                notes: allocationNotes
            })
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (error) {
        throw new DactylError(error);
        
    }
}