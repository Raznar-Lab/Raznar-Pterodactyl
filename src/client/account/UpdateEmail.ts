import { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function UpdateEmail(request: IRequest, newEmail: string, password: string): Promise<true> {
    try {
        const response = await request("/account/email", {
            method: "PUT",
            body: new URLSearchParams({
                "email": newEmail,
                "password": password
            })
        });
        if (response.status !== 201) throw new DactylError(response.statusText);
        else return true;
    } catch (e) {
        throw new DactylError(e);
    }
}