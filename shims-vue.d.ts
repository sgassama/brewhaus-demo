declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<Record<unknown, unknown>, Record<unknown, unknown>, unknown>;
  export default component;
}

declare module "*.css" {
  const content: { [key: string]: string };
  export default content;
}

interface ImportMetaEnv {
  [k: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
