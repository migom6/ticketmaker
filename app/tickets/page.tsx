import Renderer from "components/Renderer";
import _ticketElements from "public/data.json";

async function getTickets() {
  return _ticketElements;
}

export default async function Page() {
  const tickets = await getTickets();
  return (
    <div className="flex flex-col gap-5">
      {tickets.map((ticket, index) => (
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
