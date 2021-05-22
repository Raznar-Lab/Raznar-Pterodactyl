import type { IRequest, IWebSocketDetail } from "../../typings";
import DactylError from "../../util/error";
import { WebSocket } from "../../util/websocket";

export default async function ConsoleServer(request: IRequest, serverID: string) {
    try {
        async function getWebsocketToken() {
            const responseWs = await request(`/servers/${serverID}/websocket`, {
                method: "GET"
            });
            const jsonWs: IWebSocketDetail = await responseWs.json();
            return jsonWs.data;
        };

        // getting websocket token
        
        
        const updateToken = (socket: WebSocket) => {
            
        };
    } catch (e) {
        throw new DactylError(e);
    }
}
