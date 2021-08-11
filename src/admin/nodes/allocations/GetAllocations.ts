import { IAdminAllocation, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetAllocations(request: IRequest, nodeID: number): Promise<IAdminAllocation> {
    try {
        const response = await request(`/nodes/${nodeID}/allocations?per_page=90000`, {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(allocations => allocations.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}
