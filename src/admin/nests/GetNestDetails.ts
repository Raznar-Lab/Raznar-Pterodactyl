import { IRequest, IAdminNest } from "../../typings";
import DactylError from "../../util/error";

export default async function GetNestDetails(request: IRequest, nestID: number): Promise<IAdminNest> {
    try {
        const response = await request(`/nests/${nestID}`, {
            method: "GET"
        });
        const json = await response.json();
        if(response.status !== 200) throw new DactylError(response.statusText);
        else return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}