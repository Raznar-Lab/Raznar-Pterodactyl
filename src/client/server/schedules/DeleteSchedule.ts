import { IRequest } from "../../../typings";
import DactylError from "../../../util/error";

export default async function DeleteSchedule(request: IRequest, serverID: string, scheduleID: number): Promise<boolean> {
    try {
        const response = await request(`/servers/${serverID}/schedules/${scheduleID}`, {
            method: "DELETE"
        });
        return response.status === 204;
    } catch (error) {
        throw new DactylError(error);
    }
}