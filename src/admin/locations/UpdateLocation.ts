import type { IAdminLocation, IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function UpdateLocation(request: IRequest, locationID: number, shortCode: string, description: string): Promise<IAdminLocation> {
    try {
        const response = await request(`/locations/${locationID}`, {
            method: "PATCH",
            body: JSON.stringify({ short: shortCode, long: description })
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (error) {
        throw new DactylError(error);
    }
}