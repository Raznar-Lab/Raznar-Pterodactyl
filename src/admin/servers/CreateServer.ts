import { IRequest, IAdminServer, IAdminServerRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function CreateServer(request: IRequest, serverArgs: IAdminServerRequest): Promise<IAdminServer> {
    try {
        const response = await request(`/servers`, {
            method: "POST",
            body: JSON.stringify(serverArgs)
        })
        const json = await response.json();
        return response.status === 201 ? json.attributes : [];
    } catch (e) {
        throw new DactylError(e);
    }
}