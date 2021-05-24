import type { IClientServerFile, IRequest } from "../../../typings";
import { stringify } from "query-string";
import DactylError from "../../../util/error";

export default async function CompressFile(request: IRequest, serverID: string, args: { root: string; files: string[]; }): Promise<IClientServerFile> {
    try {
        const response = await request(`/servers/${serverID}/files/compress`, {
            method: "POST",
            body: stringify(args)
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        else return (await response.json()).attributes;
    } catch (error) {
        throw new DactylError(error);
    }
}