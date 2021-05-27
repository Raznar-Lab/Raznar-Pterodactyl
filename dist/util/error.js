"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DactylError extends Error {
    constructor(message) {
        super(message);
        this.name = "RaznarError";
    }
}
exports.default = DactylError;
