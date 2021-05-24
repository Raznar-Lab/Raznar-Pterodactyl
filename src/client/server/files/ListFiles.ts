import type { IClientServerFile, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function ListFiles(request: IRequest, serverID: string, directory?: string): Promise<IClientServerFile[]> {
    try {
        const response = await request(`/servers/${serverID}/files/list${directory ? `?directory=${encodeURIComponent(directory)}` : ""}`, {
            method: "GET"
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        const json = await response.json();
        return json.data.length > 0 ? json.data.map(file => file.attributes) : [];
    } catch (error) {
        throw new DactylError(error);
    }
}