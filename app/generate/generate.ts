import { ElementMeta } from "stores/controller";

export default function generate(
  elements: ElementMeta[],
  csv: string[][],
  imageUrl: string,
  templateHeight: number,
  templateWidth: number
) {
  const header = csv[0];
  const result = csv.map((row) => {
    const updatedElements = elements.map((e) => {
      const findIndex = header.findIndex((h) => h === e.value);
      if (findIndex === -1) {
        return { ...e };
      }
      return { ...e, value: row[findIndex].toUpperCase() };
    });
    return {
      imageUrl: imageUrl,
      templateHeight,
      templateWidth,
      elements: updatedElements,
      row: row,
    };
  });
  return result.slice(1);
}

export type TicketType = ReturnType<typeof generate>[0];
