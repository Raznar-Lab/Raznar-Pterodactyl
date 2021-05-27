import { IRequest, IAdminAllocation } from "../../../typings";
import DactylError from "../../../util/error";

export default async function CreateAllocation(request: IRequest, nodeID: number, ipAddress: string, ports: number[]): Promise<IAdminAllocation> {
    try {
        const response = await request(`/nodes/${nodeID}/allocations`, {
            method: "POST",
            body: JSON.stringify({
                ip: ipAddress,
                ports: ports
            })
        })
        const json = await response.json();
        return response.status === 204 ? json.attributes : [];
    } catch (e) {
        throw new DactylError(e);
    }
}