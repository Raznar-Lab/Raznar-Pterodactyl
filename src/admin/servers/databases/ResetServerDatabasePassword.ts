import { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function ResetServerDatabasePassword(request: IRequest, serverID: number | string, databaseID: number, external?: boolean): Promise<boolean> {
    try {
        const response = await request(external ? `/servers/external/${serverID}/databases` : `/servers/${serverID}/databases` + `/${databaseID}/reset-password`, {
            method: "POST"
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}