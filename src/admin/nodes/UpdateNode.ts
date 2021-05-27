import { IRequest, IAdminNodeRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function UpdateNode(request: IRequest, nodeID: number, nodeArgs: IAdminNodeRequest): Promise<IAdminNodeRequest> {
    try {
        const response = await request(`/nodes/${nodeID}`, {
            method: "PATCH",
            body: JSON.stringify(nodeArgs)
        });
        const json = await response.json();
        return response.status === 201 ? json.attributes : [];
    } catch (e) {
        throw new DactylError(e);
    }
}