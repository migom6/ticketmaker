"use client";

import { useCallback } from "react";
import useController from "stores/controller";
import useRender from "stores/render";
import { guidGenerator } from "utils/guidGenerator";

const Form = () => {
  const { value, posX, posY, font, fontSize, mutate, reset } = useController(
    useCallback(
      (store) => ({
        value: store.value,
        posX: store.posX,
        posY: store.posY,
        font: store.font,
        fontSize: store.fontSize,
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
        { id: guidGenerator(), value, posX, posY, font, fontSize },
      ],
    });
  };

  const handleReset = () => {
    mutateRender({ focused: false, elements: [] });
  };

  return (
    <div className="flex flex-col gap-2 rounded-md bg-gray-100 p-5 w-[360px] drop-shadow-md shadow-md">
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
        <label>Font</label>
        <select
          className="form-select appearance-none block w-60 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
        >
          <option selected>Font family</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
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
      {focused && (
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
      )}
      {!focused && <span>Tap on the canvas</span>}
    </div>
  );
};

export default Form;
