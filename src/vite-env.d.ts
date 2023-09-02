/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_ROOT_DIRECTORY: string
    readonly VITE_APP_REDIRECT_URI: string
    readonly VITE_API_URI: string   
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
