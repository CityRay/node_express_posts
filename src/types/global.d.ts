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
      JWT_EXPIRES_DAYS: string;
      FIREBASE_TYPE: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_PRIVATE_KEY_ID: string;
      FIREBASE_PRIVATE_KEY: string;
      FIREBASE_CLIENT_EMAIL: string;
      FIREBASE_CLIENT_ID: string;
      FIREBASE_AUTH_URI: string;
      FIREBASE_TOKEN_URI: string;
      FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
      FIREBASE_CLIENT_X509_CERT_URL: string;
    }
  }
}
