import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function CopyFile(request: IRequest, serverID: string, location: string): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/files/copy`, {
            method: "POST",
            body: JSON.stringify({ location })
        });
        return response.status === 204;
    } catch (error) {
        throw new DactylError(error);
    }
}