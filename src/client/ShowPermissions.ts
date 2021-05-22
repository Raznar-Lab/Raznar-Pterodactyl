import type { IClientPermissions, IRequest } from "../typings";
import DactylError from "../util/error";

export default async function ShowPermissions(request: IRequest): Promise<IClientPermissions> {
    try {
        const response = await request("/permissions", {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}