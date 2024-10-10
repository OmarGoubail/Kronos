import Editor from "@/components/Editor";
import { RouteDefinition } from "@solidjs/router"
import { lazy } from "solid-js"

export const journal_route: RouteDefinition = {
  path: "/journal",
  component: lazy(() => import("@/routes/journal/")),
}

const Journal = () => {
  return (
    <div class="h-screen w-full flex flex-col">
      <div>MarkD Journal</div>
      <Editor />
    </div>
  );
}

export default Journal
