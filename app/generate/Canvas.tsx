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
  const { elements, imageUrl, mutate } = useRender(
    useCallback(
      (store) => ({
        elements: store.elements,
        imageUrl: store.imageUrl,
        mutate: store.mutate,
      }),
      []
    )
  );
  return (
    <div>
      <input
        placeholder="Enter the image template url"
        className="mb-5 form-select appearance-none block w-80 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        type="text"
        value={imageUrl}
        onChange={(e) => {
          mutate({ imageUrl: e.target.value });
        }}
      />
      <Renderer elements={elements} editable imageUrl={imageUrl} />
    </div>
  );
}
