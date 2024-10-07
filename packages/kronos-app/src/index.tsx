import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { lazy } from "solid-js";

const wrapper = document.getElementById("root");

if (!wrapper) {
  throw new Error("Wrapper div not found");
}

const routes = {
  path: "/",
  component: lazy(() => import("@/App")),
}

render(() => <Router>{routes}</Router>, wrapper)
