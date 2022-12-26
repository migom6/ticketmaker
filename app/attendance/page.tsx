// const baseUrl = process.env.VERCEL_URL;
"use client";

import { PersonType } from "pages/api/persons";
import { useEffect, useState } from "react";

export default function Page() {
  const [ticket, setTicket] = useState<null | number>(null);
  const [person, setPerson] = useState<null | PersonType>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ticket) {
      setPerson(null);
      return;
    }
    (async function () {
      try {
        setLoading(true);
        const res = await fetch(`/api/persons/${ticket}`);
        const jsonData = await res.json();
        setPerson(jsonData.data);
      } catch (e) {
        alert("contact migom");
      } finally {
        setLoading(false);
      }
    })();
  }, [ticket]);

  const handleFood = async () => {
    if (!ticket) return;
    try {
      await fetch(`/api/persons/${ticket}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hadFood: true }),
      });
      alert("success");
    } catch (e) {
      alert("contact migom6");
    } finally {
      setPerson(null);
      setTicket(null);
    }
  };
  const handleVisit = async () => {
    if (!ticket) return;
    try {
      await fetch(`/api/persons/${ticket}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visited: true }),
      });
      alert("success");
    } catch (e) {
      alert("contact migom6");
    } finally {
      setPerson(null);
      setTicket(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ticket No
            </label>
            <input
              value={ticket ?? ""}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ticket"
              type="number"
              placeholder="Enter ticket no"
              onChange={(e) => {
                if (!e.target.value || e.target.value === "") {
                  setTicket(null);
                } else {
                  setTicket(parseInt(e.target.value));
                }
              }}
            />
          </div>
          {loading && <div>loading ...</div>}
          {person !== null && (
            <div className="flex flex-col mb-5 rounded-md drop-shadow-md bg-gray-100 p-5">
              <span> Name - {person.name}</span>
              <span>
                Visited -{" "}
                {person.visited ? (
                  <span className="text-green-500">Yes</span>
                ) : (
                  <span className="text-red-500">No</span>
                )}
              </span>
              <span>
                Includes Food -{" "}
                {person.includesFood ? (
                  <span className="text-green-500">Yes</span>
                ) : (
                  <span className="text-red-500">No</span>
                )}
              </span>
              {person.includesFood && (
                <span>
                  Food Delivered -{" "}
                  {person.hadFood ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </span>
              )}
            </div>
          )}
          <div className="flex items-center justify-between">
            {person && !person.visited && (
              <button
                onClick={handleVisit}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none`}
                type="button"
              >
                Mark
              </button>
            )}
            {person &&
              person.visited &&
              person.includesFood &&
              !person.hadFood && (
                <button
                  onClick={handleFood}
                  className={`bg-blue-500 text-white font-bold  py-2 px-2 rounded focus:outline-none`}
                  type="button"
                >
                  Mark Food 🍔
                </button>
              )}
            {!person && (
              <button
                className={` text-white font-bold py-2 px-4 rounded focus:outline-none pointer-event-none bg-gray-200`}
                type="button"
              >
                Mark
              </button>
            )}

            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/attendance/list"
            >
              View complete list
            </a>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Guwahati Anime Club. <br />
          Made with ❤️ @migom6.
        </p>
      </div>
    </div>
  );
}
