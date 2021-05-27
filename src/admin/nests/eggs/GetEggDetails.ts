import { IRequest, IAdminEgg } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetEggDetails(request: IRequest, nestID: number, eggID: number): Promise<IAdminEgg> {
    try {
        const response = await request(`/nests/${nestID}/eggs/${eggID}?include=config,script`, {
            method: "GET"
        });
        const json = await response.json();
        if (response.status !== 200) throw new DactylError(response.statusText);
        else return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}