import type { IRequest, IWebSocketDetail } from "../../typings";
import DactylError from "../../util/error";
import { WebSocket } from "../../util/websocket";

const reconnectErrors = [
    "jwt: exp claim is invalid",
    "jwt: created too far in past (denylist)",
];
type Powers = "start" | "stop" | "restart" | "kill";

export class WebsocketHandler {
    constructor(private request: IRequest, private _identifier: string) {}
    private async getWebsocketToken() {
        const responseWs = await this.request(`/servers/${this._identifier}/websocket`, {
            method: "GET"
        });
        if (responseWs.status !== 200) throw new DactylError(responseWs.statusText);
        const jsonWs: IWebSocketDetail = await responseWs.json();
        return jsonWs.data;
    }

    private updateToken() {
        this.getWebsocketToken().then(wsToken => {
            this.socket.setToken(wsToken.token);
        });
    }

    public socket = new WebSocket();
    connect(): WebSocket {
        const socket = this.socket;

        socket.on("auth success", () => {
            socket.emit("statusClient", "authenticated");
        });
        socket.on("SOCKET_CLOSE", () => {
            socket.emit("statusClient", "disconnected");
        });
        socket.on("SOCKET_ERROR", () => {
            socket.emit("statusClient", "connecting");
        });
        socket.on("token expiring", () => this.updateToken());
        socket.on("token expired", () => this.updateToken());
        socket.on("jwt error", (error: string) => {
            socket.emit("statusClient", "authenticating");
            if (reconnectErrors.find(v => error.toLowerCase().indexOf(v) >= 0)) {
                this.updateToken();
            } else {
                socket.emit("statusClient", "reconnecting");
                socket.reconnect();
            }
        });
        socket.on("transfer status", (status: string) => socket.emit("transferStatus", status));
        this.getWebsocketToken().then((wsToken) => {
            socket.setToken(wsToken.token).connect(wsToken.socket);
        });

        return socket;
    }

    requestStats() {
        this.socket.send("send stats");
        return this.socket;
    }
    requestLogs() {
        this.socket.send("send logs");
        return this.socket;
    }
    sendPower(power: Powers) {
        this.socket.send("set state", power);
        return this.socket;
    }
    sendCommand(command: string) {
        this.socket.send("send command", command);
        return this.socket;
    }
}

export default function Console(request: IRequest, serverID: string) {
    try {
        const handler = new WebsocketHandler(request, serverID);
        handler.connect();
        return handler;
    } catch (e) {
        throw new DactylError(e);
    }
}
