import { IRequest } from "../../../../typings";
import DactylError from "../../../../util/error";

export default async function DeleteTask(request: IRequest, serverID: string, scheduleID: number, scheduleTaskID: number): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/schedules/${scheduleID}/tasks/${scheduleTaskID}`, {
            method: "DELETE"
        });
        return response.status === 204;
    } catch (e) { 
        throw new DactylError(e);
    }
}