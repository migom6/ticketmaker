// Import your Client Component
import Canvas from "./Canvas";
import Form from "./Form";
import Toolbar from "./Toolbar";

async function getPosts() {
  return [];
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts();
  // Forward fetched data to your Client Component
  return (
    <div className="flex gap-20 h-screen p-20 items-center">
      <Canvas />
      <Form />
      <Toolbar />
    </div>
  );
}
