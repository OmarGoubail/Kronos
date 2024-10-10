import { createSignal, lazy } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import "@/app.css"
import { Button } from "@/components/ui/button";
import { A, RouteDefinition } from "@solidjs/router";



export const main_route: RouteDefinition = {
  path: "/",
  component: lazy(() => import("@/routes/App")),
}


function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <div class="bg-background w-full h-screen flex justify-center items-center">

      <Button variant={'default'}>Hello</Button>

      <A href="/journal">jounral</A>
    </div>
  );
}

export default App;
