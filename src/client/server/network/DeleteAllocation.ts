import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function DeleteAllocation(request: IRequest, serverID: string, allocationID: number): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/network/allocations/${allocationID}`, {
            method: "DELETE"
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}