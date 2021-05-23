import { IClientServerVariable, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetVariables(request: IRequest, serverID: string): Promise<IClientServerVariable[]> {
    try {
        const response = await request(`/servers/${serverID}/startup`, {
            method: "GET"
        });
        const json = await response.json();
        if(response.status !== 200) throw new DactylError(response.statusText);
        if (json.data.length > 0) return json.data.map(variable => variable.attributes);
        else return [];
    } catch (e) {
        throw new DactylError(e);
    }
}