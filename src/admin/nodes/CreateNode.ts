import { IRequest, IAdminNodeRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function CreateNode(request: IRequest, nodeArgs: IAdminNodeRequest): Promise<IAdminNodeRequest> {
    try {
        const response = await request("/nodes", {
            method: "POST",
            body: JSON.stringify(nodeArgs)
        });
        const json = await response.json();
        return response.status === 201 ? json.attributes : [];
    } catch (e) {
        throw new DactylError(e);
    }
}