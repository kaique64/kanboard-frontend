import { Method } from "axios";
import { ContentTypeEnum } from "./ContentTypeEnum";

export interface RestCallParamsType<S> {
    url: string;
    method?: Method;
    payload?: S;
    contentType?: ContentTypeEnum;
    responseType?: null | string;
    params?: Object;
    headers?: Object;
}