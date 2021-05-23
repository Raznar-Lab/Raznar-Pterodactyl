import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function SetAllocationNote(request: IRequest, serverID: string, allocation: number, allocationNotes: string) {
    try {
        const response = await request(`/servers/${serverID}/network/allocations/${allocation}`, {
            method: "POST",
            body: new URLSearchParams({
                "notes": allocationNotes
            })
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (error) {
        throw new DactylError(error);
        
    }
}