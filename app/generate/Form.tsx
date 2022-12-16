"use client";

import { useCallback, useState } from "react";
import useController from "stores/controller";
import useRender from "stores/render";
import { guidGenerator } from "utils/guidGenerator";

const Form = () => {
  const { value, posX, posY, fontSize, mutate, reset, style } = useController(
    useCallback(
      (store) => ({
        value: store.value,
        posX: store.posX,
        posY: store.posY,
        fontSize: store.fontSize,
        style: store.style,
        mutate: store.mutate,
        reset: store.reset,
      }),
      []
    )
  );

  const { mutateRender, focused, elements } = useRender(
    useCallback(
      (store) => ({
        focused: store.focused,
        elements: store.elements,
        mutateRender: store.mutate,
      }),
      []
    )
  );

  const [styleValue, setStyleValue] = useState(JSON.stringify(style));

  const handleSave = () => {
    if (value.length === 0) {
      alert("value cannot be empty");
      return;
    }
    reset();
    mutateRender({
      focused: false,
      elements: [
        ...elements,
        { id: guidGenerator(), value, posX, posY, fontSize, style },
      ],
    });
  };

  const handleReset = () => {
    mutateRender({ focused: false, elements: [] });
  };

  const cssContainer = focused ? "" : "opacity-50 pointer-events-none";

  return (
    <div
      className={`flex flex-col gap-2 rounded-md bg-gray-100 p-5 w-[360px] drop-shadow-md shadow-md ${cssContainer}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-xl">Settings</span>
        <button
          onClick={handleReset}
          className="text-sm inline-block px-3 py-1 mx-auto text-white bg-red-600 rounded-full hover:bg-red-700 md:mx-0"
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label>Text</label>
        <input
          className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={value}
          onChange={(e) => {
            mutate({ value: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label>Pos X</label>
        <input
          className="form-select appearance-none block w-28 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="number"
          value={posX}
          onChange={(e) => {
            mutate({ posX: parseInt(e.target.value) });
          }}
        />
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label>Pos Y</label>
        <input
          className="form-select appearance-none block w-28 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="number"
          value={posY}
          onChange={(e) => {
            mutate({ posY: parseInt(e.target.value) });
          }}
        />
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label>Font Size</label>

        <input
          className="form-select appearance-none block w-28 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="number"
          value={fontSize}
          onChange={(e) => {
            mutate({ fontSize: parseInt(e.target.value) });
          }}
        />
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label>Style</label>
        <div className="flex gap-5  items-end">
          <textarea
            rows={5}
            className="form-select appearance-none block w-36 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={styleValue}
            onChange={(e) => {
              setStyleValue(e.target.value);
            }}
          />
          <button
            className="border h-fit px-2 py-1 rounded-md bg-blue-50 drop-shadow-sm hover:drop-shadow-none"
            onClick={() => {
              mutate({ style: JSON.parse(styleValue) });
            }}
          >
            set
          </button>
        </div>
      </div>
      {focused && (
        <div className="flex justify-between">
          <button
            onClick={() => {
              mutateRender({ focused: false });
            }}
            className="relative inline-block px-3 py-1 font-medium group w-fit mt-5"
          >
            <span className="absolute inset-0 h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
            <span className="absolute inset-0 h-full bg-white border-2 border-black group-hover:bg-black" />
            <span className="relative text-black text-sm group-hover:text-white">
              Unselect
            </span>
          </button>
          <button
            onClick={handleSave}
            className="relative inline-block px-3 py-1 font-medium group w-fit mt-5"
          >
            <span className="absolute inset-0 h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
            <span className="absolute inset-0 h-full bg-white border-2 border-black group-hover:bg-black" />
            <span className="relative text-black text-sm group-hover:text-white">
              Save
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
