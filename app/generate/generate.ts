import { ElementMeta } from "stores/controller";

export default function generate(
  elements: ElementMeta[],
  csv: string[][],
  imageUrl: string
) {
  const header = csv[0];
  const result = csv.map((row) => {
    const updatedElements = elements.map((e) => {
      const findIndex = header.findIndex((h) => h === e.value);
      return { ...e, value: row[findIndex] };
    });
    return { imageUrl: imageUrl, elements: updatedElements, row: row };
  });
  return result.slice(1);
}
