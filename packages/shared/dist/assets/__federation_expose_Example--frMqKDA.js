import { importShared } from './__federation_fn_import-C3Bvay6V.js';
import { j as jsxRuntimeExports } from './jsx-runtime-BgsmXpcd.js';

const {useQuery} = await importShared('@tanstack/react-query');

const React = await importShared('react');

function Example() {
  const [show, setShow] = React.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShow(!show), children: "Show/Hide" }) }),
    show ? /* @__PURE__ */ jsxRuntimeExports.jsx(RepoData, {}) : null
  ] });
}
function RepoData() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    ),
    staleTime: Infinity
  });
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return "An error has occurred: " + error.message;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: data.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: data.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
      "👀 ",
      data.subscribers_count
    ] }),
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
      "✨ ",
      data.stargazers_count
    ] }),
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
      "🍴 ",
      data.forks_count
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: isFetching ? "Updating..." : "" })
  ] });
}

export { Example as default };
