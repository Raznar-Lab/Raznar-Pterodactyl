import type { IRequest } from "../../typings";
import DactylError from "../../util/error";

export default async function DeleteLocation(request: IRequest, locationID: number): Promise<boolean> {
    try {
        const response = await request(`/locations/${locationID}`, {
            method: "DELETE"
        });
        return response.status === 204;
    } catch (error) {
        throw new DactylError(error);
    }
}