import fetch, { RequestInit, Response } from "node-fetch";
import DactylError from "./error";

function isValidURL(url:string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
export default function http(baseURL: string, isClient:boolean, apiKey: string, endpointAPI: string, options?: RequestInit, contentType = "application/json"): Promise<Response> {
    if (!isValidURL(baseURL)) throw new DactylError("Invalid URL");
    const endpoint = isClient ? (baseURL.endsWith("/") ? "api/client" : "/api/client") : (baseURL.endsWith("/") ? "api/application" : "/api/application");

    return fetch(`${baseURL}${endpoint}${endpointAPI}`, {
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": contentType,
            "Accept": "Application/vnd.pterodactyl.v1+json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        },
        "follow":5,
        ...options
    });
}