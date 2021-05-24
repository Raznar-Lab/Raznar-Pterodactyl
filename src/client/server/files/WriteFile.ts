import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function WriteFile(request: IRequest, serverID: string, fileName: string, content: string, directory?: string): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/files/write?file=${encodeURIComponent(fileName)}${directory?directory:""}`, {
            method: "POST",
            body: content
        });
        return response.status === 204;
    } catch (error) {
        throw new DactylError(error);
    }
}