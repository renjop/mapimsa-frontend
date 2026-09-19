/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEBSITE_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
