/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig<T = any> {
    skipAuth?: boolean;
  }
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}
