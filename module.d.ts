declare namespace NodeJS {
    export interface ProcessEnv {
        NEXT_PUBLIC_BASE_URL: string;
        DB_CLIENT: string;
        DB_HOST: string;
        DB_USER: string;
        DB_PASS: string;
        DB_DBNAME: string;
        DB_PORT: number;
        NEXTAUTH_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        NEXT_PUBLIC_SSO_PUBLIC_KKU_URL: string;
        NEXT_PUBLIC_SSO_PUBLIC_CLIENT_ID: string;
        NEXT_PUBLIC_SSO_PUBLIC_RESPONSE_TYPE: string;
        NEXT_PUBLIC_SSO_PUBLIC_RESIRECT: string;
    }
}