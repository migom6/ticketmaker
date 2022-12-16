import Renderer from "components/Renderer";
import _ticketElements from "public/data.json";

async function getTickets(params: string) {
  const index = parseInt(params);
  return _ticketElements.find((_, _index) => index === _index);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const ticket = await getTickets(params.slug);
  if (!ticket) return <div>not found</div>;
  return (
    <div className="flex flex-col gap-5">
      <Renderer elements={ticket.elements} imageUrl={ticket.imageUrl} />
    </div>
  );
}
