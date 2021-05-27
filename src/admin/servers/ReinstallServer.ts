import { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function ReinstallServer(request: IRequest, serverID: number | string, external?: boolean): Promise<boolean> {
    try {
        const response = await request(external ? `/servers/external/${serverID}/reinstall` : `/servers/${serverID}/reinstall`, {
            method: "POST"
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}