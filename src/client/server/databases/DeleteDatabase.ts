import { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function DeleteDatabase(request: IRequest, serverID: string, databaseID: string): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/databases/${databaseID}`, {
            method: "DELETE"
        });
        return response.status === 204;
    } catch (e) {
        throw new DactylError(e);
    }
}