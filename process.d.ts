declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_SECRET: string;

    NEXT_PUBLIC_DOMAIN: string;
    NEXT_PUBLIC_CONTENT_DOMAIN: string;
    NEXT_PUBLIC_CONTENT_HOST: string;
    NEXT_PUBLIC_API_HOST: string;
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;

    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
  }
}
