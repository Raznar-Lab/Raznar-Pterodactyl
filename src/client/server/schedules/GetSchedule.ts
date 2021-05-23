import type { IClientServerSchedule, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function GetSchedule(request: IRequest, serverID: string, scheduleID: number): Promise<IClientServerSchedule> {
    try {
        const response = await request(`/servers/${serverID}/schedules/${scheduleID}`, {
            method: "GET"
        });
        const json = await response.json();
        return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}