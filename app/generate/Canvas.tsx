"use client";

import Image from "next/image";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useRender from "stores/render";
import Renderer from "components/Renderer";

export default function Canvas() {
  const { elements, imageUrl, mutate, templateHeight, templateWidth } =
    useRender(
      useCallback(
        (store) => ({
          elements: store.elements,
          imageUrl: store.imageUrl,
          templateHeight: store.templateHeight,
          templateWidth: store.templateWidth,
          mutate: store.mutate,
        }),
        []
      )
    );
  return (
    <div>
      <div>
        <label>template url</label>
        <input
          placeholder="Enter the image template url"
          className="mb-5 form-select appearance-none block w-80 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="text"
          value={imageUrl}
          onChange={(e) => {
            mutate({ imageUrl: e.target.value });
          }}
        />
      </div>

      <div className="flex gap-5">
        <div>
          <label>height</label>
          <input
            placeholder="height"
            className="mb-5 form-select appearance-none block w-24 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="number"
            value={templateHeight}
            onChange={(e) => {
              mutate({ templateHeight: parseInt(e.target.value) });
            }}
          />
        </div>
        <div>
          <label>width</label>
          <input
            placeholder="width"
            className="mb-5 form-select appearance-none block w-24 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="number"
            value={templateWidth}
            onChange={(e) => {
              mutate({ templateWidth: parseInt(e.target.value) });
            }}
          />
        </div>
      </div>

      <Renderer
        elements={elements}
        editable
        imageUrl={imageUrl}
        templateHeight={templateHeight}
        templateWidth={templateWidth}
      />
    </div>
  );
}
