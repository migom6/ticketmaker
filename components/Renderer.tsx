"use client";

import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import useController, { ElementMeta } from "stores/controller";
import useRender from "stores/render";

interface Props {
  editable?: boolean;
  elements: ElementMeta[];
  imageUrl: string;
  templateWidth: number;
  templateHeight: number;
}

const Renderer: FC<Props> = ({
  editable = false,
  elements,
  imageUrl,
  templateWidth,
  templateHeight,
}) => {
  const templateDivRef = useRef<HTMLDivElement | null>(null);

  const [selectedPos, setSelectedPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const { value, posX, posY, style, fontSize, mutate } = useController(
    useCallback(
      (store) => ({
        value: store.value,
        posX: store.posX,
        posY: store.posY,
        style: store.style,
        fontSize: store.fontSize,
        mutate: store.mutate,
      }),
      []
    )
  );
  const { mutateRender, focused } = useRender(
    useCallback(
      (store) => ({
        elements: store.elements,
        focused: store.focused,
        mutateRender: store.mutate,
        templateHeight: store.templateHeight,
        templateWidth: store.templateWidth,
      }),
      []
    )
  );

  const insertText: MouseEventHandler<HTMLDivElement> = (e) => {
    if (templateDivRef.current == null) return;
    mutateRender({ focused: true });
    setSelectedPos({
      x: e.pageX - templateDivRef.current.offsetLeft,
      y: e.pageY - templateDivRef.current.offsetTop,
    });
  };

  const handleEdit = (id: string) => {
    const element = elements.find((e) => e.id === id)!;
    mutateRender({
      focused: true,
      elements: elements.filter((e) => e.id !== id),
    });
    mutate({ ...element });
  };

  useEffect(() => {
    selectedPos &&
      focused &&
      mutate({ posX: selectedPos.x, posY: selectedPos.y });
  }, [focused, mutate, selectedPos]);

  useEffect(() => {
    setSelectedPos({ x: posX, y: posY });
  }, [posX, posY]);

  if (!imageUrl?.length ?? 0 > 0) return null;

  return (
    <div
      ref={templateDivRef}
      onClick={editable ? insertText : undefined}
      className={"relative cursor-crosshair overflow-hidden bg-yellow-50"}
      style={{ width: templateWidth, height: templateHeight }}
    >
      <Image src={imageUrl} alt="template" fill />

      {focused && selectedPos && (
        <span
          className="absolute border border-red-500 border-dashed"
          style={{
            top: selectedPos.y,
            left: selectedPos.x,
            fontSize,
            ...style,
          }}
        >
          {value.length > 0 ? value : "Your Text Here"}
        </span>
      )}
      {elements.map((e) => {
        const css = editable
          ? "absolute hover:border hover:border-dashed "
          : "absolute";
        return (
          <span
            onClick={editable ? () => handleEdit(e.id) : undefined}
            key={e.id}
            className={css}
            style={{
              top: e.posY,
              left: e.posX,
              fontSize: e.fontSize,
              ...e.style,
            }}
          >
            {e.value}
          </span>
        );
      })}
    </div>
  );
};

export default Renderer;
