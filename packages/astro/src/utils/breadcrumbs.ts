export function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const breadcrumbs: { label: string; path: string }[] = [
    // { label: "home", path: "/" },
  ];

  let currentPath = "";

  for (const part of parts) {
    currentPath += `/${part}`;
    breadcrumbs.push({
      label: `${part[0].toUpperCase()}${part.slice(1)}`,
      path: currentPath,
    });
  }

  return breadcrumbs;
}
