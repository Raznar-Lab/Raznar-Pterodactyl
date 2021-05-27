import { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function SuspendServer(request: IRequest, serverID: number | string, external?: boolean): Promise<boolean> {
    try {
        const response = await request(external ? `/servers/external/${serverID}/suspend` : `/servers/${serverID}/suspend`, {
            method: "POST"
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}