import axios, { AxiosRequestConfig, ResponseType } from "axios";
import { RestCallParamsType } from "../type/RestCallParamsType";

export abstract class AbstractRestService {
    abstract baseUrl: string;
    
    getFullUrl(url: string): string {
  
        if (
            this.baseUrl === "" ||
            url.startsWith('http://') ||
            url.startsWith('https://')
        ) {
            return url;
        }
  
      return (
        this.baseUrl +
        (this.baseUrl.slice(-1) === "/" ? "" : "/") +
        (url.slice(0, 1) === "/" ? url.slice(1) : url)
      );
  
    }

    executeGet<T>(param: RestCallParamsType<null>): Promise<T | null> {
      const fullUrl = this.getFullUrl(param.url);
  
      return this.executeRestCall({
        url: fullUrl,
        method: "get",
        payload: null,
        contentType: param.contentType,
        responseType: param.responseType,
        params: param.params,
        headers: param.headers
      });
    }

    executePost<T, S>(param: RestCallParamsType<S>): Promise<T | null> {
      const fullUrl = this.getFullUrl(param.url);

      return this.executeRestCall({
        url: fullUrl,
        method: "post",
        payload: param.payload,
        contentType: param.contentType,
        responseType: param.responseType,
        params: param.params
      });
    }

    executePut<T, S>(param: RestCallParamsType<S>): Promise<T | null> {
      const fullUrl = this.getFullUrl(param.url);

      return this.executeRestCall({
        url: fullUrl,
        method: "put",
        payload: param.payload,
        contentType: param.contentType,
        responseType: param.responseType,
        params: param.params
      });
    }
  
    executePatch<T, S>(param: RestCallParamsType<S>): Promise<T | null> {
      const fullUrl = this.getFullUrl(param.url);

      return this.executeRestCall({
        url: fullUrl,
        method: "patch",
        payload: param.payload,
        contentType: param.contentType,
        responseType: param.responseType,
        params: param.params
      });
    }

    executeDelete<T>(param: RestCallParamsType<null>): Promise<T | null> {
      const fullUrl = this.getFullUrl(param.url);
  
      return this.executeRestCall({
        url: fullUrl,
        method: "delete",
        contentType: param.contentType,
        responseType: param.responseType,
        params: param.params  
      });
    }
  
    private async executeRestCall<T, S>(
      param: RestCallParamsType<S>
    ): Promise<T | null> {
      param.contentType = param.contentType || "application/json"; 
  
      let response: T | any | null = null;
  
      const requestParam: AxiosRequestConfig = {
        url: param.url,
        method: param.method,
        responseType: param.responseType as ResponseType | undefined,
        params: param.params,
        withCredentials: false,
        data: param.payload
      };

      try {
        const val = await axios.request(requestParam);

        if (val.data && val.status === 200) {
          response = val.data;
        } else if (val.status === 202) {
          response = val.status;
        } else if (val.data && val.data.code === 409) {
          response = val.data.message;
        } else if (val.data && val.data.code === 404) {
          response = val.data.message;
        }
      } catch (error: any) {  
      }

      return response;
    }
  
    private static async handleError(error: any, url: string) {
      console.log(JSON.stringify(error));
      console.log(JSON.stringify(url));
    }

}