import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function DownloadFile(request: IRequest, serverID: string, file: string): Promise<string> {
    try {
        const response = await request(`/servers/${serverID}/files/download?file=${encodeURIComponent(file)}`, {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        else return (await response.json()).attributes.url;
    } catch (error) {
        throw new DactylError(error);
    }
}