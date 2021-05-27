"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const error_1 = __importDefault(require("./error"));
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function http(baseURL, isClient, apiKey, endpointAPI, options, contentType = "application/json") {
    if (!isValidURL(baseURL))
        throw new error_1.default("Invalid URL");
    const endpoint = isClient ? (baseURL.endsWith("/") ? "api/client" : "/api/client") : (baseURL.endsWith("/") ? "api/application" : "/api/application");
    return node_fetch_1.default(`${baseURL}${endpoint}${endpointAPI}`, Object.assign({ headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": contentType,
            "Accept": "Application/vnd.pterodactyl.v1+json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        }, "follow": 5 }, options));
}
exports.default = http;
