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
function UpdateEmail(request, newEmail, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield request("/account/email", {
                method: "PUT",
                body: new URLSearchParams({
                    "email": newEmail,
                    "password": password
                })
            });
            if (response.status !== 201)
                throw new error_1.default(response.statusText);
            else
                return true;
        }
        catch (e) {
            throw new error_1.default(e);
        }
    });
}
exports.default = UpdateEmail;
