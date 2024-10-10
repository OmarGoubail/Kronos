import { render } from "solid-js/web";
import { RouteDefinition, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import { main_route } from "@/routes/App";
import { journal_route } from "./routes/journal";

const wrapper = document.getElementById("root");

if (!wrapper) {
  throw new Error("Wrapper div not found");
}

const routes: RouteDefinition[] = [
  main_route,
  journal_route
]

render(() => <Router>{routes}</Router>, wrapper)
