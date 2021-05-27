"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
const admin_1 = __importDefault(require("./admin"));
const http_1 = __importDefault(require("./util/http"));
class Pterodactyl {
    constructor(hostURL, apiKey) {
        this.hostURL = hostURL;
        this.apiKey = apiKey;
        this.clientRequest = (apiEndpoint, options, contentType = "application/json") => http_1.default(this.hostURL, true, this.apiKey, apiEndpoint, options, contentType);
        this.adminRequest = (apiEndpoint, options, contentType = "application/json") => http_1.default(this.hostURL, false, this.apiKey, apiEndpoint, options, contentType);
        this.client = new client_1.default(this.clientRequest);
        this.admin = new admin_1.default(this.adminRequest);
    }
}
exports.default = Pterodactyl;
