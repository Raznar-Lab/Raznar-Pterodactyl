import type { RequestInit, Response } from "node-fetch";

type IRequest = (apiEndpoint: string, options?: RequestInit, contentType?: string) => Promise<Response>;