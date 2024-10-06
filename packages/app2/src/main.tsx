import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient } from "@tanstack/react-query";

const c = new QueryClient();

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App title="App 2" queryClient={c} />);
