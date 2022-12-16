import Renderer from "components/Renderer";
import { TicketDB } from "models/Ticket";

const baseUrl = process.env.VERCEL_URL;

async function getTickets(): Promise<{ data: TicketDB[] }> {
  const response = await fetch(`${baseUrl}/api/tickets`, { cache: "no-store" });
  return response.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
  const response = await getTickets();
  const ticket = response.data.find(
    (_, index) => index + 1 === parseInt(params.slug as string)
  );
  if (!ticket) return <div>not found</div>;
  return (
    <div className="flex flex-col gap-5">
      <Renderer
        elements={ticket.elements}
        imageUrl={ticket.imageUrl}
        templateWidth={ticket.templateWidth}
        templateHeight={ticket.templateHeight}
      />
    </div>
  );
}
