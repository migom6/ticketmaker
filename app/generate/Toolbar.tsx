"use client";
import Papa from "papaparse";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import useRender from "stores/render";
import generate from "./generate";

export default function Toolbar() {
  const { elements, imageUrl, templateHeight, templateWidth } = useRender(
    useCallback(
      (store) => ({
        elements: store.elements,
        imageUrl: store.imageUrl,
        templateHeight: store.templateHeight,
        templateWidth: store.templateWidth,
      }),
      []
    )
  );

  const [csvData, setCsvData] = useState<string[][]>([]);

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          setCsvData(results.data as string[][]);
        },
      });
    }
  };
  const handleGenerate = useCallback(async () => {
    const results = generate(
      elements,
      csvData,
      imageUrl,
      templateHeight,
      templateWidth
    );
    try {
      await fetch("/api/tickets", {
        method: "DELETE",
      });
      await fetch("/api/tickets", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: results }),
      });
    } catch (e) {
      alert("some error occured");
    }
  }, [elements, csvData, imageUrl, templateHeight, templateWidth]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 flex justify-center items-center rounded-sm shadow-md drop-shadow-md">
      <div className="bg-slate-100 h-full w-fit flex justify-center items-center p-5 gap-5">
        <input type="file" accept=".csv,.xlsx,.xls" onChange={onUpload} />
        <button
          onClick={handleGenerate}
          className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
        >
          <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
          <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
            <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
            <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
          </span>
          <span className="relative text-white">Generate</span>
        </button>
      </div>
    </div>
  );
}
