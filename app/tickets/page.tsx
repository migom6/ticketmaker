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

export default async function Page() {
  const response = await getTickets();
  return (
    <div className="flex flex-col">
      {response.data.map((ticket, index) => (
        <Renderer
          key={index}
          elements={ticket.elements}
          imageUrl={ticket.imageUrl}
          templateHeight={ticket.templateHeight}
          templateWidth={ticket.templateWidth}
        />
      ))}
    </div>
  );
}
