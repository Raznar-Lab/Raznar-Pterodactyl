import { EventEmitter } from "events";
import { io, Socket } from "socket.io-client";

export class WebSocket extends EventEmitter {
    private timer?: NodeJS.Timeout = undefined;
    private backoff = 5000;
    private socket?: Socket = undefined;
    private url?: string = undefined;
    private token = "";

    connect(url: string): this {
        this.url = url; 
        this.socket = io(this.url);
        this.socket.on("connect", () => {
            this.timer && clearTimeout(this.timer);
            this.backoff = 5000;
            this.emit("SOCKET_OPEN");
            this.authenticate();
        })
        .on("reconnect", () => {
            this.emit("SOCKET_RECONNECT");
            this.authenticate();
        })
        .on("disconnect", () => this.emit("SOCKET_CLOSE"))
        .on("error", (err) => this.emit("SOCKET_ERROR", err));

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

    close() {
        this.url = undefined;
        this.token = "";
        this.socket && this.socket.disconnect();
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
        if (this.socket) {
            if (this.socket!.connected) {
                this.socket.disconnect();
                this.socket.connect();
            } else this.socket.connect();
            this.socket.emit("reconnect");
        }
    }

    send(event: string, payload?: string | string[]) {
        this.socket && this.socket.send(JSON.stringify({
            event,
            args: Array.isArray(payload) ? payload : [payload],
        }));
    }
}