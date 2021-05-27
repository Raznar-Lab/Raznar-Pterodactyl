import { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function DeleteAllocation(request: IRequest, nodeID: number, allocationID: number): Promise<boolean> {
    try {
        const response = await request(`/nodes/${nodeID}/allocations/${allocationID}`, {
            method: "DELETE"
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}