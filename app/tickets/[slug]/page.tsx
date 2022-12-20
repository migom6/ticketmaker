// import Renderer from "components/Renderer";
// import { TicketDB } from "models/Ticket";

// const baseUrl = process.env.VERCEL_URL;
import Image from "next/image";

// async function getTickets(): Promise<{ data: TicketDB[] }> {
//   const _baseUrl = !baseUrl
//     ? "http://localhost:3000"
//     : `https://${process.env.VERCEL_URL}`;

//   const response = await fetch(`${_baseUrl}/api/tickets`, {
//     cache: "no-store",
//   });
//   return response.json();
// }

export default async function Page({ params }: { params: { slug: string } }) {
  // const response = await getTickets();

  // if (!ticket) return <div>not found</div>;
  return (
    <div className="flex h-fit">
      {/* <div className="rounded-md bg-gradient-to-r from-green-500 to-yellow-500 via-orange-500 background-animate p-[5px] drop-shadow-md shadow-md"> */}
      <div style={{ height: 260, width: 804 }}>
        <Image
          className="-rotate-90 block"
          src={`/tickets/${params.slug}.png`}
          height={260}
          width={804}
          alt={params.slug}
        />
      </div>
    </div>
  );
}
