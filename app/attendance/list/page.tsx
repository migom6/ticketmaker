import { PersonType } from "pages/api/persons";
import List from "./List";

const baseUrl = process.env.VERCEL_URL;

async function getPersons(): Promise<{ data: PersonType[] }> {
  const _baseUrl = !baseUrl
    ? "http://localhost:3000"
    : `https://${process.env.VERCEL_URL}`;
  const response = await fetch(`${_baseUrl}/api/persons`, {
    cache: "no-store",
  });
  return response.json();
}

export default async function Page() {
  const response = await getPersons();

  return <List persons={response.data} />;
}
