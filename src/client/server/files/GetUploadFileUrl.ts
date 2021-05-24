import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetUploadFileUrl(request: IRequest, serverID: string): Promise<string> {
    try {
        const response = await request(`/servers/${serverID}/files/upload`, {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.attributes.url;
    } catch (e) {
        throw new DactylError(e);
    }
}