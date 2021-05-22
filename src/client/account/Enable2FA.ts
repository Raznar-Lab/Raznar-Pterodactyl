import type { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function EnableTwoFactorAuthentication(request: IRequest, otp_code: string): Promise<string[]> {
    try {
        const response = await request("/account/two-factor", {
            method: "POST",
            body: new URLSearchParams({
                code: otp_code
            })
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes.tokens;
    } catch (e) {
        throw new DactylError(e);
    }
}