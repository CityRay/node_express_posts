import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

class Config {
  public PORT: string;
  public NODE_ENV: string;
  public APP_URL: string;
  public DATABASE_URL: string;
  public DATABASE_PASSWORD: string;
  public JWT_TOKEN: string;
  public JWT_SECRET: string;
  public JWT_EXPIRES_DAYS: string;
  public FIREBASE_TYPE: string;
  public FIREBASE_PROJECT_ID: string;
  public FIREBASE_PRIVATE_KEY_ID: string;
  public FIREBASE_PRIVATE_KEY: string;
  public FIREBASE_CLIENT_EMAIL: string;
  public FIREBASE_CLIENT_ID: string;
  public FIREBASE_AUTH_URI: string;
  public FIREBASE_TOKEN_URI: string;
  public FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
  public FIREBASE_CLIENT_X509_CERT_URL: string;
  public LINE_CHANNEL_ACCESS_TOKEN: string;
  public LINE_CHANNEL_SECRET: string;

  constructor() {
    this.PORT = process.env.PORT || '3000';
    this.NODE_ENV = process.env.NODE_ENV || 'production';
    this.APP_URL = process.env.APP_URL || 'http://localhost:3006';
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN || 'xxxxxx';
    this.JWT_SECRET = process.env.JWT_SECRET || '';
    this.JWT_EXPIRES_DAYS = process.env.JWT_EXPIRES_DAYS || '7d';

    this.FIREBASE_TYPE = process.env.FIREBASE_TYPE || '';
    this.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || '';
    this.FIREBASE_PRIVATE_KEY_ID = process.env.FIREBASE_PRIVATE_KEY_ID || '';
    this.FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
    this.FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL || '';
    this.FIREBASE_CLIENT_ID = process.env.FIREBASE_CLIENT_ID || '';
    this.FIREBASE_AUTH_URI = process.env.FIREBASE_AUTH_URI || '';
    this.FIREBASE_TOKEN_URI = process.env.FIREBASE_TOKEN_URI || '';
    this.FIREBASE_AUTH_PROVIDER_X509_CERT_URL =
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || '';
    this.FIREBASE_CLIENT_X509_CERT_URL = process.env.FIREBASE_CLIENT_X509_CERT_URL || '';

    this.LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';
    this.LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || '';
  }

  public validateConfig(): void {
    console.info(this);
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
