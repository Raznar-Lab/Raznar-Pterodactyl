import { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function DeleteUser(request: IRequest, userID: number, externalID?: string): Promise<boolean> {
    try {
        const response = await request(externalID ? `/users/external/${externalID}` : `/users/${userID}`, {
            method: "DELETE"
        });
        return response.status === 200;
    } catch (e) {
        throw new DactylError(e);
    }
}