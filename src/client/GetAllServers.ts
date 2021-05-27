import type { IClientServer, IRequest } from "../typings";
import DactylError from "../util/error";

export default async function GetAllServers(request: IRequest): Promise<IClientServer[]> {
    try {
        const response = await request("/servers", {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        if (json.data.length > 0 ) return json.data.map(jsonServer => jsonServer.attributes);
        else return [];
    } catch(e) {
        throw new DactylError(e);
    }
}