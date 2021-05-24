import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function DeleteUser(request: IRequest, serverID: string, userID: string): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/users/${userID}`, {
            method: "DELETE",
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}