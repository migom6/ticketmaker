"use client";

import { PersonType } from "pages/api/persons";

const Index = ({ persons }: { persons: PersonType[] }) => {
  const handleExport = async () => {
    let names = "";
    persons
      .filter((p) => p.visited)
      .forEach((p) => {
        names += p.name + "\n";
      });
    try {
      await navigator.clipboard.writeText(names);
      console.log("Content copied to clipboard");
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error("Failed to copy: ", err);
      /* Rejected - text failed to copy to the clipboard */
    } finally {
      alert("copied successfully");
    }
  };

  return (
    <div className="flex flex-col m-1 w-lg">
      <button
        onClick={handleExport}
        className="bg-blue-500 text-white font-bold  py-2 px-2 rounded focus:outline-none m-5 w-[300px] self-center"
      >
        Export
      </button>
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="text-right border-r px-1 text-sm">No</th>
            <th className="text-right border-r px-1 text-sm">Name</th>
            <th className="text-right border-r px-1 text-sm">Visited</th>
            <th className="text-right border-r px-1 text-sm">Food Available</th>
            <th className="text-right border-r px-1 text-sm">Food Delivered</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => {
            return (
              <tr key={person.ticketNo} className="border-b">
                <td className="text-right border-r px-2">{person.ticketNo}</td>
                <td className="text-right border-r px-2">{person.name}</td>
                <td className="text-right border-r px-2">
                  {person.visited ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
                <td className="text-right border-r px-2">
                  {person.includesFood ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
                <td className="text-right border-r px-2">
                  {person.hadFood ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
