declare module 'paapi5-nodejs-sdk' {
  export namespace ApiClient {
    const instance: {
      accessKey: string;
      secretKey: string;
      host: string;
      region: string;
    };
  }

  export class DefaultApi {
    searchItems(request: any, callback: (error: any, data: any) => void): void;
  }

  export = ProductAdvertisingAPI;
}

declare namespace ProductAdvertisingAPI {
  export { ApiClient, DefaultApi };
}