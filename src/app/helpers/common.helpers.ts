export const isItemSelected = (
  pathname: string,
  itemId: number,
): boolean => {
  const splittedPathname = pathname?.split('/') || '';

  return +splittedPathname[splittedPathname.length - 1] === itemId;
};
