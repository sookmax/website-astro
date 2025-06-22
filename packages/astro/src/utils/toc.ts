import type { MarkdownHeading } from "astro";

export interface TocItem extends MarkdownHeading {
  children: TocItem[];
}

interface TocOpts {
  minHeadingLevel: number;
  maxHeadingLevel: number;
}

export type TOC = ReturnType<typeof generateToc>;
export function generateToc(
  headings: MarkdownHeading[],
  options: TocOpts = {
    minHeadingLevel: 2,
    maxHeadingLevel: 3,
  },
): {
  items: TocItem[];
  options: TocOpts;
} {
  const { minHeadingLevel, maxHeadingLevel } = options;

  headings = headings.filter(
    (heading) =>
      heading.depth >= minHeadingLevel && heading.depth <= maxHeadingLevel,
  );

  const toc: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const heading of headings) {
    const item: TocItem = { ...heading, children: [] };

    while (stack.length && stack[stack.length - 1].depth >= item.depth) {
      stack.pop();
    }

    if (stack.length) {
      stack[stack.length - 1].children.push(item);
    } else {
      toc.push(item);
    }

    stack.push(item);
  }

  return {
    items: toc,
    options,
  };
}
