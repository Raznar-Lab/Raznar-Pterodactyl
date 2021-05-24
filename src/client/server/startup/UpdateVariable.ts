import { IRequest, IClientServerStartupVariableArgs } from "../../../typings";
import DactylError from "../../../util/error";

export default async function UpdateVariable(request: IRequest, serverID: string, args: IClientServerStartupVariableArgs): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/startup/variable`, {
            method: "PUT",
            body: JSON.stringify(args)
        });
        return response.status === 200;
    } catch (e) {
        throw new DactylError(e);
    }
}