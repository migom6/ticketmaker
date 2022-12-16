import Renderer from "components/Renderer";
import { TicketDB } from "models/Ticket";
import { resolve } from "path";

const baseUrl = process.env.VERCEL_URL;

async function getTickets(): Promise<{ data: TicketDB[] }> {
  // const response = await fetch(`${baseUrl}/api/tickets`);
  // return response.json();
  return Promise.resolve({ data: [] });
}

export default async function Page() {
  const response = await getTickets();
  return (
    <div className="flex flex-col gap-5">
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
