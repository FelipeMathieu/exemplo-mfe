import { r as reactDomExports } from './__federation_shared_react-dom-Dc1KNi4T.js';
import { importShared } from './__federation_fn_import-jtG6K6_V.js';
import { j as jsxRuntimeExports } from './jsx-runtime-BOfMvjrI.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const remotesMap = {
'shared':{url:'http://localhost:3003/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const loadJS = async (url, fn) => {
                    const resolvedUrl = typeof url === 'function' ? await url() : url;
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.onload = fn;
                    script.src = resolvedUrl;
                    document.getElementsByTagName('head')[0].appendChild(script);
                };
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    __rf_placeholder__shareScope
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if ('var' === remote.format) {
                            // loading js with script tag
                            return new Promise(resolve => {
                                const callback = () => {
                                    if (!remote.inited) {
                                        remote.lib = window[remoteId];
                                        remote.lib.init(wrapShareModule(remote.from));
                                        remote.inited = true;
                                    }
                                    resolve(remote.lib);
                                };
                                return loadJS(remote.url, callback);
                            });
                        } else if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = typeof remote.url === 'function' ? remote.url : () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule(remote.from);
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_unwrapDefault(module) {
                    return (module?.__esModule || module?.[Symbol.toStringTag] === 'Module') ? module.default : module
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const {lazy,Suspense} = await importShared('react');

const __federation_var_sharedSharedStore = await __federation_method_getRemote("shared" , "./SharedStore");
 let useSharedStore = __federation_method_unwrapDefault(__federation_var_sharedSharedStore); 
const __federation_var_sharedLoadRemoteModule = await __federation_method_getRemote("shared" , "./LoadRemoteModule");
 let loadRemoteModule = __federation_method_unwrapDefault(__federation_var_sharedLoadRemoteModule); 
const {QueryClientProvider} = await importShared('@tanstack/react-query');

const Example = lazy(
  loadRemoteModule("shared@http://localhost:3003/remoteEntry.js", "Example")
);
const App = ({ title = "", queryClient }) => {
  const { todos, increaseTodos } = useSharedStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading Example" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Example, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: increaseTodos, children: "aumentar todos" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "todos: ",
      todos
    ] })
  ] });
};

export { App as A, client as c };
