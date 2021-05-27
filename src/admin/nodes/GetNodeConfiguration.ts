import { IRequest, IAdminNodeConfiguration } from "../../typings";
import DactylError from "../../util/error";

export default async function GetNodeConfiguration(request: IRequest, nodeID: number): Promise<IAdminNodeConfiguration> {
    try {
        const response = await request(`/nodes/${nodeID}/configuration`, {
            method: "GET"
        });
        const json = await response.json();
        return response.status === 200 ? json.attributes : [];
    } catch (e) {
        throw new DactylError(e);
    }
}