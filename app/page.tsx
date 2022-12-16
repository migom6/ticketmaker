import Image from "next/image";

async function getPosts() {
  return [];
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts();
  // Forward fetched data to your Client Component
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex relative h-[500px] w-[360px] hover:animate-spin rounded-sm overflow-hidden shadow-md drop-shadow-sm">
        <Image src="/images/poster.jpeg" alt="template" fill />
      </div>
    </div>
  );
}
