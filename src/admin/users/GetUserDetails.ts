import { IRequest, IAdminUser } from "../../typings";
import DactylError from "../../util/error";

export default async function GetUserDetails(request: IRequest, userID: number, externalID?: string): Promise<IAdminUser> {
    try {
        const response = await request(externalID ? `/users/external/${externalID}` : `/users/${userID}`, {
            method: "GET"
        });
        const json = await response.json();
        return response.status === 200 ? json.attributes : [];
    } catch (e) {
        throw new DactylError(e);
    }
}