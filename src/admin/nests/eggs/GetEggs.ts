import { IRequest, IAdminEgg } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetEggs(request: IRequest, nestID: number): Promise<IAdminEgg> {
    try {
        const response = await request(`/nests/${nestID}/eggs`, {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map((egg: { attributes: IAdminEgg; }) => egg.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}