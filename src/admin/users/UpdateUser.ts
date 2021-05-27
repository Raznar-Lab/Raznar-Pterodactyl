import { IRequest, IAdminUserRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function UpdateUser(request: IRequest, userArgs: IAdminUserRequest, userID: number, externalID?: string): Promise<boolean> {
    try {
        const response = await request(externalID ? `/users/external/${externalID}` : `/users/${userID}`, {
            method: "PATCH",
            body: JSON.stringify(userArgs)
        });
        return response.status === 200;
    } catch (e) {
        throw new DactylError(e);
    }
}