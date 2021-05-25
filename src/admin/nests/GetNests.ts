import { IRequest, IAdminNest } from "../../typings";
import DactylError from "../../util/error";

export default async function GetNests(request: IRequest): Promise<IAdminNest> {
    try {
        const response = await request("/nests", {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map((nest: { attributes:IAdminNest; }) => nest.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}