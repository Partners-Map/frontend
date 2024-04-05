/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference path="node_modules/@2gis/mapgl/global.d.ts" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
