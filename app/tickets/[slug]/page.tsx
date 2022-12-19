import Renderer from "components/Renderer";
import { TicketDB } from "models/Ticket";

const baseUrl = process.env.VERCEL_URL;

async function getTickets(): Promise<{ data: TicketDB[] }> {
  const _baseUrl = !baseUrl
    ? "http://localhost:3000"
    : `https://${process.env.VERCEL_URL}`;

  const response = await fetch(`${_baseUrl}/api/tickets`, {
    cache: "no-store",
  });
  return response.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
  const response = await getTickets();
  const ticket = response.data.find(
    (_, index) => index + 1 === parseInt(params.slug as string)
  );
  if (!ticket) return <div>not found</div>;
  return (
    <div className="flex md:justify-center md:h-screen md:mt-20">
      <div className="w-fit h-fit rounded-md bg-gradient-to-r from-green-500 to-yellow-500 via-orange-500 background-animate p-[5px] drop-shadow-md shadow-md rotatedown">
        <Renderer
          elements={ticket.elements}
          imageUrl={ticket.imageUrl}
          templateWidth={ticket.templateWidth}
          templateHeight={ticket.templateHeight}
        />
      </div>
    </div>
  );
}
