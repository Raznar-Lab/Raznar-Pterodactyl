import { IRequest, IClientServerBackups} from "../../../typings";
import DactylError from "../../../util/error";

export default async function ListDatabases(request: IRequest, serverID: string): Promise<IClientServerBackups[]> {
    try {
        const response = await request(`/servers/${serverID}/databases`, {
            method: "GET"
        });
        const json = await response.json();
        if (json.data.length > 0 ) return json.data.map(jsonDatabase => jsonDatabase.attributes);
        else return [];
    } catch (e) {
        throw new DactylError(e);
    }
}