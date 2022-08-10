export const map = <T = { [k: string]: unknown } | ArrayLike<unknown>>(
  obj: T,
  callback: (
    value: Entries<T>[1],
    index: number,
    array: Entries<T>
  ) => Entries<T>
): T => {
  // @ts-ignore
  return Object.fromEntries(Object.entries<T>(obj as any).map(callback));
};
