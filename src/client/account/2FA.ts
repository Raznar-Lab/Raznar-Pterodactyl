import { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function TwoFactorAuthentication(request: IRequest): Promise<string> {
    try {
        const response = await request("/account/two-factor", {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.data.image_url_data;
    } catch (e) {
        throw new DactylError(e);
    }
}