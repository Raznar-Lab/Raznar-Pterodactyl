import type { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function DisableTwoFactorAuthentication(request: IRequest, password: string): Promise<boolean> {
    try {
        const response = await request("/account/two-factor", {
            method: "DELETE",
            body: new URLSearchParams({ password })
        });
        if (response.status !== 204) return false;
        return true;
    } catch (e) {
        throw new DactylError(e);
    }
}