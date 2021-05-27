import { IRequest } from "../../typings";
import DactylError from "../../util/error";
export default async function UpdatePassword(request: IRequest, currentPassword: string, newPassword: string): Promise<boolean> {
    try {
        const response = await request("/account/password", {
            method: "PUT",
            body: JSON.stringify({
                "current_password": currentPassword,
                "password": newPassword,
                "password_confirmation": newPassword
            })
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}