import { IRequest, IAdminUserRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function CreateUser(request: IRequest, userArgs: IAdminUserRequest): Promise<boolean> {
    try {
        const response = await request("/users", {
            method: "POST",
            body: JSON.stringify(userArgs)
        })
        const json = await response.json();
        return response.status === 201;
    } catch (e) {
        throw new DactylError(e);
    }
}