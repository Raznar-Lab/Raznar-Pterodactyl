import type { IAccountDetails, IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function AccountDetails(request: IRequest): Promise<IAccountDetails> {
    try {
        const response = await request("/account", {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}