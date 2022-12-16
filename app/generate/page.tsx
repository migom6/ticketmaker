// Import your Client Component
import Canvas from "./Canvas";
import Form from "./Form";
import Toolbar from "./Toolbar";

export default async function Page() {
  return (
    <div className="flex gap-20 h-screen p-20 items-center justify-center">
      <Canvas />
      <Form />
      <Toolbar />
    </div>
  );
}
