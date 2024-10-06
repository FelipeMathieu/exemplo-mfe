import { importShared } from './__federation_fn_import-jtG6K6_V.js';
import { j as jsxRuntimeExports } from './jsx-runtime-BOfMvjrI.js';
import { c as client, A as App } from './App-BLgoaFKT.js';

const React = await importShared('react');
const singleSpaReact = await importShared('single-spa-react');
const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient: client,
  rootComponent: App,
  errorBoundary() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "This renders when a catastrophic error occurs" });
  }
});

export { bootstrap, mount, unmount };
