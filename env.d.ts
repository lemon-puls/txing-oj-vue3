/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    VUE_APP_COS_BUCKET: string;
    VUE_APP_COS_REGION: string;
    VUE_APP_MAX_FILE_SIZE: string;
    VUE_APP_VOD_APP_ID: string;
    VUE_APP_VOD_LICENSE_URL: string;
    VUE_APP_API_BASE_URL: string;
    VUE_APP_WS_URL: string;
  }
}
