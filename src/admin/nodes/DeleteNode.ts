import { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function DeleteNode(request: IRequest, nodeID: number): Promise<boolean> {
    try {
        const response = await request(`/nodes/${nodeID}`, {
            method: "DELETE"

        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}