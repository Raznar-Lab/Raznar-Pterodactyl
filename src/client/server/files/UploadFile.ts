import type { IRequest } from "../../../typings";
import FormData from "form-data";
import fetch from "node-fetch";
import DactylError from "../../../util/error";
import GetUploadFileUrl from "./GetUploadFileUrl";

export default async function UploadFile(request: IRequest, serverID: string, files: {filename: string; buffer: Buffer}[], directory?: string): Promise<true> {
    try {
        const url = await GetUploadFileUrl(request, serverID);
        const form = new FormData();
        Array.from(files).forEach(file => form.append("files", file));
        const response = await fetch(url + directory ? directory : "", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: form
        });
        if (response.status !== 200) throw new DactylError(response.statusText);
        return true;
    } catch (e) {
        throw new DactylError(e);
    }
}