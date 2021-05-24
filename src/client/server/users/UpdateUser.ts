import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function UpdateUser(request: IRequest, serverID: string, userID: string, permissions: string[]): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/users/${userID}/${permissions}`, {
            method: "POST",
            body: JSON.stringify({
                permissions
            })
        });
        return response.status === 200;
    } catch (e) {
        throw new DactylError(e);
    }
}