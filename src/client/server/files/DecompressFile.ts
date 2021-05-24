import type { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function DecompressFile(request: IRequest, serverID: string, args: { root: string; files: string[]; }): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/files/decompress`, {
            method: "POST",
            body: JSON.stringify(args)
        });
        return response.status === 204;
    } catch (error) {
        throw new DactylError(error);
    }
}