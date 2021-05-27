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
const form_data_1 = __importDefault(require("form-data"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const error_1 = __importDefault(require("../../../util/error"));
const GetUploadFileUrl_1 = __importDefault(require("./GetUploadFileUrl"));
function UploadFile(request, serverID, files, directory) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = yield GetUploadFileUrl_1.default(request, serverID);
            // uploading
            const form = new form_data_1.default();
            Array.from(files).forEach(file => form.append("files", file));
            const response = yield node_fetch_1.default(url + directory ? directory : "", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: form
            });
            if (response.status !== 200)
                throw new error_1.default(response.statusText);
            return true;
        }
        catch (e) {
            throw new error_1.default(e);
        }
    });
}
exports.default = UploadFile;
