import { IRequest, IClientServerStartupVariableArgs } from "../../../typings";
import { stringify } from "query-string";
import DactylError from "../../../util/error";

export default async function UpdateVariable(request: IRequest, serverID: string, args: IClientServerStartupVariableArgs): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/startup/variable`, {
            method: "PUT",
            body: stringify(args)
        });
        return response.status === 200;
    } catch (e) {
        throw new DactylError(e);
    }
}