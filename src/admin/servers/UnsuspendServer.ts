import { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function UnsuspendServer(request: IRequest, serverID: number | string, external?: boolean): Promise<boolean> {
    try {
        const response = await request(serverID ? `/servers/external/${external}/umsuspend` : `/servers/${serverID}/unsuspend`, {
            method: "POST"
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}