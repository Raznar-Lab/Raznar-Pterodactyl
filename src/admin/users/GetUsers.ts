import { IRequest, IAdminUser } from "../../typings";
import DactylError from "../../util/error";

export default async function GetUsers(request: IRequest): Promise<IAdminUser> {
    try {
        const response = await request("/users?per_page=90000", {
            method: "GET"
        });
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(users =>  users.attributes) : [];
    } catch (e) {
        throw new DactylError(e);
    }
}
