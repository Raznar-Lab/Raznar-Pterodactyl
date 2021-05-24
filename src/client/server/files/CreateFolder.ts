import { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function CreateFolder(request: IRequest, serverID: string, args: { root: string; name: string; }): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/files/create-folder`, {
            method: "POST",
            body: JSON.stringify(args)
        });
        return response.status === 204;
    } catch (error) {
        throw new DactylError(error);
    }
}