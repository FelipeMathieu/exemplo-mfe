const REMOTE_MODULE_URLS = {};
function createRemoteScript(url) {
  return new Promise((resolve, reject) => {
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
function loadRemoteModule(remote, component) {
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
    const container = window[scope];
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

export { loadRemoteModule as default };
