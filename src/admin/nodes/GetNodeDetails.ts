import { IRequest, IAdminNode } from "../../typings";
import DactylError from "../../util/error";

export default async function GetNodeDetails(request: IRequest, nodeID: number): Promise<IAdminNode> {
    try {
        const response = await request(`/nodes/${nodeID}`, {
            method: "GET"
        });
        const json = await response.json();
        return response.status === 200 ? json.attributes : [];
    } catch (e) {
        throw new DactylError(e);
    }
}