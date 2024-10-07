import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "./components/ui/button";
import "@/app.css"


function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <div class="bg-background w-full h-screen flex justify-center items-center">

      <Button variant={'default'}>Hello</Button>
    </div>
  );
}

export default App;
