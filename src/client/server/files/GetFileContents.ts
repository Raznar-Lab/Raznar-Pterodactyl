import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetFileContents(request: IRequest, serverID: string, file: string): Promise<string> {
    try {
        const response = await request(`/servers/${serverID}/files/contents?file=${encodeURIComponent(file)}`, {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        else return await response.text();
    } catch (error) {
        throw new DactylError(error);
    }
}