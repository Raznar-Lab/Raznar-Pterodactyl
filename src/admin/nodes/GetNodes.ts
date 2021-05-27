import { IRequest, IAdminNode } from "../../typings";
import DactylError from "../../util/error";

export default async function GetNodes(request: IRequest): Promise<IAdminNode> {
    try {
        const response = await request("/nodes", {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(nodes => nodes.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}