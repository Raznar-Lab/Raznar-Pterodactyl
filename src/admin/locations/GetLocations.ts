import type { IAdminLocation, IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function GetLocations(request: IRequest): Promise<IAdminLocation[]> {
    try {
        const response = await request("/locations", {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(d => d.attributes) : [];
    } catch (error) {
        throw new DactylError(error);
    }
}