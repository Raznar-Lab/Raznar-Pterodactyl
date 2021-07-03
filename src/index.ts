import type { RequestInit, Response } from "node-fetch";
import Client from "./client";
import Admin from "./admin";
import http from "./util/http";

export default class Pterodactyl {
    constructor(public hostURL: string, private apiKey: string) {}
    private clientRequest = (apiEndpoint: string, options?: RequestInit, contentType = "application/json"): Promise<Response> => http(this.hostURL, true, this.apiKey, apiEndpoint, options, contentType);
    private adminRequest = (apiEndpoint: string, options?: RequestInit, contentType = "application/json"): Promise<Response> => http(this.hostURL, false, this.apiKey, apiEndpoint, options, contentType);

    /**
     * Client menu that can help you to manage servers, and others.
     */
    public client = new Client(this.clientRequest);
    /**
     * Admin menu that can be used to manage panel.
     */
    public admin = new Admin(this.adminRequest);
}