/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentType } from "react";

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };
declare const window: any;

interface Container<T> {
  init(shareScope: unknown): void;
  get(module: string): Promise<() => { default: ComponentType<T> } | undefined>;
}

const REMOTE_MODULE_URLS: Record<string, HTMLScriptElement> = {};

/**
 * Create a script element to load the MFE remote entry
 * @param url MEF host url
 */
function createRemoteScript(url: string) {
  return new Promise<HTMLScriptElement>((resolve, reject) => {
    if (REMOTE_MODULE_URLS[url]) {
      return resolve(REMOTE_MODULE_URLS[url]);
    }

    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    script.type = "text/javascript";
    script.onload = () => resolve(script);
    script.onerror = () => {
      document.head.removeChild(script);
      delete REMOTE_MODULE_URLS[url];
      reject(`Failed to load remote microfrontend entry point from ${url}`);
    };

    REMOTE_MODULE_URLS[url] = script;
    document.head.appendChild(script);
  });
}

/**
 * Lazy load an exposed Module Federation remote bundle
 * @param scope name of the exposed module's scope
 * @param component exposed component index to be consumed
 */
function loadRemoteModule<T>(remote: string | undefined, component: string) {
  return async () => {
    if (!remote || !remote.includes("@")) {
      throw new Error(`Invalid microfrontend remote URL - ${remote}`);
    }

    const [scope, host] = remote.split("@");

    await createRemoteScript(host);
    await __webpack_init_sharing__("default");

    if (!window[scope]) {
      throw new Error(`Microfrontend module for scope ${scope} not found`);
    }

    const container = window[scope] as Container<T>;

    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(`./${component.replace(/\^.\//, "")}`);
    const module = factory();

    if (!module) {
      throw new Error(
        `Microfrontend component ${component} not found on remote module`
      );
    }

    return module;
  };
}

export default loadRemoteModule;
