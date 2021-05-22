import { EventEmitter } from "events";
import Sockette from "sockette";
import { io, Socket } from "socket.io-client"
import DactylError from "./error";

export class WebSocket extends EventEmitter {
    private timer?: NodeJS.Timeout = undefined;
    private backoff = 5000;
    private socket?: Socket = undefined;
    private url?: string = undefined;
    private token = "";

    connect(url: string): this {
        this.url = url;
        this.socket = io(this.url,{
            
            onmessage: e => {
                try {
                    const { event, args } = JSON.parse(e.data);
                    args ? this.emit(event, ...args) : this.emit(event);
                } catch (err) {
                    throw new DactylError(err);
                }
            },
            onopen: () => {
                this.timer && clearTimeout(this.timer);
                this.backoff = 5000;
                this.emit("SOCKET_OPEN");
                this.authenticate();
            },
            onreconnect: () => {
                this.emit("SOCKET_RECONNECT");
                this.authenticate();
            },
            onclose: () => this.emit("SOCKET_CLOSE"),
            onerror: error => this.emit("SOCKET_ERROR", error),
        });
        this.timer = setTimeout(() => {
            this.backoff = (this.backoff + 2500 >= 20000) ? 20000 : this.backoff + 2500;
            this.socket && this.socket.close();
            clearTimeout(this.timer);
            this.connect(url);
        }, this.backoff);

        return this;
    }

    setToken(token: string, isUpdate = false): this {
        this.token = token;
        if (isUpdate) {
            this.authenticate();
        }
        return this;
    }

    close(code?: number, reason?: string) {
        this.url = undefined;
        this.token = "";
        this.socket && this.socket.close(code, reason);
    }

    authenticate(): void {
        if (this.url && this.token) {
            this.send("auth", this.token);
        }
    }

    open() {
        this.socket && this.socket!.open();
    }

    reconnect() {
        this.socket && this.socket!.reconnect();
    }

    send(event: string, payload?: string | string[]) {
        this.socket && this.socket.send(JSON.stringify({
            event,
            args: Array.isArray(payload) ? payload : [payload],
        }));
    }
}