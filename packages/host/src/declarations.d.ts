declare module "app1/*";
declare module "app2/*";
declare module "*.html" {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}
