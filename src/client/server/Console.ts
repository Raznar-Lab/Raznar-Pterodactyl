import type { IRequest, IWebSocketDetail } from "../../typings";
import DactylError from "../../util/error";
import { WebSocket } from "../../util/websocket";


class WebsocketHandler {
    constructor(private _identifier: string) {}
    async getWebsocketToken(request: IRequest) {
        const responseWs = await request(`/servers/${this._identifier}/websocket`, {
            method: "GET"
        });
        const jsonWs: IWebSocketDetail = await responseWs.json();
        return jsonWs.data;
    }

    updateToken(request: IRequest, socket: WebSocket) {
        this.getWebsocketToken(request).then(wsToken => {
            socket.setToken(wsToken.token);
        });
    }

    connect(request: IRequest): WebSocket {
        const socket = new WebSocket();

        socket.on("auth success", () => {
            socket.emit("statusClient", "authenticated");
        });
        socket.on("SOCKET_CLOSE", () => {
            socket.emit("statusClient", "disconnected");
        });// kenapa ga pake socket.io aja?, sockette outdated 2019, dari panel?, weekly downloads nya juga bnyk bgt itu socket.io
        socket.on("SOCKET_ERROR", () => {
            socket.emit("statusClient", "connecting");
        });
        socket.on("daemon error", (message) => {
            
        });


        return socket;
    }
}
export default async function ConsoleServer(request: IRequest, serverID: string) {
    try {
        

        
    } catch (e) {
        throw new DactylError(e);
    }
}
