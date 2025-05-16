// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "sook.dev";
export const SITE_DESCRIPTION = "Sook's personal website";

export function GET_BADGE_STYLE(type: string) {
  switch (type) {
    case "Work":
      return 2;
    case "Sabbatical":
      return 4;
    case "Education":
    case "Project":
      return 3;
    default:
      return 1;
  }
}
