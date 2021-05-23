import type { RequestInit, Response } from "node-fetch";
import Client from "./client";
import Admin from "./admin";
import http from "./util/http";

export default class Pterodactyl {
    constructor(public hostURL: string, private apiKey: string) {}
    public clientRequest = (apiEndpoint: string, options?: RequestInit): Promise<Response> => http(this.hostURL, true, this.apiKey, apiEndpoint, options);
    public adminRequest = (apiEndpoint: string, options?: RequestInit): Promise<Response> => http(this.hostURL, false, this.apiKey, apiEndpoint, options);

    public client = new Client(this.clientRequest);
    public admin = new Admin(this.adminRequest);
}