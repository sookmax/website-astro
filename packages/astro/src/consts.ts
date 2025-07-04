// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "sook.dev";
export const SITE_DESCRIPTION = "Hi, I'm Sook. A web devloper.";
export const ASSETS_BASE_URL = "https://assets.sook.dev/";

export function GET_BADGE_STYLE(type: string) {
  switch (type) {
    case "Work":
      return 2;
    case "Sabbatical":
      return 4;
    case "Education":
      return 5;
    case "Project":
      return 3;
    default:
      return 1;
  }
}

// https://github.com/withastro/starlight/blob/main/packages/starlight/constants.ts
export const PAGE_TITLE_ID = "_top";
