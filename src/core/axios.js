/* eslint-disable no-unused-vars */
import axios from "axios";
import { useLoadingStore } from "@/stores/loading.store";

let requestCount = 0; // 用于记录当前进行中的请求数
// const targetEndpoint = "https://tokensight.top/api";
const targetEndpoint = "https://metacode.top/wh5api";

export class AxiosFactory {
  static repositories = {};

  static createInstance() {
    const loadingStore = useLoadingStore();
    const defaultTimeout = import.meta.env.VITE_NETWORK_TIMEOUT;
    const repository = axios.create({
      baseURL: targetEndpoint,
      timeout: defaultTimeout,
    });

    repository.interceptors.request.use(
      (config) => {
        // 每次发起请求，增加计数器
        requestCount++;
        loadingStore.setLoading(true); // 开启 loading
        return config;
      },
      (error) => {
        // 请求失败时减少计数器
        requestCount--;
        if (requestCount === 0) {
          loadingStore.setLoading(false); // 如果没有进行中的请求，关闭 loading
        }
        return Promise.reject(error);
      }
    );

    repository.interceptors.response.use(
      (response) => {
        // 响应成功时减少计数器
        requestCount--;
        if (requestCount === 0) {
          loadingStore.setLoading(false); // 如果没有进行中的请求，关闭 loading
        }
        return response;
      },
      (error) => {
        // 响应失败时减少计数器
        requestCount--;
        if (requestCount === 0) {
          loadingStore.setLoading(false); // 如果没有进行中的请求，关闭 loading
        }
        return Promise.reject(error);
      }
    );

    AxiosFactory.repositories[targetEndpoint] = repository;
    return repository;
  }

  static createInstanceSlient() {
    const defaultTimeout = import.meta.env.VITE_NETWORK_TIMEOUT;
    const repository = axios.create({
      baseURL: targetEndpoint,
      timeout: defaultTimeout,
    });

    repository.interceptors.request.use(
      (config) => {
        // 每次发起请求，增加计数器
        requestCount++;
        return config;
      },
      (error) => {
        // 请求失败时减少计数器
        requestCount--;
        return Promise.reject(error);
      }
    );

    repository.interceptors.response.use(
      (response) => {
        // 响应成功时减少计数器
        requestCount--;
        return response;
      },
      (error) => {
        // 响应失败时减少计数器
        requestCount--;
        return Promise.reject(error);
      }
    );

    AxiosFactory.repositories[targetEndpoint] = repository;
    return repository;
  }

  static get() {
    const instance = AxiosFactory.createInstance();
    instance.interceptors.request.use(
      AxiosFactory.defaultRequestInspector,
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }

  static getSilent() {
    const instance = AxiosFactory.createInstanceSlient();
    instance.interceptors.request.use(
      AxiosFactory.defaultRequestInspector,
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }

  static defaultRequestInspector(config) {
    // Customize request here if needed
    config.headers.address = sessionStorage.getItem("token");

    return config;
  }

  static defaultResponseInspector(response) {
    // Check if the response data is base64 encoded and decode it
    // try {
    //   if (typeof response.data === "string" && isBase64(response.data)) {
    //     const decodedData = atob(response.data);
    //     response.data = JSON.parse(decodedData);
    //   }
    // } catch (error) {
    //   console.error("Failed to decode base64 response data", error);
    // }
    return response;
  }

  static defaultResponseErrorInspector(error) {
    // Handle response errors here
    if (error.response) {
      if (error.response.status !== 500) {
        return Promise.reject(error);
      }
    }
  }
}

// Helper function to check if a string is base64 encoded
function isBase64(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}
