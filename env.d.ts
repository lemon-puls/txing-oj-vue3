/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    VUE_APP_COS_BUCKET: string;
    VUE_APP_COS_REGION: string;
    VUE_APP_MAX_FILE_SIZE: string;
  }
}
