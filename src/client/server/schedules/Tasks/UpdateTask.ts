import { IRequest, IClientServerScheduleTaskArgs } from "../../../../typings";
import DactylError from "../../../../util/error";

export default async function UpdateTask(request: IRequest, serverID: string, scheduleID: string, scheduleTask: IClientServerScheduleTaskArgs): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/schedules/tasks/${scheduleID}`, {
            method: "POST",
            body: JSON.stringify(scheduleTask)
        });
        const json = await response.json();
        if(response.status !== 200) throw new DactylError(response.statusText)
        else return json.attributes;
    } catch (e) {
        throw new DactylError(e);
    }
}