import { IClientServerSchedule, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export async function GetSchedules(request: IRequest, serverID: string): Promise<IClientServerSchedule> {
    try {
        const response = await request(`/servers/${serverID}/schedules`, {
            method: "GET"
        });
        const json = await response.json();
        if (json.data.length > 0) return json.data.map(jsonSchedules => jsonSchedules.attributes);
    } catch (error) {
        throw new DactylError(error);
    }
}