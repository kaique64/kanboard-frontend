import { AbstractRestService } from "./AbstractRestService";

export class RestService extends AbstractRestService {
    baseUrl: string = import.meta.env.VITE_API_URI;
}