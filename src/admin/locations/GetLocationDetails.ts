import type { IRequest, IAdminLocation } from "../../typings";
import DactylError from "../../util/error";

export default async function GetLocationDetails(request: IRequest, locationID: number): Promise<IAdminLocation> {
    try  {
        const response = await request(`/locations/${locationID}`, {
            method: "GET"
        });
        const json = await response.json();
        if (response.status !== 200) throw new DactylError(response.statusText);
        else return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}