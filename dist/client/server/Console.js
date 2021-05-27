"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../util/error"));
const websocket_1 = require("../../util/websocket");
const reconnectErrors = [
    "jwt: exp claim is invalid",
    "jwt: created too far in past (denylist)",
];
class WebsocketHandler {
    constructor(request, _identifier) {
        this.request = request;
        this._identifier = _identifier;
        this.socket = new websocket_1.WebSocket();
    }
    getWebsocketToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const responseWs = yield this.request(`/servers/${this._identifier}/websocket`, {
                method: "GET"
            });
            if (responseWs.status !== 200)
                throw new error_1.default(responseWs.statusText);
            const jsonWs = yield responseWs.json();
            return jsonWs.data;
        });
    }
    updateToken() {
        this.getWebsocketToken().then(wsToken => {
            this.socket.setToken(wsToken.token);
        });
    }
    connect() {
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
        socket.on("jwt error", (error) => {
            socket.emit("statusClient", "authenticating");
            if (reconnectErrors.find(v => error.toLowerCase().indexOf(v) >= 0)) {
                this.updateToken();
            }
            else {
                socket.emit("statusClient", "reconnecting");
                socket.reconnect();
            }
        });
        socket.on("transfer status", (status) => socket.emit("transferStatus", status));
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
    sendPower(power) {
        this.socket.send("set state", power);
        return this.socket;
    }
    sendCommand(command) {
        this.socket.send("send command", command);
        return this.socket;
    }
}
function ConsoleServer(request, serverID) {
    try {
        const handler = new WebsocketHandler(request, serverID);
        handler.connect();
        return handler;
    }
    catch (e) {
        throw new error_1.default(e);
    }
}
exports.default = ConsoleServer;
