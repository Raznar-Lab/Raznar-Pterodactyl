import type { IRequest } from "../../../typings";
import { stringify } from "query-string";
import DactylError from "../../../util/error";

export default async function DeleteFile(request: IRequest, serverID: string, args: {root: string, files: string[]}): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/files/delete`, {
            method: "DELETE",
            body: stringify(args)
        });
        return response.status === 204;
    } catch (error) {
        throw new DactylError(error);
    }
}