import { IClientServerSchedule, IClientServerScheduleRequest, IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function createSchedule(request: IRequest, serverID: string, schedule: IClientServerScheduleRequest): Promise<IClientServerSchedule> {
    try {
        const response = await request(`/servers/${serverID}/schedules`, {
            method: "POST",
            body: JSON.stringify(schedule)
        });
        const json = await response.json();
        if(response.status !== 200) throw new DactylError(response.statusText);
        else return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}