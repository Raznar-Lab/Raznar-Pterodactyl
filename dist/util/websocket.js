"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocket = void 0;
const events_1 = require("events");
const socket_io_client_1 = require("socket.io-client");
class WebSocket extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.timer = undefined;
        this.backoff = 5000;
        this.socket = undefined;
        this.url = undefined;
        this.token = "";
    }
    connect(url) {
        this.url = url;
        this.socket = socket_io_client_1.io(this.url);
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
    setToken(token, isUpdate = false) {
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
    authenticate() {
        if (this.url && this.token) {
            this.send("auth", this.token);
        }
    }
    open() {
        this.socket && this.socket.open();
    }
    reconnect() {
        if (this.socket) {
            if (this.socket.connected) {
                this.socket.disconnect();
                this.socket.connect();
            }
            else
                this.socket.connect();
            this.socket.emit("reconnect");
        }
    }
    send(event, payload) {
        this.socket && this.socket.send(JSON.stringify({
            event,
            args: Array.isArray(payload) ? payload : [payload],
        }));
    }
}
exports.WebSocket = WebSocket;
