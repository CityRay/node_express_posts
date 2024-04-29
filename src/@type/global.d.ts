export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: string;
      APP_URL: string;
      DATABASE_URL: string;
      DATABASE_PASSWORD: string;
      JWT_TOKEN: string;
      JWT_SECRET: string;
    }
  }
}
