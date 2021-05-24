import type { IRequest, IClientServerRenameFileRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function RenameFile(request: IRequest, serverID: string, args: IClientServerRenameFileRequest): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/files/rename`, {
            method: "PUT",
            body: JSON.stringify(args)
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    } 
}