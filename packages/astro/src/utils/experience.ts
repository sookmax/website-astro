import type { CollectionEntry } from "astro:content";

export function getExperienceTypeCounts(
  experiences: CollectionEntry<"experience">[],
) {
  return experiences.reduce((map, experience) => {
    map.set(experience.data.type, (map.get(experience.data.type) ?? 0) + 1);
    return map;
  }, new Map<string, number>());
}

export function sortExperiencesByDate(
  experiences: CollectionEntry<"experience">[],
) {
  return experiences.sort(
    (a, b) =>
      (b.data.to ? b.data.to : b.data.from).valueOf() -
      (a.data.to ? a.data.to : a.data.from).valueOf(),
  );
}
